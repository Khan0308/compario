import {useMemo,useState} from 'react';
import {Plus,Trash2} from 'lucide-react';
import {Link} from 'react-router-dom';
import {PageHero,Logo,Demo,VerifyBadge} from '../components/common/Bits';
import CompareTable from '../components/comparison/CompareTable';
import {useCompare} from '../context/CompareContext';
import {products} from '../data/products';
import {catBySlug} from '../data/categories';
import {filterProducts,fmtPrice} from '../utils/helpers';
export default function Compare(){
 const {items,add,remove,clear,has,full}=useCompare(),[q,setQ]=useState('');
 const res=useMemo(()=>filterProducts(products,{q}).filter(p=>!has(p.id)).slice(0,q?6:5),[q,items]);
 
 return <><PageHero title="Compare Software" sub="Compare 2 or 3 products side by side." crumbs={[['Compare']]}/>
 <div className="wrap sec"><div className="picker"><h3>{full?'Maximum of 3 products selected':'Add a product'}</h3>
  <p>{full?'Remove a product (or use Replace on its column) to pick another.':'Search below, then click a product to add it.'}</p>
  {!full&&<><input className="pinput" placeholder="Search to add a product..." value={q} onChange={e=>setQ(e.target.value)}/>
  <div className="plist">{res.map(p=><button key={p.id} onClick={()=>{add(p.id);setQ('')}}><Logo name={p.name} size={30}/><span>{p.name}<small>{catBySlug[p.category].name}</small></span><Plus size={16}/></button>)}{!res.length&&<div className="empty sm">No matching products.</div>}</div></>}
  {items.length>0&&<button className="btn ghost sm" onClick={clear}><Trash2 size={14}/>Clear all</button>}</div>
 {items.length<2?<div className="empty"><h3>{items.length?'Add one more product to start comparing':'Nothing to compare yet'}</h3><p>Pick at least two products, or browse <Link to="/popular-comparisons">popular comparisons</Link>.</p></div>:<>
  <CompareTable items={items} onRemove={remove}/>
  <div className="summary"><h2>Which product is better?</h2><p>Compario doesn’t rank products. That depends on your needs and budget. Unknown values are never counted against a product; they just haven’t been verified yet. Highlighted rows show where verified values differ.</p><div className="sgrid">{items.map(p=><div key={p.id}><Logo name={p.name} size={36}/><b>{p.name}</b><VerifyBadge v={p.verification}/><small>{fmtPrice(p)}</small></div>)}</div></div></>}
 <Demo/></div></>;
}
