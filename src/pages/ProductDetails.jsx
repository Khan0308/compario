import {Link,useParams} from 'react-router-dom';
import {ExternalLink,Plus,Check} from 'lucide-react';
import {Logo,Rating,NotFound,Demo,VerifyBadge,StateChip} from '../components/common/Bits';
import ProductCard from '../components/products/ProductCard';
import {bySlug,products} from '../data/products';
import {catBySlug} from '../data/categories';
import {attrsFor,isOutdated} from '../data/schema';
import {fmtPrice,fmtDate} from '../utils/helpers';
import {useCompare} from '../context/CompareContext';
const TABS=['overview','features','pricing','reviews','sources','alternatives'];
const NV=({children})=><p className="nv">Not verified — {children}</p>;
export default function ProductDetails(){
 const {slug}=useParams(),p=bySlug[slug],{has,toggle,full}=useCompare();
 if(!p)return <NotFound what="product"/>;
 const c=catBySlug[p.category],inC=has(p.id),v=p.verification,at=attrsFor(p.category);
 const alts=products.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,3);
 const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
 const priceSrc=v.sources.find(s=>s.kind==='pricing'&&s.tier==='official'),featSrc=v.sources.find(s=>s.kind==='features')||priceSrc;
 const link=s=>s?<a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>:<span>Not verified</span>;
 return <><div className="phero"><div className="wrap"><nav className="crumbs"><Link to="/">Home</Link> / <Link to="/categories">Categories</Link> / <Link to={`/categories/${c.slug}`}>{c.name}</Link> / {p.name}</nav>
  <div className="pdhead"><Logo name={p.name} size={84}/><div><h1>{p.name}</h1><Link to={`/categories/${c.slug}`} className="pcat">{c.name}</Link><p>{p.description}</p>
   <div className="pmeta"><Rating value={p.rating} count={p.reviewCount}/><span className="price">{fmtPrice(p)}</span>{p.pricingModel&&<span className="badge ok">{p.pricingModel}</span>}{p.hasFreePlan&&<span className="badge ok">Free plan</span>}<VerifyBadge v={v}/></div>
   <div className="pact">{p.website?<a className="btn pri" href={p.website} target="_blank" rel="noreferrer"><ExternalLink size={16}/>Official website</a>:<span className="btn ghost" aria-disabled="true">Official website: not verified</span>}
    <button className={`btn ${inC?'sel':'ghost'}`} disabled={!inC&&full} onClick={()=>toggle(p.id)}>{inC?<><Check size={16}/>Added to compare</>:<><Plus size={16}/>Add to Compare</>}</button></div></div></div></div></div>
 <div className="subnav"><div className="wrap">{TABS.map(t=><button key={t} onClick={()=>go(t)}>{t[0].toUpperCase()+t.slice(1)}</button>)}</div></div>
 <div className="wrap pdbody">
  <section id="overview"><h2>Overview</h2>{p.overview?<p>{p.overview}</p>:<NV>a detailed overview hasn’t been added for {p.name} yet.</NV>}
   <h3>Official screenshots</h3><NV>official screenshots haven’t been added yet.</NV></section>
  <section id="features"><h2>Features</h2>
   {p.features.length?<div className="fgrid2">{p.features.map(f=><div key={f}><Check size={16}/>{f}</div>)}</div>:<NV>features haven’t been checked against official documentation.</NV>}
   {at.length>0&&<><h3>{c.name} attributes</h3><div className="attrs">{at.map(a=>{const x=p.attrs[a.key];return <div key={a.key}><b>{a.label}</b>{a.type==='text'?<span>{x?.state==='yes'&&x.note?x.note:'Not verified'}</span>:<StateChip a={x}/>}{x?.note&&a.type!=='text'&&<small className="meta">{x.note}</small>}</div>})}</div></>}
   <h3>Pros and cons</h3>{p.pros.length||p.cons.length?<div className="pc"><div className="pro"><h3>Pros</h3><ul>{p.pros.map(x=><li key={x}>{x}</li>)}</ul></div><div className="con"><h3>Cons</h3><ul>{p.cons.map(x=><li key={x}>{x}</li>)}</ul></div></div>:<NV>pros and cons will be added only from reviewed sources.</NV>}
   <h3>Integrations</h3>{p.integrations.length?<div className="chips">{p.integrations.map(i=><span key={i} className="chip2">{i}</span>)}</div>:<NV>no integrations list has been verified from an official directory.</NV>}</section>
  <section id="pricing"><h2>Pricing</h2>
   {p.pricingPlans.length?<><p className="meta">US prices as recorded from the sources below{v.lastVerified?` on ${fmtDate(v.lastVerified)}`:''}. Plans change often — confirm on the official website.</p>
    <div className="plans">{p.pricingPlans.map(pl=><div key={pl.name} className="plan"><h3>{pl.name}</h3><div className="amt sm">{pl.price}</div><small>{pl.note}</small><div><span className={`badge ${pl.tier==='official'?'ok':'warn'}`}>{pl.tier==='official'?'Official source':'Secondary source'}</span></div></div>)}</div></>
   :<NV>pricing for {p.name} hasn’t been checked against its official pricing page.</NV>}</section>
  <section id="reviews"><h2>Ratings and reviews</h2>{p.rating!=null?<Rating value={p.rating} count={p.reviewCount}/>:<NV>Compario shows ratings and review counts only when they come from an authorized review provider. No testimonials are displayed.</NV>}</section>
  <section id="sources"><h2>Sources and verification</h2>
   <div className="vgrid"><div><small>Data status</small><VerifyBadge v={v}/></div><div><small>Last verified</small><b>{v.lastVerified?fmtDate(v.lastVerified):'Not yet verified'}</b>{isOutdated(p)&&<span className="badge warn">Needs review</span>}</div><div><small>Official pricing source</small>{link(priceSrc)}</div><div><small>Feature source</small>{link(featSrc)}</div></div>
   {v.notes&&<p className="meta">{v.notes}</p>}
   {v.sources.length?<ul className="srclist">{v.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}<ExternalLink size={13}/></a><span className={`badge ${s.tier==='official'?'ok':'muted'}`}>{s.tier==='official'?'Official':'Secondary'}</span><span className="meta">{s.accessed?`Read${s.checked?' on '+fmtDate(s.checked):''}`:'Not accessed by Compario — check manually'}</span></li>)}</ul>:<NV>no sources have been recorded yet.</NV>}</section>
  <section id="alternatives"><h2>Alternatives</h2><div className="pgrid grid">{alts.map(a=><ProductCard key={a.id} p={a}/>)}</div><Demo/></section></div></>;
}
