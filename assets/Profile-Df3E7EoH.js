import{j as t,r as y,P as r,s as e,T as x,d as n,e as w,a as m,V as u,L as p,G as d}from"./index-C2nBX7QG.js";import{R as b,d as o,D as k}from"./LocalPrintshop-B5Ui9tOG.js";import{T as l}from"./Table-D9-S9Xm5.js";const _=()=>t.jsx(y.Fragment,{children:t.jsxs(r,{sx:{p:1},children:[t.jsx(e,{fontWeight:"bold",children:"User Info"}),t.jsxs("form",{className:"user-info",children:[t.jsx(x,{label:"Email"}),t.jsx(x,{label:"Password lama"}),t.jsx(x,{label:"Password baru"}),t.jsx(n,{alignSelf:"end",children:t.jsx(w,{variant:"contained",color:"success",children:"Update"})})]})]})}),v=()=>{var c,j;const{user:i}=m(h=>h.user),{data:s}=u(i==null?void 0:i.id,{skip:!(i!=null&&i.id)}),g=(j=(c=s==null?void 0:s.berkas)==null?void 0:c.find(h=>h.Foto))==null?void 0:j.Foto,a=y.useRef();return t.jsx(p,{children:t.jsxs(d,{container:!0,children:[t.jsxs(d,{item:!0,size:{xs:12,md:8},sx:{p:2},children:[t.jsx(n,{sx:{width:"100%",display:"flex",justifyContent:"end"},children:t.jsx(b,{trigger:()=>t.jsx(w,{variant:"contained",color:"success",startIcon:t.jsx(o,{}),children:"Print"}),content:()=>a.current})}),t.jsxs(r,{ref:a,sx:{display:"flex",flexDirection:"column",gap:1,px:2,py:2},children:[t.jsxs(n,{sx:{display:"flex",gap:1},children:[t.jsx("img",{src:"/nibs.png",style:{width:80,height:80,objectFit:"cover"}}),t.jsxs(n,{sx:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[t.jsx(e,{variant:"h6",fontSize:14,children:"YAYASAN IZZATUL MUHSININ"}),t.jsx(e,{variant:"subtitle1",fontSize:12,children:"NURAIDA ISLAMIC BOARDING SCHOOL"}),t.jsx(e,{variant:"subtitle2",fontSize:10,children:"Membina Generasi Rabbani, Berpertasi Menuju Ridho Ilahi"}),t.jsx(e,{variant:"body2",fontSize:8,children:"Jl Guru Mukhtar No 01 Rt 03 Rw 03 Kp Petir Kel Cimahpar Kec Bogor Utara Kota Bogor"})]})]}),t.jsx(k,{}),t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:`Kode Pendaftaran: ${s==null?void 0:s.kode_pendaftaran}`}),t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Data Diri"}),t.jsxs(n,{sx:{display:"flex",gap:1,p:1},children:[t.jsx(l,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jenjang"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.jenjang})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nama})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tempat Tanggal Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.tempat_lahir})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jenis Kelamin"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:(s==null?void 0:s.kelamin)==="f"?"Perempuan":"Laki Laki"})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Agama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.agama})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Anak Ke"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.anak_ke})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jumlah Saudara"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.jml_saudara})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No Akta Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.no_akta})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No KK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.no_kk})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NIK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nik})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NISN"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nisn})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tinggi Badan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[s==null?void 0:s.tinggi," cm"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Berat Badan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[s==null?void 0:s.berat," kg"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Lingkar Kepala"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[s==null?void 0:s.kepala," cm"]})]})]})}),t.jsx("img",{src:g,style:{width:"150px",height:"152px",objectFit:"cover"}})]}),t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Alamat"}),t.jsx(n,{sx:{p:1},children:t.jsxs(d,{container:!0,children:[t.jsx(d,{item:!0,size:{xs:6,md:6},sx:{p:1},children:t.jsx(l,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Provinsi"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.provinsi})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kota / Kabupaten"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.regional})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kecamatan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.kecamatan})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Desa / Kelurahan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.desa})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Rw / Rt"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.rt_rw})]})]})})}),t.jsx(d,{item:!0,size:{xs:6,md:6},sx:{p:1},children:t.jsx(l,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Alamat"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.alamat})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kode Pos"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.kode_pos})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Jarak Ke Sekolah"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[s==null?void 0:s.jarak," km"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Menit Ke Sekolah"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsxs("td",{children:[s==null?void 0:s.menit," menit"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Transportasi"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.transportasi})]})]})})})]})}),t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Data Orang Tua"}),t.jsx(n,{sx:{p:1},children:t.jsxs(d,{container:!0,children:[t.jsxs(d,{item:!0,size:{xs:6,md:6},sx:{p:1},children:[t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Ayah"}),t.jsx(l,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NIK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nik_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nama_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tempat Tanggal Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`${s==null?void 0:s.lahir_ayah}, ${new Date(s==null?void 0:s.tanggal_ayah).toLocaleDateString("id-ID")}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pendidikan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.pendidikan_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pekerjaan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.pekerjaan_ayah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Penghasilan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`Rp ${s==null?void 0:s.penghasilan_ayah}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No Tlp"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.tlp_ayah})]})]})})]}),t.jsxs(d,{item:!0,size:{xs:6,md:6},sx:{p:1},children:[t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Ibu"}),t.jsx(l,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NIK"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nik_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nama_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Tempat Tanggal Lahir"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`${s==null?void 0:s.lahir_ibu}, ${new Date(s==null?void 0:s.tanggal_ibu).toLocaleDateString("id-ID")}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pendidikan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.pendidikan_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Pekerjaan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.pekerjaan_ibu})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Penghasilan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:`Rp ${s==null?void 0:s.penghasilan_ibu}`})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"No Tlp"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.tlp_ibu})]})]})})]})]})}),t.jsx(e,{variant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Lainnya"}),t.jsx(r,{sx:{p:1},children:t.jsx(d,{container:!0,children:t.jsxs(d,{item:!0,size:{xs:6,md:6},sx:{p:1},children:[t.jsx(e,{ariant:"subtitle1",fontWeight:"bold",fontSize:14,children:"Sekolah Asal"}),t.jsx(l,{className:"custom-table",children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"NPSN"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.npsn})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Nama Sekolah"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.nama_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Provinsi"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.provinsi_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kota / Kabupaten"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.regional_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Kecamatan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.kec_sekolah})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{width:"150px"},children:"Desa / Kelurahan"}),t.jsx("td",{align:"center",style:{width:"30px"},children:":"}),t.jsx("td",{children:s==null?void 0:s.desa_sekolah})]})]})})]})})})]})]}),t.jsx(d,{item:!0,size:{xs:12,md:4},sx:{p:2},children:t.jsx(_,{})})]})})};export{v as default};
