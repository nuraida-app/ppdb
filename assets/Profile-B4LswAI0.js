import{n as _,ak as K,r as a,B as k,j as t,P as S,O as d,T as w,q as l,t as v,D as z,af as L,ah as T,L as I,G as i}from"./index-BXyq61jM.js";import{R as $,d as W}from"./index-FV8UQ-dV.js";import{D as R}from"./Divider-0mtmT7-E.js";import{T as c}from"./Table-Nm2oIsnk.js";const A=()=>{const{user:s}=_(n=>n.user),[e,{data:x,isSuccess:y,error:h,isLoading:g}]=K(),[j,r]=a.useState(""),[u,m]=a.useState(""),[o,p]=a.useState(""),[b,P]=a.useState(""),D=n=>{n.preventDefault();const N={id:s.id,name:j,email:u,phone:o,password:b};e(N)};return a.useEffect(()=>{s&&(r(s==null?void 0:s.name),m(s==null?void 0:s.email),p(s==null?void 0:s.phone))},[s]),a.useEffect(()=>{y&&(k.success(x.message),window.location.reload()),h&&(k.error(h.data.message),console.log(h))},[x,y,h]),t.jsx(a.Fragment,{children:t.jsxs(S,{sx:{p:1},children:[t.jsx(d,{fontWeight:"bold",children:"User Info"}),t.jsxs("form",{className:"user-info",onSubmit:D,children:[t.jsx(w,{label:"Username",value:j||"",onChange:n=>r(n.target.value),slotProps:{inputLabel:{shrink:!0}}}),t.jsx(w,{label:"Email",value:u||"",onChange:n=>m(n.target.value),slotProps:{inputLabel:{shrink:!0}}}),t.jsx(w,{label:"No Whatsapp",type:"text",value:o||"",onChange:n=>p(n.target.value),slotProps:{inputLabel:{shrink:!0}}}),t.jsx(w,{label:"Password baru",type:"password",value:b||"",onChange:n=>P(n.target.value),slotProps:{inputLabel:{shrink:!0}}}),t.jsx(l,{alignSelf:"end",children:t.jsx(v,{variant:"contained",color:"success",type:"submit",children:g?t.jsx(z,{size:24}):"simpan"})})]})]})})},U=()=>{var g,j;const{user:s}=_(r=>r.user),{data:e}=L(s==null?void 0:s.id,{skip:!(s!=null&&s.id)}),{data:x}=T(),y=(j=(g=e==null?void 0:e.berkas)==null?void 0:g.find(r=>r.Foto))==null?void 0:j.Foto,h=a.useRef();return t.jsx(I,{children:t.jsxs(i,{container:!0,children:[t.jsxs(i,{item:!0,size:{xs:12,md:8},sx:{p:2},children:[t.jsx(l,{sx:{width:"100%",display:"flex",justifyContent:"end"},children:t.jsx($,{trigger:()=>t.jsx(v,{variant:"contained",color:"success",startIcon:t.jsx(W,{}),children:"Print"}),content:()=>h.current})}),t.jsxs(S,{ref:h,sx:{display:"flex",flexDirection:"column",px:2,py:2},children:[t.jsx(l,{sx:{display:"flex"},children:t.jsx("img",{src:x==null?void 0:x.kop_surat,style:{width:"100%",height:100,objectFit:"cover"}})}),t.jsx(R,{}),t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:`Kode Pendaftaran: ${e==null?void 0:e.kode_pendaftaran}`}),t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Data Diri"}),t.jsxs(l,{sx:{display:"flex",gap:1,p:1},children:[t.jsx(c,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jenjang"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.jenjang})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nama})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tempat Tgl Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`${e==null?void 0:e.tempat_lahir}, ${new Date(e==null?void 0:e.tanggal_lahir).toLocaleDateString("id-ID")}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jenis Kelamin"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:(e==null?void 0:e.kelamin)==="f"?"Perempuan":"Laki Laki"})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Agama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.agama})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Anak Ke"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.anak_ke})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jumlah Saudara"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.jml_saudara})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No Akta Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.no_akta})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No KK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.no_kk})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NIK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nik})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NISN"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nisn})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tinggi Badan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[e==null?void 0:e.tinggi," cm"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Berat Badan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[e==null?void 0:e.berat," kg"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Lingkar Kepala"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[e==null?void 0:e.kepala," cm"]})]})]})}),t.jsx("img",{src:y,style:{width:"150px",height:"152px",objectFit:"cover"}})]}),t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Alamat"}),t.jsx(l,{sx:{p:1},children:t.jsxs(i,{container:!0,children:[t.jsx(i,{item:!0,size:{xs:6,md:6},sx:{p:1},children:t.jsx(c,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Provinsi"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.provinsi})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kota / Kabupaten"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.regional})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kecamatan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.kecamatan})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Desa / Kelurahan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.desa})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Rw / Rt"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.rt_rw})]})]})})}),t.jsx(i,{item:!0,size:{xs:6,md:6},sx:{p:1},children:t.jsx(c,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Alamat"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.alamat})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kode Pos"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.kode_pos})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jarak Ke Sekolah"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[e==null?void 0:e.jarak," km"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Menit Ke Sekolah"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[e==null?void 0:e.menit," menit"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Transportasi"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.transportasi})]})]})})})]})}),t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Data Orang Tua"}),t.jsx(l,{sx:{p:1},children:t.jsxs(i,{container:!0,children:[t.jsxs(i,{item:!0,size:{xs:6,md:6},sx:{p:1},children:[t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Ayah"}),t.jsx(c,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NIK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nik_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nama_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tempat Tanggal Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`${e==null?void 0:e.lahir_ayah}, ${new Date(e==null?void 0:e.tanggal_ayah).toLocaleDateString("id-ID")}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pendidikan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.pendidikan_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pekerjaan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.pekerjaan_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Penghasilan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`Rp ${e==null?void 0:e.penghasilan_ayah}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No Tlp"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.tlp_ayah})]})]})})]}),t.jsxs(i,{item:!0,size:{xs:6,md:6},sx:{p:1},children:[t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Ibu"}),t.jsx(c,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NIK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nik_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nama_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tempat Tanggal Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`${e==null?void 0:e.lahir_ibu}, ${new Date(e==null?void 0:e.tanggal_ibu).toLocaleDateString("id-ID")}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pendidikan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.pendidikan_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pekerjaan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.pekerjaan_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Penghasilan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`Rp ${e==null?void 0:e.penghasilan_ibu}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No Tlp"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.tlp_ibu})]})]})})]})]})}),t.jsx(d,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Lainnya"}),t.jsx(l,{sx:{p:1},children:t.jsx(i,{container:!0,children:t.jsxs(i,{item:!0,size:{xs:6,md:6},sx:{p:1},children:[t.jsx(d,{ariant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Sekolah Asal"}),t.jsx(c,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NPSN"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.npsn})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama Sekolah"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.nama_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Provinsi"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.provinsi_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kota / Kabupaten"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.regional_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kecamatan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.kec_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Desa / Kelurahan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:e==null?void 0:e.desa_sekolah})]})]})})]})})}),t.jsx(d,{fontSize:12,children:"* Dengan ini saya menyatakan bahwa data yang diisikan adalah benar dan sesuai dengan dokumen yang dilampirkan"}),t.jsxs(l,{alignSelf:"end",sx:{height:100,mt:1,display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[t.jsx(d,{fontSize:12,children:`${e==null?void 0:e.regional}, ${new Date(e==null?void 0:e.createdat).toLocaleDateString("id-ID")}`}),t.jsx(d,{align:"center",fontSize:12,children:"(.................................)"})]})]})]}),t.jsx(i,{item:!0,size:{xs:12,md:4},sx:{p:2},children:t.jsx(A,{})})]})})};export{U as default};
