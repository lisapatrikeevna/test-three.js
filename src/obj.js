import React, {useEffect, useRef, useState} from "react"
import * as THREE from "three"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'


function SomeObj() {
    // const mountRef = useRef(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    // const light = new THREE.AmbientLight(0xffffff)
    //scene.add(light)
    const light = new THREE.DirectionalLight(0xffffff, 2)
    // const light = new THREE.DirectionalLight(0xffffff, 0.5)
    //17.15
    // const plane = new THREE.PlaneGeometry(3, 3, 5, 5)

    renderer.setSize(window.innerWidth, window.innerHeight)
    // if (!mountRef.current) {return;}
    // mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 5
    // camera.position.set(100, 0, 1000)
    light.position.set(0, 1, 2)
    scene.add(light)
    let canvas = document.body.appendChild(renderer.domElement)


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.LineBasicMaterial({color: 0x00ff00,side:THREE.DoubleSide,
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00, side: THREE.DoubleSide,
        // map: new THREE.TextureLoader().load('./texture.png')//or
        map: THREE.ImageUtils.loadTexture('/bgImage.jpg')
    })
    // material.map = new THREE.TextureLoader().load('./bgImage.jpg')
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = -3
    cube.position.y = 3
    cube.castShadow = true
    scene.add( cube );

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    loader.setDRACOLoader(dracoLoader);

    //22.02
    let mouse = {
        x: undefined,
        y: undefined
    }
    const raycaster = new THREE.Raycaster()

   canvas.onmousemove = function (e){
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        camera.position.x = mouse.x
        camera.position.y = mouse.y

    }
    // let mouse = new THREE.Vector2()
    // // function handleMouseMove(e) {mouse.x = e.pageX, mouse.y = e.pageY}


    loader.load(
        // resource URL
        './bread.glb',
        // //called when the resource is loaded
        (gltf) => {
            let newImg = gltf.scene
            newImg.scale.set(15, 15, 15)
            scene.add(newImg);

            // gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scene; // THREE.Group
            // gltf.scenes; // Array<THREE.Group>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object
        },
        // called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            // console.log('An error happened');
            console.log(error);
        })
    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        cube.rotation.x += 0.01
        // if (mouse.x !== undefined) {
        //     raycaster.setFromCamera(mouse, camera)
        //     const intersection = raycaster.intersectObject()
        //     console.log('intersection', intersection);
        // }
    };
    animate();

    return (
        <>
            <p>mouse move</p>
            {/*<div id='SomeObj' className='SomeObj' ref={mountRef}/>*/}
            <div id='SomeObj' className='SomeObj' />

        </>
    )
}

export default SomeObj
