import {Link} from 'react-router-dom';
import {products} from '../../data/products';
export default function CategoryCard({c}){
 const n=products.filter(p=>p.category===c.slug).length;
 return <Link to={`/categories/${c.slug}`} className="ccard" style={{'--c':c.color}}><span className="cicon"><c.Icon size={24}/></span><h3>{c.name}</h3><p>{c.desc}</p><small>{n} products</small></Link>;
}
