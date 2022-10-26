export const fragmentShader = `
uniform sampler2D texture1;
varying vec2 vUv;

void main() {

  // colour is RGBA: u, v, 0, 1
  vec4 color1 = texture(texture1, vUv);
  vec4 color2 = vec4( vec3( vUv, 0. ), 1. );
  gl_FragColor = color1; //mix(color1,color2,vUv.x);

}`