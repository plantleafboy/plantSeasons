import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Tween, Group, Easing } from '@tweenjs/tween.js';
import { useEffect, useRef, useState } from 'react';


import '../assets/render.css'
import { div } from "three/tsl";

const classMapper = {
    contentOne: 'contentOneAction',
    contentTwo: 'contentTwoAction',
    fullScreen: 'fullScreenAction'
};



const Render = () => {

    const runCamera = (x: number, y: number, z: number) => {
    if (!cameraRef.current || !controlsRef.current) return;

    // 1. Setup Target Position
    const targetPosition = { x, y, z };
    const duration = 800; // ms

    // 2. Create the Tween using your tweenGroup.current
    new Tween(cameraRef.current.position, tweenGroup.current)
        .to(targetPosition, duration)
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => {
            // Instead of manual renderer.render calls, 
            // we just ensure the controls are pointing at the car
            controlsRef.current?.target.set(0, 0, 0); 
        })
        .start();
    };

    const [statusContent, setStatusContent] = useState<'contentOne' | 'contentTwo' | 'fullScreen'>('contentOne');
    
    const handleShowMore = () => {
        if (statusContent === 'contentOne') {
            setStatusContent('contentTwo');
            runCamera(3, 2, 4);
        } else if (statusContent === 'contentTwo') {
            setStatusContent('fullScreen');
            runCamera(-3, 1, 6);
        } else {
            setStatusContent('contentOne');
            runCamera(0, 5, 12);
        }
    };

    const sliderClass = statusContent === 'contentOne' 
    ? 'contentOneAction' 
    : 'contentTwoAction';
    
    
    const canvasRef = useRef<HTMLDivElement | null>(null); 
    // populated after DOM node MoneyOutlined, doesnt change across renders |  'imperative handle to object existing outside render cycle' | 

    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const loaderRef = useRef<GLTFLoader | null>(null);
    const objectRef = useRef<THREE.Object3D | null>(null);
    const modelRef = useRef<THREE.Object3D | null>(null);

    const tweenGroup = useRef(new Group());


    useEffect(() => {
    if (statusContent === 'contentOne') {
        runCamera(3, 2, 4);
    } else if (statusContent === 'contentTwo') {
        runCamera(-3, 1, 6);
    } else if (statusContent === 'fullScreen') {
        runCamera(0, 5, 12);
    }
    }, [statusContent]);

    useEffect(() => {
        const container = canvasRef.current;
        if (!container) return;

        let frameId : number;

        let width = container.clientWidth;
        let height = container.clientHeight;

        console.log('1: ', width);
        console.log(height);

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(3, 2, 4);
        cameraRef.current = camera;

        // 1. Ambient Light: Keep it low so shadows stay deep
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // 2. Main Key Light (The "Sun"): Stronger and closer
        const mainLight = new THREE.DirectionalLight(0xffffff, 3);
        mainLight.position.set(5, 10, 7.5); // Coming from top-front-right
        scene.add(mainLight);

        // 3. Fill Light: Brings out the color on the dark side
        const fillLight = new THREE.PointLight(0xffffff, 20);
        fillLight.position.set(-5, 3, -5); 
        scene.add(fillLight);

        // 4. Rim Light: Highlights the silhouette of the car
        const rimLight = new THREE.PointLight(0xffffff, 15);
        rimLight.position.set(0, 5, -10); 
        scene.add(rimLight);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            depth: true,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace; 
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // Makes lighting look more realistic
        renderer.toneMappingExposure = 1.0;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controlsRef.current = controls;
        controls.addEventListener('end', () => {
        const p = camera.position;
        console.log('Camera position:', p.x, p.y, p.z);
        });

        const positions = {
        contentOne: { x: 3, y: 2, z: 4 },
        contentTwo: { x: -2, y: 3, z: 8 },
        fullScreen: { x: 0, y: 10, z: 15 } // Dramatic bird's eye view
        };

        const targetPos = positions[statusContent];

        new Tween(cameraRef.current.position, tweenGroup.current)
            .to(targetPos, 1200) // Maybe a slightly longer transition for big moves
            .easing(Easing.Cubic.Out)
            .start();
        
        const loader = new GLTFLoader();
        loaderRef.current = loader;

        loader.load('../../free_1975_porsche_911_930_turbo/scene.gltf',
        // loader.load('../../porsche_singer_poly/scene.gltf',

                    (gltf: GLTF) => {                         
                        objectRef.current = gltf.scene;
                        scene.add(gltf.scene)
                        gltf.scene.position.set(0,0,0);
                        
                        camera.position.set(3,2,4);
                        // camera.lookAt(0,0,0);
                    }

                    
        );

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
            // 1. Update your custom tween group with the current time
            controlsRef.current?.update();
            tweenGroup.current.update();
            
        }

        animate();

        return () => {            // CLEANUP: Important to remove the canvas when the component unmounts
        cancelAnimationFrame(frameId);
        container.removeChild(renderer.domElement);
        renderer.dispose();
            };
        
    }, []);


    return (
        
        <div className={`slider ${sliderClass}`}>
            <div id="dCanvas" ref={canvasRef}></div>

            <div className="contentOne">
                <h1>porsche singer</h1>
                <div className="des">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem in aliquid, facilis culpa repudiandae cupiditate dignissimos. Labore dolores itaque consequatur illo ab veniam quaerat placeat, quasi dolorem aspernatur quibusdam nulla.
                </div>
            </div>

            <div className="contentTwo">
                <ul>
                    <li>
                        <span>na flat 6</span>
                        <span>engine</span>
                    </li>
                    <li>
                        <span>3.2</span>
                        <span>0-100kmh</span>
                    </li>
                    <li>
                        <span>transmission</span>
                        <span>pdk</span>
                    </li>
                </ul>
            </div>
            <button id="showmore" onClick={handleShowMore}>specification</button>
        </div>
    )
}

export default Render;