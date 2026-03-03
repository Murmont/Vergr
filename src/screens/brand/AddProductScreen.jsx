import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function AddProductScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({name:'',price:'',desc:'',category:'peripherals'});
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Add Product</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <button className="w-full h-40 bg-surface border-2 border-dashed border-surface-border rounded-xl flex flex-col items-center justify-center gap-2 mb-6"><Icon name="image-plus" size={28} className="text-text-secondary"/><span className="text-text-secondary text-sm">Upload Product Images</span></button>
        <div className="flex flex-col gap-4">
          <label className="block"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Product Name</span><input value={form.name} onChange={e=>set('name',e.target.value)} className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary"/></label>
          <label className="block"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Price (ZAR)</span><input type="number" value={form.price} onChange={e=>set('price',e.target.value)} className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary"/></label>
          <label className="block"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Category</span>
            <select value={form.category} onChange={e=>set('category',e.target.value)} className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary">
              <option value="peripherals">Peripherals</option><option value="apparel">Apparel</option><option value="accessories">Accessories</option><option value="collectibles">Collectibles</option>
            </select></label>
          <label className="block"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Description</span><textarea value={form.desc} onChange={e=>set('desc',e.target.value)} rows={4} className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"/></label>
        </div>
        <button className="btn-primary w-full py-4 rounded-2xl text-lg font-bold mt-6">Publish Product</button>
      </main>
    </div>);
}
