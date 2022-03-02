import './style.css'
import * as THREE from 'three'

import vertShader from "./shaders/vertShader.glsl"
import fragShader from "./shaders/fragShader.glsl"

import {setup} from "./setup"
import {mouseController} from "./mouseController"
import {setupText} from "./TextSetup"
import {cardController} from "./cardController"


function main() {

    var { scene, camera, renderer, mouse } = setup;

    setupText();

    console.log(scene);

    // RENDER LOOP

    function render(time)
    {   
        cardController.update();
        renderer.render(scene,camera);
        requestAnimationFrame ( render );
    }

    requestAnimationFrame ( render );

}

main();




