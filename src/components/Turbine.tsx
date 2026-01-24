import {Box, Typography} from "@mui/material";
import '../App.css'
import { useRef } from "react"; //forward
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';


// import React, {useEffect, useState} from "react";

interface TurbineProps {
    title: string;
    content: string;
}

const Turbine = (props: TurbineProps) => {
// const Turbine = forwardRef<HTMLDivElement, TurbineProps>({title, content}, tBoxRef) => {

    const tBoxRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        gsap.to(tBoxRef.current, {
            duration: 3,
            rotation: 1080,
            scale: 2,
            scrollTrigger: {
                trigger: tBoxRef.current,
                pin: true,
                // --param 1 = animation faster/slower (if far Apartment, animate IN duration increase), param 2 -animation occur quicker/slower/timing of animation
                start: "center center" , 
                end: "+=200",
                markers: false,
                scrub: true
            }
        });
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                maxHeight: '900px',
            }}
        >
            <div style={{ height: "15vh" }} />
            {/* Header Section */}

            <Box
                sx={{
                    minHeight: '100vh',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // flexShrink: 0,
                    // position: 'sticky',
                    // top: 0,
                    // zIndex: 1,
                    // backgroundColor: 'background.paper',
                    // borderBottom: '1px solid',
                    // borderColor: 'divider',
                }}
            >
                <br />
                <div className="tBox gradient-green" ref={tBoxRef}> </div>
                {/* <script type="module" src="app.tsx"></script> */}
                <br />
            </Box>
        </Box>
    )
}

Turbine.displayName = "Turbine";

export default Turbine;