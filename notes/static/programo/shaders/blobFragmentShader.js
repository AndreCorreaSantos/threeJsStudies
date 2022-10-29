// var reader = new FileReader();
// export const blobVertexShader = reader.readAsText("./blobFragmentShader.glsl");
export const blobFragmentShader = `
uniform vec3 light;
uniform vec3 color;
uniform vec3 camera;
uniform float lightDistance;
uniform float Ls;
uniform float shininess;
varying vec2 vUv;
varying float noise;
varying vec3 v_normal;

vec3 lightDir;
float ambient = 0.1;
const vec3 specColor = vec3(1.0, 1.0, 1.0);


void main() {
  float Lc = 10.0/lightDistance;
  lightDir = normalize(light);
  float lambertian = max(dot(v_normal, lightDir), 0.0);
  vec3 halfDir = normalize(lightDir + light);
  float specAngle = max(dot(halfDir, v_normal), 0.0);
  float specular = pow(specAngle, shininess);
  float dist = 10.0/lightDistance;
  gl_FragColor = vec4(lambertian*Lc+specular*specColor*Ls+ambient,1.0 );

}`