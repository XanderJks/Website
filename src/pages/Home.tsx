import React, { useEffect, useRef } from 'react';
import { 
  Share2, 
  CheckCircle, 
  Users, 
  Clock, 
  MessageSquare, 
  Shield, 
  Calendar, 
  Sparkles, 
  Zap, 
  Target, 
  Waves, 
  Droplets,
  BarChart3,
  TrendingUp,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [
      ...(featuresRef.current?.children || []),
      ...(benefitsRef.current?.children || []),
      ...(pricingRef.current?.children || []),
      contactRef.current
    ].filter(Boolean);

    elements.forEach((element) => {
      if (element) {
        element.classList.add('opacity-0');
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
  };

  return (
    <>
      <SEOHead
        title="SocialFlows - Social Media Automatisering voor Bedrijven"
        description="Automatiseer uw social media marketing met SocialFlows. Intelligente content planning, automatische posting en geavanceerde analytics voor alle social media platforms. Bespaar tijd en verhoog uw online aanwezigheid."
        keywords="social media automatisering, content planning, social media marketing, automatische posting, social media tools, Instagram automatisering, Facebook marketing, LinkedIn marketing, Nederland, bedrijfsoplossingen"
        url="https://socialflows.nl"
        image="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop"
      />
      
      <main className="relative min-h-screen overflow-hidden">
        {/* Liquid Glass Background Effects */}
        <div className="fixed inset-0 z-0">
          {/* Primary liquid glass orbs */}
          <div 
            className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/30 rounded-full blur-3xl animate-pulse"
            style={{ 
              animationDuration: '8s',
              filter: 'blur(80px)',
              background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.2) 50%, rgba(147,51,234,0.3) 100%)'
            }}
          ></div>
          
          <div 
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-violet-500/25 via-pink-500/20 to-cyan-400/25 rounded-full blur-3xl animate-pulse"
            style={{ 
              animationDuration: '12s', 
              animationDelay: '2s',
              filter: 'blur(70px)',
              background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.2) 50%, rgba(6,182,212,0.25) 100%)'
            }}
          ></div>
          
          <div 
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-emerald-400/20 via-teal-500/15 to-blue-600/25 rounded-full blur-3xl animate-pulse"
            style={{ 
              animationDuration: '10s', 
              animationDelay: '4s',
              filter: 'blur(60px)',
              background: 'radial-gradient(circle, rgba(52,211,153,0.2) 0%, rgba(20,184,166,0.15) 50%, rgba(37,99,235,0.25) 100%)'
            }}
          ></div>

          {/* Floating liquid particles */}
          <div className="absolute inset-0 overflow-hidden opacity-40">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400/60 to-blue-500/60 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 12}s`,
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Spline viewer with enhanced glass effect */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <spline-viewer url="https://prod.spline.design/WD2J2PHPPYN42s9X/scene.splinecode"></spline-viewer>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20"></div>
        </div>
        
        {/* Hero Section */}
        <section id="home" className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-48 lg:pb-32 relative z-20">
            <div className="text-center">
              {/* Liquid Glass Hero Content */}
              <div className="max-w-6xl mx-auto">
                {/* Overline with liquid glass effect */}
                <div className="mb-8">
                  <span className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-sm font-medium text-cyan-300 tracking-wide uppercase shadow-2xl">
                    <Share2 size={16} className="mr-3 text-cyan-400" />
                    De toekomst van social media marketing
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>
                  </span>
                </div>
                
                {/* Main Typography with liquid glass styling */}
                <div className="space-y-8 mb-16">
                  {/* Primary Headline with enhanced glass effect */}
                  <div className="relative">
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                      SocialFlows_
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-3xl -z-10"></div>
                  </div>
                  
                  {/* Subtitle with liquid glass container */}
                  <div className="relative max-w-5xl mx-auto">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"></div>
                    <div className="relative p-8 text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-tight">
                      <span className="block mb-3">
                        Automatiseer uw social media marketing
                      </span>
                      <span className="block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-medium">
                          met intelligente content planning
                        </span>
                      </span>
                      <span className="block mt-3 text-lg lg:text-xl text-white/70">
                        zodat u zich kunt focussen op het groeien van uw bedrijf
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Liquid Glass Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative group text-lg px-10 py-5 w-full sm:w-auto overflow-hidden"
                    aria-label="Start uw SocialFlows project"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 group-hover:bg-white/30 transition-all duration-300"></div>
                    <span className="relative z-10 font-bold text-white drop-shadow-lg">Start Gratis Trial</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
                  </button>
                  
                  <button 
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative group text-lg px-10 py-5 w-full sm:w-auto overflow-hidden"
                    aria-label="Bekijk onze features"
                  >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"></div>
                    <span className="relative z-10 font-semibold text-white drop-shadow-lg">Bekijk Features</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                  </button>
                </div>

                {/* Liquid Glass Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                  {[
                    { value: '500+', label: 'Tevreden klanten' },
                    { value: '24/7', label: 'Automatisering' },
                    { value: '85%', label: 'Tijdsbesparing' },
                    { value: '10+', label: 'Social platforms' }
                  ].map((stat, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                      <div className="relative p-6 text-center">
                        <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 drop-shadow-lg">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/80 uppercase tracking-wider font-medium">
                          {stat.label}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="relative z-10 py-32" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-sm font-medium text-cyan-300 shadow-xl">
                  <Zap size={16} className="mr-2" />
                  Krachtige automatisering
                </span>
              </div>
              <h2 id="features-heading" className="text-5xl sm:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                Alles wat u nodig heeft_
              </h2>
              <p className="text-white/80 text-xl max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
                SocialFlows biedt een complete suite van tools om uw social media marketing te automatiseren en optimaliseren.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: 'Intelligente Content Planning',
                  description: 'Plan en schedule uw content automatisch op het beste moment voor maximale engagement.',
                  features: ['AI-gestuurde timing', 'Bulk scheduling', 'Content kalender'],
                  gradient: 'from-cyan-500/20 to-blue-500/20'
                },
                {
                  icon: BarChart3,
                  title: 'Geavanceerde Analytics',
                  description: 'Krijg diepgaande inzichten in uw social media performance met real-time rapportages.',
                  features: ['Real-time statistieken', 'ROI tracking', 'Competitor analyse'],
                  gradient: 'from-purple-500/20 to-pink-500/20'
                },
                {
                  icon: Users,
                  title: 'Multi-Platform Beheer',
                  description: 'Beheer al uw social media accounts vanaf één centraal dashboard.',
                  features: ['10+ platforms', 'Unified inbox', 'Team collaboration'],
                  gradient: 'from-emerald-500/20 to-teal-500/20'
                },
                {
                  icon: TrendingUp,
                  title: 'AI Content Optimalisatie',
                  description: 'Onze AI analyseert wat werkt en optimaliseert automatisch uw content voor betere resultaten.',
                  features: ['Hashtag suggesties', 'Content A/B testing', 'Performance voorspelling'],
                  gradient: 'from-orange-500/20 to-red-500/20'
                },
                {
                  icon: Shield,
                  title: 'Brand Safety & Compliance',
                  description: 'Bescherm uw merk met automatische content moderatie en compliance checks.',
                  features: ['Content filtering', 'Brand guidelines', 'Approval workflows'],
                  gradient: 'from-indigo-500/20 to-purple-500/20'
                },
                {
                  icon: MessageSquare,
                  title: 'Social Listening',
                  description: 'Monitor mentions, trends en sentiment rond uw merk in real-time.',
                  features: ['Mention tracking', 'Sentiment analyse', 'Crisis management'],
                  gradient: 'from-pink-500/20 to-rose-500/20'
                }
              ].map((feature, index) => (
                <article key={index} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} backdrop-blur-xl rounded-3xl border border-white/20 group-hover:border-white/30 transition-all duration-500 shadow-2xl`}></div>
                  <div className="relative p-8 h-full">
                    <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-16 h-16 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                      <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">{feature.title}</h3>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle size={18} className="text-green-400 mr-3 drop-shadow-lg" aria-hidden="true" />
                          <span className="text-white/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10`}></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" ref={pricingRef} className="relative z-10 py-32" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-sm font-medium text-emerald-300 shadow-xl">
                  <Target size={16} className="mr-2" />
                  Transparante prijzen
                </span>
              </div>
              <h2 id="pricing-heading" className="text-5xl sm:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 drop-shadow-2xl">
                Kies uw plan_
              </h2>
              <p className="text-white/80 text-xl max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
                Start gratis en upgrade wanneer u klaar bent om te groeien. Alle plannen bevatten een 14-daagse gratis proefperiode.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Starter',
                  price: '€29',
                  period: '/maand',
                  description: 'Perfect voor kleine bedrijven die net beginnen',
                  features: [
                    '3 social media accounts',
                    '50 posts per maand',
                    'Basis analytics',
                    'Email support',
                    'Content kalender'
                  ],
                  popular: false,
                  gradient: 'from-gray-500/20 to-gray-600/20'
                },
                {
                  name: 'Professional',
                  price: '€79',
                  period: '/maand',
                  description: 'Ideaal voor groeiende bedrijven met meer behoeften',
                  features: [
                    '10 social media accounts',
                    '200 posts per maand',
                    'Geavanceerde analytics',
                    'Priority support',
                    'AI content optimalisatie',
                    'Team collaboration',
                    'Social listening'
                  ],
                  popular: true,
                  gradient: 'from-cyan-500/20 to-blue-500/20'
                },
                {
                  name: 'Enterprise',
                  price: '€199',
                  period: '/maand',
                  description: 'Voor grote organisaties met complexe behoeften',
                  features: [
                    'Onbeperkte accounts',
                    'Onbeperkte posts',
                    'Custom analytics',
                    'Dedicated support',
                    'White-label oplossing',
                    'API toegang',
                    'Custom integraties',
                    'SLA garantie'
                  ],
                  popular: false,
                  gradient: 'from-purple-500/20 to-pink-500/20'
                }
              ].map((plan, index) => (
                <div key={index} className={`relative group ${plan.popular ? 'scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        Meest Populair
                      </span>
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} backdrop-blur-xl rounded-3xl border ${plan.popular ? 'border-cyan-500/50' : 'border-white/20'} group-hover:border-white/30 transition-all duration-500 shadow-2xl`}></div>
                  <div className="relative p-8 h-full">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                          {plan.price}
                        </span>
                        <span className="text-white/60 ml-2">{plan.period}</span>
                      </div>
                      <p className="text-white/70">{plan.description}</p>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle size={18} className="text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-xl' 
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30'
                      }`}
                    >
                      Start Gratis Trial
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <p className="text-white/60 mb-4">Alle plannen bevatten een 14-daagse gratis proefperiode. Geen setup kosten.</p>
              <div className="flex items-center justify-center space-x-8 text-white/40">
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-400" />
                  <span>Geen contractverplichting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-400" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-400" />
                  <span>SSL beveiligd</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="relative z-10 py-32" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"></div>
                <div className="relative p-16 md:p-20 overflow-hidden rounded-3xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
                  
                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                      <h2 id="contact-heading" className="text-5xl sm:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                        Klaar om te beginnen?_
                      </h2>
                      <p className="text-white/80 text-xl mb-10 leading-relaxed drop-shadow-sm">
                        Start vandaag nog met uw gratis 14-daagse proefperiode en ontdek hoe SocialFlows uw social media marketing kan transformeren.
                      </p>
                      
                      <div className="space-y-6 mb-10">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center mr-4">
                            <Mail size={20} className="text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Email</p>
                            <p className="text-white/70">info@socialflows.nl</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center mr-4">
                            <Phone size={20} className="text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Telefoon</p>
                            <p className="text-white/70">+31 (0)20 123 4567</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center mr-4">
                            <MapPin size={20} className="text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Adres</p>
                            <p className="text-white/70">Amsterdam, Nederland</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        {[
                          { icon: Instagram, href: '#', color: 'from-pink-500 to-purple-500' },
                          { icon: Facebook, href: '#', color: 'from-blue-600 to-blue-700' },
                          { icon: Twitter, href: '#', color: 'from-sky-400 to-sky-500' },
                          { icon: Linkedin, href: '#', color: 'from-blue-700 to-blue-800' },
                          { icon: Youtube, href: '#', color: 'from-red-500 to-red-600' }
                        ].map((social, index) => (
                          <a
                            key={index}
                            href={social.href}
                            className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}
                          >
                            <social.icon size={20} className="text-white" />
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white/90">Naam</label>
                            <input
                              type="text"
                              required
                              className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-cyan-400 outline-none transition-all text-white rounded-xl backdrop-blur-sm"
                              placeholder="Uw naam"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white/90">Email</label>
                            <input
                              type="email"
                              required
                              className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-cyan-400 outline-none transition-all text-white rounded-xl backdrop-blur-sm"
                              placeholder="uw@email.nl"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/90">Bedrijf</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-cyan-400 outline-none transition-all text-white rounded-xl backdrop-blur-sm"
                            placeholder="Uw bedrijfsnaam"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/90">Bericht</label>
                          <textarea
                            rows={4}
                            required
                            className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-cyan-400 outline-none transition-all text-white resize-none rounded-xl backdrop-blur-sm"
                            placeholder="Vertel ons over uw social media doelen..."
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full relative group text-lg px-8 py-4 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl"></div>
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 group-hover:bg-white/30 transition-all duration-300"></div>
                          <span className="relative z-10 font-bold text-white drop-shadow-lg flex items-center justify-center">
                            <MessageSquare size={20} className="mr-3" />
                            Verstuur Bericht
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}