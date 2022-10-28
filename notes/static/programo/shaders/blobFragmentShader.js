export const blobFragmentShader = `
uniform vec3 light;
uniform vec3 color;
uniform vec3 camera;
varying vec2 vUv;
varying float noise;
varying vec3 v_normal;

float ambient = 0.1;
float cosTheta;
void main() {
  float lambertian = max(dot(v_normal, light), 0.0);
  cosTheta = dot(v_normal,light)+ambient;
  gl_FragColor = vec4(color*cosTheta,1.0 );

}`