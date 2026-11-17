import {useMemo,useState} from 'react';
import {LayoutGrid,List,Search,SlidersHorizontal} from 'lucide-react';
import ProductCard from './ProductCard';
import {filterProducts} from '../../utils/helpers';
import {categories} from '../../data/categories';
export default function ProductExplorer({list,showCat,defaultSort='popular',showDate,ranked,initialQ=''}){
 const [f,setF]=useState({q:initialQ,cat:'',pricing:'',rating:0,max:100,sort:defaultSort});
 const [view,setView]=useState('grid'),[n,setN]=useState(12),[fo,setFo]=useState(false);
 const set=(k,v)=>{setF(s=>({...s,[k]:v}));setN(12)};
 const out=useMemo(()=>filterProducts(list,f),[list,f]);
 const reset=()=>{setF({q:'',cat:'',pricing:'',rating:0,max:100,sort:defaultSort});setN(12)};
 return <div className="wrap explorer">
  <div className="tools"><label className="sinput"><Search size={18}/><input placeholder="Search software..." value={f.q} onChange={e=>set('q',e.target.value)}/></label>
   <button className="btn ghost sm fbtn" onClick={()=>setFo(!fo)}><SlidersHorizontal size={15}/>Filters</button>
   <select value={f.sort} onChange={e=>set('sort',e.target.value)} aria-label="Sort"><option value="popular">Most Popular</option><option value="rating">Highest Rated</option><option value="alpha">Alphabetical</option><option value="recent">Recently Added</option><option value="price">Price: Low to High</option></select>
   <div className="vt"><button className={view==='grid'?'on':''} onClick={()=>setView('grid')} aria-label="Grid"><LayoutGrid size={16}/></button><button className={view==='list'?'on':''} onClick={()=>setView('list')} aria-label="List"><List size={16}/></button></div></div>
  <div className={`filters ${fo?'open':''}`}>
   {showCat&&<select value={f.cat} onChange={e=>set('cat',e.target.value)}><option value="">All categories</option>{categories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select>}
   <select value={f.pricing} onChange={e=>set('pricing',e.target.value)}><option value="">Any pricing</option><option>Free</option><option>Freemium</option><option>Paid</option></select>
   <select value={f.rating} onChange={e=>set('rating',+e.target.value)}><option value={0}>Any rating</option><option value={4.5}>4.5+</option><option value={4}>4.0+</option><option value={3.5}>3.5+</option></select>
   <label className="range">Max price ${f.max}/mo<input type="range" min="0" max="100" step="5" value={f.max} onChange={e=>set('max',+e.target.value)}/></label>
   <button className="btn ghost sm" onClick={reset}>Reset</button></div>
  <p className="count">{out.length} product{out.length!==1&&'s'} found</p>
  {out.length?<><div className={`pgrid ${view}`}>{out.slice(0,n).map((p,i)=><ProductCard key={p.id} p={p} variant={view==='list'?'list':'grid'} showDate={showDate} rank={ranked?i+1:null}/>)}</div>
   {n<out.length&&<div className="center"><button className="btn pri" onClick={()=>setN(n+12)}>Load more</button></div>}</>
  :<div className="empty"><h3>No products match your filters</h3><p>Try a different search or clear the filters.</p><button className="btn pri" onClick={reset}>Clear filters</button></div>}
 </div>;
}
