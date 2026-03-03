import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useUI } from '../../context/UIContext';
export default function CreatePollScreen() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['','']);
  const [duration, setDuration] = useState('24h');
  const addOption = () => options.length<6&&setOptions(p=>[...p,'']);
  const updateOption = (i,v) => {const n=[...options];n[i]=v;setOptions(n);};
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg flex-1">Create Poll</h1><button onClick={()=>{showToast('Poll created!','success');navigate(-1);}} className="text-primary font-semibold text-sm">Post</button></header>
      <main className="flex-1 px-5 pb-8">
        <textarea value={question} onChange={e=>setQuestion(e.target.value)} rows={2} placeholder="Ask a question..." className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none text-lg mb-4"/>
        <p className="text-text-secondary text-xs font-bold uppercase mb-3">Options</p>
        {options.map((o,i)=>(
          <div key={i} className="flex items-center gap-2 mb-2">
            <input value={o} onChange={e=>updateOption(i,e.target.value)} placeholder={`Option ${i+1}`} className="flex-1 bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary text-sm"/>
            {options.length>2&&<button onClick={()=>setOptions(p=>p.filter((_,j)=>j!==i))}><Icon name="x" size={18} className="text-text-secondary"/></button>}
          </div>))}
        {options.length<6&&<button onClick={addOption} className="flex items-center gap-2 text-primary text-sm font-semibold mt-2"><Icon name="plus" size={16}/>Add Option</button>}
        <p className="text-text-secondary text-xs font-bold uppercase mt-6 mb-3">Duration</p>
        <div className="flex gap-2">{['6h','12h','24h','48h','7d'].map(d=>(
          <button key={d} onClick={()=>setDuration(d)} className={`px-4 py-2 rounded-full text-sm font-bold ${duration===d?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{d}</button>))}</div>
      </main>
    </div>);
}
