import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

//28.50
function AnimateObj() {
    let container1
    let container2
    let cam1
    let cam2
    let renderer1
    let renderer2
    let scene1
    let scene2
    // let [house,setHouse]=useState()
    let house
    let shiba

    let ref1 = useRef(null)
    useEffect(() => {
        // if(!ref1.current){
        //     return
        // }else {
        container1 = ref1
        houseShowe()
        // }
    }, [])

    function houseShowe() {
        renderer1 = new THREE.WebGLRenderer({antialias: true, alpha: true});
        container1.current.appendChild(renderer1.domElement)

        scene1 = new THREE.Scene();
        cam1 = new THREE.PerspectiveCamera(50, container1.current.clientWidth / container1.current.clientHeight, 0.1, 1000);
        const ambient = new THREE.AmbientLight(0x404040, 2)
        const light = new THREE.DirectionalLight(0xffffff, 2)
        //34.57
        cam1.position.set(100, 0, 1000)
        light.position.set(50, 50, 100)

        scene1.add(ambient, light)
        renderer1.setSize(container1.current.clientWidth, container1.current.clientHeight)
        renderer1.setPixelRatio(devicePixelRatio)

        let loader = new GLTFLoader()
        loader.load('./CartoonTavern.glb', function (gltf) {
            scene1.add(gltf.scene)
            house = gltf.scene.children[0]
            house.scale.set(40,40,40)
            animate1()
        })
        // house.scale.set(2,2,2)
    }

    // function shibaShowe() {
    //     container2 = document.getElementById('scene2')
    //     scene2 = new THREE.Scene();
    //     cam2 = new THREE.PerspectiveCamera(25, container2.clientWidth / container2.clientHeight, 0.1, 2000);
    //     const ambient = new THREE.AmbientLight(0x404040, 2)
    //     const light = new THREE.DirectionalLight(0xffffff, 2)
    //     //34.57
    //     cam2.position.set(100, 0, 1000)
    //     light.position.set(50, 50, 100)
    //
    //     scene2.add(ambient, light)
    //     renderer2 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    //     renderer2.setSize(container2.clientWidth, container2.clientHeight)
    //     renderer2.setPixelRatio(devicePixelRatio)
    //
    //     container2.appendChild(renderer2.domElement)

    //     let loader = new GLTFLoader()
    //     loader.load('./shiba/scene.gltf', function (gltf) {
    //         scene1.add(gltf.scene)
    //         shiba = gltf.scene.children[0]
    //         animate2()
    //     })
    // }

    function animate1() {
        requestAnimationFrame(animate1);
        house.rotation.y += 0.005
        renderer1.render(scene1, cam1);
    }

    // let loader = new GLTFLoader()
    // loader.load('./assets/shiba/scene.gltf', function (gltf) {
    //     scene1.add(gltf.scene)
    //     house = gltf.scene.children[0]
    //     animate1()
    // })

    // function animate2() {
    //     requestAnimationFrame(animate2);
    //     shiba.rotation.z += 0.005
    //     renderer2.render(scene1, cam1);
    // }

    // const mountRef = useRef(null);
    // const plane = new THREE.PlaneGeometry(3, 3, 5, 5)
//22.02
//     const mouse = {
//         x: undefined,
//         y: undefined
//     }
//     const raycaster = new THREE.Raycaster()
//     useEffect(() => {
//         if (!mountRef.current) {
//             return;
//         }
//         // mountRef.current.appendChild(renderer.domElement);
//         // camera.position.z = 5;
//         // const loader = new GLTFLoader();
//         // // loader.load( 'path/to/model.glb', function ( gltf ) {
//         // loader.load({t}, function (gltf) {
//         //     scene.add(gltf.scene);
//         // }, undefined, function (error) {
//         //     console.error(error);
//         // });
//
//         const animate = () => {
//             raycaster.setFromCamera(mouse, camera)
//         };
//         // useEffect( ()=>{
//         animate();
//     }, [])

    // houseShowe()
    // shibaShowe()

    return (<>
            <div className='scene1' id='scene1' ref={ref1}/>
            {/*<div className='scene2'/>*/}
            <p>text</p>
        </>
    )
}

export default AnimateObj
