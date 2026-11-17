import {Link} from 'react-router-dom';
import {X} from 'lucide-react';
import {useCompare} from '../../context/CompareContext';
import {Logo} from '../common/Bits';
export default function CompareBar(){
 const {items,remove,clear}=useCompare();
 if(!items.length)return null;
 return <div className="cbar"><div className="wrap cbin"><div className="cb-items">{items.map(p=><span key={p.id} className="chip"><Logo name={p.name} size={24}/>{p.name}<button aria-label={`Remove ${p.name}`} onClick={()=>remove(p.id)}><X size={14}/></button></span>)}<small>{items.length}/3 selected</small></div>
 <div><button className="btn ghost sm" onClick={clear}>Clear all</button> <Link className="btn pri sm" to="/compare">Compare ({items.length})</Link></div></div></div>;
}
