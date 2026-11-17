import {useEffect,useState} from 'react';
import {Routes,Route,Navigate,Link,useLocation,useNavigate} from 'react-router-dom';
import {Layers,LogOut,ExternalLink,Eye,EyeOff,Lock} from 'lucide-react';
import Layout from '../components/layout/Layout';
import {NotFound} from '../components/common/Bits';
import Admin from '../pages/Admin';
import {login,logout,isAdmin,touchSession,lockedFor} from './auth';

// Admin pages must never be indexed or shown in search results.
function useNoIndex(title){
 useEffect(()=>{const m=document.createElement('meta');m.name='robots';m.content='noindex, nofollow';document.head.appendChild(m);const t=document.title;document.title=title;
  return()=>{m.remove();document.title=t}},[title]);
}
const Public404=()=><Layout><NotFound/></Layout>;

function Login(){
 useNoIndex('Admin sign in');
 const nav=useNavigate(),{state}=useLocation();
 const [email,setEmail]=useState(''),[pw,setPw]=useState(''),[show,setShow]=useState(false),[err,setErr]=useState(''),[busy,setBusy]=useState(false),[wait,setWait]=useState(lockedFor());
 useEffect(()=>{if(!wait)return;const t=setInterval(()=>setWait(lockedFor()),1000);return()=>clearInterval(t)},[wait]);
 if(isAdmin())return <Navigate to="/admin" replace/>;
 const submit=async e=>{e.preventDefault();setErr('');
  if(!email.trim()||!pw)return setErr('Enter your email and password.');
  setBusy(true);const r=await login(email,pw);setBusy(false);
  if(r.ok)nav(state?.from||'/admin',{replace:true});else{setErr(r.error);setPw('');setWait(lockedFor())}};
 return <div className="alogin"><form className="acard" onSubmit={submit} noValidate>
  <span className="bmark"><Lock size={22}/></span><h1>Admin sign in</h1><p>Authorised staff only.</p>
  <label htmlFor="ae">Email</label><input id="ae" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} autoFocus/>
  <label htmlFor="ap">Password</label><div className="apw"><input id="ap" type={show?'text':'password'} autoComplete="current-password" value={pw} onChange={e=>setPw(e.target.value)}/>
   <button type="button" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
  {(err||wait>0)&&<p className="aerr" role="alert">{wait>0?`Locked. Try again in ${wait>60?Math.ceil(wait/60)+' min':wait+' s'}.`:err}</p>}
  <button className="btn pri" disabled={busy||wait>0}>{busy?'Checking…':'Sign in'}</button></form></div>;
}

// Unauthenticated visitors see an ordinary 404, so the admin area is not advertised.
function Guard(){
 const [ok,setOk]=useState(isAdmin()),nav=useNavigate(),{pathname}=useLocation();
 useNoIndex('Admin');
 useEffect(()=>{touchSession();setOk(isAdmin())},[pathname]);
 useEffect(()=>{const t=setInterval(()=>setOk(isAdmin()),20000);return()=>clearInterval(t)},[]);
 if(!ok)return <Public404/>;
 return <div className="ashell"><header className="ahead"><div className="wrap ahin"><Link to="/admin" className="brand"><span className="bmark"><Layers size={20}/></span><b>Compario</b><em>Admin</em></Link>
  <div><Link className="btn ghost sm" to="/" target="_blank" rel="noopener"><ExternalLink size={14}/>View site</Link> <button className="btn ghost sm" onClick={()=>{logout();nav('/admin/login',{replace:true})}}><LogOut size={14}/>Sign out</button></div></div></header><Admin/></div>;
}
export default function AdminRoutes(){return <Routes><Route path="/admin/login" element={<Login/>}/><Route path="/admin" element={<Guard/>}/><Route path="*" element={<Public404/>}/></Routes>}
