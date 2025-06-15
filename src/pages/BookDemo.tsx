import React from 'react';
import { Calendar, Clock, Users, Video, Check, Sparkles, Target } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function BookDemo() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <SEOHead
        title="Boek een Demo - AI.Callers Demonstratie"
        description="Plan een gratis demonstratie van onze AI telefoontechnologie. Ontdek in 30 minuten hoe AI.Callers uw bedrijfsprocessen kan optimaliseren."
        keywords="AI telefoon demo, AI callers demonstratie, gratis AI telefonie demo, AI klantenservice demo Nederland, telefoonautomatisering presentatie"
        url="https://jonkersai.nl/book-demo"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop"
      />

      {/* Enhanced background effects - same as homepage */}
      <div className="fixed inset-0 z-0">
        {/* Main center glow - enhanced */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: '8s' }}
        ></div>
        
        {/* Secondary glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-violet-500/8 to-pink-500/8 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        ></div>
        
        <div 
          className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-tl from-blue-500/8 to-teal-500/8 rounded-full blur-[130px] animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '4s' }}
        ></div>
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-10 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-indigo-300 tracking-wide uppercase">
              <Target size={16} className="mr-3" />
              Live demonstratie
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            <span className="gradient-text">Boek een Demonstratie_</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed">
            Ontdek hoe onze AI telefoontechnologie uw bedrijfsprocessen kan optimaliseren. Plan een vrijblijvende demonstratie met een van onze experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">Selecteer een datum en tijd</h2>
              </div>
              {/* Increased fixed height to ensure calendar is fully visible */}
              <div className="w-full h-[800px]">
                <iframe
                  src="https://cal.com/xanderjonkers/jonkersaidemo"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Plan een demo van AI.Callers telefoonsysteem"
                  className="bg-black"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* What to expect box */}
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl flex items-center justify-center mr-3">
                  <Clock size={18} className="text-indigo-400" />
                </div>
                Wat kunt u verwachten
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-3 text-lg mt-0.5 font-bold">›</span>
                  <span>Een persoonlijke demonstratie van 30 minuten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-3 text-lg mt-0.5 font-bold">›</span>
                  <span>Live gesprek met een AI telefoonsysteem</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-3 text-lg mt-0.5 font-bold">›</span>
                  <span>Toelichting van de technische werking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-3 text-lg mt-0.5 font-bold">›</span>
                  <span>Gelegenheid voor vragen en antwoorden</span>
                </li>
              </ul>
            </div>

            {/* Demo Details */}
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center mr-3">
                  <Users size={18} className="text-cyan-400" />
                </div>
                Details van de demo
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mr-3 mt-0.5">
                    <Calendar size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Duur</p>
                    <p className="text-sm">30 minuten</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mr-3 mt-0.5">
                    <Video size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Locatie</p>
                    <p className="text-sm">Online via Google Meet of Microsoft Teams</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-3 mt-0.5">
                    <Check size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Taal</p>
                    <p className="text-sm">Nederlands</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-xl flex items-center justify-center mr-3">
                  <Sparkles size={18} className="text-green-400" />
                </div>
                Voordelen van AI.Callers
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  <span>24/7 beschikbaarheid</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  <span>Naadloze integratie met uw systemen</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  <span>Bespaar tijd en resources</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  <span>Verhoog klanttevredenheid</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  <span>Schaalbare oplossing voor elke bedrijfsgrootte</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}