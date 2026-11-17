import {useParams} from 'react-router-dom';
import {PageHero,NotFound} from '../components/common/Bits';
import ProductExplorer from '../components/products/ProductExplorer';
import {catBySlug} from '../data/categories';
import {products} from '../data/products';
export default function CategoryDetails(){
 const {slug}=useParams(),c=catBySlug[slug];
 if(!c)return <NotFound what="category"/>;
 const list=products.filter(p=>p.category===slug);
 return <><PageHero title={c.name} sub={`${c.desc} ${list.length} products available.`} crumbs={[['Categories','/categories'],[c.name]]}><span className="cicon big" style={{'--c':c.color}}><c.Icon size={30}/></span></PageHero><ProductExplorer key={slug} list={list}/></>;
}
