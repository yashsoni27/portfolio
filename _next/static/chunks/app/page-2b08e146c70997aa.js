(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{2876:(e,t,o)=>{Promise.resolve().then(o.bind(o,8508))},7066:(e,t,o)=>{"use strict";o.d(t,{A:()=>l});var s=o(5155),n=o(2115),r=o(3463);let a=n.forwardRef((e,t)=>{let{as:o="section",className:n,children:a,...l}=e;return(0,s.jsx)(o,{ref:t,className:(0,r.A)("px-4 py-10 md:px-6 md:py-14 lg:py-16",n),...l,children:(0,s.jsx)("div",{className:"mx-auto w-full max-w-7xl",children:a})})});a.displayName="Bounded";let l=a},8508:(e,t,o)=>{"use strict";o.d(t,{default:()=>f});var s=o(5155),n=o(2115),r=o(1478),a=o(7066),l=o(337),i=o(3721),c=o(1613),u=o(6824),m=o(5488);function d(){return(0,s.jsx)("div",{className:"row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0",children:(0,s.jsx)(i.Hl,{className:"z-0",shadows:!0,gl:{antialias:!1},dpr:[1,1.5],camera:{position:[0,0,25],fov:30,near:1,far:40},children:(0,s.jsxs)(n.Suspense,{fallback:null,children:[(0,s.jsx)(p,{}),(0,s.jsx)(c._,{position:[0,-3.5,0],opacity:.65,scale:40,blur:1,far:10}),(0,s.jsx)(u.OH,{preset:"studio"})]})})})}function p(){let e=[{position:[0,0,0],r:.3,geometry:new l.WBB(3)},{position:[1,-.75,4],r:.4,geometry:new l.qU7(.5,1.6,2,16)},{position:[-1.4,2,-4],r:.6,geometry:new l.nEu(1.5)},{position:[-.8,-.5,5],r:.5,geometry:new l.O3Y(.6,.25,16,32)},{position:[1.6,1.6,-4],r:.7,geometry:new l.Ufg(1.5)}],t=[new l.qBx,new l._4j({color:3066993,roughness:0}),new l._4j({color:0xf1cf04,roughness:.4}),new l._4j({color:0xe700c3,roughness:.2}),new l._4j({color:9322669,roughness:.3}),new l._4j({color:2093663,roughness:.1}),new l._4j({color:2719929,roughness:0,metalness:.5}),new l._4j({color:2899536,roughness:.5,metalness:.1})],o=[new Audio("/sounds/Knock1.ogg"),new Audio("/sounds/Knock2.ogg"),new Audio("/sounds/Knock3.ogg"),new Audio("/sounds/Knock4.ogg")];return e.map(e=>{let{position:n,r,geometry:a}=e;return(0,s.jsx)(x,{position:n.map(e=>2*e),geometry:a,soundEffects:o,materials:t,r:r},JSON.stringify(n))})}function x(e){let{r:t,position:o,geometry:a,materials:l,soundEffects:i}=e,c=(0,n.useRef)(),[u,d]=(0,n.useState)(!1),p=x();function x(){return r.os.utils.random(l)}return(0,n.useEffect)(()=>{let e=r.os.context(()=>{d(!0),r.os.from(c.current.scale,{x:0,y:0,z:0,duration:1,ease:"elastic.out(1, 0.3)",delay:.1})});return()=>e.revert()},[]),(0,s.jsx)("group",{position:o,ref:c,children:(0,s.jsx)(m.n,{speed:5*t,rotationIntesity:6*t,floatIntensity:5*t,children:(0,s.jsx)("mesh",{geometry:a,onClick:function(e){let t=e.object;r.os.utils.random(i).play(),r.os.to(t.rotation,{x:"+=".concat(r.os.utils.random(0,2)),y:"+=".concat(r.os.utils.random(0,2)),z:"+=".concat(r.os.utils.random(0,2)),duration:2,ease:"elastic.out(1, 0.3)",yoyo:!0}),t.material=x()},onPointerOver:()=>{document.body.style.cursor="pointer"},onPointerOut:()=>{document.body.style.cursor="default"},material:p,visible:u})})})}let f=e=>{let{firstName:t,lastName:o,tagLine:l}=e;console.log(t,o,l);let i=(0,n.useRef)(null);(0,n.useEffect)(()=>{let e=r.os.context(()=>{let e=r.os.timeline();e.fromTo(".name-animation",{x:-100,opacity:0,rotate:-10},{x:0,opacity:1,rotate:0,ease:"elastic.out(1,0.2)",duration:1.5,transformOrigin:"left top",delay:.5,stagger:{each:.1,from:"random"}}),e.fromTo(".job-title",{y:20,opacity:0,scale:1.2},{y:0,opacity:1,scale:1,ease:"elastic.out(1,0.2)",duration:1})},i);return()=>e.revert()},[]);let c=(e,t)=>{if(e)return e.split("").map((e,o)=>(0,s.jsx)("span",{className:"name-animation name-animation-".concat(t," inline-block opacity-0"),children:e},o))};return(0,s.jsx)(a.A,{ref:i,children:(0,s.jsxs)("div",{className:"grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center",children:[(0,s.jsx)(d,{}),(0,s.jsxs)("div",{className:"col-start-1 md:row-start-1",children:[(0,s.jsxs)("h1",{className:"mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter",children:[(0,s.jsx)("span",{className:"block text-slate-300",children:c(t,"first")}),(0,s.jsx)("span",{className:"-mt-[.2em] block text-slate-500",children:c(o,"last")})]}),(0,s.jsx)("span",{className:"job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl",children:l})]})]})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[592,367,831,413,880,340,441,517,358],()=>t(2876)),_N_E=e.O()}]);