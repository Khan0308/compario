import {Routes,Route,useLocation} from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes';
import Layout from './components/layout/Layout';
import {NotFound} from './components/common/Bits';
import Home from './pages/Home';import Categories from './pages/Categories';import CategoryDetails from './pages/CategoryDetails';
import Products from './pages/Products';import ProductDetails from './pages/ProductDetails';import Compare from './pages/Compare';
import PopularComparisons from './pages/PopularComparisons';import {Trending,TopRated,RecentlyAdded} from './pages/Lists';import {About,Contact} from './pages/Company';
export default function App(){
 const {pathname}=useLocation();
 if(pathname==="/admin"||pathname.startsWith("/admin/"))return <AdminRoutes/>;
 return <Layout><Routes>
 <Route path="/" element={<Home/>}/><Route path="/categories" element={<Categories/>}/><Route path="/categories/:slug" element={<CategoryDetails/>}/>
 <Route path="/products" element={<Products/>}/><Route path="/products/:slug" element={<ProductDetails/>}/><Route path="/compare" element={<Compare/>}/>
 <Route path="/popular-comparisons" element={<PopularComparisons/>}/><Route path="/trending" element={<Trending/>}/><Route path="/top-rated" element={<TopRated/>}/>
 <Route path="/recently-added" element={<RecentlyAdded/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></Layout>}
