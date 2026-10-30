import{j as t,r as f}from"./react-CdWEA1bb.js";import{u as G,H as se,C as ie,P as le,E as ce,B as ue,V as pe,a as me}from"./r3f-CsTNQJEZ.js";import{ae as k,af as Q,a5 as de,aa as X,ag as N,ah as B,c as g,ab as T,ai as ee,aj as U,ak as z}from"./three-BnRk8kTe.js";import{l as S,a as b,H as fe,g as d,R as he,h as H,b as L,c as ve,d as ge}from"./index-FJLjC0nR.js";import{P as xe}from"./Particles-D2vARALa.js";import"./motion-CJLZOZx7.js";import"./framer-pclhd_sn.js";function Me(){return{uRot:{value:new k},uMorph:{value:0},uTime:{value:0},uIntro:{value:0},uPointScale:{value:2},uOpacity:{value:1}}}const V=`
  uniform mat4 uRot;
  uniform float uMorph;
  attribute vec3 aFlat;
  vec3 morphPosition(vec3 sphere) {
    vec3 s = (uRot * vec4(sphere, 1.0)).xyz;
    // ease the morph so points leave the sphere gently and settle onto the plane
    float m = uMorph * uMorph * (3.0 - 2.0 * uMorph);
    return mix(s, aFlat, m);
  }
  float facing(vec3 sphere) {
    vec3 n = normalize((modelViewMatrix * vec4((uRot * vec4(sphere, 0.0)).xyz, 0.0)).xyz);
    return n.z;
  }
`,ye=`
  ${V}
  uniform float uTime;
  uniform float uPointScale;
  attribute float aRand;
  varying float vAlpha;
  varying float vWarm;
  void main() {
    vec3 p = morphPosition(position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float f = facing(position);
    float edge = mix(smoothstep(-0.08, 0.35, f), 1.0, uMorph);
    float twinkle = 0.78 + 0.22 * sin(uTime * (0.6 + aRand * 1.6) + aRand * 60.0);
    vAlpha = edge * twinkle;
    vWarm = step(0.965, aRand);
    gl_PointSize = uPointScale * (0.65 + aRand * 0.75);
  }
`,we=`
  uniform float uOpacity;
  varying float vAlpha;
  varying float vWarm;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d);
    vec3 col = mix(vec3(0.957, 0.961, 0.969), vec3(1.0, 0.82, 0.55), vWarm);
    gl_FragColor = vec4(col, a * vAlpha * mix(0.42, 0.75, vWarm) * uOpacity);
  }
`;function je({land:e,count:o,uniforms:a}){const s=f.useMemo(()=>{const c=Math.min(o,e.length/2),p=new Float32Array(c*3),m=new Float32Array(c*3),i=new Float32Array(c);for(let r=0;r<c;r++){const n=e[r*2],u=e[r*2+1];p.set(S(n,u,1),r*3),m.set(b(n,u),r*3);const v=Math.sin(n*.21+Math.cos(u*.17)*2.1)*.5+.5;i[r]=Math.min(.999,v*.6+Math.random()*.4)}const l=new X;return l.setAttribute("position",new T(p,3)),l.setAttribute("aFlat",new T(m,3)),l.setAttribute("aRand",new T(i,1)),l.boundingSphere=new B(new g,3),l},[e,o]);return t.jsx("points",{geometry:s,renderOrder:2,children:t.jsx("shaderMaterial",{vertexShader:ye,fragmentShader:we,uniforms:a,transparent:!0,depthWrite:!1})})}const Se=`
  ${V}
  varying float vFacing;
  void main() {
    vec3 p = morphPosition(position);
    vFacing = mix(smoothstep(-0.1, 0.4, facing(position)), 1.0, uMorph);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,be=`
  uniform float uOpacity;
  varying float vFacing;
  uniform float uMorph;
  void main() { gl_FragColor = vec4(0.957, 0.961, 0.969, 0.07 * vFacing * uOpacity * (1.0 - 0.55 * uMorph)); }
`;function Pe({uniforms:e}){const o=f.useMemo(()=>{const a=[],s=[],c=(i,l)=>{a.push(...S(i[0],i[1],1.002),...S(l[0],l[1],1.002)),s.push(...b(i[0],i[1],-.002),...b(l[0],l[1],-.002))};for(let i=0;i<12;i++){const l=-180+i*30;for(let r=0;r<72;r++)c([-90+180*r/72,l],[-90+180*(r+1)/72,l])}for(let i=0;i<144;i++)c([0,-180+360*i/144],[0,-180+360*(i+1)/144]);const m=new X;return m.setAttribute("position",new N(a,3)),m.setAttribute("aFlat",new N(s,3)),m.boundingSphere=new B(new g,3),m},[]);return t.jsx("lineSegments",{geometry:o,renderOrder:1,children:t.jsx("shaderMaterial",{vertexShader:Se,fragmentShader:be,uniforms:e,transparent:!0,depthWrite:!1})})}const Fe=`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Re=`
  uniform float uMorph;
  uniform float uOpacity;
  varying vec3 vNormal;
  void main() {
    float i = pow(clamp(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.2);
    vec3 ice = vec3(0.788, 0.839, 1.0);
    gl_FragColor = vec4(ice, i * 0.16 * (1.0 - uMorph) * uOpacity);
  }
`;function Oe({uniforms:e}){return t.jsxs("mesh",{scale:1.1,renderOrder:0,children:[t.jsx("sphereGeometry",{args:[1,64,64]}),t.jsx("shaderMaterial",{vertexShader:Fe,fragmentShader:Re,uniforms:e,side:de,transparent:!0,depthWrite:!1,blending:Q})]})}function Ie(){const e=f.useRef(null);return G(()=>{if(!e.current)return;const o=.985*(1-ee.smoothstep(d.morph,0,.2));e.current.visible=o>.01,e.current.scale.setScalar(Math.max(o,.001))}),t.jsxs("mesh",{ref:e,renderOrder:-1,children:[t.jsx("sphereGeometry",{args:[1,48,48]}),t.jsx("meshBasicMaterial",{colorWrite:!1})]})}const D=new g,$=new g;function Ae({uniforms:e,labels:o}){const[a,s]=f.useState(null),c=f.useRef([]),p=f.useRef([]),m=f.useMemo(()=>fe.map((r,n)=>({...r,sphere:new g(...S(r.lat,r.lon,1.012)),flat:new g(...b(r.lat,r.lon,.01)),phase:n*.37})),[]);G(({clock:r})=>{const n=d.morph,u=n*n*(3-2*n),v=r.elapsedTime;m.forEach((h,w)=>{const x=c.current[w];if(!x)return;D.copy(h.sphere).applyMatrix4(e.uRot.value),$.copy(h.flat),x.position.copy(D.lerp($,u)),x.visible=e.uIntro.value>.55;const M=p.current[w];if(M){const y=(v+h.phase)%2.5/2.5;M.scale.setScalar(1+y*2),M.material.opacity=(1-y)*.9*e.uOpacity.value}})});const i=r=>n=>{d.morph<.6||(n.stopPropagation(),s(r),d.hoveredHub=r)},l=()=>{s(null),d.hoveredHub=null};return t.jsx("group",{children:m.map((r,n)=>t.jsxs("group",{ref:u=>c.current[n]=u,children:[t.jsxs("mesh",{renderOrder:3,children:[t.jsx("circleGeometry",{args:[r.main?.012:.008,16]}),t.jsx("meshBasicMaterial",{color:"#FFB547",toneMapped:!1,transparent:!0})]}),t.jsxs("mesh",{ref:u=>p.current[n]=u,renderOrder:3,children:[t.jsx("ringGeometry",{args:[.014,.017,32]}),t.jsx("meshBasicMaterial",{color:"#FFB547",toneMapped:!1,transparent:!0,depthWrite:!1})]}),t.jsxs("mesh",{onPointerOver:i(r.id),onPointerOut:l,visible:!1,children:[t.jsx("circleGeometry",{args:[.06,12]}),t.jsx("meshBasicMaterial",{})]}),a===r.id&&t.jsx(se,{center:!0,position:[0,.07,0],zIndexRange:[40,30],style:{pointerEvents:"none"},children:t.jsx("span",{className:"whitespace-nowrap rounded-full border border-[var(--line-strong)] bg-[rgba(10,14,26,0.8)] px-3 py-1 text-[14px] text-[var(--text-1)] backdrop-blur-md",children:o[r.id]})})]},r.id))})}function Ee({land:e,dotCount:o,uniforms:a,labels:s}){return t.jsxs(t.Fragment,{children:[t.jsx(Ie,{}),t.jsx(Oe,{uniforms:a}),t.jsx(Pe,{uniforms:a}),t.jsx(je,{land:e,count:o,uniforms:a}),t.jsx(Ae,{uniforms:a,labels:s})]})}const Y=96,Z=6,Te=`
  ${V}
  uniform float uWrap;
  varying float vU;
  varying float vFade;
  void main() {
    vU = uv.x;
    vec3 p = morphPosition(position);
    vFade = 1.0 - uWrap * smoothstep(0.0, 0.5, uMorph);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,Ge=`
  uniform float uTime;
  uniform float uIntro;
  uniform float uIndex;
  uniform float uPeriod;
  uniform float uOffset;
  uniform float uOpacity;
  varying float vU;
  varying float vFade;
  void main() {
    // routes "draw" one by one during the intro (stagger 0.1s)
    float draw = clamp((uIntro * 2.4 - 0.6 - uIndex * 0.1) / 0.9, 0.0, 1.0);
    if (vU > draw) discard;

    vec3 amber = vec3(1.0, 0.71, 0.278);
    vec3 deep = vec3(1.0, 0.478, 0.102);

    float head = fract(uTime / uPeriod + uOffset) * 1.5 - 0.25;
    float d = head - vU;
    float tail = d >= 0.0 && d < 0.28 ? pow(1.0 - d / 0.28, 3.0) : 0.0;
    float spark = d >= 0.0 && d < 0.012 ? 1.0 : 0.0;

    // pen tip while drawing in
    float tip = draw < 1.0 ? smoothstep(0.04, 0.0, draw - vU) : 0.0;

    vec3 col = mix(deep, amber, tail) + vec3(1.0, 0.9, 0.75) * spark;
    float a = 0.22 + tail * 2.2 + spark * 2.0 + tip * 2.0;
    gl_FragColor = vec4(col * a, 1.0) * vFade * uOpacity;
  }
`,ke=new g;function Be(e,o){const a=new g(...S(e.lat,e.lon)),s=new g(...S(o.lat,o.lon)),c=a.angleTo(s),p=.06+c/Math.PI*.42,m=[],i=[],l=new g(...b(e.lat,e.lon,.004)),r=new g(...b(o.lat,o.lon,.004)),n=r.clone().sub(l),u=new g(-n.y,n.x,0).normalize();u.y<0&&u.negate();const v=n.length(),h=48;for(let y=0;y<=h;y++){const j=y/h,P=Math.sin(Math.PI*j),I=a.clone().multiplyScalar(Math.sin((1-j)*c)).add(ke.copy(s).multiplyScalar(Math.sin(j*c))).divideScalar(Math.sin(c));m.push(I.multiplyScalar(1+p*P)),i.push(l.clone().lerp(r,j).addScaledVector(u,P*v*.14))}const w=.0042,x=new U(new z(m),Y,w,Z,!1),M=new U(new z(i),Y,w,Z,!1);return x.setAttribute("aFlat",M.getAttribute("position")),x.boundingSphere=new B(new g,3),{geometry:x,wrap:Math.abs(e.lon-o.lon)>180?1:0}}function Ve({uniforms:e}){const o=f.useMemo(()=>he.map(([a,s],c)=>{const{geometry:p,wrap:m}=Be(H(a),H(s));return{key:`${a}-${s}`,geometry:p,uniforms:{...e,uWrap:{value:m},uIndex:{value:c},uPeriod:{value:3+c*7%4},uOffset:{value:c*.618%1}}}}),[e]);return t.jsx(t.Fragment,{children:o.map(a=>t.jsx("mesh",{geometry:a.geometry,renderOrder:4,children:t.jsx("shaderMaterial",{vertexShader:Te,fragmentShader:Ge,uniforms:a.uniforms,transparent:!0,depthWrite:!1,blending:Q,toneMapped:!1})},a.key))})}const O=Math.PI/180,We=23.4*O,_e=-12*O,Ce=18*O,Ne=e=>1-Math.pow(1-e,3),K=e=>e*e*(3-2*e),R=ee.lerp;function Ue(e,o,a){const s=((o-e)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI;return e+s*a}const q=new k,J=new k;function ze({uniforms:e,mobile:o,children:a}){const s=f.useRef(null),c=f.useRef(Ce),p=f.useRef({x:0,y:0}),{viewport:m,size:i}=me();return G((l,r)=>{const n=s.current;if(!n)return;const u=Math.min(r,1/20),v=m.width,h=m.height,w=Ne(d.intro),x=Math.min(1,d.heroOut),M=K(Math.min(1,d.netIn)),y=d.morph,j=K(y);d.dragging||(d.dragOffset+=d.dragVelocity*u,d.dragVelocity*=Math.pow(.04,u)),c.current+=u*.05;const P=c.current+d.dragOffset+(1-w)*Math.PI,I=Ue(P,_e,M);J.makeRotationZ(We*(1-M)),q.makeRotationY(I),e.uRot.value.multiplyMatrices(J,q);let A,E,F;o?(A=0,E=h*.1,F=Math.min(v*.62,h*.34)):(F=Math.min(h*.47,v*.25),A=v*.27+x*v*.12,E=-h*.14+x*h*.06,F*=1-.42*x);const te=Math.min(h*.3,v*.36),re=Math.min(v*.9/4,h*.56/2),ae=R(te,re,j),oe=-h*.04,W=R(F,ae,M)*(.6+.4*w);n.position.set(R(A,0,M),R(E,oe,M),0),n.scale.setScalar(W);const _=o?{x:0,y:0}:d.pointer;p.current.x+=(_.x-p.current.x)*Math.min(1,u*3),p.current.y+=(_.y-p.current.y)*Math.min(1,u*3);const C=4*O*(1-j);n.rotation.set(-p.current.y*C,p.current.x*C,0),e.uTime.value=l.clock.elapsedTime,e.uIntro.value=d.intro,e.uMorph.value=y;const ne=W/h*i.height*l.gl.getPixelRatio();e.uPointScale.value=ne*.0062*(1+.35*j)*(o?1.25:1)}),t.jsx("group",{ref:s,children:a})}function qe({mobile:e,labels:o,onReady:a}){const[s,c]=f.useState(null),[p,m]=f.useState(!1),i=f.useSyncExternalStore(L.subscribe,L.get),l=f.useMemo(Me,[]);f.useEffect(()=>{let u=!0;return ve().then(v=>u&&c(v),()=>{}),()=>{u=!1}},[]),f.useEffect(()=>{s&&a()},[s,a]);const r=e?6e3:p?1e4:18e3,n=!e&&!p;return t.jsxs(ie,{dpr:[1,1.75],flat:!0,frameloop:i?"always":"never",camera:{position:[0,0,10],fov:35,near:.1,far:50},gl:{antialias:!n,alpha:!1,powerPreference:"high-performance",stencil:!1},"aria-hidden":"true",style:{position:"absolute",inset:0},children:[t.jsx("color",{attach:"background",args:["#05070D"]}),t.jsx(le,{onDecline:()=>m(!0),flipflops:2}),s&&t.jsxs(ze,{uniforms:l,mobile:e,children:[t.jsx(Ee,{land:s,dotCount:r,uniforms:l,labels:o}),t.jsx(Ve,{uniforms:l})]}),t.jsx(xe,{opacity:()=>d.netIn>0?.9*ge(e):0}),n&&t.jsxs(ce,{multisampling:4,children:[t.jsx(ue,{intensity:.8,luminanceThreshold:.2,luminanceSmoothing:.2,mipmapBlur:!0}),t.jsx(pe,{offset:.3,darkness:.55})]})]})}export{qe as default};
