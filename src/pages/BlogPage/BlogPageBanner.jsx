
// LOGIC: Using strictly react-icons/fa to comply with project linting rules
import { FaTimes} from 'react-icons/fa';

export default function BlogPageBanner({ 
  title = "Blog Page", 
  paths = [
    { label: "Home", url: "/" },
    { label: "Blog", url: "/blog" }
  ] 
}) {
  return (
    <section className="relative w-full bg-[#f1f6fa] overflow-hidden min-h-[280px] sm:min-h-[340px] md:min-h-[380px] flex items-center">
      
      {/* DECORATIVE BACKGROUND VECTOR 1: Hand / Stethoscope placeholder area (Far Left) */}
      <div className="absolute left-0 bottom-0 top-0 w-24 sm:w-36 lg:w-48 opacity-10 sm:opacity-20 pointer-events-none hidden md:block">
        <div className="w-full h-full relative">
          {/* Simulated stethoscope metal line */}
          <div className="absolute left-10 bottom-0 top-1/4 w-[3px] bg-gradient-to-t from-red-500 to-transparent" />
          {/* Blue diagnostic rings */}
          <div className="absolute left-4 top-1/3 w-12 h-12 rounded-full border-4 border-[#3ca4f4]" />
        </div>
      </div>

      {/* DECORATIVE VECTOR 2: Dark Navy 'x' (Center-Left) */}
      <div className="absolute left-[45%] top-1/2 -translate-y-1/2 text-[#0a2240] opacity-25 pointer-events-none hidden md:block">
        <FaTimes className="w-5 h-5 transform rotate-12" />
      </div>

      {/* DECORATIVE VECTOR 3: Blue floating triangles (Far Right top/bottom) */}
      <div className="absolute right-12 top-10 pointer-events-none opacity-40 hidden lg:block">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border-t-4 border-r-4 border-[#3ca4f4] transform rotate-45" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#3ca4f4]/40 transform rotate-45" />
        </div>
      </div>

      <div className="absolute right-1/3 bottom-0 w-32 h-32 bg-gradient-to-tr from-[#3ca4f4]/20 to-transparent rounded-tr-[5rem] pointer-events-none hidden lg:block" />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: TITLE & BREADCRUMBS (7/12 Width on Desktop) */}
          <div className="md:col-span-7 lg:col-span-6 space-y-4 text-left">
            
            {/* Dynamic Page Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0a2240] tracking-tight leading-none">
              {title}
            </h1>

            {/* Dynamic Breadcrumbs Map */}
            <nav className="flex items-center space-x-2 text-xs sm:text-sm font-bold">
              {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    {index > 0 && <span className="text-gray-400 text-[10px] sm:text-xs">/</span>}
                    {isLast ? (
                      <span className="text-[#3ca4f4] tracking-wide">
                        {path.label}
                      </span>
                    ) : (
                      <a 
                        href={path.url} 
                        className="text-gray-400 hover:text-[#0a2240] transition-colors duration-200 tracking-wide"
                      >
                        {path.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </nav>

          </div>

          {/* RIGHT COLUMN: PROFESSIONAL MEDICAL/LAB TEAM GRAPHIC (5/12 Width on Desktop) */}
          <div className="md:col-span-5 lg:col-span-6 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-end justify-center md:justify-end">
            <div className="relative w-full h-full max-w-[480px] md:max-w-none">
              {/* Fade out mask effect on the left of the image to blend perfectly with background */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f1f6fa] to-transparent z-10 pointer-events-none hidden md:block" />
              
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80" 
                alt="Our Diagnostics Laboratory Panel" 
                className="w-full h-full object-contain object-bottom select-none pointer-events-none transform scale-105"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}