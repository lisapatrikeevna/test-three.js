import './App.css'
import react from 'react'
import CanvasContainer from "./CanvasContainer";
import ThreeContainer from "./threeContainer";
import Test from "./2test";
import AnimateObj from "./objAnimate";
import React from "react";
import SomeObj from "./obj";

function App() {

    return (
        <div className="App">
            <div className='scene2'/>
            <div className="exampleScene">
                {/*<ThreeContainer/>*/}

                <CanvasContainer/>
                <Test/>
                <AnimateObj/>
                <SomeObj/>
            </div>
        </div>
    );
}

export default App;
