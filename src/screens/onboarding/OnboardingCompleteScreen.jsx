import { useNavigate } from 'react-router-dom';
import VergrLogo from '../../components/VergrLogo';
import Icon from '../../components/Icon';

export default function OnboardingCompleteScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center p-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 scale-150" />
        <div className="relative w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center"><VergrLogo size={48} /></div>
      </div>
      <h1 className="font-syne text-white text-4xl font-extrabold text-center mb-3">You're All Set!</h1>
      <p className="text-text-secondary text-lg text-center max-w-[300px] mb-4">Welcome to the VERGR community. Time to compete, create, and earn.</p>
      <div className="flex gap-6 my-8">
        {[{ icon: 'swords', label: 'Compete' }, { icon: 'video', label: 'Create' }, { icon: 'coins', label: 'Earn' }, { icon: 'shopping-bag', label: 'Shop' }].map(i => (
          <div key={i.label} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center"><Icon name={i.icon} size={22} className="text-primary" /></div>
            <span className="text-text-secondary text-xs font-semibold">{i.label}</span>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/', { replace: true })} className="btn-primary w-full max-w-[360px] py-4 rounded-2xl text-lg font-bold mt-8">Enter VERGR</button>
    </div>
  );
}
