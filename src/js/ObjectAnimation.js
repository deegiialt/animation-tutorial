import React, { Component } from 'react';
import TweenMax, { Expo, Linear } from 'gsap/TweenMax';
import * as THREE from 'three';
import WEBGL from '../vendor/webgl';

import Loader from './Loader';

// Three.js plugins
const OrbitControls = require('three-orbit-controls')(THREE);
const OBJLoader = require('../vendor/objLoader')(THREE);

let camera, renderer, scene, loaded;

class ObjectAnimation extends Component {

  // constructor(props) {
  //   super(props)
  // }

  componentDidMount () {
    // Update scene width/height on window resize
    window.addEventListener('resize', this.onWindowResize, false);
    
    // Initialize three.js scene
    this.init();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize);
  }

  init() {
    this.initRenderer();
    this.initScene();
    this.initLighting();
    this.initObjects();
    this.initAnimation();
  };

  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  initRenderer() {
    //---- Renderer ----//
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    document.getElementById('objectAnimation').appendChild(renderer.domElement);
  };

  initScene() {
    //---- Scene ----//
    scene = new THREE.Scene();

    //---- Camera ----//
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 1, 2000 ); //FOV, Aspect Ratio, Near, Far

    camera.position.x = 200;
    camera.position.z = 2000;

    camera.lookAt(scene.position);

    //---- Controls ----//
    // Allows click + drag/ zoom
    new OrbitControls( camera, renderer.domElement );
  }

  initLighting() {
    // Init Lighting
    // const ambientLight = new THREE.AmbientLight(0x999999);
    // const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(ambientLight);

    let lights = [];
    lights[0] = new THREE.DirectionalLight( 0x69140E, 1 );
    lights[0].position.set( 0, 400, 0 );
    lights[1] = new THREE.DirectionalLight( 0xE8D058, 1 );
    lights[1].position.set( 0.75, 0, 0 );
    lights[2] = new THREE.DirectionalLight( 0xA44200, 1 );
    lights[2].position.set( 1, 0.75, 0 );
    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );
  }

  renderScene() {
    renderer.render( scene, camera );
  };


  initAnimation() {
    let animate = () => {
      requestAnimationFrame( animate );

      this.renderScene();  
    };

    // If Webgl available, initialize animation
    if ( WEBGL.isWebGLAvailable() ) {
      animate();
    } else {
      var warning = WEBGL.getWebGLErrorMessage();
      document.getElementById( 'three' ).appendChild( warning );
    }
  }

  initObjects() {
    // Uses OBJLoader to map 3D object and render when loaded
    let loader = new OBJLoader();

    loader.load(
      'assets/objects/aventSport.obj',
      function(object) {
        // Scaling/rotating/adding initial object
        object.rotation.y = 1.2;
        object.rotation.x = 0.4;
        object.position.x = 70;
        object.position.y = 400;
        object.scale.x = object.scale.y = object.scale.z = 30;

        scene.add(object);

        // Rotates 3D object on a loop
        TweenMax.to(object.position, 10, {
          repeat: -1,
          ease: Expo.easeOut,
          z: 1600,
          x: 300,
          y: -80          
        })

        TweenMax.to(object.rotation, 50, {
          ease: Linear.easeNone,
          y: 3,
        })

        // Random spinning
        // TweenMax.to(object.position, 5, {
        //   repeat: -1,
        //   ease: Linear.easeNone,
        //   z: 1000,
        //   x: -400,
        //   y: -100
        // })
        // TweenMax.to(object.rotation, 50, {
        //   repeat: -1,
        //   ease: Linear.easeNone,
        //   y: -10,
        //   // x: 200
        // })
      },
      // called when loading is in progresses
      function ( xhr ) {
        // console.log( ` 3D Object loaded: ${( xhr.loaded / xhr.total * 100 )}` );
        loaded = (xhr.loaded / xhr.total * 100);
      },
      // called when loading has errors
      function ( error ) {
        console.log( error );
      }
    );
  }

  render() {
    return (
      <div id='objectAnimation'>
        <Loader 
          percentLoaded={loaded}
        />
      </div>
    )
  }
};

export default ObjectAnimation;
