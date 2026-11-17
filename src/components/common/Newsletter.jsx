import {useState} from 'react';
export default function Newsletter({compact}){
 const [e,setE]=useState(''),[st,setSt]=useState('');
 const sub=ev=>{ev.preventDefault();/^\S+@\S+\.\S+$/.test(e)?(setSt('ok'),setE('')):setSt('err')};
 return <form className={`nl ${compact?'compact':''}`} onSubmit={sub} noValidate><input type="email" placeholder="you@email.com" value={e} onChange={x=>{setE(x.target.value);setSt('')}} aria-label="Email"/><button className="btn pri">Subscribe</button>{st==='ok'&&<p className="okmsg">Thanks! You're subscribed.</p>}{st==='err'&&<p className="errmsg">Enter a valid email address.</p>}</form>;
}
