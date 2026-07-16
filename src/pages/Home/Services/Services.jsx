
// LOGIC: Using strictly react-icons/fa to comply with project linting rules
import { 
  FaMicroscope, 
  FaHeartbeat, 
  FaFlask, 
  FaProcedures, 
  FaDna, 
  FaBriefcase, 
  FaHome, 
  FaFileMedicalAlt,
  FaChevronRight
} from 'react-icons/fa';

export default function Services() {
  // LOGIC: Diagnostic & Laboratory service data array mapping to the 8 grid cards
  const services = [
    {
      id: 'ser-1',
      number: '01',
      title: 'Pathology & Blood Tests',
      desc: 'Complete hematology, biochemistry, and clinical pathology analysis.',
      icon: FaMicroscope,
    },
    {
      id: 'ser-2',
      number: '02',
      title: 'Radiology & Imaging',
      desc: 'High-resolution digital X-rays, ultrasounds, and diagnostic scans.',
      icon: FaProcedures,
    },
    {
      id: 'ser-3',
      number: '03',
      title: 'Cardiology Diagnostics',
      desc: 'Advanced ECG, Echocardiogram, and stress monitoring assessments.',
      icon: FaHeartbeat,
    },
    {
      id: 'ser-4',
      number: '04',
      title: 'Hormone & Thyroid Panels',
      desc: 'Precise immunological assays tracking critical metabolic indicators.',
      icon: FaFlask,
    },
    {
      id: 'ser-5',
      number: '05',
      title: 'DNA & Genetic Screening',
      desc: 'Modern molecular diagnostics identifying genetic health risks.',
      icon: FaDna,
    },
    {
      id: 'ser-6',
      number: '06',
      title: 'Corporate Wellness',
      desc: 'Customized clinical screening packages for corporate workforces.',
      icon: FaBriefcase,
    },
    {
      id: 'ser-7',
      number: '07',
      title: 'Home Sample Collection',
      desc: 'Sterile, on-demand sample collections directly at your doorstep.',
      icon: FaHome,
      isHighlighted: true, // LOGIC: Flag to trigger the matching dark theme card design
    },
    {
      id: 'ser-8',
      number: '08',
      title: 'Custom Health Packages',
      desc: 'Personalized multi-test configurations matched to your age and lifestyle.',
      icon: FaFileMedicalAlt,
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f4f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION (Matches image layout split 7-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-[3px] bg-[#3ca4f4]" />
              <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Our Best Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0a2240] tracking-tight leading-tight">
              High-Quality Diagnostic <br />Services For You
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              We are privileged to offer diagnostic excellence utilizing state-of-the-art laboratory automation, ensuring rapid, highly accurate medical reports to guide your healthcare choices.
            </p>
          </div>
        </div>

        {/* SERVICES GRID (4 columns on desktop, responsive breakpoints) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            // LOGIC: Render highlighted 7th card design (Dark Navy background) if flagged
            if (service.isHighlighted) {
              return (
                <div 
                  key={service.id} 
                  className="relative bg-[#0a2240] text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-between overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                >
                  {/* Decorative Background Accents */}
                  <div className="absolute right-0 bottom-0 w-12 h-12 bg-[#3ca4f4] rounded-tl-3xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    {/* Header Row with Icon and Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-full bg-[#3ca4f4] flex items-center justify-center text-white">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-black opacity-40">{service.number}</span>
                    </div>
                    {/* Content Block */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-extrabold tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            // LOGIC: Standard Card Render (Premium White Background)
            return (
              <div 
                key={service.id} 
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Icon Wrapper with Custom Right Pointer Arrow */}
                  <div className="relative inline-block">
                    <div className="w-12 h-12 rounded-full bg-[#f4f8fc] flex items-center justify-center text-[#0a2240] group-hover:bg-[#3ca4f4] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Little pointing arrow right of the circle */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 bg-[#3ca4f4] rotate-45 border-t border-r border-white pointer-events-none rounded-[1px]" />
                  </div>

                  {/* Content Block */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-[#0a2240] tracking-tight group-hover:text-[#3ca4f4] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION FOOTER */}
        <div className="mt-16 text-center space-y-2 flex flex-col sm:flex-row items-center justify-center sm:space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#3ca4f4]">
            <FaFileMedicalAlt className="w-4 h-4" />
          </div>
          <p className="text-sm font-bold text-[#0a2240]">
            Delivering tomorrow's health care for your family.
            <button className="inline-flex items-center space-x-1 text-[#3ca4f4] hover:text-[#0a2240] font-black uppercase ml-2 transition-colors">
              <span>See More</span>
              <FaChevronRight className="w-2.5 h-2.5" />
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}