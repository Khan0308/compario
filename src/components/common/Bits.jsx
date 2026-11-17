import {Link} from 'react-router-dom';
import {Star,ArrowRight,ChevronRight,Check,X,HelpCircle,MessageCircle,Server,Palette,TrendingUp,Cloud,Hash,Film,Clapperboard,Mail} from 'lucide-react';
import {STATUS} from '../../data/schema';
import {bySlug} from '../../data/products';
import {useState} from 'react';
const hue=s=>[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%360;
// Logos: any file src/assets/logos/<slug>.(svg|png|webp) is used automatically. Otherwise a coloured stand-in tile, then a letter tile.
const logoFiles=import.meta.glob('../../assets/logos/*.{svg,png,webp}',{eager:true,query:'?url',import:'default'});
const logoBySlug=Object.fromEntries(Object.entries(logoFiles).map(([p,u])=>[p.split('/').pop().replace(/\.\w+$/,''),u]));
const logoSlug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const STAND_IN={chatgpt:[MessageCircle,'#10A37F','#0B7A5E'],bluehost:[Server,'#2E6BE6','#1B49B0'],canva:[Palette,'#00C4CC','#7D2AE8'],ahrefs:[TrendingUp,'#FF8A1F','#E55A00'],
 salesforce:[Cloud,'#00A1E0','#0670B8'],slack:[Hash,'#611F69','#3F0E40'],'premiere-pro':[Film,'#6B4EFF','#2A1B8F'],'final-cut-pro':[Clapperboard,'#3A3A3F','#111113'],activecampaign:[Mail,'#356AE6','#1E44B0']};
const LetterLogo=({name,size})=>{const h=hue(name);return <span className="plogo" aria-hidden="true" style={{width:size,height:size,fontSize:size*.45,background:`linear-gradient(135deg,hsl(${h} 75% 55%),hsl(${(h+50)%360} 80% 45%))`}}>{name[0]}</span>};
// Logo from an https URL entered in the admin panel; falls back to a letter tile if it fails to load.
const RemoteLogo=({name,src,size})=>{const [bad,setBad]=useState(false);return bad?<LetterLogo name={name} size={size}/>:<img className="plogo plogo-img" src={src} alt="" aria-hidden="true" width={size} height={size} referrerPolicy="no-referrer" loading="lazy" onError={()=>setBad(true)} style={{width:size,height:size,background:'#fff',objectFit:'contain'}}/>};
export const Logo=({name,size=46})=>{
 const slug=logoSlug(name),url=logoBySlug[slug],box={width:size,height:size};
 if(url)return <img className="plogo plogo-img" src={url} alt="" aria-hidden="true" width={size} height={size} loading="lazy" decoding="async" style={box}/>;
 const remote=bySlug[slug]?.logoUrl;
 if(remote)return <RemoteLogo name={name} src={remote} size={size}/>;
 const st=STAND_IN[slug];
 if(st){const [I,a,b]=st;return <span className="plogo" aria-hidden="true" style={{...box,background:`linear-gradient(135deg,${a},${b})`}}><I size={Math.round(size*.52)} strokeWidth={2.1} color="#fff"/></span>}
 const h=hue(name);return <span className="plogo" aria-hidden="true" style={{...box,fontSize:size*.45,background:`linear-gradient(135deg,hsl(${h} 75% 55%),hsl(${(h+50)%360} 80% 45%))`}}>{name[0]}</span>};
export const Rating=({value,count})=>value==null?<span className="badge muted">Rating not verified</span>:<span className="rating"><Star size={14} fill="currentColor"/>{value}{count!=null&&<em>({count.toLocaleString()})</em>}</span>;
export const Section=({title,sub,to,link,alt,children})=><section className={`sec ${alt?'alt':''}`}><div className="wrap"><div className="sechead"><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div>{to&&<Link to={to} className="more">{link||'View all'} <ArrowRight size={16}/></Link>}</div>{children}</div></section>;
export const PageHero=({title,sub,crumbs=[],children})=><div className="phero"><div className="wrap"><nav className="crumbs"><Link to="/">Home</Link>{crumbs.map(([l,t])=><span key={l}><ChevronRight size={14}/>{t?<Link to={t}>{l}</Link>:l}</span>)}</nav><h1>{title}</h1>{sub&&<p>{sub}</p>}{children}</div></div>;
export const Demo=()=><p className="demo">Data is being verified against official sources. “Not verified” means that item has not been researched yet; it is never treated as “not supported”.</p>;
export const VerifyBadge=({v})=>{const s=STATUS[v.status]||STATUS.unverified;return <span className={`badge ${s.cls}`}>{s.label}</span>};
export const StateChip=({a})=>{const s=a?.state||'unknown';return <span className={`st ${s}`}>{s==='yes'?<Check size={14}/>:s==='no'?<X size={14}/>:<HelpCircle size={14}/>}{s==='yes'?'Supported':s==='no'?'Not supported':'Unknown'}</span>};
export const NotFound=({what='page'})=><div className="wrap empty big"><h1>We couldn't find that {what}</h1><p>It may have moved or never existed.</p><Link className="btn pri" to="/products">Browse all software</Link></div>;
export const MockShot=({title,name})=>{const h=hue(name);return <figure className="shot"><div className="bar"><i/><i/><i/><span>{name} · {title}</span></div><div className="body"><aside>{[1,2,3,4].map(i=><b key={i}/>)}</aside><div className="main"><div className="chart">{[40,65,50,80,60,90,70].map((v,i)=><u key={i} style={{height:v+'%',background:`hsl(${(h+i*12)%360} 75% 60%)`}}/>)}</div><div className="rows"><b/><b/><b/></div></div></div><figcaption>{title} (illustrative preview)</figcaption></figure>};
