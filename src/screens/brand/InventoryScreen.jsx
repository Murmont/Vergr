import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function InventoryScreen() {
  const navigate = useNavigate();
  const products = [{id:1,name:'Velocity X Mouse',price:'€44.99',stock:45,status:'active'},{id:2,name:'VERGR Hoodie',price:'€29.99',stock:12,status:'active'},{id:3,name:'RGB Mousepad XL',price:'€17.49',stock:0,status:'out'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg flex-1">Inventory</h1><button onClick={()=>navigate('/brand/add-product')} className="text-primary"><Icon name="plus" size={22}/></button></header>
      <main className="flex-1 px-5 pb-8">{products.map(p=>(
        <div key={p.id} className="flex items-center gap-3 py-4 border-b border-surface-border/30">
          <div className="w-14 h-14 rounded-xl bg-surface-border flex items-center justify-center"><Icon name="package" size={22} className="text-text-secondary"/></div>
          <div className="flex-1"><p className="text-white font-semibold text-sm">{p.name}</p><p className="text-text-secondary text-xs">{p.price} · {p.stock>0?`${p.stock} in stock`:'Out of stock'}</p></div>
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${p.status==='active'?'bg-green-500/20 text-green-400':'bg-red-500/20 text-red-400'}`}>{p.status==='active'?'Active':'Out'}</span>
        </div>))}</main>
    </div>);
}
