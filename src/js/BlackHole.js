import React, { Component } from 'react';
import * as THREE from 'three';
import WEBGL from '../vendor/webgl';
import CoordinateTranslator from '../vendor/coordinateTranslator';

const OrbitControls = require('three-orbit-controls')(THREE);

let camera, renderer, scene, pivotPoint;

class BlackHole extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      mouseX: 0,
      mouseY: 0
    }

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount () {
    // Update scene width/height on window resize
    window.addEventListener('resize', this.onWindowResize, false);
    
    // Initialize three.js scene
    this.init();
    document.addEventListener('mousemove', this.onMouseMove, false);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('mousemove', this.onMouseMove, false);
  }

  init() {
    this.initRenderer();
    this.initScene();
    this.initLighting();
    this.initObjects();
    this.initAnimation();
  }

  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove( event) {
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    let mouseX = ( event.clientX - windowHalfX );
    let mouseY = ( event.clientY - windowHalfY );

    this.setState({ mouseX, mouseY });
  }

  initRenderer() {
    //---- Renderer ----//
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    document.getElementById('blackHole').appendChild(renderer.domElement);
  }

  initScene() {
    //---- Scene ----//
    scene = new THREE.Scene();

    //---- Camera ----//
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 1, 10000 ); //FOV, Aspect Ratio, Near, Far

    camera.position.x = 300;
    camera.position.y = 400;
    camera.position.z = 1000;

    camera.lookAt(scene.position);

    //---- Controls ----//
    // Allows click + drag/ zoom
    new OrbitControls( camera, renderer.domElement );
  }

  initCameraMove() {
    camera.position.x += ( this.state.mouseX - camera.position.x ) * .05;
    camera.position.y += ( - ( this.state.mouseY - 200 ) - camera.position.y ) * .05;
  }

  initLighting() {
    let lights = [];
    lights[0] = new THREE.DirectionalLight( 0x69140E, 1 );
    lights[0].position.set( 0, 400, 0 );
    lights[1] = new THREE.DirectionalLight( 0xE8D058, 1 );
    lights[1].position.set( 0.75, 0, 0 );
    lights[2] = new THREE.DirectionalLight( 0xA44200, 1 );
    lights[2].position.set( 1, 100, 0 );
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

      // this.initCameraMove();

      // Animating particles
      pivotPoint.rotation.y += 0.008;

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
    //---- Main sphere ----//
    const geometry = new THREE.SphereBufferGeometry(100, 30, 30);
    const material = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF
    });
    // Sphere mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    // Makes sphere pivot point
    pivotPoint = new THREE.Object3D();
    mesh.add(pivotPoint);

    //---- Drawing Particles ----//
    const particleGeom = new THREE.OctahedronBufferGeometry(10, 0);
    const particleMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });

    for(let _i = 0; _i < 1000; _i++){
      // Adding mesh to particles
      let particleMesh = new THREE.Mesh(particleGeom, particleMat);
      particleMesh.position.multiplyScalar(10 + Math.random() * 60);

      // Positioning particles around sphere
      let _coords = (new CoordinateTranslator()).fromSpherical((Math.random() + 1.5) * 150,Math.PI, 1*_i);
      particleMesh.position.set(_coords.x, _coords.y, _coords.z);
      pivotPoint.add(particleMesh);
    }
  }

  render() {
    return (
      <div id='blackHole'>
      </div>
    )
  }
};

export default BlackHole;