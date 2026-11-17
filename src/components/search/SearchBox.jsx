import {useEffect,useMemo,useRef,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Search} from 'lucide-react';
import {products} from '../../data/products';
import {catBySlug} from '../../data/categories';
import {filterProducts} from '../../utils/helpers';
import {Logo} from '../common/Bits';
export default function SearchBox({big,autoFocus,onDone}){
 const [q,setQ]=useState(''),[open,setOpen]=useState(false),[i,setI]=useState(-1);
 const nav=useNavigate(),ref=useRef();
 const res=useMemo(()=>q.trim()?filterProducts(products,{q}).slice(0,6):[],[q]);
 useEffect(()=>{const h=e=>!ref.current?.contains(e.target)&&setOpen(false);document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h)},[]);
 const go=p=>{setOpen(false);setQ('');setI(-1);onDone?.();nav(p)};
 const all=()=>go(`/products?q=${encodeURIComponent(q.trim())}`);
 const submit=e=>{e.preventDefault();if(i>=0&&res[i])go(`/products/${res[i].slug}`);else if(q.trim())all()};
 const key=e=>{if(e.key==='ArrowDown'){e.preventDefault();setI(x=>Math.min(x+1,res.length-1))}else if(e.key==='ArrowUp'){e.preventDefault();setI(x=>Math.max(x-1,-1))}else if(e.key==='Escape')setOpen(false)};
 return <div className={`sbox ${big?'big':''}`} ref={ref}>
  <form onSubmit={submit} role="search"><Search size={20}/><input autoFocus={autoFocus} value={q} onChange={e=>{setQ(e.target.value);setOpen(true);setI(-1)}} onKeyDown={key} onFocus={()=>setOpen(true)} placeholder="Search for any tool, e.g. Canva, Shopify, ChatGPT..." aria-label="Search software"/><button className="btn pri">Search</button></form>
  {open&&q.trim()&&<div className="sdrop">{res.length?<>{res.map((p,x)=><button type="button" key={p.id} className={x===i?'on':''} onClick={()=>go(`/products/${p.slug}`)}><Logo name={p.name} size={32}/><span><b>{p.name}</b><small>{catBySlug[p.category].name}</small></span></button>)}<button type="button" className="all" onClick={all}>View all results</button></>:<div className="empty sm">No tools found for “{q}”. Try another keyword.</div>}</div>}
 </div>;
}
