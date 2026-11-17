import {useState} from 'react';
import {PageHero,VerifyBadge} from '../components/common/Bits';
import {products,bySlug,baseNames} from '../data/products';
import {getData,saveData,hasDraft,discardDraft,norm,slugify,safeUrl} from '../data/adminStore';
import {refreshComparisons} from '../data/comparisons';
import {categories,catBySlug} from '../data/categories';
import {isOutdated,attrsFor} from '../data/schema';
import {fmtDate} from '../utils/helpers';
const saveOverrides=o=>{const d=getData();d.overrides=o;saveData(d)};
function Editor({p,onSaved}){
 const v=p.verification;
 const [d,setD]=useState({description:p.description,website:p.website||'',status:v.status,lastVerified:v.lastVerified||'',notes:v.notes||'',plans:p.pricingPlans.map(x=>({...x})),sources:v.sources.map(x=>({...x})),attrs:JSON.parse(JSON.stringify(p.attrs))});
 const [err,setErr]=useState('');
 const set=(k,x)=>setD(s=>({...s,[k]:x})),upd=(k,i,f,x)=>set(k,d[k].map((r,j)=>j===i?{...r,[f]:x}:r));
 const today=()=>setD(s=>({...s,status:'verified',lastVerified:new Date().toISOString().slice(0,10)}));
 const submit=()=>{
  if(d.status==='verified'&&(!d.lastVerified||!d.sources.some(s=>s.tier==='official'&&/^https?:\/\//.test(s.url))))return setErr('To mark Verified, add a verification date and at least one official source URL you have checked.');
  if(d.website&&!safeUrl(d.website))return setErr('Website must start with http:// or https://');
  if(d.sources.some(s=>s.url&&!safeUrl(s.url)))return setErr('Every source URL must start with http:// or https://');
  const o=getData().overrides;o[p.slug]={description:d.description,website:d.website||null,pricingPlans:d.plans.map(x=>({...x,priceNum:x.priceNum===''||x.priceNum==null?null:Number(x.priceNum)})),attrs:d.attrs,
   verification:{status:d.status,lastVerified:d.lastVerified||null,notes:d.notes,sources:d.sources.map(s=>({...s,accessed:s.accessed??true}))}};saveOverrides(o);onSaved()};
 return <div className="aed"><h3>Edit {p.name}</h3>
  <label>Description<textarea rows="2" value={d.description} onChange={e=>set('description',e.target.value)}/></label>
  <div className="arow"><label>Official website<input value={d.website} onChange={e=>set('website',e.target.value)} placeholder="https://"/></label>
   <label>Status<select value={d.status} onChange={e=>set('status',e.target.value)}><option value="unverified">Not verified</option><option value="secondary">Needs manual review</option><option value="verified">Verified</option></select></label>
   <label>Last verified<input type="date" value={d.lastVerified} onChange={e=>set('lastVerified',e.target.value)}/></label><button className="btn ghost sm" onClick={today}>Mark verified today</button></div>
  <label>Notes<textarea rows="2" value={d.notes} onChange={e=>set('notes',e.target.value)}/></label>
  <h4>Pricing plans</h4>{d.plans.map((x,i)=><div className="arow" key={i}><label>Name<input value={x.name} onChange={e=>upd('plans',i,'name',e.target.value)}/></label><label>Price text<input value={x.price} onChange={e=>upd('plans',i,'price',e.target.value)}/></label><label>Numeric USD/mo (blank=custom)<input type="number" step="0.01" value={x.priceNum??''} onChange={e=>upd('plans',i,'priceNum',e.target.value)}/></label><label>Note<input value={x.note||''} onChange={e=>upd('plans',i,'note',e.target.value)}/></label><label>Source<select value={x.tier||'secondary'} onChange={e=>upd('plans',i,'tier',e.target.value)}><option value="official">Official</option><option value="secondary">Secondary</option></select></label><button className="btn ghost sm" onClick={()=>set('plans',d.plans.filter((_,j)=>j!==i))}>Remove</button></div>)}
  <button className="btn ghost sm" onClick={()=>set('plans',[...d.plans,{name:'',price:'',priceNum:null,note:'',tier:'official'}])}>Add plan</button>
  <h4>Features / attributes ({p.category})</h4><div className="arow">{attrsFor(p.category).map(a=>{const x=d.attrs[a.key]||{state:'unknown'};const ch=(f,val)=>setD(s=>({...s,attrs:{...s.attrs,[a.key]:{...x,[f]:val}}}));
   return <div key={a.key}><label>{a.label}<select value={x.state||'unknown'} onChange={e=>ch('state',e.target.value)}><option value="unknown">Unknown</option><option value="yes">Supported</option><option value="no">Not supported</option></select></label><input placeholder="Note / value" value={x.note||''} onChange={e=>ch('note',e.target.value)}/></div>})}</div>
  <h4>Source URLs</h4>{d.sources.map((s,i)=><div className="arow" key={i}><label>Label<input value={s.label} onChange={e=>upd('sources',i,'label',e.target.value)}/></label><label>URL<input value={s.url} onChange={e=>upd('sources',i,'url',e.target.value)}/></label><label>Used for<select value={s.kind} onChange={e=>upd('sources',i,'kind',e.target.value)}><option value="pricing">Pricing</option><option value="features">Features</option><option value="general">General</option></select></label><label>Type<select value={s.tier} onChange={e=>upd('sources',i,'tier',e.target.value)}><option value="official">Official</option><option value="secondary">Secondary</option></select></label><button className="btn ghost sm" onClick={()=>set('sources',d.sources.filter((_,j)=>j!==i))}>Remove</button></div>)}
  <button className="btn ghost sm" onClick={()=>set('sources',[...d.sources,{label:'',url:'',kind:'pricing',tier:'official',accessed:true,checked:d.lastVerified||null}])}>Add source</button>
  {err&&<p className="errmsg">{err}</p>}
  <div className="pact"><button className="btn pri" onClick={submit}>Save changes</button><button className="btn ghost" onClick={()=>{const o=getData().overrides;delete o[p.slug];saveOverrides(o);onSaved()}}>Reset to default</button></div></div>;
}
const todayStr=()=>new Date().toISOString().slice(0,10);
function AddForm({onAdded,onCancel}){
 const [f,setF]=useState({name:'',category:categories[0].slug,website:'',description:'',logoUrl:''}),[err,setErr]=useState('');
 const set=k=>e=>setF(s=>({...s,[k]:e.target.value}));
 const submit=e=>{e.preventDefault();
  const name=f.name.trim(),slug=slugify(name),d=getData();
  if(name.length<2||name.length>60)return setErr('Name must be 2 to 60 characters.');
  if(!slug)return setErr('Name needs letters or numbers.');
  if(bySlug[slug])return setErr(`"${bySlug[slug].name}" is already listed.`);
  if(d.removed.includes(slug))return setErr('This product was removed earlier. Restore it from the "Removed products" list instead.');
  if(!catBySlug[f.category])return setErr('Choose a category.');
  if(f.website.trim()&&!safeUrl(f.website))return setErr('Website must start with http:// or https://');
  if(f.logoUrl.trim()&&!safeUrl(f.logoUrl,{httpsOnly:true}))return setErr('Logo URL must start with https://');
  if(f.description.length>400)return setErr('Description can be at most 400 characters.');
  d.added.push({id:d.nextId,name,slug,category:f.category,website:safeUrl(f.website),description:f.description.trim(),logoUrl:safeUrl(f.logoUrl,{httpsOnly:true}),dateAdded:todayStr()});
  d.nextId+=1;saveData(d);onAdded(slug,name)};
 return <form className="aed" onSubmit={submit} noValidate><h3>Add a product</h3>
  <div className="arow"><label>Product name *<input value={f.name} onChange={set('name')} maxLength={60} autoFocus/></label>
   <label>Category *<select value={f.category} onChange={set('category')}>{categories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label></div>
  <div className="arow"><label>Official website<input value={f.website} onChange={set('website')} placeholder="https://"/></label>
   <label>Logo image URL (optional)<input value={f.logoUrl} onChange={set('logoUrl')} placeholder="https://…/logo.png"/></label></div>
  <label>Short description<textarea rows="2" value={f.description} onChange={set('description')} maxLength={400}/></label>
  <p className="amuted">New products start as “Not verified” with no rating or price. Add plans, features and sources in the next step.</p>
  {err&&<p className="errmsg" role="alert">{err}</p>}
  <div className="pact"><button className="btn pri" type="submit">Add product</button><button type="button" className="btn ghost" onClick={onCancel}>Cancel</button></div></form>;
}
const download=(text,name)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};

export default function Admin(){
 const [flt,setFlt]=useState(''),[q,setQ]=useState(''),[sel,setSel]=useState(null),[adding,setAdding]=useState(false),[ask,setAsk]=useState(null),[msg,setMsg]=useState(null),[,setTick]=useState(0);
 const refresh=()=>{refreshComparisons();setTick(t=>t+1)};
 const d=getData(),draft=hasDraft(),custom=new Set(d.added.map(a=>a.slug));
 const list=products.filter(p=>(!flt||(flt==='outdated'?isOutdated(p):p.verification.status===flt))&&(!q.trim()||p.name.toLowerCase().includes(q.trim().toLowerCase())));
 const say=(text,bad)=>setMsg({text,bad});
 const remove=p=>{const x=getData();
  if(custom.has(p.slug)){x.added=x.added.filter(a=>a.slug!==p.slug);delete x.overrides[p.slug]}
  else if(!x.removed.includes(p.slug))x.removed.push(p.slug);
  saveData(x);setAsk(null);setSel(null);refresh();say(`${p.name} was removed${custom.has(p.slug)?'.':'. You can restore it below.'}`)};
 const restore=slug=>{const x=getData();x.removed=x.removed.filter(s=>s!==slug);saveData(x);refresh();say(`${baseNames[slug]} was restored.`)};
 const exportFile=()=>{download(JSON.stringify(getData(),null,2)+'\n','adminData.json');say('Downloaded adminData.json. Replace src/data/adminData.json with it and redeploy to publish.')};
 const importFile=async f=>{if(!f)return;
  if(f.size>2*1024*1024)return say('That file is too large (limit 2 MB).',true);
  try{const j=JSON.parse(await f.text());if(!j||typeof j!=='object'||Array.isArray(j)||!Array.isArray(j.added)||!Array.isArray(j.removed))throw new Error('x');
   const n=norm(j);saveData(n);setSel(null);refresh();say(`Imported ${n.added.length} added, ${n.removed.length} removed and ${Object.keys(n.overrides).length} edited products (anything invalid was skipped).`)}
  catch{say('That is not a valid adminData.json file.',true)}};
 return <><PageHero title="Data admin" sub="Add or remove products and edit their data, sources and verification status." crumbs={[['Admin']]}/>
 <div className="wrap sec admin">
  {draft?<p className="abanner">You have <b>unpublished changes in this browser</b> ({d.added.length} added, {d.removed.length} removed, {Object.keys(d.overrides).length} edited). Visitors cannot see them until you <b>Export</b> the file, put it in <code>src/data/adminData.json</code> and redeploy.</p>
   :<p className="abanner ok">No local changes. Visitors see the published <code>adminData.json</code>.</p>}
  {msg&&<p className={msg.bad?'errmsg':'asuccess'} role="status">{msg.text}</p>}
  <div className="tools">
   <button className="btn pri sm" onClick={()=>{setAdding(true);setSel(null);setMsg(null)}}>+ Add product</button>
   <input className="asearch" aria-label="Search products" placeholder="Search by name…" value={q} onChange={e=>setQ(e.target.value)}/>
   <select aria-label="Filter by status" value={flt} onChange={e=>setFlt(e.target.value)}><option value="">All products ({products.length})</option><option value="verified">Verified</option><option value="secondary">Needs manual review</option><option value="unverified">Not verified</option><option value="outdated">Outdated / never verified</option></select>
   <span className="aspace"/>
   <button className="btn ghost sm" onClick={exportFile}>Export changes</button>
   <label className="btn ghost sm">Import<input type="file" accept="application/json,.json" hidden onChange={e=>{importFile(e.target.files[0]);e.target.value=''}}/></label>
   {draft&&<button className="btn ghost sm" onClick={()=>setAsk({type:'discard'})}>Discard local changes</button>}</div>
  {ask?.type==='discard'&&<p className="aconfirm" role="alertdialog">Discard all local changes and go back to the published data? <button className="btn pri sm" onClick={()=>{discardDraft();setAsk(null);setSel(null);refresh();say('Local changes discarded.')}}>Yes, discard</button> <button className="btn ghost sm" onClick={()=>setAsk(null)}>Cancel</button></p>}
  {adding&&<AddForm onCancel={()=>setAdding(false)} onAdded={(slug,name)=>{setAdding(false);refresh();say(`${name} was added. Fill in its details below.`);setSel(bySlug[slug])}}/>}
  <div className="tscroll"><table><thead><tr><th>Product</th><th>Category</th><th>Status</th><th>Last verified</th><th>Outdated?</th><th/></tr></thead><tbody>{list.map(p=><tr key={p.id}><td>{p.name}{custom.has(p.slug)&&<span className="acustom">Added</span>}</td><td>{catBySlug[p.category].name}</td><td><VerifyBadge v={p.verification}/></td><td>{p.verification.lastVerified?fmtDate(p.verification.lastVerified):'—'}</td><td>{isOutdated(p)?'Yes':'No'}</td>
   <td className="aact">{ask?.type==='remove'&&ask.slug===p.slug?<><span className="amuted">Remove {p.name}?</span> <button className="btn pri sm" onClick={()=>remove(p)}>Yes, remove</button> <button className="btn ghost sm" onClick={()=>setAsk(null)}>Cancel</button></>:<><button className="btn ghost sm" onClick={()=>{setSel(p);setAdding(false)}}>Edit</button> <button className="btn ghost sm adanger" aria-label={`Remove ${p.name}`} onClick={()=>setAsk({type:'remove',slug:p.slug})}>Remove</button></>}</td></tr>)}
   {!list.length&&<tr><td colSpan="6" className="amuted">No products match.</td></tr>}</tbody></table></div>
  {sel&&<Editor key={sel.slug} p={sel} onSaved={()=>{setSel(null);refresh()}}/>}
  {d.removed.length>0&&<div className="aremoved"><h3>Removed products ({d.removed.length})</h3><ul>{d.removed.map(s=><li key={s}>{baseNames[s]||s} <button className="btn ghost sm" onClick={()=>restore(s)}>Restore</button></li>)}</ul></div>}
 </div></>;
}
