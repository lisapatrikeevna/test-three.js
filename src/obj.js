import React, {Component, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import {useDispatch} from 'react-redux'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import t from './assets/shiba/scene.gltf'

function CanvasContainer() {
    const mountRef = useRef(null);
    // const dispatch = useDispatch()
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer();
    useEffect(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        if (!mountRef.current) {
            return;
        }
        // this.mount.appendChild(renderer.domElement);
        mountRef.current.appendChild(renderer.domElement);
        // camera.position.z = 5;
        camera.position.set(100, 0, 1000)
        const light = new THREE.AmbientLight(0xffffff)
        scene.add(light)

        //cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        console.log(geometry);

        //Sphere
        const geometryS = new THREE.SphereGeometry(200, 12, 12);
        const materialS = new THREE.MeshBasicMaterial({color: 0x00ff00});
        //https://www.youtube.com/watch?v=ngGQD7mIEok&ab_channel=%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%D0%9B%D0%B0%D0%B2%D1%80%D0%B8%D0%BA
        //8:22
        // const materialS = new THREE.MeshBasicMaterial({color: 0x00ff00,vertexColors: THREE.FaceColors });
        // for (let i = 0; i < geometryS.faces.length; i++) {
        //     geometryS.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
        // }
        const mesh = new THREE.Mesh(geometryS, materialS);
        scene.add(mesh)


        // const loader = new GLTFLoader();
        // // loader.load( 'path/to/model.glb', function ( gltf ) {
        // loader.load( {t}, function ( gltf ) {
        //     scene.add( gltf.scene );
        // }, undefined, function ( error ) {
        //     console.error( error );
        // } );

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            mesh.position.x += 1
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);


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

export default CanvasContainer
