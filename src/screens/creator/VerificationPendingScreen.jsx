import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function VerificationPendingScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center mb-8"><Icon name="clock" size={44} className="text-yellow-400"/></div>
      <h1 className="font-syne text-white text-3xl font-extrabold text-center mb-3">Under Review</h1>
      <p className="text-text-secondary text-base text-center max-w-[280px] mb-2">Your verification application has been submitted.</p>
      <p className="text-text-secondary text-sm text-center max-w-[280px] mb-8">This usually takes 2-5 business days. We'll notify you once it's reviewed.</p>
      <div className="bg-surface rounded-xl p-4 w-full max-w-[360px] mb-8 flex items-start gap-3 border border-surface-border"><Icon name="info" size={16} className="text-primary mt-0.5 shrink-0"/><p className="text-text-secondary text-xs">You can continue using VERGR normally while your application is being reviewed.</p></div>
      <button onClick={()=>navigate('/',{replace:true})} className="btn-primary w-full max-w-[360px] py-4 rounded-2xl text-lg font-bold">Back to Home</button>
    </div>);
}
