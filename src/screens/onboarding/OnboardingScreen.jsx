import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

const slides = [
  {
    icon: 'stadia_controller',
    title: 'Welcome to VERGR',
    subtitle: 'Where Gamers Converge',
    description: 'The gaming social platform where you compete, create, earn, and shop — all in one place.',
    gradient: 'from-brand-cyan to-brand-violet',
    bgGlow: 'rgba(77,255,212,0.08)',
  },
  {
    icon: 'emoji_events',
    title: 'Compete',
    subtitle: 'Rise Through The Ranks',
    description: 'Join tournaments, climb leaderboards, and prove yourself against the best gamers worldwide. Win coins and exclusive rewards.',
    gradient: 'from-brand-violet to-brand-pink',
    bgGlow: 'rgba(123,111,255,0.08)',
    features: ['Weekly tournaments', 'Community leaderboards', 'Squad vs squad battles', 'Prize pools'],
  },
  {
    icon: 'paid',
    title: 'Earn',
    subtitle: 'Get Rewarded For Gaming',
    description: "Unlike other platforms where you only spend, VERGR lets you EARN. Complete quests, watch streams, refer friends, and stack coins every day.",
    gradient: 'from-brand-gold to-orange-500',
    bgGlow: 'rgba(245,197,66,0.08)',
    features: ['Daily & weekly quests', 'Stream watching rewards', 'Referral bonuses', 'Creator earnings'],
  },
  {
    icon: 'brush',
    title: 'Create',
    subtitle: 'Build Your Brand',
    description: 'Go live, post highlights, create polls, and grow your audience. Link your Twitch, YouTube, and other platforms to stream directly.',
    gradient: 'from-brand-pink to-brand-ember',
    bgGlow: 'rgba(200,127,255,0.08)',
    features: ['Multi-platform streaming', 'Post & poll creation', 'Creator analytics', 'Membership tiers'],
  },
  {
    icon: 'storefront',
    title: 'Shop',
    subtitle: 'Gear Up & Sell',
    description: 'Buy gaming gear, merch, and digital goods from creators and brands. Or open your own shop and start selling.',
    gradient: 'from-brand-ember to-brand-gold',
    bgGlow: 'rgba(255,77,106,0.08)',
    features: ['Gaming peripherals', 'Creator merch', 'Digital collectibles', 'Sell your own products'],
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  const next = () => {
    if (isLast) navigate('/setup/interests', { replace: true });
    else setCurrentSlide(prev => prev + 1);
  };

  const skip = () => navigate('/setup/interests', { replace: true });

  return (
    <div className="screen-container min-h-screen p-6" style={{ background: `radial-gradient(circle at 50% 30%, ${slide.bgGlow}, transparent 70%), #07080D` }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-brand-gradient' : 'w-2 bg-surface-3'}`} />
          ))}
        </div>
        {!isLast && (
          <button onClick={skip} className="text-text-muted text-sm hover:text-text-secondary transition-colors">Skip</button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in" key={currentSlide}>
        {/* Icon */}
        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8 shadow-lg animate-float`}>
          <Icon name={slide.icon} filled size={48} className="text-white" />
        </div>

        <h1 className="font-syne text-3xl font-extrabold text-text-primary mb-2">{slide.title}</h1>
        <p className="text-gradient font-syne text-lg font-bold mb-4">{slide.subtitle}</p>
        <p className="text-text-secondary text-base leading-relaxed max-w-[340px] mb-8">{slide.description}</p>

        {/* Features list */}
        {slide.features && (
          <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] mb-8">
            {slide.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 bg-surface-2/60 rounded-xl px-3 py-2.5 border border-border-accent/50">
                <Icon name="check_circle" filled size={16} className="text-brand-cyan shrink-0" />
                <span className="text-sm text-text-primary">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pb-8">
        <button onClick={next} className="btn-primary">
          {isLast ? "Let's Go!" : 'Next'}
          {!isLast && <Icon name="arrow_forward" size={20} className="ml-2" />}
        </button>
      </div>
    </div>
  );
}
