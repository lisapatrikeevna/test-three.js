import React from 'react';
import * as THREE from "three";


const Test = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    // const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight)
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(devicePixelRatio)
    scene.basckround = new THREE.Color(0x000ff1)
    document.body.appendChild(renderer.domElement)
    camera.position.z = 4

    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    const points = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(1, 0),
        // new THREE.Vector3(4,4,4),
    ]
    const material = new THREE.LineBasicMaterial({color: 0x00ff00})
    const geometryLine = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometryLine, material)
    scene.add(line)

    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );


    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        cube.rotation.x += 0.01
        line.rotation.y -= 1
    }
    animate();

    return <div></div>

};

export default Test;
