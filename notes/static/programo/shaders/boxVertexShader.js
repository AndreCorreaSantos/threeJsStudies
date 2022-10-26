export const boxVertexShader = `
varying vec2 vUv;
varying vec3 v_normal;
void main() {

vUv = uv;
v_normal = normal;
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`