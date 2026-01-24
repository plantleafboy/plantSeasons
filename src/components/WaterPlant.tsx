'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function WaterPlant() {
  const container = useRef<SVGSVGElement>(null);
  
  // Proxies for the elements
  const plantGroup = useRef<SVGGElement>(null);
  const leafLeft = useRef<SVGGElement>(null);
  const leafRight = useRef<SVGGElement>(null);

  useGSAP(() => {
    // 1. SCROLL-BASED GROWTH
    gsap.fromTo(
      [leafLeft.current, leafRight.current],
      {
        scale: 0,
        rotation: (i) => (i === 0 ? -45 : 45),
      },
      {
        scale: 1,
        rotation: 0,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 30%",
          markers: true,
          scrub: 1, // Smoothly follows the scroll
        },
      }
    );

    // 2. WIND PHYSICS (Swaying)
    // We animate the whole plant group for a natural bend
    gsap.to(plantGroup.current, {
      rotation: 3,
      skewX: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "bottom center"
    });

    // Subtle independent leaf flutter
    gsap.to([leafLeft.current, leafRight.current], {
      rotation: (i) => (i === 0 ? -5 : 5),
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    // 3. WATER FLOW LOOP
    const waterPaths = gsap.utils.toArray<SVGPathElement>('path[id^="water-line"]');
    waterPaths.forEach((path, i) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2 + i,
        repeat: -1,
        ease: "none",
      });
    });
  }, { scope: container });

  return (
    <svg
      ref={container}
      viewBox="0 0 400 600"
      className="w-full h-full overflow-visible"
    >
      {/* WATER LINES */}
      <g opacity={0.4}>
        <path id="water-line-1" d="M200 600 Q180 400 200 200" stroke="#6ec6ff" strokeWidth="2" fill="none" />
        <path id="water-line-2" d="M210 600 Q230 420 210 220" stroke="#4faee8" strokeWidth="2" fill="none" />
      </g>

      {/* PLANT GROUP (Wind affects this) */}
      <g ref={plantGroup} id="plant-main">
        {/* Main Stem */}
        <path
          d="M 200 580 C 195 450 205 300 200 120"
          stroke="#2e7d32"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* PROXIMITY CONTROL:
            'x' and 'y' in the initial style/transform control how 
            far the leaf sits from the stem center (200, 260).
        */}
        <g 
          ref={leafLeft} 
          style={{ transformOrigin: 'right center', x: -5, y: 260 }}
        >
          <path
            d="M 0 0 Q -50 -30 -60 0 Q -50 40 0 30 Z"
            fill="#4caf50"
          />
        </g>

        <g 
          ref={leafRight} 
          style={{ transformOrigin: 'left center', x: 5, y: 240 }}
        >
          <path
            d="M 0 0 Q 50 -30 60 0 Q 50 40 0 30 Z"
            fill="#43a047"
          />
        </g>
      </g>
    </svg>
  );
}