import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, CheckCircle, Users, Clock, MessageSquare, Shield, Calendar, Sparkles, Zap, Target, Waves, Droplets } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function Home() {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
      ctaRef.current
    ].filter(Boolean);

    elements.forEach((element) => {
      if (element) {
        element.classList.add('opacity-0');
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title="AI.Callers - Intelligente Telefoonsystemen voor Bedrijven"
        description="Transformeer uw telefonische klantenservice met AI.Callers. 24/7 beschikbare AI telefoonsystemen die natuurlijke gesprekken voeren, afspraken plannen en uw bedrijfsprocessen optimaliseren. Bespaar tot 75% op telefonie kosten."
        keywords="AI telefoon, AI callers, kunstmatige intelligentie telefoon, telefoonsysteem automatisering, AI klantenservice, 24/7 telefonie, bedrijfsautomatisering Nederland, AI assistent telefoon"
        url="https://jonkersai.nl"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop"
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
        
        {/* Main Content with Liquid Glass Effects */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-48 lg:pb-32 relative z-20">
            <div className="text-center">
              {/* Liquid Glass Hero Content */}
              <div className="max-w-6xl mx-auto">
                {/* Overline with liquid glass effect */}
                <div className="mb-8">
                  <span className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-sm font-medium text-cyan-300 tracking-wide uppercase shadow-2xl">
                    <Droplets size={16} className="mr-3 text-cyan-400" />
                    De toekomst van telefonische communicatie
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>
                  </span>
                </div>
                
                {/* Main Typography with liquid glass styling */}
                <div className="space-y-8 mb-16">
                  {/* Primary Headline with enhanced glass effect */}
                  <div className="relative">
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                      AI.Callers_
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-3xl -z-10"></div>
                  </div>
                  
                  {/* Subtitle with liquid glass container */}
                  <div className="relative max-w-5xl mx-auto">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"></div>
                    <div className="relative p-8 text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-tight">
                      <span className="block mb-3">
                        Intelligente telefoonsystemen die
                      </span>
                      <span className="block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-medium">
                          24/7 gesprekken voeren
                        </span>
                      </span>
                      <span className="block mt-3 text-lg lg:text-xl text-white/70">
                        zodat uw team zich kan focussen op wat écht belangrijk is
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Liquid Glass Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                  <button 
                    onClick={() => navigate('/contact')}
                    className="relative group text-lg px-10 py-5 w-full sm:w-auto overflow-hidden"
                    aria-label="Start uw AI.Callers project"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 group-hover:bg-white/30 transition-all duration-300"></div>
                    <span className="relative z-10 font-bold text-white drop-shadow-lg">Start Project</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/book-demo')}
                    className="relative group text-lg px-10 py-5 w-full sm:w-auto overflow-hidden"
                    aria-label="Boek een gratis demonstratie"
                  >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"></div>
                    <span className="relative z-10 font-semibold text-white drop-shadow-lg">Boek Demo</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                  </button>
                </div>

                {/* Liquid Glass Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                  {[
                    { value: '95%', label: 'Minder gemiste oproepen' },
                    { value: '24/7', label: 'Beschikbaarheid' },
                    { value: '75%', label: 'Kostenbesparing' },
                    { value: '∞', label: 'Schaalbaarheid' }
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
              
              {/* Enhanced Live Demo Section with Liquid Glass */}
              <div className="max-w-3xl mx-auto mt-20">
                <div className="relative">
                  {/* Floating liquid orbs around demo */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                  
                  {/* Main demo container with enhanced liquid glass */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"></div>
                    <div className="relative p-10 overflow-hidden rounded-3xl">
                      {/* Header with liquid glass styling */}
                      <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse shadow-lg"></div>
                          <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-xl text-white px-4 py-2 rounded-full border border-white/20 shadow-lg">
                            <Waves size={12} className="inline mr-2" />
                            Live Demo
                          </span>
                        </div>
                      </div>
                      
                      {/* Enhanced chat interface with liquid glass */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10"></div>
                        <div className="relative p-8 space-y-6">
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mr-4 shadow-xl">
                              AI
                            </div>
                            <div className="relative max-w-[85%]">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl rounded-tl-sm border border-white/20"></div>
                              <div className="relative p-5">
                                <p className="text-white text-sm leading-relaxed drop-shadow-sm">Goedemiddag! Dit is JonkersAI. Waarmee kan ik u vandaag van dienst zijn?</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start justify-end">
                            <div className="relative max-w-[85%]">
                              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl rounded-tr-sm border border-white/20"></div>
                              <div className="relative p-5">
                                <p className="text-white text-sm leading-relaxed drop-shadow-sm">Ik wil graag een afspraak maken voor volgende week.</p>
                              </div>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ml-4 shadow-xl">
                              U
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mr-4 shadow-xl">
                              AI
                            </div>
                            <div className="relative max-w-[85%]">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl rounded-tl-sm border border-white/20"></div>
                              <div className="relative p-5">
                                <p className="text-white text-sm leading-relaxed drop-shadow-sm">Natuurlijk! Ik kan u helpen met het inplannen van een afspraak. Welke dag heeft uw voorkeur?</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced footer with liquid glass */}
                      <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse mr-3 shadow-lg"></div>
                          <span className="text-sm text-white/90 font-medium drop-shadow-sm">AI actief</span>
                        </div>
                        <button 
                          onClick={() => {
                            const vapiBtn = document.querySelector('.vapi-btn') as HTMLElement;
                            if (vapiBtn) vapiBtn.click();
                          }}
                          className="relative group"
                          aria-label="Probeer de AI telefoon assistent"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                          <div className="relative text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 font-medium shadow-xl backdrop-blur-sm border border-white/20">
                            Probeer het zelf
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section with Liquid Glass */}
        <section ref={featuresRef} className="relative z-10 py-32" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-sm font-medium text-cyan-300 shadow-xl">
                  <Zap size={16} className="mr-2" />
                  Krachtige AI-oplossingen
                </span>
              </div>
              <h2 id="features-heading" className="text-5xl sm:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                AI oplossingen voor uw telefonie_
              </h2>
              <p className="text-white/80 text-xl max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
                Onze AI-gestuurde telefoonsystemen automatiseren uw telefonische klantenservice, zodat u meer tijd heeft voor wat écht belangrijk is.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Phone,
                  title: 'Intelligente Telefoongesprekken',
                  description: 'Onze AI voert natuurlijke gesprekken met uw klanten, beantwoordt vragen, en kan complexe interacties afhandelen.',
                  features: ['Natuurlijke gesprekken', 'Meertalige ondersteuning', 'Integratie met CRM-systemen'],
                  gradient: 'from-cyan-500/20 to-blue-500/20'
                },
                {
                  icon: Clock,
                  title: '24/7 Beschikbaarheid',
                  description: 'Uw klanten kunnen altijd contact opnemen, ook buiten kantooruren. Onze AI is 24/7 beschikbaar om hen te helpen.',
                  features: ['Nooit meer een gemiste oproep', 'Verhoogde klanttevredenheid', 'Gedetailleerde gespreksrapporten'],
                  gradient: 'from-purple-500/20 to-pink-500/20'
                },
                {
                  icon: MessageSquare,
                  title: 'Afspraak Planning',
                  description: 'Laat onze AI afspraken maken, wijzigen of annuleren en direct synchroniseren met uw agenda.',
                  features: ['Kalender-integratie', 'Automatische herinneringen', 'Flexibele beschikbaarheid'],
                  gradient: 'from-emerald-500/20 to-teal-500/20'
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
        
        {/* Benefits Section with Liquid Glass */}
        <section ref={benefitsRef} className="relative z-10 py-32" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-sm font-medium text-emerald-300 shadow-xl">
                  <Target size={16} className="mr-2" />
                  Meetbare resultaten
                </span>
              </div>
              <h2 id="benefits-heading" className="text-5xl sm:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 drop-shadow-2xl">
                Meetbare voordelen voor uw bedrijf_
              </h2>
              <p className="text-white/80 text-xl max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
                AI.Callers levert meetbare resultaten die direct bijdragen aan uw bedrijfssucces.
              </p>
            </div>
            
            {/* Enhanced stats grid with liquid glass */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
              {[
                { value: '95%', label: 'Verlaging in gemiste oproepen', gradient: 'from-cyan-400 to-blue-500' },
                { value: '75%', label: 'Kostenbesparing op telefonie', gradient: 'from-blue-500 to-purple-500' },
                { value: '24/7', label: 'Beschikbaarheid', gradient: 'from-purple-500 to-pink-500' },
                { value: '30%', label: 'Meer gekwalificeerde leads', gradient: 'from-pink-500 to-emerald-500' }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300 shadow-2xl"></div>
                  <div className="relative p-8 text-center">
                    <p className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-4 drop-shadow-2xl`}>
                      {stat.value}
                    </p>
                    <p className="text-white/90 font-medium leading-tight">{stat.label}</p>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient.replace('to-', 'to-').replace('from-', 'from-').replace(/\w+-\d+/g, (match) => match + '/20')} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10`}></div>
                </div>
              ))}
            </div>
            
            {/* Enhanced content section with liquid glass */}
            <div className="lg:flex lg:items-center lg:space-x-16">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"></div>
                  <div className="relative p-12">
                    <h3 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg">
                      Uw AI-team staat 24/7 klaar
                    </h3>
                    <p className="text-white/80 mb-10 text-lg leading-relaxed drop-shadow-sm">
                      Onze AI-gestuurde telefoonsystemen nemen routinetaken over, zodat uw team zich kan richten op complexere en meer waardevolle werkzaamheden.
                    </p>
                    <ul className="space-y-8">
                      {[
                        { icon: Users, title: 'Verminder werkdruk', desc: 'Laat AI de routinematige gesprekken afhandelen', gradient: 'from-cyan-500/30 to-blue-500/30' },
                        { icon: Clock, title: 'Bespaar tijd', desc: 'Automatiseer tot 80% van uw inkomende gesprekken', gradient: 'from-blue-500/30 to-purple-500/30' },
                        { icon: Shield, title: 'Consistente kwaliteit', desc: 'Elke call met dezelfde professionele aanpak', gradient: 'from-purple-500/30 to-pink-500/30' }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start group">
                          <div className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl p-3 mr-6 mt-1 shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/20`}>
                            <item.icon size={24} className="text-white" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-lg mb-2 drop-shadow-sm">{item.title}</h4>
                            <p className="text-white/70">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-2xl"></div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="AI Call Center medewerkers die samenwerken met AI technologie" 
                      className="relative rounded-3xl w-full h-96 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section with Enhanced Liquid Glass */}
        <section ref={ctaRef} className="relative z-10 py-32" aria-labelledby="cta-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"></div>
                <div className="relative p-16 md:p-20 overflow-hidden rounded-3xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
                  
                  <div className="relative lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-2/3 mb-12 lg:mb-0">
                      <h2 id="cta-heading" className="text-5xl sm:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                        Klaar om te beginnen met AI.Callers?_
                      </h2>
                      <p className="text-white/80 text-xl mb-10 max-w-3xl leading-relaxed drop-shadow-sm">
                        Transformeer uw telefonische klantenservice vandaag nog met onze AI-gestuurde oplossingen. Plan een demo of neem contact op voor een vrijblijvend gesprek.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <button 
                          onClick={() => navigate('/book-demo')}
                          className="relative group text-lg px-8 py-4 overflow-hidden"
                          aria-label="Boek een gratis demonstratie van AI.Callers"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl"></div>
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 group-hover:bg-white/30 transition-all duration-300"></div>
                          <span className="relative z-10 font-bold text-white drop-shadow-lg flex items-center justify-center">
                            <Calendar size={20} className="mr-3 transition-transform group-hover:scale-110" aria-hidden="true" /> 
                            Boek een Demo
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
                        </button>
                        
                        <button 
                          onClick={() => navigate('/contact')}
                          className="relative group text-lg px-8 py-4 overflow-hidden"
                          aria-label="Neem contact op voor meer informatie"
                        >
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"></div>
                          <span className="relative z-10 font-semibold text-white drop-shadow-lg flex items-center justify-center">
                            <MessageSquare size={20} className="mr-3 transition-transform group-hover:scale-110" aria-hidden="true" /> 
                            Contact Opnemen
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                        </button>
                      </div>
                    </div>
                    <div className="lg:w-1/3 flex justify-center">
                      <div 
                        className="relative group cursor-pointer"
                        onClick={() => {
                          const vapiBtn = document.querySelector('.vapi-btn') as HTMLElement;
                          if (vapiBtn) vapiBtn.click();
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Probeer onze AI telefoon assistent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            const vapiBtn = document.querySelector('.vapi-btn') as HTMLElement;
                            if (vapiBtn) vapiBtn.click();
                          }
                        }}
                      >
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300 w-48 h-48"></div>
                        <div className="relative w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                          <div className="text-center">
                            <Phone size={48} className="text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-2xl" aria-hidden="true" />
                            <p className="text-sm text-cyan-300 font-medium drop-shadow-lg">Probeer onze AI</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                      </div>
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