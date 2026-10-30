import{r as i,u as v,j as s,b as f,c as d,p as m,h as o}from"./index-F_eUGctU.js";import{t as p,u as g,w as u,V as h,q as x}from"./react-three-fiber.esm-B9iC8tBF.js";import{v as w,n as b}from"./noise-DPC3pax2.js";import"./motion-BOzlLFWQ.js";const T=`// Procedural wood rings with a slow band of light passing over them.
uniform float uTime;
uniform vec2 uRes;
uniform vec3 uBase;
uniform vec3 uLine;
uniform vec3 uLight;
uniform vec3 uEdge;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  p.x += uTime * 0.008;

  float warp = fbm(p * vec2(1.1, 0.7) + uTime * 0.01);
  vec2 c = vec2(-0.3, -2.4);
  float d = length((p - c) * vec2(0.32, 1.0)) * 7.0 + warp * 1.6;
  float ring = fract(d);
  float late = pow(ring, 5.0);
  float streak = snoise(vec2(p.x * 1.4, p.y * 90.0)) * 0.5 + 0.5;
  float tone = clamp(late * 0.7 + streak * 0.22 + warp * 0.15, 0.0, 1.0);
  vec3 col = mix(uBase, uLine, tone);

  float s = fract(uTime * 0.035);
  float band = (uv.x * 0.85 + uv.y * 0.35) - (s * 2.4 - 0.7);
  float light = exp(-band * band * 9.0);
  col += uLight * light * (0.16 + 0.12 * (1.0 - tone));

  float vig = smoothstep(1.1, 0.25, length((uv - 0.5) * vec2(aspect * 0.75, 1.2)));
  vig *= smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
  col = mix(uEdge, col, vig);
  gl_FragColor = vec4(col, 1.0);
}
`,y={dark:{base:"#241910",line:"#0c0907",light:"#c8a27a"},light:{base:"#ece2d4",line:"#cdb99e",light:"#fff6e8"}};function E(){const{theme:a}=f(),{"--bg-deep":t}=d(["--bg-deep"]),l=g(n=>n.size),r=m(),e=i.useMemo(()=>({uTime:{value:12},uRes:{value:new h(1,1)},uBase:{value:new u},uLine:{value:new u},uLight:{value:new u},uEdge:{value:new u}}),[]);return i.useEffect(()=>{const n=y[a];e.uBase.value.set(...o(n.base)),e.uLine.value.set(...o(n.line)),e.uLight.value.set(...o(n.light)),e.uEdge.value.set(...o(t))},[a,t,e]),i.useEffect(()=>{e.uRes.value.set(l.width,l.height)},[l,e]),x((n,c)=>{r||(e.uTime.value+=c)}),s.jsxs("mesh",{frustumCulled:!1,children:[s.jsx("planeGeometry",{args:[2,2]}),s.jsx("shaderMaterial",{vertexShader:w,fragmentShader:b+T,uniforms:e,depthWrite:!1})]})}function B(){const a=i.useRef(null),t=v(a,"0px");return s.jsx("div",{ref:a,style:{position:"absolute",inset:0},children:s.jsx(p,{flat:!0,dpr:[1,1.25],frameloop:t?"always":"never",gl:{antialias:!1},children:s.jsx(E,{})})})}export{B as default};
