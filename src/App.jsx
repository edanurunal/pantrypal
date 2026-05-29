import { useState, useMemo } from "react";
const CATS = ["Dairy","Vegetables","Fruits","Grains","Meat","Beverages","Snacks","Other"];
const ICONS = {Dairy:"🥛",Vegetables:"🥦",Fruits:"🍎",Grains:"🌾",Meat:"🥩",Beverages:"🧃",Snacks:"🍿",Other:"📦"};
function getStatus(d) {
  const diff = Math.ceil((new Date(d) - new Date()) / 86400000);
  if (diff < 0) return {color:"#ff3b30",badge:"EXPIRED"};
  if (diff <= 3) return {color:"#ff9500",badge:diff+"d left"};
  return {color:"#30d158",badge:diff+"d left"};
}
export default function App() {
  const [items, setItems] = useState([
    {id:1,name:"Whole Milk",category:"Dairy",expiry:new Date(Date.now()-2*86400000).toISOString().slice(0,10)},
    {id:2,name:"Greek Yogurt",category:"Dairy",expiry:new Date(Date.now()+2*86400000).toISOString().slice(0,10)},
    {id:3,name:"Spinach",category:"Vegetables",expiry:new Date(Date.now()+10*86400000).toISOString().slice(0,10)},
  ]);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Dairy");
  const [exp, setExp] = useState("");
  const [err, setErr] = useState("");
  const sorted = useMemo(() => [...items].sort((a,b) => new Date(a.expiry)-new Date(b.expiry)), [items]);
  const add = () => {
    if (!name.trim()) { setErr("Name required!"); return; }
    if (!exp) { setErr("Date required!"); return; }
    setErr("");
    setItems(p => [...p, {id:Date.now(),name,category:cat,expiry:exp}]);
    setName(""); setExp("");
  };
  return (
    <div style={{minHeight:"100vh",background:"#0d1117",color:"#e6edf3",fontFamily:"monospace",padding:"24px"}}>
      <h1 style={{color:"#f0f6fc"}}>🥗 PantryPal</h1>
      <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:24,alignItems:"start"}}>
        <div style={{background:"#161b22",border:"1px solid #30363d",borderRadius:12,padding:20}}>
          <h2 style={{fontSize:14,color:"#f0f6fc",marginTop:0}}>Add Product</h2>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product name" style={{width:"100%",boxSizing:"border-box",background:"#0d1117",border:"1px solid #30363d",borderRadius:8,padding:"10px",color:"#e6edf3",fontSize:13,marginBottom:10,display:"block"}} />
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{width:"100%",boxSizing:"border-box",background:"#0d1117",border:"1px solid #30363d",borderRadius:8,padding:"10px",color:"#e6edf3",fontSize:13,marginBottom:10,display:"block"}}>
            {CATS.map(c=><option key={c}>{c}</option>)}
          </select>
          <input type="date" value={exp} onChange={e=>setExp(e.target.value)} style={{width:"100%",boxSizing:"border-box",background:"#0d1117",border:"1px solid #30363d",borderRadius:8,padding:"10px",color:"#e6edf3",fontSize:13,colorScheme:"dark",marginBottom:10,display:"block"}} />
          {err && <p style={{color:"#ff3b30",fontSize:12}}>⚠ {err}</p>}
          <button onClick={add} style={{width:"100%",background:"#238636",color:"#fff",border:"none",borderRadius:8,padding:11,fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Add to Pantry</button>
        </div>
        <div>
          <h2 style={{fontSize:14,color:"#f0f6fc",marginTop:0}}>Pantry Items ({items.length})</h2>
          {sorted.map(item=>{
            const s=getStatus(item.expiry);
            return (
              <div key={item.id} style={{background:"#161b22",borderLeft:`4px solid ${s.color}`,borderRadius:10,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,marginBottom:10,border:`1px solid ${s.color}44`}}>
                <span style={{fontSize:20}}>{ICONS[item.category]}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,color:"#f0f6fc"}}>{item.name}</div>
                  <div style={{fontSize:12,color:"#8b949e"}}>{item.category} · {item.expiry}</div>
                </div>
                <div style={{border:`1px solid ${s.color}`,color:s.color,padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700}}>{s.badge}</div>
                <button onClick={()=>setItems(p=>p.filter(i=>i.id!==item.id))} style={{background:"none",border:"1px solid #30363d",borderRadius:6,color:"#6e7681",cursor:"pointer",padding:"6px 10px"}}>🗑</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


