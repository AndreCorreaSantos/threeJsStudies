export const boxFragmentShader = `
uniform vec3 light;
uniform vec3 color;
varying vec2 vUv;
varying vec3 v_normal;

float ambient = 0.1;
float cosTheta;
void main() {

  cosTheta = dot(v_normal,light)+ambient;
  gl_FragColor = vec4(color*cosTheta,1.0 );

}`