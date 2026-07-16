
// Importing specific icons from Font Awesome (fa6) and Feather (fi) packs
import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe, FaChevronRight} from 'react-icons/fa6';
import { FiClock, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Footer() {
  // LOGIC: Abstracting static datasets into arrays to maintain a clean JSX structure
  const services = [
    'Plastic Surgery',
    'Pharmacology',
    'Dental Care',
    'Medicine Care',
    'Orthopedic'
  ];

  const quickLinks = [
    'Home',
    'About Us',
    'Our Services',
    'Our Portfolio',
    'Contact'
  ];

  // LOGIC: Dynamic configuration array for social icons to map them cleanly
  const socialIcons = [FaFacebookF, FaGlobe, FaTwitter, FaInstagram];

  // LOGIC: Simulating dynamic API-driven blog data with unique, stable IDs
  const recentPosts = [
    {
      id: 1,
      date: '23 Jun 2024',
      title: 'We round Solution york Blog',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      date: '20 Jun 2024',
      title: 'The Medical Of This Working Health',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80'
    }
  ];

  const bottomLinks = ['About Us', 'Events', 'News', 'Service'];

  return (
    <footer className="relative w-full text-white bg-[#112a52] overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80')` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LOGIC: Responsive CSS Grid structure (1 col mobile, 2 col tablet/medium, 12 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0">
          
          <div className="lg:col-span-3 bg-[#3ca4f4] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#3ca4f4]">
                  <FaFacebookF className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">Helix</span>
              </div>

              <hr className="border-white/30 mb-8" />

              <div className="space-y-6 text-[14px]">
                <div className="flex items-start space-x-3">
                  <FiClock className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Open Hours of Government:</p>
                    <p className="opacity-90">Mon - Fri: 8.00 am. - 6.00 pm.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiMapPin className="w-5 h-5 shrink-0" />
                  <p className="opacity-90">13/A, Miranda Halim City.</p>
                </div>

                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 shrink-0" />
                  <p className="opacity-90">099 695 695 35</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-10">
              {socialIcons.map((Icon, index) => (
                // LOGIC: Safely looping over simple components array using index keys
                <a key={index} href="#" className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-9 p-8 sm:p-12 md:pl-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            <div>
              <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-[#3ca4f4]">
                Service
              </h3>
              <ul className="space-y-4">
                {services.map((service, idx) => (
                  // LOGIC: Standard mapping utilizing index parameters for unique element keys
                  <li key={idx}>
                    <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-200 text-sm flex items-center gap-1">
                      <FaChevronRight className="w-2 h-2 opacity-50" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-[#3ca4f4]">
                Quick Link
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, idx) => (
                  // LOGIC: Using index for the key identifier in simple lists
                  <li key={idx}>
                    <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-200 text-sm flex items-center gap-1">
                      <FaChevronRight className="w-2 h-2 opacity-50" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-[#3ca4f4]">
                Recent Posts
              </h3>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  // LOGIC: Rendering data with unique IDs from database/object properties instead of index
                  <div key={post.id} className="flex items-center space-x-3 group cursor-pointer">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/20 group-hover:border-[#3ca4f4] transition-all"
                    />
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase font-medium">{post.date}</span>
                      <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white leading-tight transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="bg-[#0b1c36] border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
            Copyright © 2026 <span className="text-white font-semibold">Helix</span>. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs sm:text-sm">
            {bottomLinks.map((link, idx) => (
              // LOGIC: Standard static menu list render using mapped index keys
              <a key={idx} href="#" className="text-gray-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}