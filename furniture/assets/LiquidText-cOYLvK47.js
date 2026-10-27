import{r as i,u as S,j as m,c as F,h as p,s as j}from"./index-5I_4lDSm.js";import{t as P,u as L,v as V,L as $,w as g,V as M,q as _}from"./react-three-fiber.esm-DEcwc0cP.js";import{v as U,n as X}from"./noise-DPC3pax2.js";import"./motion-BOzlLFWQ.js";const Y=`// Manifesto liquid text. The texture stores glyph coverage in alpha and the
// word index in red (premultiplied), so each word can light up on scroll.
uniform sampler2D uTex;
uniform float uTime;
uniform float uEnergy;
uniform float uProgress; // 0 → word count
uniform float uCount;
uniform float uDimAlpha;
uniform vec2 uMouse; // uv
uniform vec2 uRes; // px
uniform vec3 uDim;
uniform vec3 uBrassA;
uniform vec3 uBrassB;
uniform vec3 uBrassC;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 q = uv * vec2(aspect, 1.0);

  float d = distance(q, uMouse * vec2(aspect, 1.0));
  float near = exp(-d * d / 0.018) * uEnergy;

  vec2 flow = vec2(
    snoise(q * 2.4 + vec2(uTime * 0.11, -uTime * 0.07)),
    snoise(q * 2.4 + vec2(5.2, 1.3) - uTime * 0.09)
  );
  vec2 off = flow * (0.0018 + near * 0.022);
  vec2 ca = (vec2(1.5, 0.0) / uRes) * (0.3 + 0.7 * min(1.0, near * 2.0));

  vec4 s = texture2D(uTex, uv + off);
  float aR = texture2D(uTex, uv + off + ca).a;
  float aB = texture2D(uTex, uv + off - ca).a;
  float a = s.a;

  float idx = floor((s.r / max(a, 1e-4)) * uCount);
  float lit = clamp(uProgress - idx, 0.0, 1.0);

  // Brass that drifts slowly across the sentence.
  float g = uv.x * 0.9 + uv.y * 0.35 + sin(uTime * 0.25) * 0.15 + flow.x * 0.05;
  float band = 0.5 + 0.5 * sin(g * 5.0 - uTime * 0.6);
  vec3 brass = mix(uBrassA, uBrassB, smoothstep(0.1, 0.9, band));
  brass = mix(brass, uBrassC, pow(band, 8.0) * 0.8);

  vec3 col = mix(uDim, brass, lit);
  float alpha = mix(uDimAlpha, 1.0, lit);
  vec3 rgb = vec3(col.r * aR, col.g * a, col.b * aB) * alpha;
  gl_FragColor = vec4(rgb, max(max(aR, aB), a) * alpha);
}
`;function z({host:o,textEl:f,text:x}){const B=L(e=>e.gl),v=F(["--text","--accent","--accent-2","--accent-deep"]),l=i.useMemo(()=>{const e=new V(document.createElement("canvas"));return e.premultiplyAlpha=!0,e.generateMipmaps=!1,e.minFilter=$,e},[]),t=i.useMemo(()=>({uTex:{value:l},uTime:{value:0},uEnergy:{value:0},uProgress:{value:0},uCount:{value:1},uDimAlpha:{value:.15},uMouse:{value:new M(.5,.5)},uRes:{value:new M(1,1)},uDim:{value:new g},uBrassA:{value:new g},uBrassB:{value:new g},uBrassC:{value:new g}}),[l]);i.useEffect(()=>{t.uDim.value.set(...p(v["--text"])),t.uBrassA.value.set(...p(v["--accent-deep"])),t.uBrassB.value.set(...p(v["--accent"])),t.uBrassC.value.set(...p(v["--accent-2"]))},[v,t]);const d=i.useCallback(()=>{const e=o.current,u=f.current;if(!e||!u)return;const n=e.getBoundingClientRect(),a=B.getPixelRatio(),s=l.image;s.width=Math.max(1,Math.round(n.width*a)),s.height=Math.max(1,Math.round(n.height*a));const r=s.getContext("2d");if(!r)return;r.setTransform(a,0,0,a,0,0),r.clearRect(0,0,n.width,n.height);const C=u.querySelectorAll(".mw"),T=C.length;C.forEach((h,E)=>{const w=h.getBoundingClientRect(),c=getComputedStyle(h);r.font=`${c.fontStyle} ${c.fontWeight} ${c.fontSize} ${c.fontFamily}`,r.letterSpacing=c.letterSpacing==="normal"?"0px":c.letterSpacing,r.textBaseline="alphabetic";const R=h.textContent??"",b=r.measureText(R),A=b.fontBoundingBoxAscent,q=b.fontBoundingBoxDescent,D=w.top-n.top+(w.height-(A+q))/2+A;r.fillStyle=`rgb(${Math.round((E+.5)/T*255)},0,0)`,r.fillText(R,w.left-n.left,D)}),t.uCount.value=T,t.uRes.value.set(s.width,s.height),l.needsUpdate=!0},[B,o,l,f,t]);i.useEffect(()=>{let e=requestAnimationFrame(d);document.fonts.ready.then(()=>{e=requestAnimationFrame(d)});const u=new ResizeObserver(()=>{cancelAnimationFrame(e),e=requestAnimationFrame(d)});return o.current&&u.observe(o.current),()=>{cancelAnimationFrame(e),u.disconnect()}},[d,o,x]);const y=i.useRef({target:0,last:{x:0,y:0}});return i.useEffect(()=>{const e=o.current;if(!e)return;const u=n=>{const a=e.getBoundingClientRect(),s=y.current,r=Math.hypot(n.clientX-s.last.x,n.clientY-s.last.y);s.last={x:n.clientX,y:n.clientY},s.target=Math.min(1,s.target+r*.006),t.uMouse.value.set((n.clientX-a.left)/a.width,1-(n.clientY-a.top)/a.height)};return e.addEventListener("pointermove",u,{passive:!0}),()=>e.removeEventListener("pointermove",u)},[o,t]),_((e,u)=>{const n=y.current;n.target*=.94,t.uEnergy.value+=(n.target-t.uEnergy.value)*.1,t.uTime.value+=u;const a=j.manifesto.progress*t.uCount.value;t.uProgress.value+=(a-t.uProgress.value)*.12}),i.useEffect(()=>()=>l.dispose(),[l]),m.jsxs("mesh",{frustumCulled:!1,children:[m.jsx("planeGeometry",{args:[2,2]}),m.jsx("shaderMaterial",{vertexShader:U,fragmentShader:X+Y,uniforms:t,transparent:!0,premultipliedAlpha:!0,depthWrite:!1})]})}function N(o){const f=i.useRef(null),x=S(f,"0px");return m.jsx("div",{ref:f,className:"manifesto__gl","aria-hidden":"true",children:m.jsx(P,{flat:!0,dpr:[1,2],frameloop:x?"always":"never",gl:{alpha:!0,antialias:!1,premultipliedAlpha:!0},children:m.jsx(z,{...o})})})}export{N as default};
