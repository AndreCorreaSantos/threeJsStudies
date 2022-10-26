export const vertexShader = `
    uniform sampler2D texture1;
    uniform float scale;
    varying vec2 vUv;

    void main() {
    
      vUv = uv;
      vec3 newPosition = position + scale*normal*texture(texture1,vUv).r;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    
    } `