import {useNavigate} from 'react-router-dom';
import {Logo} from '../common/Bits';
import {catBySlug} from '../../data/categories';
import {useCompare} from '../../context/CompareContext';
export default function PairCard({c}){
 const {setAll}=useCompare(),nav=useNavigate();
 return <div className="pair"><div className="vs"><Logo name={c.a.name} size={52}/><span>VS</span><Logo name={c.b.name} size={52}/></div>
  <h3>{c.a.name} vs {c.b.name}</h3><small>{catBySlug[c.a.category].name}</small>
  <button className="btn pri sm" onClick={()=>{setAll([c.a.id,c.b.id]);nav('/compare')}}>Compare Now</button></div>;
}
