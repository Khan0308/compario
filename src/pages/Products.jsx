import {useSearchParams} from 'react-router-dom';
import {PageHero,Demo} from '../components/common/Bits';
import ProductExplorer from '../components/products/ProductExplorer';
import {products} from '../data/products';
export default function Products(){
 const [sp]=useSearchParams(),q=sp.get('q')||'';
 return <><PageHero title={q?`Results for “${q}”`:'All Software'} sub={`${products.length} products across 18 categories.`} crumbs={[['Products']]}/><ProductExplorer key={q} initialQ={q} showCat list={products}/><div className="wrap"><Demo/></div></>;
}
