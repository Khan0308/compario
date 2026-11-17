import {Link} from 'react-router-dom';
import {Sparkles,Star,ShoppingCart,Palette,Zap,Globe} from 'lucide-react';
import SearchBox from '../components/search/SearchBox';
import ProductCard from '../components/products/ProductCard';
import CategoryCard from '../components/categories/CategoryCard';
import PairCard from '../components/comparison/PairCard';
import Newsletter from '../components/common/Newsletter';
import {Section,Demo} from '../components/common/Bits';
import {categories} from '../data/categories';
import {products} from '../data/products';
import {comparisons} from '../data/comparisons';
import {filterProducts} from '../utils/helpers';
const top=s=>filterProducts(products,{sort:s});
const POP=['ai-tools','website-builders','web-hosting','ecommerce-platforms','graphic-design-tools','project-management','crm-software','seo-tools'];
export default function Home(){
 const grid=l=><div className="pgrid grid">{l.map(p=><ProductCard key={p.id} p={p}/>)}</div>;
 return <>
 <section className="hero"><div className="wrap herogrid"><div>
  <span className="pill"><Sparkles size={14}/>Smarter Choices, Greater Productivity</span>
  <h1>Discover. Compare. Choose <span className="grad">Better.</span></h1>
  <p className="lead">Explore the best software, websites, apps and online services. Compare features, pricing and reviews to find the perfect tools for your needs.</p>
  <SearchBox big/><div className="sugg"><span>Popular:</span>{['chatgpt','canva','shopify','wix','hubspot'].map(s=>products.find(p=>p.slug===s)).filter(Boolean).map(p=><Link key={p.slug} to={`/products/${p.slug}`}>{p.name}</Link>)}</div></div>
  <div className="floaty" aria-hidden="true"><div className="fc f1"><Sparkles/></div><div className="fc f2"><ShoppingCart/></div><div className="fc f3"><Palette/></div><div className="fc f4"><Zap/></div><div className="fc f5"><Globe/></div><div className="fc f6"><Star/></div><div className="orb"><b>{products.length}+</b><span>tools to compare</span></div></div></div></section>
 <Section title="Popular Categories" sub="Browse software by what you need to get done." to="/categories" link="Explore All Categories"><div className="cgrid">{POP.map(s=><CategoryCard key={s} c={categories.find(c=>c.slug===s)}/>)}</div></Section>
 <Section alt title="Trending Software" sub="What people are exploring right now." to="/trending">{grid(top('popular').slice(0,6))}</Section>
 <Section title="Featured Software" sub="Editor's picks from across categories."><div className="pgrid feat">{['chatgpt','figma','shopify'].map(s=>products.find(p=>p.slug===s)).filter(Boolean).map(p=><ProductCard key={p.slug} variant="featured" p={p}/>)}</div></Section>
 <Section alt title="Popular Comparisons" sub="Side-by-side matchups readers open most." to="/popular-comparisons"><div className="pairs">{comparisons.slice(0,4).map(c=><PairCard key={c.a.id+'-'+c.b.id} c={c}/>)}</div></Section>
 <Section title="Top Rated Products" to="/top-rated">{grid(top('rating').slice(0,6))}</Section>
 <Section alt title="Recently Added" to="/recently-added">{grid(top('recent').slice(0,3))}</Section>
 <section className="sec"><div className="wrap"><div className="cta"><h2>Not sure which tool is right for you?</h2><p>Compare your favorite software and make smarter decisions.</p><Link to="/compare" className="btn light">Start Comparing</Link></div></div></section>
 <section className="sec alt"><div className="wrap nlbox"><div><h2>Get fresh tool picks weekly</h2><p>New launches and comparisons, straight to your inbox.</p></div><Newsletter/></div><div className="wrap"><Demo/></div></section></>;
}
