import{r as a,ac as G,aL as I,aM as M,aN as P,B as i,j as e,G as x,P as y,X as m,D as Y,q as C,$ as A,aK as D}from"./index-ptVWyzqq.js";import{L as H}from"./Layout-8rPJRVNh.js";import{d as N}from"./Add-BWhOjPM4.js";import{d as _}from"./EditOutlined-CQTp9b6e.js";import{d as $}from"./DoNotDisturbOnOutlined-Cx6WShQM.js";import{T as q}from"./TableContainer-DvT8E7Np.js";import{T as w}from"./Table-B3F95sbF.js";import{T as Q}from"./TableHead-BLp_PiE7.js";import{T as E,a as n,b as R}from"./TableRow-DnCyyA8q.js";import"./WhatsApp-DyDDWVRW.js";const se=()=>{const[r,l]=a.useState(""),[j,o]=a.useState(""),{data:d}=G(),{data:t}=I(r,{skip:!r}),[L,{data:p,isSuccess:f,error:c,isLoading:S,reset:h}]=M(),[z,{data:g,isSuccess:b,error:u,isLoading:k}]=P(),v=s=>{s.preventDefault(),L({id:r||null,name:j})},B=s=>{z(s)};return a.useEffect(()=>{t&&(l(t.id),o(t.tapel))},[t]),a.useEffect(()=>{f&&(i.success(p.message),o(""),l(""),h()),c&&(i.error(c.data.message),h())},[p,c,f]),a.useEffect(()=>{b&&i.success(g.message),u&&i.error(u.data.message)},[g,u,b]),e.jsx(H,{children:e.jsxs(x,{container:!0,children:[e.jsx(x,{item:!0,size:{xs:12,md:8},children:e.jsx(y,{children:e.jsx(q,{children:e.jsxs(w,{children:[e.jsx(Q,{children:e.jsx(E,{children:["No","Tahun Pelajaran","Aksi"].map(s=>e.jsx(n,{align:"center",children:s},s))})}),e.jsx(R,{children:d==null?void 0:d.map((s,T)=>e.jsxs(E,{children:[e.jsx(n,{align:"center",children:T+1}),e.jsx(n,{align:"center",children:s.tapel}),e.jsxs(n,{align:"center",children:[e.jsx(m,{color:"warning",onClick:()=>l(s.id),children:e.jsx(_,{})}),e.jsx(m,{color:"error",onClick:()=>B(s.id),children:k?e.jsx(Y,{size:24}):e.jsx($,{})})]})]},s.id))})]})})})}),e.jsx(x,{item:!0,size:{xs:12,md:4},sx:{px:4},children:e.jsx(y,{sx:{p:1},children:e.jsx("form",{onSubmit:v,children:e.jsxs(C,{sx:{display:"flex",gap:1},children:[e.jsx(A,{required:!0,fullWidth:!0,type:"text",placeholder:"Tambah Jenjang",value:j||"",onChange:s=>o(s.target.value)}),e.jsxs(C,{sx:{position:"relative",display:"inline-flex"},children:[e.jsx(m,{type:"submit",color:"success",children:e.jsx(N,{})}),S&&e.jsx(Y,{size:45,sx:{color:D[500],position:"absolute",top:-2.5,left:-2,transform:"translate(-50%, -50%)",zIndex:1}})]})]})})})})]})})};export{se as default};
