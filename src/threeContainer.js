import {useRef, useEffect, useState} from "react";
import Three from "./Three";
// import * as THREE from './js/three.module.js'



// Размеры сцены и квадрата
const sceneSizes = {width: 800, height: 500};
const rectSizes = {width: 200, height: 200};

const ThreeContainer = () => {
    const threeRef = useRef(); // Используется для обращения к контейнеру для canvas
    const three = useRef(); // Служит для определения, создан ли объект, чтобы не создавать повторный
    const [color, colorChange] = useState("blue"); // Состояние отвечает за цвет квадрата

    // Handler служит для того, чтобы изменить цвет
    const colorChangeHandler = () => {
        // Просто поочерёдно меняем цвет с серого на синий и с синего на серый
        colorChange((prevColor) => (prevColor === "grey" ? "blue" : "grey"));
    };

    // Создание объекта класса Three, предназначенного для работы с three.js
    useEffect(() => {
        // Если объект класса "Three" ещё не создан, то попадаем внутрь
        if (!three.current) {
            // Создание объекта класса "Three", который будет использован для работы с three.js
            three.current = new Three({
                color,
                rectSizes,
                sceneSizes,
                colorChangeHandler,
                canvasContainer: threeRef.current,
            });
        }
    }, [color]);

    // при смене цвета вызывается метод объекта класса Three
    useEffect(() => {
        if (three.current) {
            // Запускаем метод, который изменяет в цвет квадрата
            three.current.rectColorChange(color);
        }
    }, [color]);

    // Данный узел будет контейнером для canvas (который создаст three.js)
    return <div className="container" ref={threeRef} />;
};

export default ThreeContainer;
