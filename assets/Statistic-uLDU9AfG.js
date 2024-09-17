import{aK as E,aL as B,ad as G,r as d,aM as K,j as e,ab as U,aN as W,aI as $,P as g,d as k,T as F,J as O,aO as Q,s as y,G as v}from"./index-C2nBX7QG.js";import{L as H}from"./Layout-C20c01LT.js";import{T as I}from"./TableContainer-F9nuIoYK.js";import{T as z}from"./Table-D9-S9Xm5.js";import{T as N}from"./TableHead-BKk-Fma7.js";import{c as J,T as f,a as c,b as M}from"./TableRow-BPe-Hqaj.js";import{T as Y}from"./TablePagination-CEIneJeT.js";function q(t){return E("MuiTableFooter",t)}B("MuiTableFooter",["root"]);const A=t=>{const{classes:r}=t;return W({root:["root"]},q,r)},V=G("tfoot",{name:"MuiTableFooter",slot:"Root",overridesResolver:(t,r)=>r.root})({display:"table-footer-group"}),X={variant:"footer"},L="tfoot",Z=d.forwardRef(function(r,j){const a=K({props:r,name:"MuiTableFooter"}),{className:p,component:n=L,...m}=a,l={...a,component:n},i=A(l);return e.jsx(J.Provider,{value:X,children:e.jsx(V,{as:n,className:U(i.root,p),ref:j,role:n===L?null:"rowgroup",ownerState:l,...m})})}),R=()=>new Date().toISOString().slice(0,10),_=()=>{const{data:t,isLoading:r,error:j}=$(),[a,p]=d.useState(R()),[n,m]=d.useState(R()),i=(()=>{const s=t==null?void 0:t.filter(x=>{const o=new Date(x.createdat),h=a?new Date(a):null,w=n?new Date(n):null,C=u=>new Date(u.getFullYear(),u.getMonth(),u.getDate()),b=C(o),D=h?C(h):null,T=w?C(w):null;return D&&T?b>=D&&b<=T:D?b>=D:T?b<=T:!0});return console.log("Filtered Result:",s),s})(),S=i==null?void 0:i.reduce((s,x)=>s+Number(x.nominal),0);return e.jsxs(g,{sx:{px:1,py:2},children:[e.jsxs(k,{sx:{display:"flex",justifyContent:"space-between",gap:2},children:[e.jsx(F,{type:"date",size:"small",label:"Dari",slotProps:{inputLabel:{shrink:!0}},value:a,onChange:s=>p(s.target.value)}),e.jsx(F,{type:"date",size:"small",label:"Sampai",slotProps:{inputLabel:{shrink:!0}},value:n,onChange:s=>m(s.target.value)})]}),e.jsx(I,{children:e.jsxs(z,{children:[e.jsx(N,{children:e.jsx(f,{children:["No","Nama","Nominal","Tanggal"].map(s=>e.jsx(c,{align:"center",children:s},s))})}),e.jsx(M,{children:i==null?void 0:i.map((s,x)=>e.jsxs(f,{children:[e.jsx(c,{align:"center",children:x+1}),e.jsx(c,{children:s.nama}),e.jsx(c,{align:"center",children:`Rp ${parseFloat(s.nominal).toLocaleString("id-ID")}`}),e.jsx(c,{align:"center",children:new Date(s.createdat).toLocaleDateString("id-ID")})]},x))}),e.jsx(Z,{children:e.jsx(f,{children:e.jsxs(c,{colSpan:4,children:[e.jsx("p",{children:`Laporan Tanggal: ${new Date(a).toLocaleDateString("id-ID")} - ${new Date(n).toLocaleDateString("id-ID")}`}),e.jsx("p",{children:`Pendapatan: Rp ${parseFloat(S).toLocaleString("id-ID")}`})]})})})]})})]})},P=({data:t})=>{const[r,j]=d.useState(""),[a,p]=d.useState(0),[n,m]=d.useState(10),[l,i]=d.useState([]);d.useEffect(()=>{const o=t==null?void 0:t.filter(h=>h.nama.toLowerCase().includes(r.toLowerCase()));i(o)},[r,t]);const S=o=>{j(o.target.value)},s=(o,h)=>{p(h)},x=o=>{m(parseInt(o.target.value,10)),p(0)};return e.jsxs(g,{children:[e.jsx(O,{placeholder:"Search",variant:"outlined",value:r,onChange:S,margin:"normal",sx:{m:1}}),e.jsx(I,{children:e.jsxs(z,{children:[e.jsx(N,{children:e.jsxs(f,{children:[e.jsx(c,{align:"center",children:"Nama"}),e.jsx(c,{align:"center",children:"Total"})]})}),e.jsx(M,{children:l==null?void 0:l.slice(a*n,a*n+n).map((o,h)=>e.jsxs(f,{children:[e.jsx(c,{children:o.nama}),e.jsx(c,{align:"center",children:o.total})]},h))})]})}),e.jsx(Y,{rowsPerPageOptions:[5,10,25],component:"div",count:l==null?void 0:l.length,rowsPerPage:n,page:a,onPageChange:s,onRowsPerPageChange:x})]})},ee=()=>{const{data:t}=Q();return e.jsxs(d.Fragment,{children:[e.jsxs(g,{sx:{p:1},children:[e.jsx(y,{fontWeight:"bold",children:"Provinsi"}),t&&e.jsx(P,{data:t==null?void 0:t.provinsi})]}),e.jsxs(g,{sx:{p:1},children:[e.jsx(y,{fontWeight:"bold",children:"Kota / Kabupaten"}),t&&e.jsx(P,{data:t==null?void 0:t.regional})]}),e.jsxs(g,{sx:{p:1},children:[e.jsx(y,{fontWeight:"bold",children:"Kecamatan"}),t&&e.jsx(P,{data:t==null?void 0:t.kecamatan})]}),e.jsxs(g,{sx:{p:1},children:[e.jsx(y,{fontWeight:"bold",children:"Desa"}),t&&e.jsx(P,{data:t==null?void 0:t.desa})]})]})},ie=()=>e.jsx(H,{children:e.jsxs(v,{container:!0,children:[e.jsx(v,{item:!0,size:{xs:12,md:7},sx:{p:1},children:e.jsx(_,{})}),e.jsx(v,{item:!0,size:{xs:12,md:5},sx:{p:1,display:"flex",flexDirection:"column",gap:1},children:e.jsx(ee,{})})]})});export{ie as default};
