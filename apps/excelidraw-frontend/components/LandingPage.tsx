import Link from 'next/link';
import { Pencil, Users, Zap, Shield, Globe, Share2, Sparkles, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-violet-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-lg">
              <Pencil className="w-6 h-6 text-white" />
            </div>
            <span className="self-center text-2xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Sketify
            </span>
          </Link>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <Link
              href="/signin"
              className="text-white hover:text-violet-400 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-800 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-8 backdrop-blur-sm animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Redefining real-time collaboration</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 drop-shadow-sm">
            Brainstorm without <br className="hidden md:block" />
            <span className="text-violet-400">boundaries.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Sketify is the infinite canvas for your team's best ideas. 
            Sketch, diagram, and collaborate in real-time with pixel-perfect precision.
          </p>
          

          {/* Mockup / Visual */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 shadow-2xl shadow-violet-500/10">
              <div className="rounded-lg bg-slate-900/50 aspect-video flex items-center justify-center overflow-hidden">
                <video 
                  src="/excelidraw.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to create</h2>
            <p className="text-slate-400">Powerful tools for powerful minds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Lightning Fast"
              description="Zero latency. See changes instantly as your team draws."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-pink-400" />}
              title="Real-time Collab"
              description="Work together with up to 50 people in a single room."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-blue-400" />}
              title="Access Anywhere"
              description="Your boards are saved in the cloud. Pick up where you left off."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-green-400" />}
              title="Enterprise Secure"
              description="Bank-grade encryption keeps your ideas safe and sound."
            />
            <FeatureCard 
              icon={<Share2 className="w-8 h-8 text-purple-400" />}
              title="Easy Sharing"
              description="Share a link and start collaborating. No sign-up required for guests."
            />
             <FeatureCard 
              icon={<Pencil className="w-8 h-8 text-orange-400" />}
              title="Intuitive Tools"
              description="A toolset that feels natural. Pen, shapes, text, and code blocks."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
               <div className="bg-violet-600 p-1.5 rounded-md">
                 <Pencil className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-bold text-white">Sketify</span>
            </div>
            <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Sketify Inc. All rights reserved.
            </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all duration-300 group">
      <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
