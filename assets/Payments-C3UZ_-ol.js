import{aI as v,aJ as L,r as i,B as x,j as e,P as R,d as y,J as B,e as j,s as I}from"./index-C2nBX7QG.js";import{L as N}from"./Layout-C20c01LT.js";import{T as E}from"./TableContainer-F9nuIoYK.js";import{T as D}from"./Table-D9-S9Xm5.js";import{T as J}from"./TableHead-BKk-Fma7.js";import{T,a as r,b as _}from"./TableRow-BPe-Hqaj.js";import{T as A}from"./TablePagination-CEIneJeT.js";const z=()=>{const{data:c}=v(),[P,{data:d,isSuccess:g,isLoading:F,error:l,reset:m}]=L(),[o,u]=i.useState(0),[n,f]=i.useState(10),[p,b]=i.useState(""),C=a=>{P(a)};i.useEffect(()=>{g&&(x.success(d.message),m()),l&&(x.error(l.data.message),m())},[d,g,l]);const k=(a,t)=>{u(t)},w=a=>{f(parseInt(a.target.value,10)),u(0)},S=a=>{b(a.target.value)},s=c==null?void 0:c.filter(a=>a.nama.toLowerCase().includes(p.toLowerCase())),h=s==null?void 0:s.slice(o*n,o*n+n);return e.jsx(N,{children:e.jsxs(R,{children:[e.jsx(y,{p:2,children:e.jsx(B,{type:"text",placeholder:"Cari Bedasarkan Nama",value:p,onChange:S})}),e.jsx(E,{children:e.jsxs(D,{children:[e.jsx(J,{children:e.jsx(T,{children:["No","Nama","Nominal","Berkas","Status","Aksi"].map(a=>e.jsx(r,{align:"center",children:a},a))})}),e.jsx(_,{children:h==null?void 0:h.map((a,t)=>e.jsxs(T,{children:[e.jsx(r,{align:"center",children:o*n+t+1}),e.jsx(r,{children:a.nama}),e.jsx(r,{align:"center",children:`Rp ${parseFloat(a.nominal).toLocaleString("id-ID")}`}),e.jsx(r,{align:"center",children:e.jsx(j,{variant:"contained",color:"primary",href:a.bukti,target:"_blank",rel:"noopener noreferrer",children:"Link"})}),e.jsx(r,{align:"center",children:e.jsx(I,{children:a.status})}),e.jsx(r,{align:"center",children:e.jsx(j,{variant:"contained",color:a.status==="Terkonfirmasi"?"success":"error",onClick:()=>C(a.user_id),children:a.status==="Terkonfirmasi"?"Diterima":"Terima"})})]},t))})]})}),e.jsx(A,{component:"div",count:(s==null?void 0:s.length)||0,page:o,onPageChange:k,rowsPerPage:n,onRowsPerPageChange:w,rowsPerPageOptions:[10,20,50,100],labelRowsPerPage:"Tampilkan baris"})]})})};export{z as default};
