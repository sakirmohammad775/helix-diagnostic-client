import  { useState } from 'react';
// LOGIC: Using strictly react-icons/fa to comply with project linting rules
import { FaUser, FaRegComment, FaChevronRight } from 'react-icons/fa';

export default function BlogCard() {
  // LOGIC: State to manage the active pagination/carousel dot
  const [activeDot, setActiveDot] = useState(0);

  // LOGIC: Static array of diagnostic and health articles
  const articles = [
    {
      id: 'post-1',
      category: 'MEDICAL',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
      author: 'Admin',
      comments: 'Comment',
      month: 'May',
      day: '02',
      title: 'Medical Of This Working Health Blog',
      desc: 'Medical standard chunk of nibh velit auctor aliquet sollicitudin. Discover how routine blood screening detects early metabolic shifts.'
    },
    {
      id: 'post-2',
      category: 'MEDICAL',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      author: 'Admin',
      comments: 'Comment',
      month: 'May',
      day: '02',
      title: 'There Is Only One Thing That Is Hospital.',
      desc: 'Medical standard chunk of nibh velit auctor aliquet sollicitudin. Learn about the importance of sterile laboratory environments.'
    },
    {
      id: 'post-3',
      category: 'MEDICAL',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&w=600&q=80',
      author: 'Admin',
      comments: 'Comment',
      month: 'May',
      day: '02',
      title: 'This Working World and Infection Prevention.',
      desc: 'Medical standard chunk of nibh velit auctor aliquet sollicitudin. Essential guidelines on sterile collection and sample safety protocols.'
    }
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
            <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Our Largest Blog</span>
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            Latest Posts & Articles
          </h2>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="bg-white rounded-none border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Floating Elements */}
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Category Tag */}
                  <span className="absolute top-4 left-4 bg-white text-[#3ca4f4] text-xs font-black px-4 py-1.5 rounded-full shadow-sm">
                    {article.category}
                  </span>

                  {/* Overlapping Date Badge on Right Corner */}
                  <div className="absolute right-4 -bottom-6 z-10 w-12 h-12 bg-[#0a2240] text-white flex flex-col items-center justify-center rounded-sm shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">{article.month}</span>
                    <span className="text-lg font-black leading-none mt-0.5">{article.day}</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 pt-10 space-y-4">
                  {/* Author and Comment Row */}
                  <div className="flex items-center space-x-6 text-xs font-bold text-gray-500">
                    <div className="flex items-center space-x-1.5">
                      <FaUser className="w-3 h-3 text-[#3ca4f4]" />
                      <span>By: {article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FaRegComment className="w-3 h-3 text-[#3ca4f4]" />
                      <span>{article.comments}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-[#0a2240] leading-snug tracking-tight hover:text-[#3ca4f4] transition-colors duration-200">
                      <a href="#blog-details">{article.title}</a>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {article.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Button */}
              <div className="p-6 pt-0">
                <button className="inline-flex items-center space-x-1 text-xs font-black text-[#0a2240] uppercase tracking-wider hover:text-[#3ca4f4] transition-colors duration-200">
                  <span>Read More</span>
                  <FaChevronRight className="w-2.5 h-2.5" />
                </button>
              </div>

            </article>
          ))}
        </div>

        {/* BOTTOM PAGINATION INDICATORS */}
        <div className="flex justify-center items-center space-x-2 mt-12">
          {[0, 1, 2, 3].map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveDot(dotIndex)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeDot === dotIndex ? 'w-8 bg-[#0a2240]' : 'w-2.5 bg-gray-200'
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}