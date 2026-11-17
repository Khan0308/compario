import {createContext,useContext,useEffect,useState} from 'react';
import {byId} from '../data/products';
const Ctx=createContext();
export const useCompare=()=>useContext(Ctx);
export function CompareProvider({children}){
 const [ids,setIds]=useState(()=>{try{return (JSON.parse(localStorage.getItem('sc_compare'))||[]).filter(i=>byId[i]).slice(0,3)}catch{return[]}});
 useEffect(()=>{try{localStorage.setItem('sc_compare',JSON.stringify(ids))}catch{}},[ids]);
 const add=id=>setIds(a=>a.includes(id)||a.length>=3?a:[...a,id]);
 const remove=id=>setIds(a=>a.filter(x=>x!==id));
 const v={ids,items:ids.map(i=>byId[i]).filter(Boolean),add,remove,toggle:id=>ids.includes(id)?remove(id):add(id),clear:()=>setIds([]),setAll:a=>setIds(a.slice(0,3)),has:id=>ids.includes(id),full:ids.length>=3};
 return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}
