import { useState } from 'react';
// LOGIC: Using strictly react-icons/fa to comply with project linting rules
import { FaPhoneVolume, FaCheckCircle, FaExclamationCircle, FaUndo } from 'react-icons/fa';

export default function Contact() {
  // LOGIC: Captcha code generator state for interactive form security
  const [captchaCode, setCaptchaCode] = useState('5RLOpW');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    comments: ''
  });

  // LOGIC: Simple function to refresh captcha string mock-up
  const handleRefreshCaptcha = () => {
    const codes = ['8KMsD2', '3Xp9Wy', '7QLrtA', '5RLOpW', '2NfG4v'];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setCaptchaCode(randomCode);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // LOGIC: Handle secure validation, ensuring captcha input matches the code block
  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.trim() !== captchaCode) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setIsSubmitted(true);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: SPECIALIST IMAGE FRAME & EMERGENCY CARD (5/12 Columns) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Abstract Floating Vector (Top Left Background) */}
            <div className="absolute top-4 left-6 w-16 h-16 opacity-15 pointer-events-none hidden sm:block">
              <div className="w-full h-full border-2 border-dashed border-[#3ca4f4] rounded-full animate-spin-slow" />
            </div>

            {/* Layout Block: Asymmetrical light-blue container frame */}
            <div className="relative w-full max-w-[360px] aspect-[4/5] sm:aspect-[3/4] flex items-end justify-center">
              
              {/* The Blue Background panel shape that clips halfway up the back */}
              <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-[#eef5fc] border-t-[3px] border-[#0a2240] rounded-b-2xl" />

              {/* Specialist Image - standing proud of the frame */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Concierge Specialist Support" 
                className="relative z-10 w-[85%] h-auto object-contain bottom-0 select-none pointer-events-none drop-shadow-lg"
              />

              {/* Floating emergency contact banner */}
              <div className="absolute -bottom-6 left-4 right-4 sm:-left-4 sm:-right-4 z-20 bg-[#0a2240] text-white p-5 rounded-xl flex items-center space-x-4 shadow-xl border-b-4 border-[#3ca4f4]">
                <div className="w-12 h-12 bg-[#3ca4f4] rounded-xl flex items-center justify-center shrink-0">
                  <FaPhoneVolume className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-lg font-black tracking-tight leading-none">Emergency Call</h4>
                  <p className="text-gray-300 text-xs font-semibold">24/7 – Support and easy</p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM WITH CAPTCHA VALIDATION (7/12 Columns) */}
          <div className="lg:col-span-7 space-y-6 mt-12 lg:mt-0">
            
            {/* Section Tagline */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-[3px] bg-[#3ca4f4]" />
                <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Contact Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight leading-tight">
                Meet Our Specialist This <br />Expert Meet
              </h2>
            </div>

            {/* Interactive Feedback State */}
            {isSubmitted ? (
              <div className="bg-[#f4f8fc] p-8 rounded-2xl border border-[#3ca4f4]/20 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#3ca4f4] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <FaCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#0a2240]">Inquiry Transmitted</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Your communication matches our local captcha parameters. A service representative will reach out to you shortly.
                </p>
                <button 
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', phone: '', comments: '' }); setCaptchaInput(''); }}
                  className="bg-[#3ca4f4] hover:bg-[#2b93e3] text-white text-xs font-black py-2.5 px-6 rounded-full transition-colors"
                >
                  Send New Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 2-Column Grid Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    className="w-full px-5 py-3.5 bg-[#f4f8fc] text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email" 
                    className="w-full px-5 py-3.5 bg-[#f4f8fc] text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                  />
                  <input 
                    type="text" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Your Subject" 
                    className="w-full px-5 py-3.5 bg-[#f4f8fc] text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone" 
                    className="w-full px-5 py-3.5 bg-[#f4f8fc] text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                  />
                </div>

                {/* Big Comments Textbox */}
                <textarea 
                  name="comments"
                  rows="4"
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Your comments"
                  className="w-full px-5 py-3.5 bg-[#f4f8fc] text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100 resize-none"
                />

                {/* CAPTCHA SECTION */}
                <div className="space-y-2.5 pt-2 max-w-sm">
                  <input 
                    type="text" 
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Type the below word" 
                    className={`w-full px-5 py-3 bg-[#f4f8fc] text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none transition-all border ${
                      captchaError ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-100 focus:ring-2 focus:ring-[#3ca4f4]/20'
                    }`}
                  />
                  
                  {/* Captcha Display & Refresh Row */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#f4f8fc] px-8 py-2.5 rounded-lg border border-gray-150 select-none text-center tracking-widest font-black italic text-gray-600 font-mono shadow-inner">
                      {captchaCode}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRefreshCaptcha}
                      className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors border border-gray-150"
                      title="Refresh Captcha"
                    >
                      <FaUndo className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {captchaError && (
                    <p className="text-red-500 text-xs font-bold flex items-center space-x-1.5 animate-pulse">
                      <FaExclamationCircle className="w-3 h-3" />
                      <span>Security sequence did not match. Please verify character casing.</span>
                    </p>
                  )}
                </div>

                {/* Submission Button */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-black py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm tracking-wide"
                  >
                    Send Request
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}