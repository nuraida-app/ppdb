import{bD as W,r as t,bE as Q,bF as U,bG as X,B as l,j as e,P as q,O as z,$ as J,X as V,ag as Y,M as i}from"./index-BXyq61jM.js";import{L as Z}from"./Layout-DLzo3XWz.js";import{d as ee}from"./MoreVert-D97arJl5.js";/* empty css               */import{T as ae}from"./TableContainer-CS2vQYjH.js";import{T as se}from"./Table-Nm2oIsnk.js";import{T as te}from"./TableHead-Bmx1h48_.js";import{T as E,a as r,b as re}from"./TableRow-BKcfXV0Y.js";import{T as ne}from"./TablePagination-BPt0HHM0.js";import"./WhatsApp-CeeFueyS.js";import"./KeyboardArrowRight-D-ilXLmr.js";const oe=[{label:"No",width:40},{label:"Kode Pendaftaran",width:80},{label:"Pendaftar",width:120},{label:"Asal Sekolah",width:120},{label:"Status",width:80},{label:"Aksi",width:30}],be=()=>{var y;const M=W(),[b,f]=t.useState(null),[d,I]=t.useState(""),[_,B]=t.useState(""),[P,L]=t.useState(""),[c,w]=t.useState(0),[o,N]=t.useState(10),u=!!b,A=(a,s,j)=>{f(a.currentTarget),I(s),B(j)},h=()=>{f(null)},[H,{data:C,isSuccess:T,error:p,reset:S}]=Q(),[$,{data:k,isSuccess:v,error:m,reset:R}]=U(),{data:g}=X(),x=g==null?void 0:g.filter(a=>a.status_pendaftaran==="Diproses"),n=x==null?void 0:x.filter(a=>a.kode_pendaftaran.toLowerCase().includes(P.toLowerCase())),D=()=>{H(d),h()},F=()=>{$(d),h()};t.useEffect(()=>{T&&(l.success(C.message),S()),p&&(l.error(p.data.message),S())},[C,T,p]),t.useEffect(()=>{v&&(l.success(k.message),R()),m&&(l.error(m.data.message),R())},[k,v,m]);const G=(a,s)=>{w(s)},K=a=>{N(parseInt(a.target.value,10)),w(0)},O=()=>{const a=_.replace(/\s+/g,"-");M(`/admin/pelajar/${d}/${a}`)};return e.jsxs(Z,{children:[e.jsxs(q,{sx:{p:1},children:[e.jsx(z,{variant:"h6",fontWeight:"bold",children:"Pendaftar"}),e.jsx(J,{type:"text",placeholder:"Kode Pendaftaran",value:P,onChange:a=>L(a.target.value),sx:{my:1}}),e.jsx(ae,{children:e.jsxs(se,{children:[e.jsx(te,{children:e.jsx(E,{children:oe.map((a,s)=>e.jsx(r,{align:"center",sx:{minWidth:a.width},children:a.label},s))})}),e.jsx(re,{children:(y=n==null?void 0:n.slice(c*o,c*o+o))==null?void 0:y.map((a,s)=>e.jsxs(E,{children:[e.jsx(r,{align:"center",children:c*o+s+1}),e.jsx(r,{align:"center",children:a.kode_pendaftaran}),e.jsx(r,{children:a.nama}),e.jsx(r,{children:a.nama_sekolah}),e.jsx(r,{align:"center",children:e.jsx("div",{className:"menunggu",children:a.status_pendaftaran})}),e.jsx(r,{align:"center",children:e.jsx(V,{color:"primary",id:"basic-button","aria-controls":u?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":u?"true":void 0,onClick:j=>A(j,a.userid,a.nama),children:e.jsx(ee,{})})})]},s))})]})}),e.jsx(ne,{component:"div",count:(n==null?void 0:n.length)||0,page:c,onPageChange:G,rowsPerPage:o,onRowsPerPageChange:K,rowsPerPageOptions:[10,25,50],labelRowsPerPage:"Rows per page"})]}),e.jsxs(Y,{id:"basic-menu",anchorEl:b,open:u,onClose:h,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(i,{onClick:D,children:"Diterima"}),e.jsx(i,{onClick:F,children:"Ditolak"}),e.jsx(i,{children:"Berkas"}),e.jsx(i,{onClick:O,children:"Detail"})]})]})};export{be as default};
