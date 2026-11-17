import {HelpCircle} from 'lucide-react';
import {catBySlug} from '../../data/categories';
import {Logo,VerifyBadge,StateChip} from '../common/Bits';
import {STATUS,attrsFor} from '../../data/schema';
import {fmtDate} from '../../utils/helpers';
// A cell is {u:true} (unknown) or {v:comparable,r:node,state?,note?}. Unknown is never "No".
const T=(label,f,render)=>[label,p=>{const x=f(p);return x==null||x===''?{u:true}:{v:String(x),r:render?render(p):x}}];
const B=(label,f)=>[label,p=>{const x=f(p);return x==null?{u:true}:{v:x?'yes':'no',state:x?'yes':'no'}}];
const attrRow=a=>[a.label,p=>{const x=p.attrs[a.key];if(!x||x.state==='unknown'||!x.state)return{u:true,note:x?.note};
 if(a.type==='text')return x.note?{v:x.note,r:x.note}:{u:true};return{v:x.state,state:x.state,note:x.note}}];
export default function CompareTable({items,onRemove}){
 const same=new Set(items.map(p=>p.category)).size===1,attrs=same?attrsFor(items[0].category):[];
 const sections=[
 ['Overview',[T('Category',p=>catBySlug[p.category].name),T('Description',p=>p.description),T('Rating',p=>p.rating!=null?`${p.rating} / 5`:null),T('Data status',p=>STATUS[p.verification.status].label,p=>(<VerifyBadge v={p.verification}/>))]],
 ['General Information',[T('Official website',p=>p.website,p=>(<a href={p.website} target="_blank" rel="noreferrer">Visit site</a>)),T('Last verified',p=>p.verification.lastVerified&&fmtDate(p.verification.lastVerified))]],
 ['Pricing',[B('Free plan',p=>p.hasFreePlan),T('Starting paid price (US)',p=>p.startingPrice>0?`$${p.startingPrice}/mo`:null),T('Plans on record',p=>p.pricingPlans.map(x=>x.name).join(', '))]],
 [same?'Category-specific':'Category-specific (hidden)',same&&attrs.length?attrs.map(attrRow):[T('Note',()=> 'Products are in different categories, so category-specific attributes are not compared.')]],
 ['Integrations',[T('Verified integrations',p=>p.integrations.join(', '))]],
 ['Advantages / Disadvantages',[T('Pros',p=>p.pros.join('; ')),T('Cons',p=>p.cons.join('; '))]]];
 const cell=(c)=>c.u?<span className="st unknown"><HelpCircle size={14}/>{c.note?c.note:'Not verified'}</span>:c.state?<><StateChip a={{state:c.state}}/>{c.note&&<small className="cn">{c.note}</small>}</>:c.r;
 return <div className="ctable"><table><thead><tr><th/>{items.map(p=><th key={p.id}><Logo name={p.name} size={40}/><b>{p.name}</b><button className="link" onClick={()=>onRemove(p.id)}>Remove / replace</button></th>)}</tr></thead>
 {sections.map(([title,rows])=><tbody key={title}><tr className="sec"><td colSpan={items.length+1}>{title}</td></tr>
  {rows.map(([label,get])=>{const cs=items.map(get),known=cs.filter(c=>!c.u).map(c=>c.v),diff=known.length>1&&new Set(known).size>1;
   return <tr key={label} className={diff?'diff':''}><th scope="row">{label}</th>{cs.map((c,i)=><td key={items[i].id}>{cell(c)}</td>)}</tr>})}</tbody>)}
 </table></div>;
}
