import {Link} from 'react-router-dom';
import {PageHero,Demo} from '../components/common/Bits';
import ProductExplorer from '../components/products/ProductExplorer';
import ProductCard from '../components/products/ProductCard';
import {products} from '../data/products';
import {categories} from '../data/categories';
import {filterProducts} from '../utils/helpers';
export const TopRated=()=><><PageHero title="Top Rated Products" sub="Ratings appear only when sourced from an authorized review provider; most products currently show “Not verified”." crumbs={[['Top Rated']]}/><ProductExplorer list={products} showCat defaultSort="rating" ranked/><div className="wrap"><Demo/></div></>;
export const RecentlyAdded=()=><><PageHero title="Recently Added" sub="Listing order is placeholder data until real listing dates exist." crumbs={[['Recently Added']]}/><ProductExplorer list={products} showCat defaultSort="recent" showDate/><div className="wrap"><Demo/></div></>;
export function Trending(){
 const t=filterProducts(products,{sort:'popular'});
 const cats=categories.map(c=>({c,s:products.filter(p=>p.category===c.slug).reduce((a,p)=>a+p.popularity,0)})).sort((a,b)=>b.s-a.s).slice(0,6);
 return <><PageHero title="Trending Software" sub="Ordering is placeholder data until real traffic sources are connected." crumbs={[['Trending']]}/>
 <div className="wrap sec"><h2>Most searched tools</h2><div className="chips">{t.slice(0,10).map(p=><Link key={p.id} to={`/products/${p.slug}`} className="chip2">{p.name}</Link>)}</div>
 <h2 className="mt">Popular categories</h2><div className="chips">{cats.map(({c})=><Link key={c.slug} to={`/categories/${c.slug}`} className="chip2" style={{'--c':c.color}}><c.Icon size={14}/>{c.name}</Link>)}</div>
 <h2 className="mt">Trending rankings</h2><div className="pgrid grid">{t.slice(0,12).map((p,i)=><ProductCard key={p.id} p={p} rank={i+1}/>)}</div><Demo/></div></>;
}
