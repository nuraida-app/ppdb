import{r as i,e as z,aR as G,aS as H,aT as R,B as n,j as s,P as y,O as _,G as x,q as P,X as k,D as S,t as v}from"./index-ptVWyzqq.js";import{L as D}from"./Layout-8rPJRVNh.js";import{E as q}from"./Editor-gzpnExk5.js";import{d as A}from"./EditOutlined-CQTp9b6e.js";import{d as K}from"./DoNotDisturbOnOutlined-Cx6WShQM.js";import{T as Q}from"./TableContainer-DvT8E7Np.js";import{T as W}from"./Table-B3F95sbF.js";import{T as N}from"./TableHead-BLp_PiE7.js";import{T as C,a as l,b as O}from"./TableRow-DnCyyA8q.js";import"./WhatsApp-DyDDWVRW.js";import"./index-GXd81pyf.js";import"./quill.snow-CKmEs_7h.js";const V=[{label:"No",width:80},{label:"Konten",width:100},{label:"Aksi",width:120}],X=t=>({__html:t}),os=()=>{const t="persyaratan",[o,h]=i.useState(""),{data:d}=z(t),{data:a}=G(o,{skip:!o});console.log(a);const[E,{data:j,isSuccess:f,error:c,isLoading:w,reset:p}]=H(),[L,{data:g,isSuccess:b,error:u,isLoading:B}]=R(),[T,m]=i.useState(""),I=()=>{E({category:t,value:T,id:o||null})},M=e=>{L({id:e,category:t})};return i.useEffect(()=>{a&&m(a==null?void 0:a.teks)},[a]),i.useEffect(()=>{f&&(n.success(j.message),m(""),h(""),p()),c&&(p(),n.error(c.data.message))},[f,c,j]),i.useEffect(()=>{b&&n.success(g.message),u&&n.error(u.data.message)},[b,u,g]),s.jsxs(D,{children:[s.jsx(y,{sx:{p:1,mb:1},children:s.jsx(_,{variant:"h6",fontWeight:"bold",children:"Informasi Persyaratan"})}),s.jsxs(x,{container:!0,children:[s.jsx(x,{item:!0,size:{xs:12,md:8},children:s.jsx(y,{children:s.jsx(Q,{children:s.jsxs(W,{children:[s.jsx(N,{children:s.jsx(C,{children:V.map((e,r)=>s.jsx(l,{align:"center",sx:{minWidth:e.width},children:e.label},r))})}),s.jsx(O,{children:d==null?void 0:d.map((e,r)=>s.jsxs(C,{children:[s.jsx(l,{align:"center",children:r+1}),s.jsx(l,{children:s.jsx(P,{dangerouslySetInnerHTML:X(e.teks)})}),s.jsxs(l,{align:"center",children:[s.jsx(k,{color:"warning",onClick:()=>h(e.id),children:s.jsx(A,{})}),s.jsx(k,{color:"error",onClick:()=>M(e.id),children:B?s.jsx(S,{size:24}):s.jsx(K,{})})]})]},r))})]})})})}),s.jsxs(x,{item:!0,size:{xs:12,md:4},sx:{px:2},children:[s.jsx(q,{placeholder:"Ketik Di Sini...",value:T,onChange:e=>m(e)}),s.jsx(P,{sx:{display:"flex",justifyContent:"end",mt:1},children:s.jsx(v,{variant:"contained",color:"success",onClick:I,children:w?s.jsx(S,{size:24}):"Simpan"})})]})]})]})};export{os as default};
