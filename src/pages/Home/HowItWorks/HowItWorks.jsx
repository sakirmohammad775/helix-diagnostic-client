import { FaCalendarCheck, FaFileMedical, FaVials } from "react-icons/fa";
import { FaFlaskVial } from "react-icons/fa6";


export default function HowItWorks() {
  // LOGIC: Data array representing sequential diagnostic service steps with stable ID keys
  const steps = [
    {
      id: 'step-1',
      number: '01',
      title: 'Book Online',
      desc: 'Search for your required tests or health packages and schedule a convenient time slot.',
      icon: FaCalendarCheck,
      color: 'text-[#3ca4f4] bg-blue-50'
    },
    {
      id: 'step-2',
      number: '02',
      title: 'Give Sample',
      desc: 'Visit our nearest sterile facility or opt for a safe, professional home sample collection.',
      icon: FaVials,
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      id: 'step-3',
      number: '03',
      title: 'Lab Analysis',
      desc: 'Our automated state-of-the-art pathology labs process and cross-verify your samples.',
      icon: FaFlaskVial,
      color: 'text-purple-500 bg-purple-50'
    },
    {
      id: 'step-4',
      number: '04',
      title: 'Get Reports',
      desc: 'Receive secure, medically verified PDF health reports directly via email or your patient portal.',
      icon: FaFileMedical,
      color: 'text-amber-500 bg-amber-50'
    }
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
            <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Our Process</span>
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Your diagnostic journey is simplified into four simple steps designed to save you time and hassle.
          </p>
        </div>

        {/* PROCESS STEPS CONTAINER */}
        {/* LOGIC: Responsive structural grid. Stacks 1 col on mobile, 2 cols on tablet, and 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* DECORATIVE CONNECTING LINE: Visible only on large desktop screens to visually bridge steps */}
          <div className="hidden lg:block absolute top-1/4 left-[10%] right-[10%] h-[2px] bg-dashed border-t-2 border-dashed border-gray-100 z-0 pointer-events-none" />

          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              // LOGIC: Utilizing step.id as stable key values. Relies on state-isolated index logic for final step lines.
              <div 
                key={step.id} 
                className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-50 hover:border-[#3ca4f4]/10 group"
              >
                {/* Step Number Badge */}
                <span className="absolute top-4 right-6 text-sm font-black text-[#0a2240]/10 group-hover:text-[#3ca4f4]/20 transition-colors duration-300">
                  {step.number}
                </span>

                {/* Rounded Icon Wrapper */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${step.color}`}>
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Content block */}
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#0a2240] tracking-tight group-hover:text-[#3ca4f4] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}