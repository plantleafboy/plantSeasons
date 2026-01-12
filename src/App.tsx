import { useState, useEffect, useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis"

// import AnchorLink from './components/AnchorLink';
import LenisProvider from './components/LenisProvider';
import './App.css'

import Turbine from "./components/Turbine";


gsap.registerPlugin(ScrollTrigger);

function App() {

  const boxRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {

    const loopTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5
    });

    loopTimeline.fromTo(
      boxRef.current,
      { opacity: 0, y: 50}
      ,{ opacity: 1, y: 0, duration: 1}
    );

  });

  return (
      <LenisProvider>
        <>
          <Turbine
            title={"titleTest"}
            content={"content is here"}
          />
          <div style = {{ padding: "2rem"}}>
            <div className = 'blue-box'
              ref={boxRef}
              
            />
          </div>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </>
      </LenisProvider>
  )
}

export default App
