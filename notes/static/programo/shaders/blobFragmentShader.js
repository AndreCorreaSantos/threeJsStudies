// var reader = new FileReader();
// export const blobVertexShader = reader.readAsText("./blobFragmentShader.glsl");
export const blobFragmentShader = `
uniform vec3 light;
uniform vec3 color;
uniform vec3 viewPos;
uniform vec3 viewDir;

uniform float lightDistance;
uniform float Ls;
uniform float shininess;
uniform vec3 lightPos;

varying vec2 vUv;
varying float noise;
varying vec3 v_normal;
varying vec3 FragPos;

float ambient = 0.3;
const vec3 specColor = vec3(252./255.0, 252./255.0, 252./255.0);

float spec = 0.0;
void main() {
  // vec3 lightPos2 = normalize(lightPos);
  vec3 lightDir   = normalize(lightPos - FragPos);
  float lamb = max(dot(lightDir, v_normal), 0.0);
  vec3 lambertian = (lamb+ambient)*color;

  vec3 viewDir    = normalize(viewPos - FragPos);
  vec3 halfwayDir = normalize(lightDir + viewDir);  
  spec = pow(max(dot(v_normal, halfwayDir), 0.0), shininess);
  vec3 specular = specColor * spec;


  gl_FragColor = vec4(specular + lambertian,1.0 );

}`