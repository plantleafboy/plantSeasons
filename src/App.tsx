import { useState, useEffect, useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis"

// import AnchorLink from './components/AnchorLink';
import LenisProvider from './components/LenisProvider';
import Plant from  './components/Plant';
import Bird from './components/Bird';
import WaterStream from './components/WaterStream';

import WaterPlant from './components/WaterPlant';
import './App.css'

import Turbine from "./components/Turbine";


gsap.registerPlugin(ScrollTrigger);

function App() {

  const boxRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {

    const loopTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: boxRef.current,
        start : 'top center 35%',
        end: 'bottom center',
        scrub: false,
        markers: false,
        // on enter, endTrigger, enter back, complete
        toggleActions: 'play reverse play reverse' 
      },
      // repeat: -1,
      yoyo: false
      // repeatDelay: 0.5
    });

    loopTimeline.fromTo(
      boxRef.current,
      { opacity: 0, y: 50}
      ,{ opacity: 1, y: 0, duration: 1}
    )
    .to(
    boxRef.current,
    {
      rotation: 360,
      scale: 1.5,
      duration: 1
    }, '>'
  );
    // loopTimeline.To(
    //   boxRef.current,
    //   { x: 100, opacity: 0, duration: 0.8, delay: 0.2 },
    //   { opacity: 0, y: 100}
    //   ,{ opacity: 1, y: 0, duration: 1}
    // );

  });

  return (
      <LenisProvider>
        <>
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <WaterStream />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Plant />
            </div>
          </div>
          <Bird/>
          <Plant/>
          <Turbine
            title={"titleTest"}
            content={"content is here"}
          />
          <div style = {{ padding: "2rem"}}>
            <div className = 'blue-box'
              ref={boxRef}
              
            />
          </div>
          {/* <WaterPlant/> */}
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </>
      </LenisProvider>
  )
}

export default App
