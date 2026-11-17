import {useEffect,useState} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {Layers,ChevronDown,Search,GitCompare,Menu,X} from 'lucide-react';
import {categories} from '../../data/categories';
import {useCompare} from '../../context/CompareContext';
import SearchBox from '../search/SearchBox';
export default function Navbar(){
 const {ids}=useCompare(),[open,setOpen]=useState(false),[s,setS]=useState(false),[dd,setDd]=useState(false),[user,setUser]=useState(false),{pathname}=useLocation();
 useEffect(()=>{setOpen(false);setS(false);setDd(false)},[pathname]);
 return <header className="nav"><div className="wrap navin">
  <Link to="/" className="brand"><span className="bmark"><Layers size={20}/></span><b>Compario</b></Link>
  <nav className={`links ${open?'open':''}`}>
   <div className="dd" onMouseLeave={()=>setDd(false)}><button className="lk" onClick={()=>setDd(!dd)} onMouseEnter={()=>setDd(true)}>Categories <ChevronDown size={14}/></button>
    {dd&&<div className="menu">{categories.map(c=><Link key={c.slug} to={`/categories/${c.slug}`}><c.Icon size={16} color={c.color}/>{c.name}</Link>)}<Link className="all" to="/categories">All categories</Link></div>}</div>
   <NavLink className="lk" to="/products">Products</NavLink><NavLink className="lk" to="/popular-comparisons">Comparisons</NavLink><NavLink className="lk" to="/trending">Trending</NavLink><NavLink className="lk" to="/top-rated">Top Rated</NavLink></nav>
  <div className="nright"><button className="iconbtn" aria-label="Search" onClick={()=>setS(!s)}>{s?<X size={20}/>:<Search size={20}/>}</button>
   <Link to="/compare" className="iconbtn cmp" aria-label="Compare"><GitCompare size={20}/>{ids.length>0&&<i>{ids.length}</i>}</Link>
   {/* <button className="btn pri sm" onClick={()=>setUser(!user)}>{user?'Signed in (demo)':'Sign In'}</button> */}
   <button className="iconbtn burger" aria-label="Menu" onClick={()=>setOpen(!open)}><Menu size={22}/></button></div></div>
  {s&&<div className="wrap sbar"><SearchBox autoFocus onDone={()=>setS(false)}/></div>}</header>;
}
