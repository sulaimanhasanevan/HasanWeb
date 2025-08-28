import React, { useEffect, useRef, useState } from 'react';

const Experience = () => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const milestonesRef = useRef([]);
  
  const [experiences, setExperiences] = useState([
    
    {
      id: 1,
      company: "I.T For Less",
      place: "Chicago, Illinois, United States",
      location: "Remote",
      type: "Full-time",
      startDate: "Dec 2024",
      endDate: "May 2025",
      description: "Full-time remote position customizing WordPress themes and plugin behavior. Developed and maintained WooCommerce stores with ACF and Elementor integration. Improved site structure, loading speed, and UX across multiple client projects."
    },
    {
      id: 2,
      company: "Link1 Studio",
      place: "London, United Kingdom",
      location: "Remote",
      type: "Freelancer",
      startDate: "Sep 2024",
      endDate: "Oct 2024",
      description: "Freelance: Delivered two full websites (Pitpop.it, link1studios.com). Implemented custom themes with advanced animations using GSAP and ScrollTrigger."
    },
    {
      id: 3,
      company: "AutoSmartSeller",
      place: "Surat, Gujarat, India",
      location: "Remote",
      type: "Freelancer",
      startDate: "Mar 2024",
      endDate: "Aug 2024",
      description: "Hourly freelance role focusing on troubleshooting and site customization. Created lightweight WordPress themes and tailored plugins based on client specs. Frequently worked with WooCommerce, CPTs, and Elementor Pro."
    },
    {
      id: 4,
      company: "Videe Infotech",
      place: "Surat, Gujarat, India",
      location: "Remote",
      type: "Part-time",
      startDate: "Jul 2023",
      endDate: "Dec 2023",
      description: "Part-time remote position developing fully responsive WordPress websites. Specialized in building themes from scratch and fixing CSS/JS issues."
    },
    {
      id: 5,
      company: "Fiverr",
      place: "Dhaka, Bangladesh",
      location: "Remote",
      type: "Freelancer",
      startDate: "Jun 2019",
      endDate: "Aug 2023",
      description: "Delivered 30+ client projects globally with focus on WordPress ecosystem. Built custom themes, WooCommerce shops, and optimized page speed using caching/CDN. Specialized in Elementor, Divi, ACF, and troubleshooting complex site issues."
    }
  ]);

  useEffect(() => {
    // Import GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.onload = () => {
        initGSAPAnimations();
      };
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup scripts
      document.head.removeChild(script);
    };
  }, []);

  const initGSAPAnimations = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Animate each milestone and cards
    milestonesRef.current.forEach((milestone, index) => {
      if (milestone) {
        const milestoneCircle = milestone.querySelector('.milestone-circle');
        const card = milestone.querySelector('.experience-card');
        
        if (milestoneCircle && card) {
          // Card animation - staggered entrance from right
          gsap.set(card, { x: 300 }); // Start all cards off-screen to the right
          
          gsap.to(card, {
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: milestone,
              start: 'top bottom-=50',
              end: 'center center',
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const direction = self.direction;
                
                if (direction === 1) {
                  // Scrolling down: slide from right to left
                  gsap.to(card, {
                    x: 300 - (progress * 300),
                    duration: 0.1,
                    ease: 'none'
                  });
                } else {
                  // Scrolling up: slide back to right
                  gsap.to(card, {
                    x: 300 - (progress * 300),
                    duration: 0.1,
                    ease: 'none'
                  });
                }
              },
              onLeave: () => {
                // When scrolling down past the element
                gsap.to(card, { x: 0, duration: 0.3 });
              },
              onEnterBack: () => {
                // When scrolling back up into view
                gsap.to(card, { x: 0, duration: 0.3 });
              },
              onLeaveBack: () => {
                // When scrolling up past the element
                gsap.to(card, { x: 300, duration: 0.3 });
              }
            }
          });
          
          // Milestone glow effect based on scroll direction  
          ScrollTrigger.create({
            trigger: milestone,
            start: 'top center+=100',
            end: 'bottom center-=100',
            onUpdate: (self) => {
              const progress = self.progress;
              const direction = self.direction;
              
              if (progress > 0.2 && progress < 0.8) {
                if (direction === 1) {
                  // Scrolling down: blue glow (#00bcff)
                  gsap.to(milestoneCircle, {
                    boxShadow: '0 0 20px rgba(0, 188, 255, 0.8), 0 0 40px rgba(0, 188, 255, 0.4)',
                    borderColor: '#00bcff',
                    duration: 0.2
                  });
                } else {
                  // Scrolling up: purple glow (#4f39f6)  
                  gsap.to(milestoneCircle, {
                    boxShadow: '0 0 20px rgba(79, 57, 246, 0.8), 0 0 40px rgba(79, 57, 246, 0.4)',
                    borderColor: '#4f39f6',
                    duration: 0.2
                  });
                }
              } else {
                // Reset glow when out of range
                gsap.to(milestoneCircle, {
                  boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                  borderColor: '#9ca3af',
                  duration: 0.2
                });
              }
            }
          });

          // Celebration animation when milestone enters view
          ScrollTrigger.create({
            trigger: milestone,
            start: 'top center+=50',
            onEnter: () => {
              gsap.to(milestoneCircle, {
                scale: 1.2,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'back.out(1.7)'
              });
            }
          });
        }
      }
    });

    // Main timeline line gradient animation
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        background: 'linear-gradient(to bottom, #00bcff 0%, #4f39f6 100%)',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });
    }
  };

  const MilestoneSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="milestone-icon">
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M12 2v4M12 18v4M22 12h-4M6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
    </svg>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1b3b' }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#e5e7eb' }}>
            Experience
          </h1>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Main timeline line - Hidden on mobile */}
          <div 
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-0.5 transition-all duration-1000 hidden md:block"
            style={{ backgroundColor: '#9ca3af' }}
          ></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              ref={el => milestonesRef.current[index] = el}
              className="timeline-item relative flex items-start mb-16"
            >
              {/* Milestone Circle - Hidden on mobile */}
              <div className="relative z-10 hidden md:block">
                <div 
                  className="milestone-circle w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                  style={{ 
                    backgroundColor: '#1e2939',
                    borderColor: '#9ca3af',
                    boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
                  }}
                >
                  <MilestoneSVG />
                </div>
              </div>

              {/* Content Card */}
              <div className="md:ml-8 flex-1">
                <div 
                  className="experience-card rounded-xl p-6 shadow-xl border transition-all duration-300"
                  style={{
                    backgroundColor: '#1e2939',
                    borderColor: '#374151',
                    transform: 'translateX(-50px)'
                  }}
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#e5e7eb' }}>
                      {exp.company}
                    </h3>
                    <p className="text-lg mb-3" style={{ color: '#9ca3af' }}>
                      {exp.place}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span 
                        className="px-3 py-1 rounded-full text-sm border font-medium"
                        style={{
                          backgroundColor: '#6366f1',
                          color: '#e5e7eb',
                          borderColor: '#6366f1'
                        }}
                      >
                        {exp.type}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-sm border font-medium"
                        style={{
                          backgroundColor: '#22c55e',
                          color: '#e5e7eb',
                          borderColor: '#22c55e'
                        }}
                      >
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-medium" style={{ color: '#38bdf8' }}>
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  
                  <div className="pl-5 border-l-2" style={{ borderColor: '#6366f1' }}>
                    <div 
                      className="leading-relaxed whitespace-pre-line" 
                      style={{ color: '#9ca3af' }}
                      dangerouslySetInnerHTML={{
                        __html: exp.description.replace(/- /g, '• ')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .milestone-icon {
          color: #9ca3af;
          transition: color 0.3s ease;
        }
        
        .timeline-item:hover .milestone-circle {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(0, 188, 255, 0.5), 0 0 50px rgba(0, 188, 255, 0.2);
        }
        
        .timeline-item:hover .milestone-icon {
          color: #e5e7eb;
        }
        
        @media (max-width: 768px) {
          .timeline-item {
            margin-bottom: 2rem;
          }
          
          .experience-card {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;