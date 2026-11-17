import {useLayoutEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Navbar from './Navbar';import Footer from './Footer';import CompareBar from './CompareBar';
export default function Layout({children}){
 const {pathname}=useLocation();
 // Jump to top instantly, before paint, so there is no visible scroll animation between pages.
 useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'})},[pathname]);
 return <><Navbar/><main>{children}</main><Footer/><CompareBar/></>;
}
