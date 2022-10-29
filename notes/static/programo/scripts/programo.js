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
  const x_dir = 10.0;
  const y_dir = 10.0;
  const z_dir = 10.0;
  var lightPos = [x_dir,y_dir,z_dir];
  cameraVector = new THREE.Vector3( 0, 0, - 1 );
  cameraVector.applyQuaternion( camera.quaternion );

  blobMaterial = new THREE.ShaderMaterial( {

    uniforms: {
      time: {
        type: "f",
        value: 0.0
      },
      lightPos:{
        value:lightPos
      },
      color:{
        value:[245.0/255.0,110.0/255.0,2.0/255.0]
      },
      camera:{
        value:[0,0,0]
      },
      lightDistance:{
        value:10.0
      },
      Ls:{
        value:0.0
      },
      shininess:{
        value:0
      }

    },
    vertexShader: blobVertexShader,
    fragmentShader: blobFragmentShader,
  } );

  boxMaterial = new THREE.ShaderMaterial( {

    uniforms: {
      light:{
        value:lightPos
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

  box = new THREE.Mesh(
    new THREE.BoxGeometry(500,500,500,1,1,1),
    boxMaterial
  );

  var width = 2.0;
  var height = 200.0;

  const gui = new dat.GUI();
  gui.add(blob.material.uniforms.lightPos.value,"0",-100,100);
  gui.add(blob.material.uniforms.lightPos.value,"1",-100,100);
  gui.add(blob.material.uniforms.lightPos.value,"2",-100,100);
  gui.add(blobMaterial.uniforms['lightDistance'],"value",0.0,100.0).name("lightDistance");
  gui.add(blobMaterial.uniforms['Ls'],"value",0.0,1.0).name("Ls");
  gui.add(blobMaterial.uniforms['shininess'],"value",0.0,1000.0).name("shininess");


  
  scene.add( blob );
  scene.add(box);

  // create the renderer and attach it to the DOM
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor( 0xffffff, 0);

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
  cameraDir = camera.getWorldDirection(new THREE.Vector3(0,0,0));
  blobMaterial.uniforms['camera'].value = cameraDir;
  blobMaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  
  // console.log(worldDir);
  renderer.render( scene, camera );
  requestAnimationFrame( render );

}