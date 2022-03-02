import * as THREE from 'three'
import {setup} from "./setup"

// persistent mouse position

export class CardController {
    constructor(){
        this.mouse = setup.mouse;
        this.rotationTarget = new THREE.Vector2();
        this.currRotation = new THREE.Vector2();
        this.stepScale = 0.05;
        this.targetScale = 0.5;
        this.cards = [];
    }

    subscribe(card) {
        this.cards.push(card);
    }

    updateRotation(){
        this.rotationTarget.set(this.mouse.x,this.mouse.y);
        var rotationDiff = this.rotationTarget.clone().multiplyScalar(this.targetScale).sub(this.currRotation);
        var step = rotationDiff.multiplyScalar(this.stepScale);
        this.currRotation.add(step);

    }

    update() {
        this.updateRotation();
        this.cards.forEach((card)=>{
            card.rotation.set(this.currRotation.y,this.currRotation.x,0.);
        });
    }
}

var cardController = new CardController();

export {cardController}