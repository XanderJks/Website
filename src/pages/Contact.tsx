import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    problems: '',
    additionalInfo: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle webhook submission with retry logic
  const sendToWebhook = async (data: typeof formData, retryCount = 2) => {
    try {
      const webhookUrl = 'https://hook.eu2.make.com/erp8rjqbwtxushwp25r5397unw6eqg39';
      console.log(`Attempting to send data to webhook: ${webhookUrl}`);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors', // Explicitly set CORS mode
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: 'ai-callers',
          company_name: data.companyName,
          problems: data.problems,
          additional_info: data.additionalInfo || null,
          submitted_at: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }
      
      console.log('Webhook submission successful');
      return true;
    } catch (error) {
      console.error('Error sending to webhook:', error);
      
      // Implement retry logic
      if (retryCount > 0) {
        console.log(`Retrying webhook submission. Attempts remaining: ${retryCount}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return sendToWebhook(data, retryCount - 1);
      }
      
      return false; // Return false to indicate failure after all retries
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    let webhookSuccess = false;
    let supabaseSuccess = false;

    try {
      // Try to submit to Supabase first
      console.log('Submitting data to Supabase:', {
        name: formData.name,
        email: formData.email,
        service: 'ai-callers',
        company_name: formData.companyName,
        problems: formData.problems,
        additional_info: formData.additionalInfo || null
      });

      try {
        const { error, data } = await supabase
          .from('contact_requests')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              service: 'ai-callers',
              company_name: formData.companyName,
              problems: formData.problems,
              additional_info: formData.additionalInfo || null
            }
          ])
          .select();

        if (error) {
          console.error('Supabase insert error details:', error);
          throw error;
        }

        console.log('Supabase insert successful:', data);
        supabaseSuccess = true;
      } catch (supabaseError) {
        console.error('Failed to submit to Supabase:', supabaseError);
        // Continue to try webhook even if Supabase fails
      }

      // Always try the webhook, regardless of Supabase result
      try {
        webhookSuccess = await sendToWebhook(formData);
      } catch (webhookError) {
        console.error('Failed to submit to webhook after retries:', webhookError);
      }
      
      // If either submission method succeeded, consider the form submission successful
      if (supabaseSuccess || webhookSuccess) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          companyName: '',
          problems: '',
          additionalInfo: ''
        });
      } else {
        // Both methods failed
        throw new Error('Both Supabase and webhook submissions failed');
      }
    } catch (error: any) {
      console.error('Detailed error submitting form:', error);
      
      // More specific error message based on the error type
      if (error?.code === '42501') {
        setErrorMessage('Geen toestemming om het contactformulier te versturen. Neem contact op met de beheerder.');
      } else if (error?.code?.startsWith('23')) {
        setErrorMessage('Er is een probleem met de ingevoerde gegevens. Controleer of alle velden correct zijn ingevuld.');
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setErrorMessage('Netwerkfout bij het versturen van het formulier. Controleer uw internetverbinding en probeer het opnieuw.');
      } else {
        setErrorMessage('Er is een fout opgetreden bij het versturen van het formulier. Probeer het later opnieuw.');
      }
      
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="relative min-h-screen bg-black text-white">
      <SEOHead
        title="Contact - Start uw AI.Callers Project"
        description="Neem contact op met JonkersAI om uw AI telefonie project te starten. Ontdek hoe onze AI telefoonsystemen uw bedrijfsprocessen kunnen optimaliseren."
        keywords="contact JonkersAI, AI telefonie project, AI callers aanvragen, telefoonautomatisering offerte, AI klantenservice Nederland"
        url="https://jonkersai.nl/contact"
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-indigo-300 tracking-wide uppercase">
              <Sparkles size={16} className="mr-3" />
              Laten we beginnen
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            <span className="gradient-text">Start uw AI.Callers project_</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed">
            Ontdek hoe onze AI telefoontechnologie uw bedrijfsprocessen kan optimaliseren. Neem contact op voor een vrijblijvend gesprek.
          </p>
        </div>
        
        {status === 'success' ? (
          <div className="glass-strong rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Bedankt voor uw aanvraag!</h2>
            <p className="text-gray-300 text-lg">We nemen zo spoedig mogelijk contact met u op om uw AI.Callers project te bespreken.</p>
          </div>
        ) : (
          <div className="glass-strong rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    {'>'} Naam
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-indigo-400 outline-none transition-all text-white rounded-xl backdrop-blur-sm disabled:opacity-50"
                    placeholder="Uw volledige naam"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    {'>'} E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-indigo-400 outline-none transition-all text-white rounded-xl backdrop-blur-sm disabled:opacity-50"
                    placeholder="uw.email@bedrijf.nl"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2 text-gray-300">
                  {'>'} Bedrijfsnaam
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-indigo-400 outline-none transition-all text-white rounded-xl backdrop-blur-sm disabled:opacity-50"
                  placeholder="Uw bedrijfsnaam"
                />
              </div>

              <div>
                <label htmlFor="problems" className="block text-sm font-medium mb-2 text-gray-300">
                  {'>'} Welke telefoontaken wilt u automatiseren?
                </label>
                <textarea
                  id="problems"
                  name="problems"
                  value={formData.problems}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting'}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-indigo-400 outline-none transition-all text-white resize-none rounded-xl backdrop-blur-sm disabled:opacity-50"
                  placeholder="Beschrijf welke telefoontaken u wilt automatiseren, zoals klantenservice, afspraken inplannen, lead kwalificatie, etc."
                ></textarea>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2 text-gray-300">
                  {'>'} Aanvullende informatie (optioneel)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 focus:border-indigo-400 outline-none transition-all text-white resize-none rounded-xl backdrop-blur-sm disabled:opacity-50"
                  placeholder="Eventuele aanvullende informatie over uw wensen of specifieke eisen"
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-sm backdrop-blur-sm">
                  <p className="text-red-300">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current mr-3"></div>
                    Versturen...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Verstuur Aanvraag
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}