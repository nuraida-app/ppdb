import{r as i,e as z,aR as G,aS as H,aT as _,B as n,j as s,P as y,O as v,G as x,q as P,X as k,D as S,t as D}from"./index-ptVWyzqq.js";import{L as R}from"./Layout-8rPJRVNh.js";import{E as A}from"./Editor-gzpnExk5.js";import{d as K}from"./EditOutlined-CQTp9b6e.js";import{d as Q}from"./DoNotDisturbOnOutlined-Cx6WShQM.js";import{T as W}from"./TableContainer-DvT8E7Np.js";import{T as q}from"./Table-B3F95sbF.js";import{T as F}from"./TableHead-BLp_PiE7.js";import{T as C,a as l,b as N}from"./TableRow-DnCyyA8q.js";import"./WhatsApp-DyDDWVRW.js";import"./index-GXd81pyf.js";import"./quill.snow-CKmEs_7h.js";const O=[{label:"No",width:80},{label:"Konten",width:100},{label:"Aksi",width:120}],V=t=>({__html:t}),os=()=>{const t="pembayaran",[o,h]=i.useState(""),{data:d}=z(t),{data:a}=G(o,{skip:!o});console.log(a);const[E,{data:j,isSuccess:f,error:c,isLoading:w,reset:p}]=H(),[L,{data:g,isSuccess:b,error:m,isLoading:B}]=_(),[T,u]=i.useState(""),I=()=>{E({category:t,value:T,id:o||null})},M=e=>{L({id:e,category:t})};return i.useEffect(()=>{a&&u(a==null?void 0:a.teks)},[a]),i.useEffect(()=>{f&&(n.success(j.message),u(""),h(""),p()),c&&(p(),n.error(c.data.message))},[f,c,j]),i.useEffect(()=>{b&&n.success(g.message),m&&n.error(m.data.message)},[b,m,g]),s.jsxs(R,{children:[s.jsx(y,{sx:{p:1,mb:1},children:s.jsx(v,{fontWeight:"bold",variant:"h6",children:"Informasi Pembayaran"})}),s.jsxs(x,{container:!0,children:[s.jsx(x,{item:!0,size:{xs:12,md:8},children:s.jsx(y,{children:s.jsx(W,{children:s.jsxs(q,{children:[s.jsx(F,{children:s.jsx(C,{children:O.map((e,r)=>s.jsx(l,{align:"center",sx:{minWidth:e.width},children:e.label},r))})}),s.jsx(N,{children:d==null?void 0:d.map((e,r)=>s.jsxs(C,{children:[s.jsx(l,{align:"center",children:r+1}),s.jsx(l,{children:s.jsx(P,{dangerouslySetInnerHTML:V(e.teks)})}),s.jsxs(l,{align:"center",children:[s.jsx(k,{color:"warning",onClick:()=>h(e.id),children:s.jsx(K,{})}),s.jsx(k,{color:"error",onClick:()=>M(e.id),children:B?s.jsx(S,{size:24}):s.jsx(Q,{})})]})]},r))})]})})})}),s.jsxs(x,{item:!0,size:{xs:12,md:4},sx:{px:2},children:[s.jsx(A,{placeholder:"Ketik Di Sini...",value:T,onChange:e=>u(e)}),s.jsx(P,{sx:{display:"flex",justifyContent:"end",mt:1},children:s.jsx(D,{variant:"contained",color:"success",onClick:I,children:w?s.jsx(S,{size:24}):"Simpan"})})]})]})]})};export{os as default};
