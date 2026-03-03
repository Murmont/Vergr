import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useUI } from '../../context/UIContext';
export default function SubmitReviewScreen() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Write a Review</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="flex justify-center gap-3 my-8">{[1,2,3,4,5].map(s=>(
          <button key={s} onClick={()=>setRating(s)}><Icon name="star" size={32} className={s<=rating?'text-yellow-400':'text-surface-border'} fill={s<=rating?'currentColor':'none'}/></button>))}</div>
        <textarea value={review} onChange={e=>setReview(e.target.value)} rows={5} placeholder="Share your experience..." className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none mb-4"/>
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-surface border border-dashed border-surface-border rounded-xl text-text-secondary text-sm mb-6"><Icon name="image" size={18}/>Add Photos</button>
        <button onClick={()=>{showToast('Review submitted!','success');navigate(-1);}} className="btn-primary w-full py-4 rounded-2xl text-lg font-bold">Submit Review</button>
      </main>
    </div>);
}
