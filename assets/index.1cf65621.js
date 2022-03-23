var A=Object.defineProperty,B=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var T=(r,t,s)=>t in r?A(r,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[t]=s,b=(r,t)=>{for(var s in t||(t={}))N.call(t,s)&&T(r,s,t[s]);if(C)for(var s of C(t))R.call(t,s)&&T(r,s,t[s]);return r},k=(r,t)=>B(r,U(t));import{x as y,j as e,X as l,h as z,m as W,a as n,G as c,F as m,T as f,u as D,_ as O,l as x,E as j,N as q,S as v,z as u,b as h,H as M,O as G,t as E,W as L,c as H,d as K,e as Q,f as p,g as d,A as X,i as $,k as J,n as Z,y as V,o as w,p as Y,q as ee,r as I,s as F,B as re,v as te,w as _,C as ne,I as se,D as ie,J as ae,K as ce,L as le,M as oe,P as de,Q as S,R as ue,U as he}from"./vendor.65388ead.js";const me=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))g(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&g(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function g(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}};me();const fe=r=>{const t=y();return t?e(l,{options:r.options,record:{data:r.render(t)},source:"data"}):null},ge=()=>{const r=y();return n("span",{children:["Order ",r?r.reference:""]})},be=()=>n(m,{children:[e(f,{variant:"h6",children:"Order"}),n(c,{container:!0,spacing:2,alignItems:"center",children:[e(c,{item:!0,xs:6,children:e(D,{label:"Date",children:e(O,{source:"date"})})}),e(c,{item:!0,xs:6,children:e(D,{label:"Reference",children:e(x,{source:"reference"})})}),e(c,{item:!0,xs:6,children:e(j,{source:"status",choices:[{id:"delivered",name:"delivered"},{id:"ordered",name:"ordered"},{id:"cancelled",name:"cancelled"}]})}),e(c,{item:!0,xs:6,children:e(q,{label:"Returned",source:"returned"})})]})]}),pe=()=>n(m,{children:[e(f,{variant:"h6",children:"Customer"}),n(v,{children:[e(u,{source:"customer_id",reference:"customers",children:e(h,{render:r=>`${r.first_name} ${r.last_name}`})}),e(u,{source:"customer_id",reference:"customers",children:e(M,{source:"email"})})]})]}),ye=()=>n(m,{children:[e(f,{variant:"h6",children:"Shipping Address"}),e(u,{source:"customer_id",reference:"customers",link:!1,children:n(v,{children:[e(h,{render:r=>`${r.first_name} ${r.last_name}`}),e(x,{source:"address"}),e(h,{render:r=>[r.city,r.zipcode].join(", ")})]})})]}),xe=()=>{const r=y();return r?e(u,{source:"product_id",reference:"products",link:!1,children:e(fe,{render:t=>t.price*r.quantity,options:{style:"currency",currency:"USD"}})}):null},_e=()=>n(m,{children:[e(f,{variant:"h6",children:"Items"}),e(G,{source:"basket",children:n(E,{bulkActionButtons:!1,sx:{"& .RaDatagrid-headerCell":{fontWeight:"bold"},width:"100%"},size:"medium",children:[e(u,{source:"product_id",reference:"products",label:"Reference",children:e(x,{source:"reference"})}),e(u,{source:"product_id",reference:"products",label:"Unit Price",link:!1,children:e(l,{source:"price",options:{style:"currency",currency:"USD"}})}),e(l,{label:"Quantity",source:"quantity"}),e(L,{label:"Total",textAlign:"right",children:e(xe,{})})]})})]}),ve=()=>n(m,{children:[e(f,{variant:"h6",children:"Totals"}),e(H,{children:e(K,{children:n(Q,{children:[n(p,{children:[e(d,{component:"th",scope:"row",children:"Sum"}),e(d,{align:"right",children:e(l,{source:"total_ex_taxes",options:{style:"currency",currency:"USD"}})})]},"total_ex_taxes"),n(p,{children:[e(d,{component:"th",scope:"row",children:"Delivery"}),e(d,{align:"right",children:e(l,{source:"delivery_fees",options:{style:"currency",currency:"USD"}})})]},"delivery_fees"),n(p,{children:[e(d,{component:"th",scope:"row",children:e(h,{render:r=>`Tax (${r.tax_rate*100} %)`})}),e(d,{align:"right",children:e(l,{source:"taxes",options:{style:"currency",currency:"USD"}})})]},"taxes"),n(p,{children:[e(d,{sx:{fontWeight:"bold"},children:"Total"}),e(d,{align:"right",sx:{fontWeight:"bold"},children:e(l,{source:"total",options:{style:"currency",currency:"USD"},sx:{fontWeight:"bold"}})})]},"total")]})})})]}),Ce=()=>e(z,{resource:"commands",title:e(ge,{}),children:e(W,{children:n(c,{container:!0,spacing:2,children:[e(c,{item:!0,xs:8,children:e(be,{})}),n(c,{item:!0,container:!0,xs:4,spacing:2,direction:"column",children:[e(c,{item:!0,children:e(pe,{})}),e(c,{item:!0,children:e(ye,{})})]}),e(c,{item:!0,xs:12,children:e(_e,{})}),e(c,{item:!0,xs:12,children:e(ve,{})})]})})});function Te(){const r=y();return r?n(v,{direction:"row",spacing:2,children:[e(X,{alt:`${r.first_name} ${r.last_name}`,src:r.avatar,sx:{width:25,height:25}}),n(f,{variant:"body2",children:[r.first_name," ",r.last_name]})]}):null}const ke=[e(J,{source:"q",label:"Search",alwaysOn:!0,resettable:!0}),e(Z,{source:"customer_id",label:"Customer",reference:"customers",children:e(V,{optionText:r=>`${r.first_name} ${r.last_name}`})}),e(w,{label:"Passed Since",source:"date_gte"}),e(w,{label:"Passed Before",source:"date_lte"}),e(Y,{label:"Min amount",source:"total_gte"}),e(ee,{label:"Returned",source:"returned"})],De=()=>{const{filterValues:r,setFilters:t,displayedFilters:s}=I(),g=F.exports.useCallback((i,o)=>{const P=k(b({},r),{status:o});t(P,s)},[r,t,s]),a=F.exports.useCallback(()=>(r==null?void 0:r.status)||"ordered",[r]);return n(m,{children:[e(re,{sx:{borderBottom:1,borderColor:"divider"},children:n(te,{value:a(),onChange:g,variant:"fullWidth",children:[e(_,{label:"Ordered",value:"ordered"}),e(_,{label:"Delivered",value:"delivered"}),e(_,{label:"Cancelled",value:"cancelled"})]})}),n(E,{rowClick:"edit",children:[e(O,{source:"date",showTime:!0}),e(x,{source:"reference"}),e(u,{source:"customer_id",reference:"customers",children:e(Te,{})}),e(u,{source:"customer_id",reference:"customers",link:!1,label:"Address",children:e(h,{render:i=>[i.address,i.city,i.zipcode].join(", ")})}),e(h,{label:"Nb items",render:i=>{var o;return`${(o=i.basket)==null?void 0:o.length}`},textAlign:"right"}),e(l,{source:"total",options:{style:"currency",currency:"USD"}})]})]})},we=()=>e($,{title:"Orders",filters:ke,children:e(De,{})});var Fe={list:we,edit:Ce,options:{label:"Orders"},icon:ne};const Se=()=>{const{data:r}=I();return r?e(se,{sx:{transform:"translateZ(0)",margin:0},rowHeight:180,gap:1,cols:3,children:r.map(t=>n(ie,{children:[e("img",{src:t.thumbnail,alt:t.reference,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"}}),e(ae,{sx:{background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)"},title:t.reference,subtitle:n(L,{children:[e(h,{record:t,render:s=>`${s.width}x${s.height}, `}),e(l,{record:t,source:"price",options:{style:"currency",currency:"USD"}})]}),position:"bottom"})]},t.id))}):null},Oe=()=>e($,{title:"Posters",children:e(Se,{})});var Ee={list:Oe,options:{label:"Posters"},icon:ce};const Le=le(oe({serializeDate:!0}),!0);function $e(){return n(de,{dataProvider:Le,children:[e(S,b({name:"products"},Ee)),e(S,b({name:"commands"},Fe))]})}ue.render(e(he.StrictMode,{children:e($e,{})}),document.getElementById("root"));
