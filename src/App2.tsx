import { useState, useEffect, useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LenisProvider from './components/LenisProvider';
import Render from  './components/Render';

// import './App.css'

// https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement
//Type it as ReactElement | null just as React does. Or let TypeScript infer the type.

// Functional components return ReactElement | null, so it cannot return a bare string or an array of ReactElements. It is a known limitation. The workaround is to use Fragments :
// Class components' render function return ReactNode

gsap.registerPlugin(ScrollTrigger);

function App2() {

  // const boxRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    
  });

  return (
      <>  
      <Render/>
      </>
  )
}

export default App2
