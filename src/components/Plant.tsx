import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Plant = () => {
  const rootsRef = useRef<SVGGElement>(null);
  const stemRef = useRef<SVGPathElement>(null);
  const leafLeftRef = useRef<SVGPathElement>(null);
  const leafRightRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Create a timeline for sequential growth animation
    const tl = gsap.timeline({
        repeat: -1,
      defaults: { ease: 'power2.out',
       }
    });

    // Reset initial states
    gsap.set([rootsRef.current, stemRef.current, leafLeftRef.current, leafRightRef.current], {
      opacity: 0,
      scale: 0,
      transformOrigin: 'bottom center'
    });

    gsap.set(leafLeftRef.current, { transformOrigin: 'right center' });
    gsap.set(leafRightRef.current, { transformOrigin: 'left center' });

    // Animate growth sequence
    tl.to(rootsRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    })
    .to(stemRef.current, {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=0.5')
    .to(leafLeftRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.7')
    .to(leafRightRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.6');

    // Subtle breathing animation loop
    tl.to([leafLeftRef.current, leafRightRef.current], {
      scale: 1.2,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    }, '+=0.5');

  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <svg
        width="400"
        height="600"
        viewBox="0 0 400 600"
        className="drop-shadow-2xl"
      >
        {/* Roots */}
        <g ref={rootsRef}>
          <path
            d="M 200 500 Q 180 520, 160 550 Q 150 570, 140 590"
            stroke="#8B4513"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 200 500 Q 200 530, 190 560 Q 185 580, 180 595"
            stroke="#8B4513"
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 200 500 Q 220 520, 240 550 Q 250 570, 260 590"
            stroke="#8B4513"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 200 500 Q 210 530, 215 560 Q 218 580, 220 595"
            stroke="#8B4513"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Stem */}
        <path
          ref={stemRef}
          d="M 200 500 Q 195 400, 200 300 Q 205 200, 200 100"
          stroke="#2D5016"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left Leaf */}
        <path
          ref={leafLeftRef}
          d="M 280 200 Q 200 180, 100 200 Q 200 210, 90 230 Q 120 250, 200 220 Z"
          fill="#4A7C3B"
          stroke="#2D5016"
          strokeWidth="2"
          className="opacity-90"
        />

        {/* Right Leaf */}
        <path
          ref={leafRightRef}
          d="M 120 180 Q 250 160, 300 180 Q 320 190, 310 210 Q 280 230, 200 200 Z"
          fill="#4A7C3B"
          stroke="#2D5016"
          strokeWidth="2"
          className="opacity-90"
        />

        {/* Subtle glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}


export default Plant;