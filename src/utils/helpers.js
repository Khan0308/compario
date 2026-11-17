import {catBySlug} from '../data/categories';
export const fmtPrice=p=>!p.pricingPlans.length?'Pricing not verified':p.pricingModel==='Free'?'Free':p.startingPrice!=null?`Paid from $${p.startingPrice}/mo`:'See plans';
export const fmtDate=d=>new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
export function filterProducts(list,{q='',cat='',pricing='',rating=0,max=100,sort='popular'}={}){
 const words=q.toLowerCase().split(/\s+/).filter(Boolean);
 let out=list.filter(p=>{
  if(cat&&p.category!==cat)return false;
  if(pricing&&p.pricingModel!==pricing)return false;
  if(rating&&(p.rating==null||p.rating<rating))return false;
  if(max<100&&(p.startingPrice==null||p.startingPrice>max))return false;
  if(!words.length)return true;
  const hay=[p.name,catBySlug[p.category].name,p.description,...p.features,...p.integrations].join(' ').toLowerCase();
  return words.every(w=>hay.includes(w));});
 const s={popular:(a,b)=>b.popularity-a.popularity,rating:(a,b)=>(b.rating??-1)-(a.rating??-1)||b.verification.status.localeCompare(a.verification.status),alpha:(a,b)=>a.name.localeCompare(b.name),recent:(a,b)=>b.dateAdded.localeCompare(a.dateAdded),price:(a,b)=>(a.startingPrice??1e9)-(b.startingPrice??1e9)}[sort];
 return s?[...out].sort(s):out;
}
