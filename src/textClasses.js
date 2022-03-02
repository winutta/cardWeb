import {Text} from 'troika-three-text'
import * as THREE from 'three'

import { setup } from "./setup.js"
import { cardController } from './cardController.js';

// import {getRandomCol} from "./utils"

const glslify = require('glslify');

import popoutFrag from "./shaders/popoutFrag.glsl"
import popoutVert from "./shaders/popoutVert.glsl"

const fragmentShader = glslify(popoutFrag);
const vertexShader = glslify(popoutVert);


export class BaseText extends THREE.Group {
	constructor(text,position){
		super();
		// console.log("added");
		this.position.copy(new THREE.Vector3(...position));
		this.Text = new Text();
		this.Text.textObj = this;
		cardController.subscribe(this);
		this.setText(text);
	}

	setText(text) {
		this.Text.color = "white"
		this.Text.text = text;
		this.Text.maxWidth = 14.;
		this.Text.fontSize = 0.25;
		this.Text.lineHeight = 1.5;
		this.Text.textAlign = "left";
		this.Text.position.set(0., 0., 0.01);
		this.Text.anchorX = "center";
		this.Text.anchorY = "50%";
		// this.Text.font = "DancingScript-Regular.ttf"
		this.Text.font = "ArimaMadurai-Regular.ttf"
		this.Text.letterSpacing = 0.1
		this.Text.textInset = 0.4;
		this.Text.outlineWidth = "5%"
	}

	onLoad() {
		this.Text.sync(() => {
			if (this.callBack){this.callBack();} 
			this.add(this.Background);
			this.add(this.Text);
			setup.scene.add(this);
			console.log("added");
		});

		var bg = this.Background;

		const loader = new THREE.TextureLoader();
		loader.load(
			// resource URL
			'monarch1.png',

			// onLoad callback
			function (texture) {
				console.log("texture", texture);
				bg.material.uniforms.butterfly.value = texture;
			},
			// onError callback
			function (err) {
				console.error('An error happened.');
			}
		);

		loader.load(
			// resource URL
			'ink.jpg',

			// onLoad callback
			function (texture) {
				console.log("texture", texture);
				bg.material.uniforms.bgPattern.value = texture;
			},
			// onError callback
			function (err) {
				console.error('An error happened.');
			}
		);
		

	}

	faceDirection = function (direction) {
		var directionTarget = this.getWorldPosition(new THREE.Vector3()).add(direction);
		this.lookAt(directionTarget);
	}

}

export class SquareText extends BaseText {
	constructor(text, position = [0, 0, 0]) {
		// console.log("added");
		super(text,position);
		this.Background = this.generateBackground();
		this.Background.textObj = this;
		this.kind = "popout";
		
		this.onLoad.call(this);
	}

	generateBackground() {
		var geometry = new THREE.PlaneGeometry(1, 1);
		// var col = getRandomCol();
		// var material = new THREE.MeshBasicMaterial({ color: "black" });
		var material = new THREE.ShaderMaterial({
			uniforms: {
				iTime: { value: 0 },
				size: {value: new THREE.Vector3(1.,1.,1.)},
				glintOn: { value: 1 },
				butterfly: {type: "t", value: null},
				bgPattern: { type: "t", value: null }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			// vertexShader: popoutVert,
			// fragmentShader: popoutFrag,
			transparent: true
		});
		return new THREE.Mesh(geometry, material);
	}

	sizeBackground() {
		var { min, max } = this.Text.geometry.boundingBox;
		var heightText = max.y - min.y;
		var widthText = max.x - min.x;
		this.Background.scale.set(widthText + 2 * this.Text.textInset, heightText + 2 * this.Text.textInset, 1.);
		if(this.Background.material.uniforms){
			this.Background.material.uniforms.size.value = this.Background.scale.clone();
		}
		// this.Background.material.uniforms.size.value = this.Background.scale.clone();
		// console.log(this.Background.material.uniforms);
	}

	callBack(){
		this.sizeBackground();
	}
}




export class CircleText extends BaseText {
	constructor(text, position = [0,0,0]){
		super(text,position);
		this.Background = this.generateBackground();
		this.Background.textObj = this;
		this.kind = "button";
		this.onLoad.call(this);
	}

	generateBackground() {
		var geometry = new THREE.CircleGeometry(.25, 32);
		var material = new THREE.MeshBasicMaterial({ color: "black" });
		return new THREE.Mesh(geometry, material);
	}

}

