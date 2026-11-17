import {Link} from 'react-router-dom';
import {Plus,Check} from 'lucide-react';
import {Logo,Rating,VerifyBadge} from '../common/Bits';
import {catBySlug} from '../../data/categories';
import {fmtPrice,fmtDate} from '../../utils/helpers';
import {useCompare} from '../../context/CompareContext';
export default function ProductCard({p,variant='grid',rank,showDate,trend}){
 const {has,toggle,full}=useCompare(),inC=has(p.id);
 return <article className={`pcard ${variant}`}>
  {rank&&<span className="rank">#{rank}</span>}
  <div className="ptop"><Logo name={p.name} size={variant==='featured'?64:48}/><div><Link to={`/products/${p.slug}`}><h3>{p.name}</h3></Link><span className="pcat">{catBySlug[p.category].name}</span></div></div>
  <p className="pdesc">{p.description}</p>
  <div className="pmeta"><Rating value={p.rating} count={p.reviewCount}/><span className="price">{fmtPrice(p)}</span>{p.hasFreePlan&&<span className="badge ok">Free plan</span>}<VerifyBadge v={p.verification}/></div>
  <div className="pact"><Link className="btn ghost sm" to={`/products/${p.slug}`}>View Details</Link>
  <button className={`btn sm ${inC?'sel':'pri'}`} disabled={!inC&&full} title={!inC&&full?'Max 3 products':''} onClick={()=>toggle(p.id)}>{inC?<><Check size={14}/>Added</>:<><Plus size={14}/>Compare</>}</button></div>
 </article>;
}
