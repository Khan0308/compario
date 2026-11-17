import {useState} from 'react';
import {Search} from 'lucide-react';
import {PageHero} from '../components/common/Bits';
import PairCard from '../components/comparison/PairCard';
import {comparisons} from '../data/comparisons';
import {categories,catBySlug} from '../data/categories';
export default function PopularComparisons(){
 const [q,setQ]=useState(''),[cat,setCat]=useState('');
 const l=comparisons.filter(c=>(!cat||c.a.category===cat)&&`${c.a.name} ${c.b.name}`.toLowerCase().includes(q.toLowerCase()));
 const used=[...new Set(comparisons.map(c=>c.a.category))];
 return <><PageHero title="Popular Comparisons" sub="Jump straight into the matchups people compare most (demo popularity)." crumbs={[['Comparisons']]}/>
 <div className="wrap sec"><div className="tools"><label className="sinput"><Search size={18}/><input placeholder="Search comparisons..." value={q} onChange={e=>setQ(e.target.value)}/></label><select value={cat} onChange={e=>setCat(e.target.value)}><option value="">All categories</option>{used.map(s=><option key={s} value={s}>{catBySlug[s].name}</option>)}</select></div>
 {l.length?<div className="pairs">{l.map(c=><PairCard key={c.a.id+'-'+c.b.id} c={c}/>)}</div>:<div className="empty"><h3>No comparisons found</h3><p>Try another search or category.</p></div>}</div></>;
}
