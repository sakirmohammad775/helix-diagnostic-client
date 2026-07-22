import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Microscope, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const About = () => {
  // Reusable core features list
  const features = [
    {
      icon: ShieldCheck,
      title: "ISO & CAP Certified Labs",
      description: "Our diagnostic laboratories follow rigorous international quality control standards to ensure 100% precision."
    },
    {
      icon: Microscope,
      title: "Advanced Diagnostic Tech",
      description: "Equipped with state-of-the-art MRI, CT Scanners, and automated blood analyzer machines."
    },
    {
      icon: Clock,
      title: "Rapid Report Delivery",
      description: "Access your verified digital test reports online through your private patient portal within 24 hours."
    },
    {
      icon: Award,
      title: "Expert Pathologists",
      description: "All test evaluations and diagnostics are cross-verified by specialized certified medical officers."
    }
  ];

  // Key stats counter display
  const stats = [
    { label: "Successful Diagnostics", value: "250K+" },
    { label: "Certified Specialists", value: "45+" },
    { label: "Available Test Panels", value: "120+" },
    { label: "Patient Satisfaction", value: "99.2%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. Hero / Intro Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              About Helix Diagnostic
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Pioneering Precision Medical Diagnostics for a Healthier Tomorrow
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At Helix Diagnostic Center, we bridge cutting-edge laboratory technology with compassionate patient care. Founded with a commitment to clinical excellence, we deliver reliable, timely, and actionable health insights to empower your medical decisions.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Browse All Tests</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard/profile"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-all"
              >
                <span>Patient Portal</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Banner */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1000&q=80"
                alt="Laboratory research at Helix Diagnostic"
                className="w-full h-[400px] object-cover"
              />
            </div>
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">100% Verified Accuracy</p>
                <p className="text-xs text-gray-500">Government Accredited Laboratory</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Metrics Bar */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-blue-400">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Core Features Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Patients Trust Helix</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              We combine modern diagnostic equipment with seamless digital report access to deliver an effortless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Mission & Values Section */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              To democratize access to high-precision health diagnostic services through digital transparency, fast report delivery, and uncompromised medical ethics.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Ethical & transparent pricing with no hidden charges.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Hassle-free online appointment scheduling & payment.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Comprehensive digital archive of all delivered medical reports.
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl border border-blue-100 text-blue-950 space-y-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold">Need Diagnostic Guidance?</h3>
            <p className="text-sm text-blue-800">
              Our medical helpdesk is available 24/7 to help you choose the right test panel or assist with booking.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Support Hotline</p>
              <p className="text-lg font-extrabold">+1 (800) 435-4939</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;