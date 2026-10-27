import{j as e,r as l}from"./react-CKZdXZ0r.js";import{C as D,b as I,L as F,u as y}from"./r3f-CAYnmXTz.js";import{al as A,d as z,am as V,an as $,a5 as k,aa as O,ab as P,ao as q,ap as C}from"./three-BnRk8kTe.js";import{e as L}from"./index-C6Rsj8vr.js";import"./motion-CJLZOZx7.js";import"./framer-CAnjM8z1.js";const v=2.6,f=1.12,m=1.06,G=5,T=t=>Math.min(1,Math.max(0,t)),R=t=>t*t*(3-2*t),S=(t,o)=>R(T(1-Math.abs(t-o))),B=[[0,0,.42,0],[.75,.05,.62,-.08],[0,0,.2,0],[0,0,.05,0],[.05,0,-.62,0]];function J(t){const o=Math.min(G-2,Math.floor(t)),n=R(T(t-o)),r=B[o],s=B[o+1];return[0,1,2,3].map(c=>r[c]+(s[c]-r[c])*n)}function K(){return l.useMemo(()=>{const t=document.createElement("canvas");t.width=256,t.height=8;const o=t.getContext("2d");if(o)for(let r=0;r<256;r++){const s=r%16/16,c=s<.2?1:s<.5?0:s<.7?-1:0,i=Math.round(128+c*90);o.fillStyle=`rgb(${i},128,255)`,o.fillRect(r,0,1,8)}const n=new q(t);return n.wrapS=C,n.wrapT=C,n.repeat.set(3,1),n},[])}function Q({mobile:t}){const o=l.useRef(null),n=l.useRef(null),r=l.useRef(null),s=l.useRef(null),c=l.useRef(null),i=K(),d=l.useMemo(()=>new A({color:"#4A5263",roughness:.42,metalness:.35,clearcoat:.7,clearcoatRoughness:.25,normalMap:i,normalScale:new z(.9,.9)}),[i]),x=l.useMemo(()=>new A({color:"#2A303C",roughness:.3,metalness:.6,clearcoat:1}),[]),h=l.useMemo(()=>new V(new $(v+.02,f+.02,m+.02)),[]);y(({clock:p})=>{const a=o.current;if(!a)return;const g=p.elapsedTime,j=t?0:L.progress*(G-1),[N,U,H,W]=J(j),w=S(j,0),_=S(j,1);a.position.y=N+Math.sin(g*1.1)*.045*w+Math.sin(g*1.7)*.03*_,a.rotation.set(U+Math.sin(g*.9)*.025*w,H+(t?g*.35:0),W+Math.sin(g*.7)*.03*w);const M=R(T((j-3.25)/.7));n.current&&(n.current.rotation.y=-M*1.95),r.current&&(r.current.rotation.y=M*1.95),s.current&&(s.current.intensity=M*6),c.current&&(c.current.emissiveIntensity=.15+M*2.4)});const u=.02;return e.jsxs("group",{ref:o,children:[e.jsx("mesh",{material:d,position:[0,0,m/2-u/2],children:e.jsx("boxGeometry",{args:[v,f,u]})}),e.jsx("mesh",{material:d,position:[0,0,-m/2+u/2],children:e.jsx("boxGeometry",{args:[v,f,u]})}),e.jsx("mesh",{material:d,position:[0,f/2-u/2,0],children:e.jsx("boxGeometry",{args:[v,u,m]})}),e.jsx("mesh",{material:x,position:[0,-f/2+u/2,0],children:e.jsx("boxGeometry",{args:[v,u,m]})}),e.jsx("mesh",{material:d,position:[-v/2+u/2,0,0],children:e.jsx("boxGeometry",{args:[u,f,m]})}),e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("boxGeometry",{args:[v-.06,f-.06,m-.06]}),e.jsx("meshStandardMaterial",{ref:c,side:k,color:"#1a1208",emissive:"#FFB547",emissiveIntensity:.15,roughness:.9})]}),e.jsx("pointLight",{ref:s,position:[v/2-.3,0,0],color:"#FFB547",intensity:0,distance:5,decay:1.6}),[-1,1].map(p=>[-1,1].map(a=>e.jsx("mesh",{material:x,position:[p*v/2,0,a*m/2],children:e.jsx("boxGeometry",{args:[.07,f+.04,.07]})},`${p}${a}`))),[-1,1].map(p=>[-1,1].map(a=>e.jsx("mesh",{material:x,position:[0,p*f/2,a*m/2],children:e.jsx("boxGeometry",{args:[v+.04,.06,.06]})},`r${p}${a}`))),e.jsxs("group",{ref:n,position:[v/2,0,m/2],children:[e.jsx("mesh",{material:d,position:[.012,0,-m/4],children:e.jsx("boxGeometry",{args:[.024,f-.04,m/2-.01]})}),[-.18,.18].map(p=>e.jsx("mesh",{material:x,position:[.04,0,-m/4+p],children:e.jsx("boxGeometry",{args:[.02,f-.1,.02]})},p))]}),e.jsxs("group",{ref:r,position:[v/2,0,-m/2],children:[e.jsx("mesh",{material:d,position:[.012,0,m/4],children:e.jsx("boxGeometry",{args:[.024,f-.04,m/2-.01]})}),[-.18,.18].map(p=>e.jsx("mesh",{material:x,position:[.04,0,m/4+p],children:e.jsx("boxGeometry",{args:[.02,f-.1,.02]})},p))]}),e.jsx("lineSegments",{geometry:h,children:e.jsx("lineBasicMaterial",{color:"#FFB547",transparent:!0,opacity:.55,toneMapped:!1})})]})}function b(t,o){return()=>o?t===0?1:0:S(L.progress*(G-1),t)}const X=`
  uniform float uTime;
  varying float vH;
  varying float vDist;
  void main() {
    vec3 p = position;
    float h = sin(p.x * 0.9 + uTime * 1.1) * 0.09 + cos(p.z * 0.7 + uTime * 0.8) * 0.07 + sin((p.x + p.z) * 1.7 + uTime * 1.6) * 0.025;
    p.y += h;
    vH = h;
    vDist = length(p.xz);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 2.2 * (6.0 / -mv.z);
  }
`,Y=`
  uniform float uOpacity;
  varying float vH;
  varying float vDist;
  void main() {
    if (length(gl_PointCoord - 0.5) > 0.5) discard;
    float fade = smoothstep(7.0, 2.0, vDist);
    vec3 col = mix(vec3(0.36, 0.88, 0.9), vec3(0.957, 0.961, 0.969), 0.55 + vH * 2.0);
    gl_FragColor = vec4(col, (0.25 + vH * 1.5) * fade * uOpacity);
  }
`;function Z({mobile:t}){const o=b(0,t),n=l.useRef(null),r=l.useMemo(()=>{const i=new Float32Array(24300);for(let x=0;x<90;x++)for(let h=0;h<90;h++){const u=(x*90+h)*3;i[u]=(x/89-.5)*16,i[u+1]=0,i[u+2]=(h/89-.5)*16}const d=new O;return d.setAttribute("position",new P(i,3)),d},[]),s=l.useMemo(()=>({uTime:{value:0},uOpacity:{value:1}}),[]);return y(({clock:c})=>{const i=o();s.uTime.value=c.elapsedTime,s.uOpacity.value=i,n.current&&(n.current.visible=i>.01)}),e.jsx("points",{ref:n,geometry:r,position:[0,-f/2-.12,0],children:e.jsx("shaderMaterial",{vertexShader:X,fragmentShader:Y,uniforms:s,transparent:!0,depthWrite:!1})})}function ee({mobile:t}){const o=b(1,t),n=l.useRef(null),r=l.useRef(null),s=140,{geometry:c,seeds:i}=l.useMemo(()=>{const d=new Float32Array(s*6),x=Array.from({length:s},()=>({y:(Math.random()-.4)*4,z:(Math.random()-.5)*6,x:Math.random()*16-8,len:.3+Math.random()*.9,v:4+Math.random()*6})),h=new O;return h.setAttribute("position",new P(d,3)),{geometry:h,seeds:x}},[]);return y((d,x)=>{const h=o();if(n.current&&(n.current.visible=h>.01),r.current&&(r.current.opacity=h*.45),h<=.01)return;const u=c.getAttribute("position"),p=u.array;i.forEach((a,g)=>{a.x-=a.v*Math.min(x,.05),a.x<-8&&(a.x+=16),p.set([a.x,a.y,a.z,a.x+a.len,a.y,a.z],g*6)}),u.needsUpdate=!0}),e.jsx("lineSegments",{ref:n,geometry:c,children:e.jsx("lineBasicMaterial",{ref:r,color:"#C9D6FF",transparent:!0,opacity:0,depthWrite:!1})})}const te=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,oe=`
  uniform float uTime;
  uniform float uOpacity;
  uniform float uMode; // 0 = road, 1 = rail
  varying vec2 vUv;
  void main() {
    float x = vUv.x * 40.0 + uTime * 6.0;
    float y = vUv.y;
    float fade = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
    float a = 0.0;
    vec3 col = vec3(0.957, 0.961, 0.969);
    if (uMode < 0.5) {
      float edge = step(abs(y - 0.08), 0.008) + step(abs(y - 0.92), 0.008);
      float dash = step(abs(y - 0.5), 0.012) * step(fract(x * 0.5), 0.45);
      a = edge * 0.35 + dash * 0.85;
      col = mix(col, vec3(1.0, 0.71, 0.28), dash);
    } else {
      float rails = step(abs(y - 0.36), 0.01) + step(abs(y - 0.64), 0.01);
      float sleepers = step(fract(x * 1.2), 0.18) * step(abs(y - 0.5), 0.22);
      a = rails * 0.8 + sleepers * 0.22;
      col = mix(col, vec3(1.0, 0.71, 0.28), rails * 0.6);
    }
    gl_FragColor = vec4(col, a * fade * uOpacity);
  }
`;function E({mode:t,mobile:o}){const n=b(t===0?2:3,o),r=l.useRef(null),s=l.useMemo(()=>({uTime:{value:0},uOpacity:{value:0},uMode:{value:t}}),[t]);return y(({clock:c})=>{const i=n();s.uTime.value=c.elapsedTime,s.uOpacity.value=i,r.current&&(r.current.visible=i>.01)}),e.jsxs("mesh",{ref:r,rotation:[-Math.PI/2,0,0],position:[0,-f/2-.06,0],children:[e.jsx("planeGeometry",{args:[40,t===0?2.6:2.2]}),e.jsx("shaderMaterial",{vertexShader:te,fragmentShader:oe,uniforms:s,transparent:!0,depthWrite:!1})]})}function se({mobile:t}){const o=b(4,t),n=l.useRef(null);return y(()=>{const r=o(),s=n.current;if(!s)return;s.visible=r>.01,(Array.isArray(s.material)?s.material:[s.material]).forEach(i=>{i.transparent=!0,i.opacity=r*.35})}),e.jsx("gridHelper",{ref:n,args:[14,28,"#FFB547","#3a3f4b"],position:[0,-f/2-.02,0]})}function re(){return y(({camera:t,pointer:o})=>{t.position.x+=(5.2+o.x*.35-t.position.x)*.04,t.position.y+=(2.1+o.y*.2-t.position.y)*.04,t.lookAt(0,.1,0)}),null}function me({active:t,mobile:o}){return e.jsxs(D,{dpr:[1,1.75],frameloop:t?"always":"never",camera:{position:[5.2,2.1,5.6],fov:32},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},"aria-hidden":"true",style:{position:"absolute",inset:0},children:[e.jsx("ambientLight",{intensity:.6}),e.jsx("directionalLight",{position:[3,6,5],intensity:2.4,color:"#E8ECFF"}),e.jsx("directionalLight",{position:[-5,2,-4],intensity:2.6,color:"#FFB547"}),e.jsxs(I,{resolution:256,frames:1,environmentIntensity:.9,children:[e.jsx(F,{form:"rect",intensity:2.4,color:"#C9D6FF",position:[0,5,2],scale:[10,2,1],"rotation-x":Math.PI/2}),e.jsx(F,{form:"rect",intensity:3,color:"#FFB547",position:[-5,1,-2],scale:[2,6,1],"rotation-y":Math.PI/2}),e.jsx(F,{form:"ring",intensity:1.2,color:"#ffffff",position:[4,2,5],scale:2})]}),e.jsx(Q,{mobile:o}),e.jsx(Z,{mobile:o}),e.jsx(ee,{mobile:o}),e.jsx(E,{mode:0,mobile:o}),e.jsx(E,{mode:1,mobile:o}),e.jsx(se,{mobile:o}),!o&&e.jsx(re,{})]})}export{me as default};
