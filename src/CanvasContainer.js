import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {MixOperation} from "three";


function CanvasContainer() {
    const mountRef = useRef(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(10, 1, .5)
    scene.add(light)
    const light1 = new THREE.HemisphereLight(0x404040, 0xFFFFFF, 10);
    light1.position.set(1, 3, 2)
    scene.add(light1);

    //Sphere
    const geometryS = new THREE.SphereGeometry(50, 100, 100);
    const materialS = new THREE.MeshBasicMaterial({
        color: 0x042f24,
        fog: true,
        envMapIntensity: 5.0,
        // envMap(refraction),
        depthTest: true,
        alphaTest: 0.39,
        visible: true,
        side: THREE.FrontSide,
        combine: THREE.MixOperation,
        // combine:someCombine,
        reflectivity: 0.604,
        refractionRatio: .533,
    });
    // const materialS = new THREE.MeshBasicMaterial({color: 0x44aa88});
    //https://www.youtube.com/watch?v=ngGQD7mIEok&ab_channel=%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%D0%9B%D0%B0%D0%B2%D1%80%D0%B8%D0%BA
    //8:22
    // const materialS = new THREE.MeshBasicMaterial({color: 0x00ff00,vertexColors: THREE.FaceColors });
    // for (let i = 0; i < geometryS.faces.length; i++) {
    //     geometryS.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
    // }
    const mesh = new THREE.Mesh(geometryS, materialS);
    // const mesh = new THREE.Mesh(geometryS,gg);
    scene.add(mesh)

    //cube
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function makeInstance(geometry, color, pos) {
        const material1 = new THREE.MeshStandardMaterial({
            color: 0x3a3d14,
            emissive: 0xcc2828,
            roughness: 0,
            metalness: 0.525,
        })
        // material1.metalness = 0.7
        // const material1 = new THREE.MeshBasicMaterial({
        //     side:THREE.DoubleSide,
        //     flatShading:THREE.FlatShading,
        //     // vertexColors:true,
        // })
        // const material = new THREE.MeshPhongMaterial({color});
        // const geometry1 = new THREE.TorusKnotGeometry({radius:15, tube:1.485,tubularSegments:158,radialSegments:18,p:8,q:5})
        const geometry1 = new THREE.TorusKnotGeometry(30, 1.485, 158, 18, 8, 5)
        const newItem = new THREE.Mesh(geometry1, material1);
        scene.add(newItem);
        newItem.position.set(pos.x, pos.y, pos.z)

        return newItem;
    }

    const addNew = (e) => {
        e.preventDefault();
        // let mouse = new THREE.Vector2()
        // mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
        let vec = new THREE.Vector3(); // create once and reuse
        let pos = new THREE.Vector3(); // create once and reuse

        vec.set(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1,
            0.5);

        vec.unproject(camera);

        vec.sub(camera.position).normalize();
        let distance = -camera.position.z / vec.z;
        pos.copy(camera.position).add(vec.multiplyScalar(distance));
        // console.log("x: " + pos.x + ", y: " + pos.y, 'z', pos.z, pos);
        makeInstance(geometry, 0x44aa88, pos)
    }

    useEffect(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(devicePixelRatio)
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        if (!mountRef.current) return;
        // this.mount.appendChild(renderer.domElement);
        mountRef.current.appendChild(renderer.domElement);
        // camera.position.z = 5;
        camera.position.set(100, 0, 500)
        const light = new THREE.AmbientLight(0xffffff)
        scene.add(light)

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

            mesh.position.x += 0.1
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);

            //if dont use useEffect, i cen use
            //requestAnimationFrame(function (){animate()})
        };
        animate();
    }, [])


    return <>
        <p>Click on canvas</p>
        <div className='CanvasContainer' ref={mountRef}
             onClick={(e) => {addNew(e)}}/>
    </>
}

export default CanvasContainer
