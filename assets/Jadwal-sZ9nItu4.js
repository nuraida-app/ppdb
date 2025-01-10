import{r as t,y as F,z as G,A as z,C as U,B as v,j as e}from"./index-BU72W7iL.js";import{L as V,F as W}from"./Layout-BH6RVc04.js";import{I as X}from"./index-5OSzw95J.js";import{T as Y}from"./TableContainer-DJzRKzDr.js";import{M as N}from"./ModalComponent-DmMY5IEY.js";import{S as Z}from"./Spinner-BvbD9S2I.js";const le=()=>{const[m,S]=t.useState(1),[w,k]=t.useState(10),[C,T]=t.useState(""),[c,l]=t.useState(null),[j,n]=t.useState(""),[x,d]=t.useState("default"),[p,o]=t.useState(""),[b,r]=t.useState("default"),[g,i]=t.useState(""),{data:M={}}=F({page:m,limit:w,search:C}),{schedules:P=[],totalPages:D=null}=M,{data:s}=G(c,{skip:!c}),[L,{data:q,isSuccess:u,isLoading:A,error:E,reset:H}]=z(),[I,{data:J,isSuccess:f,isLoading:K,error:h,reset:y}]=U(),O=()=>{L({id:c,name:p,time:j,type:x,quota:g,mode:b})},Q=a=>{I(a)},R=()=>{l(null),o(""),n(""),d("default"),i(""),r("default")};return t.useEffect(()=>{u&&(l(null),n(""),d("default"),o(""),r("default"),i("")),f&&(v.success(J.message),y()),h&&(v.error(h.data.message),y())},[u,f,h]),t.useEffect(()=>{s&&(l(s.id),o(s.kegiatan),n(new Date(s.waktu).toISOString().slice(0,10)),d(s.jenis),i(s.kuota),r(s.mode))},[s]),e.jsxs(V,{title:"Penjadwalan",children:[e.jsxs("div",{className:"container-fluid",children:[e.jsxs("div",{className:"container d-flex align-items-center justify-content-between mb-3",children:[e.jsx("p",{className:"m-0 fw-bold",children:"Penjadwalan Waktu Tes"}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#jadwal",children:[e.jsx(X,{})," Tambah"]}),e.jsxs("button",{className:"btn btn-danger","data-bs-toggle":"modal","data-bs-target":"#hapus",children:[e.jsx(W,{})," Hapus"]})]})]}),e.jsx(Y,{page:m,totalPages:D,setPage:a=>S(a),setLimit:a=>k(a),onValue:a=>T(a),children:e.jsxs("table",{className:"table table-striped table-hover mt-2",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:50},scope:"col",children:"#"}),e.jsx("th",{scope:"col",children:"Kegiatan"}),e.jsx("th",{scope:"col",children:"Jenis"}),e.jsx("th",{scope:"col",children:"Kuota"}),e.jsx("th",{scope:"col",children:"Jadwal"}),e.jsx("th",{scope:"col",children:"Peserta"}),e.jsx("th",{scope:"col",children:"Aksi"})]})}),e.jsx("tbody",{children:P.map((a,B)=>e.jsxs("tr",{children:[e.jsx("th",{scope:"row",children:B+1}),e.jsx("td",{style:{textAlign:"start"},children:a.kegiatan}),e.jsx("td",{children:a.jenis}),e.jsx("td",{children:a.kuota}),e.jsx("td",{children:new Date(a.waktu).toDateString("id-ID")}),e.jsx("td",{children:a.peserta}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex align-items-center justify-content-center gap-2",children:[e.jsx("button",{className:"btn btn-warning","data-bs-toggle":"modal","data-bs-target":"#jadwal",onClick:()=>l(a.id),children:"Edit"}),e.jsx("button",{className:"btn btn-danger",disabled:!!K,onClick:()=>Q(a.id),children:"Hapus"})]})})]},a.id))})]})})]}),e.jsxs(N,{id:"jadwal",title:"Tambah Jadwal Tes",data:q,isSuccess:u,error:E,reset:H,children:[e.jsxs("div",{className:"modal-body d-flex flex-column gap-3",children:[e.jsx("input",{className:"form-control",type:"date",name:"date",id:"date",required:!0,value:j,onChange:a=>n(a.target.value)}),e.jsxs("select",{className:"form-select","aria-label":"Default select example",required:!0,value:x,onChange:a=>d(a.target.value),children:[e.jsx("option",{value:"default",children:"Pilih Kegiatan"}),e.jsx("option",{value:"tes",children:"Tes Tulis"}),e.jsx("option",{value:"mcu",children:"MCU"})]}),e.jsxs("select",{className:"form-select","aria-label":"Default select example",required:!0,value:b,onChange:a=>r(a.target.value),children:[e.jsx("option",{value:"default",children:"Pilih Moda"}),e.jsx("option",{value:"online",children:"Online"}),e.jsx("option",{value:"offline",children:"Offline"})]}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Nama Kegiatan",required:!0,value:p,onChange:a=>o(a.target.value)}),e.jsx("input",{type:"number",className:"form-control",placeholder:"kuota",required:!0,value:g,onChange:a=>i(a.target.value)})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",onClick:R,children:"Tutup"}),e.jsx("button",{type:"button",className:"btn btn-primary",onClick:O,children:A?e.jsx(Z,{}):"Simpan"})]})]}),e.jsxs(N,{id:"hapus",title:"Hapus seluruh data penjadwalan",children:[e.jsx("div",{className:"modal-body",children:"Apakah anda yakin ingin menghapus seluruh data penjadwalan?"}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Batalkan"}),e.jsx("button",{type:"button",className:"btn btn-danger",children:"Hapus"})]})]})]})};export{le as default};
