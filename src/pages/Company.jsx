import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Target,Eye,ShieldCheck,Heart,Mail,MapPin,Clock,CheckCircle2} from 'lucide-react';
import {PageHero,Demo} from '../components/common/Bits';
import {products} from '../data/products';
export function About(){
 const stats=[[products.length+'+','Products listed'],['18','Categories'],[String(products.filter(p=>p.verification.status==='verified').length),'Products verified against official sources'],[String(products.filter(p=>p.verification.status==='secondary').length),'Awaiting manual review']];
 const vals=[[Target,'Clarity','Plain-language comparisons without jargon.'],[ShieldCheck,'Transparency','We label demo data and explain our scoring.'],[Eye,'Independence','Rankings are never for sale.'],[Heart,'Helpfulness','Built around what people need to decide.']];
 return <><PageHero title="About Compario" sub="Our mission is to make choosing the right digital tools easier, smarter and more transparent." crumbs={[['About']]}/>
 <div className="wrap sec"><div className="two"><div><h2>What Compario does</h2><p>Compario brings software, websites, apps and online services into one place. Search by need, filter by price and rating, and compare up to three products side by side.</p></div><div><h2>Why choose us</h2><p>A clean interface, consistent product data and a comparison tool that highlights real differences so you can decide with confidence.</p></div></div>
 <div className="stats">{stats.map(([n,l])=><div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
 <h2>Our values</h2><div className="cgrid">{vals.map(([I,t,d])=><div key={t} className="ccard" style={{'--c':'#7C3AED'}}><span className="cicon"><I size={22}/></span><h3>{t}</h3><p>{d}</p></div>)}</div>
 <div className="cta mt"><h2>Ready to find your next tool?</h2><Link to="/products" className="btn light">Explore Software</Link></div><Demo/></div></>;
}
export function Contact(){
 const [f,setF]=useState({name:'',email:'',subject:'',message:''}),[err,setErr]=useState({}),[ok,setOk]=useState(false);
 const submit=e=>{e.preventDefault();const x={};
  if(!f.name.trim())x.name='Enter your name.';
  if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email address.';
  if(!f.subject.trim())x.subject='Enter a subject.';
  if(f.message.trim().length<10)x.message='Message must be at least 10 characters.';
  setErr(x);if(!Object.keys(x).length){setOk(true);setF({name:'',email:'',subject:'',message:''})}};
 const fld=(k,l,area)=><label>{l}{area?<textarea rows="5" value={f[k]} onChange={e=>{setF({...f,[k]:e.target.value});setOk(false)}}/>:<input value={f[k]} onChange={e=>{setF({...f,[k]:e.target.value});setOk(false)}}/>}{err[k]&&<span className="errmsg">{err[k]}</span>}</label>;
 return <><PageHero title="Contact Us" sub="Questions, feedback or product suggestions? We'd love to hear from you." crumbs={[['Contact']]}/>
 <div className="wrap sec cwrap"><div className="cinfo">{[[Mail,'Email','hello@Compario.example'],[MapPin,'Office','100 Discovery Way, Remote-first'],[Clock,'Hours','Mon–Fri, 9:00–17:00 UTC']].map(([I,t,d])=><div key={t} className="ccard" style={{'--c':'#3B82F6'}}><span className="cicon"><I size={22}/></span><h3>{t}</h3><p>{d}</p></div>)}</div>
 <form className="cform" onSubmit={submit} noValidate>{ok&&<div className="okbox"><CheckCircle2 size={18}/>Thanks! Your message was sent.</div>}{fld('name','Name')}{fld('email','Email')}{fld('subject','Subject')}{fld('message','Message',1)}<button className="btn pri">Send message</button></form></div></>;
}
