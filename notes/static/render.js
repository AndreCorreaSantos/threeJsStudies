
var container, //first -- wrap texture, then change some texture colors in fragment shader
  renderer,
  scene,
  camera,
  mesh,
  start = Date.now(),
  controls,
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


  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');

  const texture = loader.load( '/static/world.png' );

  const uniforms = {
    texture1:{value:texture}
  };

  // create a wireframe material
  material = new THREE.ShaderMaterial( {
    uniforms:uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );

  // create a sphere and assign the material
  mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, 6 ),
    material
  );
  scene.add( mesh );

  // create the renderer and attach it to the DOM
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  render();
  controls = new OrbitControls( camera, renderer.domElement );

} );

function render() {

  // let there be light
  renderer.render( scene, camera );
  // mesh.rotation.x += 0.01;
  requestAnimationFrame( render );

}