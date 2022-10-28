import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import dat from "https://cdn.skypack.dev/dat.gui";
import { blobFragmentShader } from '../shaders/blobFragmentShader.js';
import { blobVertexShader } from '../shaders/blobVertexShader.js';
import { boxFragmentShader } from '../shaders/boxFragmentShader.js';
import { boxVertexShader } from '../shaders/boxVertexShader.js';

var container,
  renderer,
  scene,
  camera,
  blob,
  blob2,
  blobMaterial,
  blob2Material,
  box,
  boxMaterial,
  controls,
  start = Date.now(),
  cameraDir,
  cameraVector,
  fov = 30;

window.addEventListener( 'load', function() {

  // grab the container from the DOM
  container = document.getElementById( "container" );

  // create a scene
  scene = new THREE.Scene();
  console.log(blobFragmentShader);
  // create a camera the size of the browser window
  // and place it 100 units away, looking towards the center of the scene
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;

  // create a wireframe material
  const x_dir = 1.0;
  const y_dir = -1.0;
  const z_dir = -1.0;
  var lightDir = [x_dir,y_dir,z_dir];
  cameraVector = new THREE.Vector3( 0, 0, - 1 );
  cameraVector.applyQuaternion( camera.quaternion );

  blobMaterial = new THREE.ShaderMaterial( {

    uniforms: {
      time: {
        type: "f",
        value: 0.0
      },
      light:{
        value:lightDir
      },
      color:{
        value:[]
      },
      camera:{
        value:[0,0,0]
      },
      lightDistance:{
        value:10.0
      }
    },
    vertexShader: blobVertexShader,
    fragmentShader: blobFragmentShader,
  } );

  blob2Material = new THREE.ShaderMaterial( {

    uniforms: {
      time: {
        type: "f",
        value: 0.0
      },
      light:{
        value:lightDir
      },
      color:{
        value:[]
      }
    },
    vertexShader: blobVertexShader,
    fragmentShader: blobFragmentShader,
  } );

  boxMaterial = new THREE.ShaderMaterial( {

    uniforms: {
      light:{
        value:lightDir
      },
      color:{
        value:[]
      }
    },
    vertexShader: boxVertexShader,
    fragmentShader: boxFragmentShader,
  } );


  // create a sphere and assign the material
  blob = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, 120 ),
    blobMaterial
  );
  var colorBlob = [229.0/255.0,118.0/255.0,46.0/255.0];
  blob.material.uniforms.color.value = colorBlob;

  blob2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, 120 ),
    blob2Material
  );
  var colorBlob2 = [1,1,1];
  blob2.material.uniforms.color.value = colorBlob2;

  box = new THREE.Mesh(
    new THREE.BoxGeometry(500,500,500,1,1,1),
    boxMaterial
  );

  var width = 2.0;
  var height = 200.0;

  const gui = new dat.GUI();
  gui.add(blob.material.uniforms.light.value,"0",-1,1);
  gui.add(blob.material.uniforms.light.value,"1",-1,1);
  gui.add(blob.material.uniforms.light.value,"2",-1,1);
  
  gui.add(colorBlob2,"0",0,1);
  gui.add(colorBlob2,"1",0,1);
  gui.add(colorBlob2,"2",0,1);
  gui.add(blobMaterial.uniforms['lightDistance'],"value",0.0,100.0);

  
  scene.add( blob );
  scene.add(blob2);
  scene.add(box);

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
  blob2.position.x += 50;

  render();

} );

function render() {

  // let there be light
  let worldDir = [0,0,0];
  worldDir = camera.getWorldDirection(new THREE.Vector3(0,0,0));
  blobMaterial.uniforms['camera'].value = worldDir;
  blobMaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );

  blob2Material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start);

  // console.log(worldDir);
  renderer.render( scene, camera );
  requestAnimationFrame( render );

}