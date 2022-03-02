import * as THREE from 'three'

export class Setup {
    constructor(){
        // DISABLE RIGHT CLICK

        document.addEventListener('contextmenu', event => event.preventDefault(), false);

        // SCENE SETUP

        var scene = new THREE.Scene({ antialias: true });
        scene.background = new THREE.Color(0xDAD3FF);

        // CAMERA SETUP

        // var camera = new CustomCamera(39, window.innerWidth / window.innerHeight, 0.25, 2000);
        var camera = new THREE.PerspectiveCamera(39, window.innerWidth / window.innerHeight, 0.25, 2000);
        camera.position.set(0,0,13);

        // MOUSE SETUP

        var mouse = new THREE.Vector2();

        // RENDERER SETUP

        var renderer = new THREE.WebGLRenderer({antialias: true});

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        const container = document.createElement( 'div' );
        document.body.appendChild( container );
        container.appendChild( renderer.domElement );

        // RESIZE

        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }

        // Add to instance

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.mouse = mouse;

        if (!Setup._instance) {
            Setup._instance = this;
        }

        return Setup._instance; 
    }
    
}

var setup = new Setup();

export {setup}











