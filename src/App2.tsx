import { useState, useEffect, useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import lenis from "lenis"
import './App.css'

import Turbine from "./components/Turbine";


gsap.registerPlugin(ScrollTrigger);

function App() {
    const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <div>App</div>;
  
  return (
    <>

      <Turbine 
        title={"titleTest"}
        content={"content is here"}  
      />
      <div style = {{ padding: "2rem"}}>
        <div
          ref={boxRef}
          style={{
            width: 100,
            height: 100,
            backgroundColor: "cornflowerblue"
          }}
        />
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
