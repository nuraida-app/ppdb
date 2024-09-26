import{r as l,a as q,g as F,s as N,m as A,aq as Q,u as K,j as i,b as X,bO as J,bP as Y,c as s,d as Z,E as O,H as k,bQ as U,n as tt,bR as ot,bS as et,G as _,P as S,t as L,h as rt,k as it,bT as at,N as nt,l as st,q as P,O as y,T as lt,X as T,bU as dt,bV as ut}from"./index-BXyq61jM.js";import{L as pt}from"./Layout-DLzo3XWz.js";import{L as ct}from"./WhatsApp-CeeFueyS.js";function gt(o){return l.Children.toArray(o).filter(t=>l.isValidElement(t))}function ft(o){return F("MuiButtonGroup",o)}const e=q("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","firstButton","fullWidth","horizontal","vertical","colorPrimary","colorSecondary","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary","lastButton","middleButton"]),mt=(o,t)=>{const{ownerState:a}=o;return[{[`& .${e.grouped}`]:t.grouped},{[`& .${e.grouped}`]:t[`grouped${s(a.orientation)}`]},{[`& .${e.grouped}`]:t[`grouped${s(a.variant)}`]},{[`& .${e.grouped}`]:t[`grouped${s(a.variant)}${s(a.orientation)}`]},{[`& .${e.grouped}`]:t[`grouped${s(a.variant)}${s(a.color)}`]},{[`& .${e.firstButton}`]:t.firstButton},{[`& .${e.lastButton}`]:t.lastButton},{[`& .${e.middleButton}`]:t.middleButton},t.root,t[a.variant],a.disableElevation===!0&&t.disableElevation,a.fullWidth&&t.fullWidth,a.orientation==="vertical"&&t.vertical]},xt=o=>{const{classes:t,color:a,disabled:p,disableElevation:h,fullWidth:m,orientation:d,variant:u}=o,g={root:["root",u,d,m&&"fullWidth",h&&"disableElevation",`color${s(a)}`],grouped:["grouped",`grouped${s(d)}`,`grouped${s(u)}`,`grouped${s(u)}${s(d)}`,`grouped${s(u)}${s(a)}`,p&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return Z(g,ft,t)},vt=N("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:mt})(A(({theme:o})=>({display:"inline-flex",borderRadius:(o.vars||o).shape.borderRadius,variants:[{props:{variant:"contained"},style:{boxShadow:(o.vars||o).shadows[2]}},{props:{disableElevation:!0},style:{boxShadow:"none"}},{props:{fullWidth:!0},style:{width:"100%"}},{props:{orientation:"vertical"},style:{flexDirection:"column",[`& .${e.lastButton},& .${e.middleButton}`]:{borderTopRightRadius:0,borderTopLeftRadius:0},[`& .${e.firstButton},& .${e.middleButton}`]:{borderBottomRightRadius:0,borderBottomLeftRadius:0}}},{props:{orientation:"horizontal"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderTopRightRadius:0,borderBottomRightRadius:0},[`& .${e.lastButton},& .${e.middleButton}`]:{borderTopLeftRadius:0,borderBottomLeftRadius:0}}},{props:{variant:"text",orientation:"horizontal"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderRight:o.vars?`1px solid rgba(${o.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${o.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${e.disabled}`]:{borderRight:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},{props:{variant:"text",orientation:"vertical"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderBottom:o.vars?`1px solid rgba(${o.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${o.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${e.disabled}`]:{borderBottom:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},...Object.entries(o.palette).filter(([,t])=>t&&t.main).flatMap(([t])=>[{props:{variant:"text",color:t},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderColor:o.vars?`rgba(${o.vars.palette[t].mainChannel} / 0.5)`:Q(o.palette[t].main,.5)}}}]),{props:{variant:"outlined",orientation:"horizontal"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderRightColor:"transparent","&:hover":{borderRightColor:"currentColor"}},[`& .${e.lastButton},& .${e.middleButton}`]:{marginLeft:-1}}},{props:{variant:"outlined",orientation:"vertical"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderBottomColor:"transparent","&:hover":{borderBottomColor:"currentColor"}},[`& .${e.lastButton},& .${e.middleButton}`]:{marginTop:-1}}},{props:{variant:"contained",orientation:"horizontal"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderRight:`1px solid ${(o.vars||o).palette.grey[400]}`,[`&.${e.disabled}`]:{borderRight:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},{props:{variant:"contained",orientation:"vertical"},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderBottom:`1px solid ${(o.vars||o).palette.grey[400]}`,[`&.${e.disabled}`]:{borderBottom:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},...Object.entries(o.palette).filter(([,t])=>t&&t.dark).map(([t])=>({props:{variant:"contained",color:t},style:{[`& .${e.firstButton},& .${e.middleButton}`]:{borderColor:(o.vars||o).palette[t].dark}}}))],[`& .${e.grouped}`]:{minWidth:40,boxShadow:"none",props:{variant:"contained"},style:{"&:hover":{boxShadow:"none"}}}}))),ht=l.forwardRef(function(t,a){const p=K({props:t,name:"MuiButtonGroup"}),{children:h,className:m,color:d="primary",component:u="div",disabled:g=!1,disableElevation:x=!1,disableFocusRipple:v=!1,disableRipple:b=!1,fullWidth:B=!1,orientation:R="horizontal",size:r="medium",variant:n="outlined",...c}=p,$={...p,color:d,component:u,disabled:g,disableElevation:x,disableFocusRipple:v,disableRipple:b,fullWidth:B,orientation:R,size:r,variant:n},f=xt($),V=l.useMemo(()=>({className:f.grouped,color:d,disabled:g,disableElevation:x,disableFocusRipple:v,disableRipple:b,fullWidth:B,size:r,variant:n}),[d,g,x,v,b,B,r,n,f.grouped]),G=gt(h),W=G.length,D=j=>{const C=j===0,E=j===W-1;return C&&E?"":C?f.firstButton:E?f.lastButton:f.middleButton};return i.jsx(vt,{as:u,role:"group",className:X(f.root,m),ref:a,ownerState:$,...c,children:i.jsx(J.Provider,{value:V,children:G.map((j,C)=>i.jsx(Y.Provider,{value:D(C),children:j},C))})})});var z={},bt=k;Object.defineProperty(z,"__esModule",{value:!0});var H=z.default=void 0,Bt=bt(O()),$t=i;H=z.default=(0,Bt.default)((0,$t.jsx)("path",{d:"M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z"}),"ChatOutlined");var w={},Ct=k;Object.defineProperty(w,"__esModule",{value:!0});var I=w.default=void 0,jt=Ct(O()),yt=i;I=w.default=(0,jt.default)((0,yt.jsx)("path",{d:"M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zm-7.76-2.78c-1.17-.52-2.61-.9-4.24-.9s-3.07.39-4.24.9C6.68 14.13 6 15.21 6 16.39V18h12v-1.61c0-1.18-.68-2.26-1.76-2.74M8.07 16c.09-.23.13-.39.91-.69.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69zM12 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"}),"GroupsOutlined");const M=U("https://ppdb-api.nibs.sch.id",{withCredentials:!0}),Rt=new Audio("/chat_sound.mp3"),wt=()=>{const{user:o}=tt(r=>r.user),[t,a]=l.useState(null),[p,h]=l.useState([]),[m,d]=l.useState(""),[u,g]=l.useState({}),x=l.useRef(null),{data:v}=ot(),{data:b}=et(t==null?void 0:t.id,{skip:!(t!=null&&t.id)}),B=r=>{if(r.preventDefault(),!m)return;const n={sender_id:o==null?void 0:o.id,sender:o==null?void 0:o.name,sender_role:"admin",recipient_id:t==null?void 0:t.id,recipient:t==null?void 0:t.name,recipient_role:t==null?void 0:t.role,chat:m};M.emit("message",n),d("")},R=r=>u[r]||0;return l.useEffect(()=>{t&&(h(b||[]),g(r=>({...r,[t.name]:0})))},[t,b]),l.useEffect(()=>{M.on("message",r=>{const n=r.rows[0];(n.penerima_role==="admin"||n.pengirim_role==="admin")&&(n.penerima_id===(t==null?void 0:t.id)||n.pengirim_id===(t==null?void 0:t.id))?h(c=>[...c,n]):(g(c=>({...c,[n.pengirim]:(c[n.pengirim]||0)+1})),Rt.play())})},[t]),l.useEffect(()=>{x.current&&x.current.scrollIntoView({behavior:"smooth"})},[p]),console.log(u),i.jsx(pt,{children:i.jsxs(_,{container:!0,children:[i.jsx(_,{item:!0,size:3,children:i.jsxs(S,{sx:{m:1,p:1,height:{md:550,lg:580,xl:660},overflow:"auto"},children:[i.jsxs(ht,{fullWidth:!0,children:[i.jsx(L,{startIcon:i.jsx(H,{}),children:"Pesan"}),i.jsx(L,{startIcon:i.jsx(I,{}),children:"User"})]}),i.jsx(rt,{children:v==null?void 0:v.map(r=>{var c,$;const n=($=(c=r.berkas)==null?void 0:c.find(f=>f.Foto))==null?void 0:$.Foto;return i.jsxs(ct,{onClick:()=>a(r),children:[i.jsx(it,{children:i.jsx(at,{color:"error",badgeContent:R(r.name),max:10,children:i.jsx(nt,{src:n})})}),i.jsx(st,{primary:r==null?void 0:r.name,secondary:r==null?void 0:r.email})]},r==null?void 0:r.id)})})]})}),i.jsx(_,{item:!0,size:9,children:i.jsxs(S,{sx:{p:1,m:1,height:{md:500,lg:580,xl:660}},children:[i.jsx(P,{sx:{height:"93%",overflow:"auto"},children:t?i.jsxs(P,{sx:{display:"flex",flexDirection:"column",gap:1,height:{md:500,lg:520,xl:600}},children:[p==null?void 0:p.map((r,n)=>i.jsxs(S,{sx:{p:1,bgcolor:r.pengirim_role==="user"?"#6069B6":"#258032",color:"#fff",display:"flex",flexDirection:"column",width:"40%",alignSelf:r.pengirim_role==="user"?"flex-end":"flex-start"},children:[i.jsx(y,{align:r.pengirim_role==="user"?"right":"left",fontWeight:"bold",children:r.pengirim}),i.jsx(y,{align:r.pengirim_role==="user"?"right":"left",children:r.teks}),i.jsx(y,{fontSize:10,align:r.pengirim_role==="user"?"right":"left",children:new Date(r.created_at).toLocaleString("id-ID")})]},n)),i.jsx("div",{ref:x})]}):i.jsx(y,{children:"Pilih user untuk memulai pesan"})}),i.jsxs("form",{onSubmit:B,style:{display:"flex",alignItems:"center"},children:[i.jsx(lt,{placeholder:"Ketik pesan",value:m,onChange:r=>d(r.target.value),fullWidth:!0,size:"small",variant:"standard"}),i.jsx(T,{color:"primary",children:i.jsx(dt,{})}),i.jsx(T,{type:"submit",color:"success",children:i.jsx(ut,{})})]})]})})]})})};export{wt as default};
