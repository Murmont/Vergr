import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function PurchaseSuccessScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8"><Icon name="check-circle" size={48} className="text-primary"/></div>
      <h1 className="font-syne text-white text-3xl font-extrabold text-center mb-3">Purchase Successful!</h1>
      <p className="text-text-secondary text-base text-center max-w-[280px] mb-2">Your coins have been added to your wallet.</p>
      <div className="flex items-center gap-2 bg-surface rounded-full px-6 py-3 my-6"><Icon name="coins" size={20} className="text-primary"/><span className="text-white text-2xl font-bold">+500</span></div>
      <button onClick={()=>navigate('/wallet')} className="btn-primary w-full max-w-[360px] py-4 rounded-2xl text-lg font-bold mb-3">View Wallet</button>
      <button onClick={()=>navigate('/')} className="text-text-secondary font-semibold text-sm">Back to Home</button>
    </div>);
}
