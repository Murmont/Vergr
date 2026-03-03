import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function PayoutSuccessScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8"><Icon name="banknote" size={44} className="text-primary"/></div>
      <h1 className="font-syne text-white text-3xl font-extrabold text-center mb-3">Payout Requested!</h1>
      <p className="text-text-secondary text-base text-center max-w-[280px] mb-8">Your payout of R977.50 is being processed. You'll receive it within 3-5 business days.</p>
      <button onClick={()=>navigate('/wallet')} className="btn-primary w-full max-w-[360px] py-4 rounded-2xl text-lg font-bold mb-3">View Wallet</button>
      <button onClick={()=>navigate('/')} className="text-text-secondary font-semibold text-sm">Back to Home</button>
    </div>);
}
