import{r as u,j as s}from"./react-CdWEA1bb.js";import{aa as f,ab as m}from"./three-BnRk8kTe.js";import{u as p}from"./r3f-CsTNQJEZ.js";const c=`
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    // slow drift + depth parallax: nearer particles move more with scroll
    float depth = (p.z + 3.0) / 6.0;
    p.x += sin(uTime * 0.05 + aSeed * 12.0) * 0.4;
    p.y = mod(position.y + 6.0 + uTime * 0.04 * (0.4 + aSeed) + uScroll * (0.4 + depth * 1.2), 12.0) - 6.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + aSeed) * uPixelRatio;
    vAlpha = 0.2 + aSeed * 0.2;
  }
`,v=`
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(0.957, 0.961, 0.969, vAlpha * uOpacity * smoothstep(0.5, 0.1, d));
  }
`,h=[16,12,6];function y({count:o=300,opacity:l=1,spread:r=h}){const d=u.useMemo(()=>{const e=new Float32Array(o*3),i=new Float32Array(o);for(let t=0;t<o;t++)e[t*3]=(Math.random()-.5)*r[0],e[t*3+1]=(Math.random()-.5)*r[1],e[t*3+2]=(Math.random()-.5)*r[2],i[t]=Math.random();const n=new f;return n.setAttribute("position",new m(e,3)),n.setAttribute("aSeed",new m(i,1)),n},[o,r]),a=u.useMemo(()=>({uTime:{value:0},uScroll:{value:0},uPixelRatio:{value:1},uOpacity:{value:1}}),[]);return p(({clock:e,gl:i})=>{a.uTime.value=e.elapsedTime,a.uScroll.value=window.scrollY*.0015,a.uPixelRatio.value=i.getPixelRatio(),a.uOpacity.value=typeof l=="function"?l():l}),s.jsx("points",{geometry:d,renderOrder:5,children:s.jsx("shaderMaterial",{vertexShader:c,fragmentShader:v,uniforms:a,transparent:!0,depthWrite:!1})})}export{y as P};
