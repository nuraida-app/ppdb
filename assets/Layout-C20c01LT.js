import{aK as dt,aL as ut,ad as A,aP as ee,r as u,aM as te,af as pt,bc as vt,bd as Le,j as e,ab as K,aN as ae,be as ft,a6 as ht,bf as Ce,ah as mt,bg as xt,bh as V,ai as N,bi as Z,a1 as jt,bj as gt,bk as _t,m as i,n as l,aX as U,bl as H,a_ as y,bm as yt,aG as Pe,a as bt,bb as $t,bn as Mt,bo as Ot,d as M,s as Rt,bp as Ct,bq as St,e as It,W as zt,M as Se,br as Ie,bs as Lt}from"./index-C2nBX7QG.js";function Pt(t){return dt("MuiCollapse",t)}ut("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const kt=t=>{const{orientation:a,classes:r}=t,o={root:["root",`${a}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${a}`],wrapperInner:["wrapperInner",`${a}`]};return ae(o,Pt,r)},wt=A("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:r}=t;return[a.root,a[r.orientation],r.state==="entered"&&a.entered,r.state==="exited"&&!r.in&&r.collapsedSize==="0px"&&a.hidden]}})(ee(({theme:t})=>({height:0,overflow:"hidden",transition:t.transitions.create("height"),variants:[{props:{orientation:"horizontal"},style:{height:"auto",width:0,transition:t.transitions.create("width")}},{props:{state:"entered"},style:{height:"auto",overflow:"visible"}},{props:{state:"entered",orientation:"horizontal"},style:{width:"auto"}},{props:({ownerState:a})=>a.state==="exited"&&!a.in&&a.collapsedSize==="0px",style:{visibility:"hidden"}}]}))),Dt=A("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(t,a)=>a.wrapper})({display:"flex",width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),Et=A("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(t,a)=>a.wrapperInner})({width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),q=u.forwardRef(function(a,r){const o=te({props:a,name:"MuiCollapse"}),{addEndListener:c,children:d,className:p,collapsedSize:v="0px",component:f,easing:s,in:O,onEnter:R,onEntered:C,onEntering:S,onExit:x,onExited:_,onExiting:P,orientation:I="vertical",style:z,timeout:m=ft.standard,TransitionComponent:Q=ht,...et}=o,T={...o,orientation:I,collapsedSize:v},k=kt(T),Oe=pt(),tt=vt(),$=u.useRef(null),X=u.useRef(),B=typeof v=="number"?`${v}px`:v,w=I==="horizontal",D=w?"width":"height",F=u.useRef(null),at=Le(r,F),L=n=>h=>{if(n){const g=F.current;h===void 0?n(g):n(g,h)}},Y=()=>$.current?$.current[w?"clientWidth":"clientHeight"]:0,rt=L((n,h)=>{$.current&&w&&($.current.style.position="absolute"),n.style[D]=B,R&&R(n,h)}),nt=L((n,h)=>{const g=Y();$.current&&w&&($.current.style.position="");const{duration:E,easing:W}=Ce({style:z,timeout:m,easing:s},{mode:"enter"});if(m==="auto"){const Re=Oe.transitions.getAutoHeightDuration(g);n.style.transitionDuration=`${Re}ms`,X.current=Re}else n.style.transitionDuration=typeof E=="string"?E:`${E}ms`;n.style[D]=`${g}px`,n.style.transitionTimingFunction=W,S&&S(n,h)}),ot=L((n,h)=>{n.style[D]="auto",C&&C(n,h)}),st=L(n=>{n.style[D]=`${Y()}px`,x&&x(n)}),it=L(_),lt=L(n=>{const h=Y(),{duration:g,easing:E}=Ce({style:z,timeout:m,easing:s},{mode:"exit"});if(m==="auto"){const W=Oe.transitions.getAutoHeightDuration(h);n.style.transitionDuration=`${W}ms`,X.current=W}else n.style.transitionDuration=typeof g=="string"?g:`${g}ms`;n.style[D]=B,n.style.transitionTimingFunction=E,P&&P(n)}),ct=n=>{m==="auto"&&tt.start(X.current||0,n),c&&c(F.current,n)};return e.jsx(Q,{in:O,onEnter:rt,onEntered:ot,onEntering:nt,onExit:st,onExited:it,onExiting:lt,addEndListener:ct,nodeRef:F,timeout:m==="auto"?null:m,...et,children:(n,h)=>e.jsx(wt,{as:f,className:K(k.root,p,{entered:k.entered,exited:!O&&B==="0px"&&k.hidden}[n]),style:{[w?"minWidth":"minHeight"]:B,...z},ref:at,...h,ownerState:{...T,state:n},children:e.jsx(Dt,{ownerState:{...T,state:n},className:k.wrapper,ref:$,children:e.jsx(Et,{ownerState:{...T,state:n},className:k.wrapperInner,children:d})})})})});q&&(q.muiSupportAuto=!0);const Vt=(t,a)=>{const{ownerState:r}=t;return[a.root,r.dense&&a.dense,r.alignItems==="flex-start"&&a.alignItemsFlexStart,r.divider&&a.divider,!r.disableGutters&&a.gutters]},Ht=t=>{const{alignItems:a,classes:r,dense:o,disabled:c,disableGutters:d,divider:p,selected:v}=t,s=ae({root:["root",o&&"dense",!d&&"gutters",p&&"divider",c&&"disabled",a==="flex-start"&&"alignItemsFlexStart",v&&"selected"]},gt,r);return{...r,...s}},qt=A(mt,{shouldForwardProp:t=>xt(t)||t==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:Vt})(ee(({theme:t})=>({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${V.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:N(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${V.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:N(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${V.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:N(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:N(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${V.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${V.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity},variants:[{props:({ownerState:a})=>a.divider,style:{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:a})=>!a.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:a})=>a.dense,style:{paddingTop:4,paddingBottom:4}}]}))),b=u.forwardRef(function(a,r){const o=te({props:a,name:"MuiListItemButton"}),{alignItems:c="center",autoFocus:d=!1,component:p="div",children:v,dense:f=!1,disableGutters:s=!1,divider:O=!1,focusVisibleClassName:R,selected:C=!1,className:S,...x}=o,_=u.useContext(Z),P=u.useMemo(()=>({dense:f||_.dense||!1,alignItems:c,disableGutters:s}),[c,_.dense,f,s]),I=u.useRef(null);jt(()=>{d&&I.current&&I.current.focus()},[d]);const z={...o,alignItems:c,dense:P.dense,disableGutters:s,divider:O,selected:C},m=Ht(z),Q=Le(I,r);return e.jsx(Z.Provider,{value:P,children:e.jsx(qt,{ref:Q,href:x.href||x.to,component:(x.href||x.to)&&p==="div"?"button":p,focusVisibleClassName:K(m.focusVisible,R),ownerState:z,className:K(m.root,S),...x,classes:m,children:v})})}),At=t=>{const{alignItems:a,classes:r}=t;return ae({root:["root",a==="flex-start"&&"alignItemsFlexStart"]},_t,r)},Tt=A("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:r}=t;return[a.root,r.alignItems==="flex-start"&&a.alignItemsFlexStart]}})(ee(({theme:t})=>({minWidth:56,color:(t.vars||t).palette.action.active,flexShrink:0,display:"inline-flex",variants:[{props:{alignItems:"flex-start"},style:{marginTop:8}}]}))),j=u.forwardRef(function(a,r){const o=te({props:a,name:"MuiListItemIcon"}),{className:c,...d}=o,p=u.useContext(Z),v={...o,alignItems:p.alignItems},f=At(v);return e.jsx(Tt,{className:K(f.root,c),ownerState:v,ref:r,...d})});var re={},Bt=l;Object.defineProperty(re,"__esModule",{value:!0});var ke=re.default=void 0,Ft=Bt(i()),ze=e;ke=re.default=(0,Ft.default)([(0,ze.jsx)("path",{d:"M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55-.69-.98-1.1-2.17-1.1-3.45 0-3.31 2.69-6 6-6"},"0"),(0,ze.jsx)("path",{d:"M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12m0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17"},"1")],"AdminPanelSettings");var ne={},Wt=l;Object.defineProperty(ne,"__esModule",{value:!0});var we=ne.default=void 0,Nt=Wt(i()),Ut=e;we=ne.default=(0,Nt.default)((0,Ut.jsx)("path",{d:"m7 10 5 5 5-5z"}),"ArrowDropDown");var oe={},Gt=l;Object.defineProperty(oe,"__esModule",{value:!0});var De=oe.default=void 0,Jt=Gt(i()),Kt=e;De=oe.default=(0,Jt.default)((0,Kt.jsx)("path",{d:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"}),"Settings");var se={},Qt=l;Object.defineProperty(se,"__esModule",{value:!0});var Ee=se.default=void 0,Xt=Qt(i()),Yt=e;Ee=se.default=(0,Xt.default)((0,Yt.jsx)("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"}),"Logout");var ie={},Zt=l;Object.defineProperty(ie,"__esModule",{value:!0});var G=ie.default=void 0,ea=Zt(i()),ta=e;G=ie.default=(0,ea.default)((0,ta.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess");var le={},aa=l;Object.defineProperty(le,"__esModule",{value:!0});var J=le.default=void 0,ra=aa(i()),na=e;J=le.default=(0,ra.default)((0,na.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");var ce={},oa=l;Object.defineProperty(ce,"__esModule",{value:!0});var Ve=ce.default=void 0,sa=oa(i()),ia=e;Ve=ce.default=(0,sa.default)((0,ia.jsx)("path",{d:"m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z"}),"HomeOutlined");var de={},la=l;Object.defineProperty(de,"__esModule",{value:!0});var He=de.default=void 0,ca=la(i()),da=e;He=de.default=(0,ca.default)((0,da.jsx)("path",{d:"m9.17 6 2 2H20v10H4V6zM10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"}),"FolderOutlined");var ue={},ua=l;Object.defineProperty(ue,"__esModule",{value:!0});var qe=ue.default=void 0,pa=ua(i()),va=e;qe=ue.default=(0,pa.default)((0,va.jsx)("path",{d:"M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72 5.18 9 12 5.28zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73z"}),"SchoolOutlined");var pe={},fa=l;Object.defineProperty(pe,"__esModule",{value:!0});var Ae=pe.default=void 0,ha=fa(i()),ma=e;Ae=pe.default=(0,ha.default)((0,ma.jsx)("path",{d:"M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z"}),"AttachFileOutlined");var ve={},xa=l;Object.defineProperty(ve,"__esModule",{value:!0});var Te=ve.default=void 0,ja=xa(i()),ga=e;Te=ve.default=(0,ja.default)((0,ga.jsx)("path",{d:"M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4"}),"AttachMoneyOutlined");var fe={},_a=l;Object.defineProperty(fe,"__esModule",{value:!0});var Be=fe.default=void 0,ya=_a(i()),ba=e;Be=fe.default=(0,ya.default)((0,ba.jsx)("path",{d:"M18 11v2h4v-2zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61M20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4M4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9zm5.03 1.71L11 9.53v4.94l-1.97-1.18-.48-.29H4v-2h4.55zM15.5 12c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34"}),"CampaignOutlined");var he={},$a=l;Object.defineProperty(he,"__esModule",{value:!0});var Fe=he.default=void 0,Ma=$a(i()),Oa=e;Fe=he.default=(0,Ma.default)((0,Oa.jsx)("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V6h5.17l2 2H20zm-5-5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m-4 4h8v-1c0-1.33-2.67-2-4-2s-4 .67-4 2z"}),"FolderSharedOutlined");var me={},Ra=l;Object.defineProperty(me,"__esModule",{value:!0});var We=me.default=void 0,Ca=Ra(i()),Sa=e;We=me.default=(0,Ca.default)((0,Sa.jsx)("path",{d:"M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5M4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12m0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7m7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44M15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35"}),"PeopleOutlined");var xe={},Ia=l;Object.defineProperty(xe,"__esModule",{value:!0});var Ne=xe.default=void 0,za=Ia(i()),La=e;Ne=xe.default=(0,za.default)((0,La.jsx)("path",{d:"M20.84 4.22c-.05-.12-.11-.23-.18-.34-.14-.21-.33-.4-.54-.54-.11-.07-.22-.13-.34-.18-.24-.1-.5-.16-.78-.16h-1V1h-2v2H8V1H6v2H5c-.42 0-.8.13-1.12.34-.21.14-.4.33-.54.54-.07.11-.13.22-.18.34-.1.24-.16.5-.16.78v14c0 1.1.89 2 2 2h14c.28 0 .54-.06.78-.16.12-.05.23-.11.34-.18.21-.14.4-.33.54-.54.21-.32.34-.71.34-1.12V5c0-.28-.06-.54-.16-.78M5 19V5h14v14zm7-6.12c-2.03 0-6 1.08-6 3.58V18h12v-1.53c0-2.51-3.97-3.59-6-3.59M8.31 16c.69-.56 2.38-1.12 3.69-1.12s3.01.56 3.69 1.12zM12 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3m0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1"}),"PermContactCalendarOutlined");var je={},Pa=l;Object.defineProperty(je,"__esModule",{value:!0});var Ue=je.default=void 0,ka=Pa(i()),wa=e;Ue=je.default=(0,ka.default)((0,wa.jsx)("path",{d:"m20 17.17-3.37-3.38c.64.22 1.23.48 1.77.76.97.51 1.58 1.52 1.6 2.62m1.19 4.02-1.41 1.41-2.61-2.6H4v-2.78c0-1.12.61-2.15 1.61-2.66 1.29-.66 2.87-1.22 4.67-1.45L1.39 4.22 2.8 2.81zM15.17 18l-3-3H12c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88V18zM12 6c1.1 0 2 .9 2 2 0 .86-.54 1.59-1.3 1.87l1.48 1.48C15.28 10.64 16 9.4 16 8c0-2.21-1.79-4-4-4-1.4 0-2.64.72-3.35 1.82l1.48 1.48C10.41 6.54 11.14 6 12 6"}),"PersonOffOutlined");var ge={},Da=l;Object.defineProperty(ge,"__esModule",{value:!0});var Ge=ge.default=void 0;Ha(u);var Ea=Da(i()),Va=e;function Je(t){if(typeof WeakMap!="function")return null;var a=new WeakMap,r=new WeakMap;return(Je=function(o){return o?r:a})(t)}function Ha(t,a){if(t&&t.__esModule)return t;if(t===null||typeof t!="object"&&typeof t!="function")return{default:t};var r=Je(a);if(r&&r.has(t))return r.get(t);var o={__proto__:null},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in t)if(d!=="default"&&{}.hasOwnProperty.call(t,d)){var p=c?Object.getOwnPropertyDescriptor(t,d):null;p&&(p.get||p.set)?Object.defineProperty(o,d,p):o[d]=t[d]}return o.default=t,r&&r.set(t,o),o}Ge=ge.default=(0,Ea.default)((0,Va.jsx)("path",{d:"M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"}),"WhatsApp");var _e={},qa=l;Object.defineProperty(_e,"__esModule",{value:!0});var Ke=_e.default=void 0,Aa=qa(i()),Ta=e;Ke=_e.default=(0,Aa.default)((0,Ta.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"}),"Assessment");var ye={},Ba=l;Object.defineProperty(ye,"__esModule",{value:!0});var Qe=ye.default=void 0,Fa=Ba(i()),Wa=e;Qe=ye.default=(0,Fa.default)((0,Wa.jsx)("path",{d:"M6.5 10h-2v7h2zm6 0h-2v7h2zm8.5 9H2v2h19zm-2.5-9h-2v7h2zm-7-6.74L16.71 6H6.29zm0-2.26L2 6v2h19V6z"}),"AccountBalanceOutlined");var be={},Na=l;Object.defineProperty(be,"__esModule",{value:!0});var Xe=be.default=void 0,Ua=Na(i()),Ga=e;Xe=be.default=(0,Ua.default)((0,Ga.jsx)("path",{d:"M13 5.08c3.06.44 5.48 2.86 5.92 5.92h3.03c-.47-4.72-4.23-8.48-8.95-8.95zM18.92 13c-.44 3.06-2.86 5.48-5.92 5.92v3.03c4.72-.47 8.48-4.23 8.95-8.95zM11 18.92c-3.39-.49-6-3.4-6-6.92s2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95s3.95 9.45 9 9.95z"}),"DonutLargeOutlined");var $e={},Ja=l;Object.defineProperty($e,"__esModule",{value:!0});var Ye=$e.default=void 0,Ka=Ja(i()),Qa=e;Ye=$e.default=(0,Ka.default)((0,Qa.jsx)("path",{d:"M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2"}),"TimelineOutlined");var Me={},Xa=l;Object.defineProperty(Me,"__esModule",{value:!0});var Ze=Me.default=void 0,Ya=Xa(i()),Za=e;Ze=Me.default=(0,Ya.default)((0,Za.jsx)("path",{d:"M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V9h14zM5 7V5h14v2zm2 4h10v2H7zm0 4h7v2H7z"}),"EventNoteOutlined");const er=[{label:"Tahun Ajaran",link:"/admin/tapel",icon:e.jsx(Ze,{color:"primary"})},{label:"Jenjang",link:"/admin/jenjang",icon:e.jsx(Ye,{color:"primary"})},{label:"Sekolah",link:"/admin/sekolah",icon:e.jsx(qe,{color:"primary"})},{label:"Persyaratan",link:"/admin/persyaratan",icon:e.jsx(Ae,{color:"primary"})},{label:"Biaya",link:"/admin/biaya",icon:e.jsx(Te,{color:"primary"})},{label:"Pengumuman",link:"/admin/pengumuman",icon:e.jsx(Be,{color:"primary"})},{label:"Narahubung",link:"/admin/narahubung",icon:e.jsx(Ge,{color:"primary"})}],tr=[{label:"Calon Pelajar",link:"/admin/pelajar",icon:e.jsx(We,{color:"primary"})},{label:"Diterima",link:"/admin/pelajar/diterima",icon:e.jsx(Ne,{color:"success"})},{label:"Ditolak",link:"/admin/pelajar/ditolak",icon:e.jsx(Ue,{color:"error"})}],ar=[{label:"Pembayaran",link:"/admin/pembayaran",icon:e.jsx(Qe,{color:"primary"})},{label:"Statistik",link:"/admin/statistik",icon:e.jsx(Xe,{color:"primary"})}],rr=()=>{const[t,a]=u.useState(!1),[r,o]=u.useState(!1),[c,d]=u.useState(!1),p=()=>{a(!t)},v=()=>{o(!r)},f=()=>{d(!c)};return e.jsxs(U,{sx:{bgcolor:"background.paper"},component:"nav","aria-labelledby":"nested-list-subheader",children:[e.jsxs(b,{component:H,to:"/admin",children:[e.jsx(j,{children:e.jsx(Ve,{color:"primary"})}),e.jsx(y,{primary:"Beranda"})]}),e.jsxs(b,{onClick:p,children:[e.jsx(j,{children:e.jsx(He,{color:"primary"})}),e.jsx(y,{primary:"Data Pokok"}),t?e.jsx(G,{}):e.jsx(J,{})]}),e.jsx(q,{in:t,timeout:"auto",unmountOnExit:!0,children:e.jsx(U,{component:"div",disablePadding:!0,children:er.map(s=>e.jsxs(b,{sx:{pl:4},component:H,to:s.link,children:[e.jsx(j,{children:s.icon}),e.jsx(y,{primary:s.label})]},s.label))})}),e.jsxs(b,{onClick:v,children:[e.jsx(j,{children:e.jsx(Fe,{color:"primary"})}),e.jsx(y,{primary:"Pendaftar"}),r?e.jsx(G,{}):e.jsx(J,{})]}),e.jsx(q,{in:r,timeout:"auto",unmountOnExit:!0,children:e.jsx(U,{component:"div",disablePadding:!0,children:tr.map(s=>e.jsxs(b,{sx:{pl:4},component:H,to:s.link,children:[e.jsx(j,{children:s.icon}),e.jsx(y,{primary:s.label})]},s.label))})}),e.jsxs(b,{onClick:f,children:[e.jsx(j,{children:e.jsx(Ke,{color:"primary"})}),e.jsx(y,{primary:"Laporan"}),c?e.jsx(G,{}):e.jsx(J,{})]}),e.jsx(q,{in:c,timeout:"auto",unmountOnExit:!0,children:e.jsx(U,{component:"div",disablePadding:!0,children:ar.map(s=>e.jsxs(b,{sx:{pl:4},component:H,to:s.link,children:[e.jsx(j,{children:s.icon}),e.jsx(y,{primary:s.label})]},s.label))})}),e.jsxs(b,{component:H,to:"/admin/pesan",children:[e.jsx(j,{children:e.jsx(yt,{color:"primary"})}),e.jsx(y,{primary:"Pesan"})]})]})},nr=()=>{const t=Pe(),{user:a,isLoggedIn:r}=bt(o=>o.user);u.useEffect(()=>{const o=setTimeout(()=>{(a==null?void 0:a.role)!=="admin"&&t("/")},2e3);return()=>clearTimeout(o)},[a,t]),u.useEffect(()=>{r||t("/")},[r])},sr=({children:t})=>{nr();const{data:a}=$t(),r=Pe(),o=Mt(),[c,{data:d,isSuccess:p,isLoading:v}]=Ot(),[f,s]=u.useState(null),O=!!f,R=_=>{s(_.currentTarget)},C=()=>{s(null)},S=async()=>{s(null);try{await c().unwrap(),localStorage.removeItem("login"),o(Lt()),r("/")}catch(_){console.error("Logout failed: ",_)}},x=()=>{s(null),r("/admin/pengaturan")};return e.jsxs(M,{sx:{display:"flex"},children:[e.jsxs(M,{sx:{width:250,height:"100vh",overflow:"auto"},children:[e.jsx(M,{sx:{px:3,py:2.8,textAlign:"center"},children:e.jsx(Rt,{fontWeight:"bold",children:a==null?void 0:a.nama})}),e.jsx(rr,{})]}),e.jsxs(M,{sx:{width:"100%",bgcolor:"#E9EFEC"},children:[e.jsx(M,{sx:{py:2,bgcolor:Ct[500]},children:e.jsxs(St,{children:[e.jsx(M,{sx:{display:"flex",justifyContent:"end"},children:e.jsx(It,{startIcon:e.jsx(ke,{}),endIcon:e.jsx(we,{}),sx:{alignSelf:"end",color:"white"},onClick:R,children:"Administrator"})}),e.jsxs(zt,{id:"basic-menu",anchorEl:f,open:O,onClose:C,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsxs(Se,{onClick:x,children:[e.jsx(j,{children:e.jsx(De,{fontSize:"small",color:"primary"})}),e.jsx(Ie,{children:"Pengaturan"})]}),e.jsxs(Se,{onClick:S,children:[e.jsx(j,{children:e.jsx(Ee,{fontSize:"small",color:"primary"})}),e.jsx(Ie,{children:"Logout"})]})]})]})}),e.jsx(M,{sx:{mt:1,p:2,height:"88vh",overflow:"auto"},children:t})]})]})};export{sr as L,b as a};
