import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function ContributionSuccessScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8"><Icon name="heart" size={44} className="text-primary"/></div>
      <h1 className="font-syne text-white text-3xl font-extrabold text-center mb-3">Thank You!</h1>
      <p className="text-text-secondary text-base text-center max-w-[280px] mb-8">Your contribution helps the team compete. You're a real one! 🙌</p>
      <button onClick={()=>navigate(-2)} className="btn-primary w-full max-w-[360px] py-4 rounded-2xl text-lg font-bold mb-3">Back to Team</button>
      <button onClick={()=>navigate('/')} className="text-text-secondary font-semibold text-sm">Home</button>
    </div>);
}
