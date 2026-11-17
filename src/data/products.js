import {catBySlug} from './categories';
import {VERIFIED} from './verifiedData';
import {LINEUP,CATALOG} from './catalog';
import {derivePricing} from './schema';
import {getData,slugify,setChangeHandler} from './adminStore';
// popularity/dateAdded are PLACEHOLDER ordering values only (not real traffic or listing dates).
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
const TODAY=new Date('2026-11-03').getTime();
const lineupBase=[];
Object.entries(LINEUP).forEach(([category,names])=>names.forEach(name=>{
 const slug=slugify(name),v={...(CATALOG[slug]||{}),...(VERIFIED[slug]||{})};
 lineupBase.push({id:lineupBase.length+1,name,slug,logo:name[0],category,
  description:`${name} is listed under ${catBySlug[category].name}.`,overview:'',website:null,
  popularity:Math.round(45+rnd()*55),dateAdded:new Date(TODAY-Math.floor(rnd()*240)*864e5).toISOString().slice(0,10),
  rating:null,reviewCount:null,pricingPlans:[],features:[],integrations:[],pros:[],cons:[],attrs:{},
  ...v,verification:{status:'unverified',lastVerified:null,notes:'Not yet researched.',sources:[],...(v.verification||{})}});
}));
// Products added in the admin panel start unverified with no rating or price (never invented).
const fromCustom=a=>({id:a.id,name:a.name,slug:a.slug,logo:a.name[0],logoUrl:a.logoUrl,category:a.category,
 description:a.description||`${a.name} is listed under ${catBySlug[a.category].name}.`,overview:'',website:a.website,popularity:50,dateAdded:a.dateAdded,
 rating:null,reviewCount:null,pricingPlans:[],features:[],integrations:[],pros:[],cons:[],attrs:{},
 verification:{status:'unverified',lastVerified:null,notes:'Added in the admin panel. Not yet researched.',sources:[]}});

// products / byId / bySlug are rebuilt IN PLACE, so every page that imported them sees changes.
export const products=[],byId={},bySlug={};
export const baseNames=Object.fromEntries(lineupBase.map(p=>[p.slug,p.name]));
const reg=new Map(); // keeps one object per slug so references (compare list, popular pairs) stay valid
export function rebuild(){
 const d=getData(),removed=new Set(d.removed),taken=new Set(lineupBase.map(p=>p.slug));
 const recs=[...lineupBase.map(p=>structuredClone(p)),...d.added.filter(a=>!taken.has(a.slug)).map(fromCustom)].filter(p=>!removed.has(p.slug));
 products.length=0;Object.keys(byId).forEach(k=>delete byId[k]);Object.keys(bySlug).forEach(k=>delete bySlug[k]);
 recs.forEach(rec=>{
  const x=d.overrides[rec.slug];
  if(x)Object.assign(rec,x,{verification:{...rec.verification,...x.verification}});
  Object.assign(rec,derivePricing(rec.pricingPlans));
  const o=reg.get(rec.slug)||{};Object.keys(o).forEach(k=>delete o[k]);Object.assign(o,rec);reg.set(rec.slug,o);
  products.push(o);byId[o.id]=o;bySlug[o.slug]=o;
 });
}
export const applyOverrides=rebuild;
setChangeHandler(rebuild);
rebuild();
