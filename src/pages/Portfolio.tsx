import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

export function Portfolio() {
  const projectRef = useRef<HTMLDivElement>(null);

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

    if (projectRef.current) {
      projectRef.current.classList.add('opacity-0');
      observer.observe(projectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-50 max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Portfolio_</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Ontdek onze recente projecten waarin we AI-technologie hebben geïntegreerd om innovatieve digitale oplossingen te creëren.
        </p>
      </div>
      
      <div ref={projectRef} className="max-w-5xl mx-auto">
        <div className="border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20 hover:transform hover:scale-[1.02]">
          <div className="relative aspect-video overflow-hidden">
            <img 
              src="https://fal.media/files/lion/bqQ_b-_7T2urNqgmpP3YC_46ad65a6f9af44bab950379e4bf3f97f.jpg" 
              alt="Tattoo Studio Website" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 w-full">
                <a 
                  href="https://demo1.jonkersai.nl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full sm:w-auto sm:px-8 py-3 bg-white text-black font-medium tracking-wider hover:bg-opacity-90 transition-all"
                >
                  Bezoek Website <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-4 tracking-wider">Tattoo Studio Website</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Een moderne, stijlvolle website voor een tattoo studio met een elegant design dat de artistieke aard van de studio weerspiegelt. 
              De website biedt een intuïtieve gebruikerservaring met een portfolio van tattoo-ontwerpen, 
              informatie over de artiesten, en een eenvoudig boekingssysteem voor klanten.
            </p>
            
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-3 tracking-wider">Kenmerken:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">›</span>
                  <span>Responsief design voor alle apparaten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">›</span>
                  <span>Interactieve galerij van tattoo-ontwerpen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">›</span>
                  <span>Online afsprakensysteem</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">›</span>
                  <span>Profielen van tattoo-artiesten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">›</span>
                  <span>Geoptimaliseerd voor zoekmachines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">›</span>
                  <span>Geïntegreerd contactformulier</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1.5 bg-white/10 text-white/80 rounded-sm">React</span>
              <span className="text-xs px-3 py-1.5 bg-white/10 text-white/80 rounded-sm">TypeScript</span>
              <span className="text-xs px-3 py-1.5 bg-white/10 text-white/80 rounded-sm">Tailwind CSS</span>
              <span className="text-xs px-3 py-1.5 bg-white/10 text-white/80 rounded-sm">Framer Motion</span>
              <span className="text-xs px-3 py-1.5 bg-white/10 text-white/80 rounded-sm">Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}