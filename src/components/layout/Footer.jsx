import {Link} from 'react-router-dom';
import {Layers,Twitter,Linkedin,Github,Youtube} from 'lucide-react';
import Newsletter from '../common/Newsletter';
import {categories} from '../../data/categories';
export default function Footer(){
 const col=(t,l)=><div><h4>{t}</h4>{l.map(([a,b])=><Link key={a} to={b}>{a}</Link>)}</div>;
 return <footer className="foot"><div className="wrap fgrid">
  <div className="fbrand"><Link to="/" className="brand"><span className="bmark"><Layers size={20}/></span><b>Compario</b></Link><p>Explore software, compare features and pricing, and choose better. All data shown is illustrative demo data.</p><Newsletter compact/>
   <div className="soc">{[Twitter,Linkedin,Github,Youtube].map((I,i)=><a key={i} href="#" onClick={e=>e.preventDefault()} aria-label="Social"><I size={18}/></a>)}</div></div>
  {col('Explore',[['All Products','/products'],['Trending','/trending'],['Top Rated','/top-rated'],['Recently Added','/recently-added']])}
  {col('Popular Categories',categories.slice(0,5).map(c=>[c.name,`/categories/${c.slug}`]))}
  {col('Comparisons',[['Compare Tool','/compare'],['Popular Comparisons','/popular-comparisons'],['All Categories','/categories']])}
  {col('Company',[['About Us','/about'],['Contact Us','/contact']])}</div>
  <div className="wrap copy">© 2026 Compario. Demo project — all ratings, prices and statistics are illustrative.</div></footer>;
}
