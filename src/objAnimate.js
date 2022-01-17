import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import t from './assets/shiba/scene.gltf'
//28.50
function AnimateObj() {
    const mountRef = useRef(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    // const light = new THREE.AmbientLight(0xffffff)
    //scene.add(light)
    const light = new THREE.DirectionalLight(0xffffff, 0.5)
    //17.15
    const plane = new THREE.PlaneGeometry(3, 3, 5, 5)
//22.02
    const mouse= {
        x:undefined,
        y:undefined
    }
    const raycaster = new THREE.Raycaster()
    useEffect(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (!mountRef.current) {
            return;
        }
        mountRef.current.appendChild(renderer.domElement);
        // camera.position.z = 5;
        camera.position.set(100, 0, 1000)
        light.position.set(0, 0, 2)

        const loader = new GLTFLoader();
        // loader.load( 'path/to/model.glb', function ( gltf ) {
        loader.load({t}, function (gltf) {
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            raycaster.setFromCamera(mouse,camera)

            //if dont use useEffect, i cen use
            //requestAnimationFrame(function (){animate()})
        };
        // useEffect( ()=>{
        animate();
    }, [])


    return (
        <div className='CanvasContainer' ref={mountRef}/>
    )
}

export default AnimateObj
