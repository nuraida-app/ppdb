var n=Object.defineProperty;var d=(i,t,e)=>t in i?n(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var l=(i,t,e)=>d(i,typeof t!="symbol"?t+"":t,e);import{r as h,j as r,q as u}from"./index-NerRiSST.js";import{P as o}from"./index-DM6qw486.js";import{R as p}from"./quill.snow-BV0ZRRqV.js";class s extends h.Component{constructor(e){super(e);l(this,"handleChange",e=>{this.setState({editorHtml:e}),this.props.onChange(e)});this.state={editorHtml:e.value||""},this.reactQuillRef=null}componentDidUpdate(e){e.value!==this.props.value&&this.setState({editorHtml:this.props.value})}render(){const{placeholder:e}=this.props;return r.jsx(u,{sx:{height:"380px",bgcolor:"white"},children:r.jsx(p,{ref:a=>{this.reactQuillRef=a},theme:"snow",value:this.state.editorHtml,onChange:this.handleChange,modules:s.modules(),formats:s.formats,placeholder:e,style:{height:"70%"}})})}}s.modules=()=>({toolbar:{container:[[{header:"1"},{header:"2"},{font:[]}],[{size:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","video"],["clean"]]},clipboard:{matchVisual:!1}});s.formats=["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video"];s.propTypes={placeholder:o.string,value:o.string,onChange:o.func.isRequired};export{s as E};
