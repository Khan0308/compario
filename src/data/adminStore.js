// Admin data layer. "Published" data is src/data/adminData.json (what every visitor sees).
// The admin panel edits a DRAFT kept in this browser's LocalStorage; Export gives you a new adminData.json to publish.
import published from './adminData.json';
import {catBySlug} from './categories';

const DRAFT='sc_admin_data',LEGACY='sc_admin_overrides';
export const slugify=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
// Only http(s) links are allowed (blocks javascript: and data: URLs). httpsOnly is used for logo image URLs.
export const safeUrl=(u,{httpsOnly=false}={})=>{
 if(typeof u!=='string'||!u.trim())return null;
 try{const x=new URL(u.trim());return(httpsOnly?x.protocol==='https:':['http:','https:'].includes(x.protocol))?x.href:null}catch{return null}
};
const cleanOverride=x=>{
 const y={...x};
 if('website' in y)y.website=safeUrl(y.website);
 if(y.verification&&typeof y.verification==='object'){
  y.verification={...y.verification};
  if(Array.isArray(y.verification.sources))y.verification.sources=y.verification.sources.filter(s=>s&&typeof s==='object').map(s=>({...s,url:safeUrl(s.url)})).filter(s=>s.url);
 }
 return y;
};
// Turns any input into a safe, well-formed data object (drops anything invalid).
export function norm(d){
 const o={version:1,nextId:1000,added:[],removed:[],overrides:{}};
 if(!d||typeof d!=='object')return o;
 const seen=new Set();
 (Array.isArray(d.added)?d.added:[]).forEach(a=>{
  if(!a||typeof a.name!=='string')return;
  const name=a.name.trim().slice(0,60),slug=slugify(a.slug||name);
  if(name.length<2||!slug||seen.has(slug)||!catBySlug[a.category])return;
  seen.add(slug);
  o.added.push({id:Number.isInteger(a.id)?a.id:0,name,slug,category:a.category,website:safeUrl(a.website),
   description:String(a.description||'').trim().slice(0,400),logoUrl:safeUrl(a.logoUrl,{httpsOnly:true}),
   dateAdded:/^\d{4}-\d{2}-\d{2}$/.test(a.dateAdded||'')?a.dateAdded:new Date().toISOString().slice(0,10)});
 });
 let next=Math.max(1000,Number.isInteger(d.nextId)?d.nextId:1000,...o.added.map(a=>a.id+1));
 const ids=new Set();
 o.added.forEach(a=>{if(!a.id||a.id<1000||ids.has(a.id))a.id=next++;ids.add(a.id)});
 o.nextId=next;
 o.removed=[...new Set((Array.isArray(d.removed)?d.removed:[]).filter(s=>typeof s==='string'&&s))];
 if(d.overrides&&typeof d.overrides==='object')Object.entries(d.overrides).forEach(([k,v])=>{if(v&&typeof v==='object')o.overrides[k]=cleanOverride(v)});
 return o;
}
export const hasDraft=()=>{try{return localStorage.getItem(DRAFT)!=null}catch{return false}};
// Effective data: the local draft if there is one, otherwise the published file (plus edits saved by the older admin version).
export function getData(){
 try{const raw=localStorage.getItem(DRAFT);if(raw)return norm(JSON.parse(raw))}catch{/* fall through */}
 const p=norm(published);let legacy={};
 try{legacy=JSON.parse(localStorage.getItem(LEGACY)||'{}')}catch{/* ignore */}
 if(legacy&&typeof legacy==='object')Object.entries(legacy).forEach(([k,v])=>{if(v&&typeof v==='object'&&!p.overrides[k])p.overrides[k]=cleanOverride(v)});
 return p;
}
let onChange=()=>{};
export const setChangeHandler=f=>{onChange=f};
export function saveData(d){localStorage.setItem(DRAFT,JSON.stringify(norm(d)));onChange()}
export function discardDraft(){localStorage.removeItem(DRAFT);localStorage.removeItem(LEGACY);onChange()}
