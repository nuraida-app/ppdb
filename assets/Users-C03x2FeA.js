import{b as p,r as a,j as t}from"./index-BU72W7iL.js";import{L as j,M as b}from"./Layout-BH6RVc04.js";import{T as u}from"./TableContainer-DJzRKzDr.js";const w=()=>{const[n,{data:r={},isLoading:f}]=p(),{users:i=[],totalPages:o=1}=r,[e,d]=a.useState(1),[c,h]=a.useState(10),[l,x]=a.useState("");return a.useEffect(()=>{n({page:e,limit:c,search:l})},[e,c,l]),t.jsx(j,{title:"Daftar Pengguna",children:t.jsx("div",{className:"container-fluid",children:t.jsx(u,{page:e,totalPages:o,setPage:s=>d(s),setLimit:s=>h(s),onValue:s=>x(s),children:t.jsxs("table",{className:"table table-striped table-hover mt-2",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{scope:"col",children:"#"}),t.jsx("th",{scope:"col",children:"Kode User"}),t.jsx("th",{scope:"col",children:"Nama"}),t.jsx("th",{scope:"col",children:"Email"}),t.jsx("th",{scope:"col",children:"WhatsApp"})]})}),t.jsx("tbody",{children:i.map((s,m)=>t.jsxs("tr",{children:[t.jsx("th",{scope:"row",children:(e-1)*c+m+1}),t.jsx("td",{className:"text-center",children:s.id}),t.jsx("td",{className:"text-start",children:s.nama}),t.jsx("td",{className:"text-start",children:s.email}),t.jsx("td",{children:t.jsxs("button",{className:"btn btn-success",onClick:()=>window.open(`https://wa.me/${s.tlp}`,"_blank"),children:[t.jsx(b,{})," ",s.tlp]})})]},s.id))})]})})})})};export{w as default};
