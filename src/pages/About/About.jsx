
// LOGIC: Using strictly react-icons/fa to comply with project linting rules
import { 
  FaPlay, 
  FaHeadset, 
  FaUserTie, 
  FaCheckCircle, 
  FaChevronRight 
} from 'react-icons/fa';

export default function About() {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
      
      {/* 1. DECORATIVE RIGHT STETHOSCOPE/BACKGROUND DESIGN */}
      {/* Absolute positioning mimicking the stylized element on the right of the reference */}
      <div className="absolute right-4 bottom-12 w-32 h-64 opacity-20 pointer-events-none hidden xl:block">
        <div className="w-full h-full border-r-4 border-b-4 border-[#3ca4f4] rounded-br-[4rem] relative">
          <div className="absolute top-0 right-[-6px] w-5 h-5 bg-[#0a2240] rounded-full" />
          <div className="absolute top-1/2 left-0 w-3 h-3 bg-gray-400 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: MULTI-IMAGE COMPOSITION WITH EXPERIENCE BADGE (5/12 Columns) */}
          <div className="lg:col-span-5 relative">
            
            {/* Background Decorative Blue Semi-Circle */}
            <div className="absolute -left-8 -top-8 w-24 h-24 border-[12px] border-[#3ca4f4] rounded-full border-r-transparent border-t-transparent pointer-events-none opacity-80" />
            
            {/* Main Upper Image */}
            <div className="relative z-10 w-[85%] rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[4/3] bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" 
                alt="Hotel Heaven Lobby Reception" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Lower Image */}
            <div className="absolute right-0 bottom-[-40px] z-20 w-[60%] rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80" 
                alt="Luxury Suite Room Design" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Experience Badge (Navy circle overlapping the images) */}
            <div className="absolute left-[20%] bottom-[-20px] z-30 w-28 h-28 sm:w-32 sm:h-32 bg-[#0a2240] text-white rounded-full flex flex-col items-center justify-center text-center p-2 shadow-2xl border-4 border-white animate-bounce-slow">
              <span className="text-xl sm:text-2xl font-black text-[#3ca4f4]">15+</span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase leading-tight">Years of<br />Hospitality</span>
            </div>

            {/* Decorative Dot Matrix Grid */}
            <div className="absolute left-0 bottom-[-60px] w-24 h-24 opacity-30 pointer-events-none hidden sm:block">
              <div className="grid grid-cols-5 gap-2">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                ))}
              </div>
            </div>

            {/* Vertical Text "How We Work" & Play Trigger (Placed right of the images) */}
            <div className="absolute -right-4 top-1/4 h-1/2 flex flex-col items-center justify-center space-y-4 z-20 hidden sm:flex">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest [writing-mode:vertical-lr] rotate-180">
                Discover Our Story
              </span>
              <button className="w-10 h-10 rounded-full bg-[#3ca4f4] hover:bg-[#2b93e3] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none">
                <FaPlay className="w-3 h-3 ml-0.5" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: TEXT CONTENT, HIGHLIGHT ROWS, AND ACCORDIONS (7/12 Columns) */}
          <div className="lg:col-span-7 space-y-8 pt-10 lg:pt-0">
            
            {/* Tagline & Main Title */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-[3px] bg-[#3ca4f4]" />
                <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Our About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0a2240] tracking-tight leading-tight">
                More Than 15+ Years Of <br />Premium Hospitality.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                HotelHeaven is committed to providing an unparalleled lodging experience, seamlessly combining sophisticated design with tailored guest services to create an exceptional, home-like environment.
              </p>
            </div>

            {/* 2-Column Highlight Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-b border-gray-100 pb-6">
              
              {/* Feature 1: Guest Support */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#f4f8fc] flex items-center justify-center text-[#3ca4f4]">
                    <FaHeadset className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0a2240] tracking-tight">24/7 Concierge Support</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-13">
                  Our professional desk staff and digital assistants are available at any hour to fulfill in-room services.
                </p>
              </div>

              {/* Feature 2: Premium Management */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#f4f8fc] flex items-center justify-center text-[#3ca4f4]">
                    <FaUserTie className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0a2240] tracking-tight">Five-Star Dining</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-13">
                  Enjoy gourmet dining curated by certified award-winning executive chefs delivered straight to your suite.
                </p>
              </div>

            </div>

            {/* Small Banner Row / Information Notice */}
            <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-gray-100">
              <FaCheckCircle className="w-5 h-5 text-[#3ca4f4] shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-gray-600">
                Secure online reservation and immediate booking confirmation guarantee.{' '}
                <button className="text-[#3ca4f4] hover:underline font-black uppercase text-[11px] tracking-wider ml-1">
                  Read More +
                </button>
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button className="flex items-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-extrabold py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                <span>About More</span>
                <FaChevronRight className="w-2.5 h-2.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}