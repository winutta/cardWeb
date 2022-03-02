import * as THREE from 'three'
import {setup} from "./setup"
// persistent mouse position

export class MouseController {
    constructor(){
        this.mouse = setup.mouse;
        window.addEventListener("mousemove", this, false);


    }

    handleEvent(event) {
        console.log("mousemove event fired");
        if (event.type == "mousemove") {
            this.onMouseMove(event);
        } else if (event.type == "click") {
           
        }
    }
    
    onMouseMove = function (event) {
        console.log("mouseUpdated");
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        //May need to add a x,y normalization.
        // console.log(this.mouse.x, this.mouse.y);
    }
}

var mouseController = new MouseController();

export {mouseController}