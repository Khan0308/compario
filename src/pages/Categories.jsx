import {useState} from 'react';
import {Search} from 'lucide-react';
import {PageHero} from '../components/common/Bits';
import CategoryCard from '../components/categories/CategoryCard';
import {categories} from '../data/categories';
export default function Categories(){
 const [q,setQ]=useState(''),l=categories.filter(c=>(c.name+c.desc).toLowerCase().includes(q.toLowerCase()));
 return <><PageHero title="All Categories" sub={`${categories.length} categories of software, apps and online services.`} crumbs={[['Categories']]}><label className="sinput hero-in"><Search size={18}/><input placeholder="Search categories..." value={q} onChange={e=>setQ(e.target.value)}/></label></PageHero>
 <div className="wrap sec">{l.length?<div className="cgrid">{l.map(c=><CategoryCard key={c.slug} c={c}/>)}</div>:<div className="empty"><h3>No categories match “{q}”</h3></div>}</div></>;
}
