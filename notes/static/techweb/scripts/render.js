import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import dat from "https://cdn.skypack.dev/dat.gui";
import {vertexShader} from "../shaders/vertexShader.js"
import {fragmentShader} from "../shaders/fragmentShader.js"

class user{
  constructor(){
    this.vertex = 1;
    this.fragment = 1;
    this.detail = 120;
    this.earth1 = false;
    this.mars = false;
    this.earth2 = false;
  }
}

var container, //first -- wrap texture, then change some texture colors in fragment shader
  renderer,
  scene,
  camera,
  mesh,
  start = Date.now(),
  material,
  controls,
  input,
  detail,
  fov = 30;

window.addEventListener( 'load', function() {

  // grab the container from the DOM
  container = document.getElementById( "container" );

  // create a scene
  scene = new THREE.Scene();

  // create a camera the size of the browser window
  // and place it 100 units away, looking towards the center of the scene
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;


  const gui = new dat.GUI()


  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');

  const earthTexture = loader.load( '/static/techweb/images/earth.png' );
  const marsTexture = loader.load( '/static/techweb/images/mars.jpg' );
  const earthTexture2 = loader.load('/static/techweb/images/earth2.png');

  const uniforms = {
    texture1:{value:earthTexture},
    scale:{value:3.2}
  };

  // create a wireframe material
  input = new user();

  material = new THREE.ShaderMaterial( {
    uniforms:uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  } );

  // create a sphere and assign the material
  mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, input.detail),
    material
  );
  console.log(mesh);
  
  var toggle1 = gui.add(input,"earth1").name("earth height map");
  var toggle2 = gui.add(input,"earth2").name("earth bump map");
  var toggle3 = gui.add(input,"mars").name("mars height map");

  var slider1 = gui.add(mesh.material.uniforms.scale,"value",1,10).name("scale");
  toggle1.listen().onChange(function(){input.earth2 = false;input.mars=false;mesh.material.uniforms.texture1.value = loader.load( '/static/earth.png' );});
  toggle2.listen().onChange(function(){input.earth1 = false;input.mars=false;mesh.material.uniforms.texture1.value = loader.load( '/static/earth2.png' );});
  toggle3.listen().onChange(function(){input.earth2 = false;input.earth1=false;mesh.material.uniforms.texture1.value = loader.load( '/static/mars.jpg' );});
  scene.add( mesh );

  // create the renderer and attach it to the DOM

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );
  controls = new OrbitControls( camera, renderer.domElement );
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05; 
  render();
} );

function render() {

  // let there be light
  controls.update();
  renderer.render( scene, camera );
  // console.log(input);
  // mesh.material.needsUpdate = true;
  // mesh.rotation.x += 0.01;
  // controls.update();

  requestAnimationFrame( render );

}