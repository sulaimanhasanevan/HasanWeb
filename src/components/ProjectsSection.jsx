import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, ArrowRight } from 'lucide-react';

const ProjectsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'Geotrek Vans',
      description: 'Geotrek Vans - premium camper vans',
      image: '/projects/geotrekvans/geotrekvans-cover.webp',
      technologies: ['WordPress', 'Elementor', 'WooCommerce', 'Interactive Calculator', 'PHP'],
      liveUrl: 'https://geotrekvans.com',
      githubUrl: '#'
    },
    {
      id: 2,
      name: 'Anchor Harvey',
      description: 'Anchor Harvey, a leader in forging and machining solutions',
      image: '/projects/anchorharvey/anchorharvey-cover.webp',
      technologies: ['WordPress', 'Avada', 'Fushion Builder', 'ACF'],
      liveUrl: 'https://anchorharvey.com',
      githubUrl: '#'
    },
    {
      id: 3,
      name: 'Lafayette Steakhouse',
      description: 'Lafayette Miami, blending the nostalgic charm of an all-American steakhouse',
      image: '/projects/lafayette/lafayette-cover.webp',
      technologies: ['WordPress', 'Elementor', 'WooCommerce','All In One SEO'],
      liveUrl: 'https://www.lafayette-miami.com',
      githubUrl: '#'
    },
    {
      id: 4,
      name: 'Lexco® Cable',
      description: 'Lexco® Cable, a leading manufacturer of wire rope and cable assemblies',
      image: '/projects/lexcocable/lexcocable-cover.webp',
      technologies: ['WordPress', 'Avada', 'Fushion Builder', 'ACF'],
      liveUrl: 'https://lexcocable.com',
      githubUrl: '#'
    },
    {
      id: 5,
      name: 'Tapestry of Africa',
      description: 'Tapestry of Africa, showcasing luxury safari packages across Kenya, Tanzania, and Uganda',
      image: '/projects/tapestryofafrica/tapestryofafrica-cover.webp',
      technologies: ['WordPress', 'Elementor','ALL In One SEO', 'PhotoSwipe'],
      liveUrl: 'https://tapestryofafrica.com',
      githubUrl: '#'
    },
    {
      id: 6,
      name: 'Rome Grinding Solutions',
      description: 'Rome Grinding Solutions, a fourth-generation family-owned company in Iowa',
      image: '/projects/romegrindingsolutions/romegrindingsolutions-cover.webp',
      technologies: ['WordPress', 'Avada', 'Fushion Builder', 'ACF',  'PHP'],
      liveUrl: 'https://romegrindingsolutions.com',
      githubUrl: '#'
    }
  ];

  // Create slides based on screen size
  const createSlides = () => {
    const width = window.innerWidth;
    let itemsPerSlide = 3; // Default desktop: 3 items
    
    if (width < 768) {
      itemsPerSlide = 1; // Mobile: 1 item
    } else if (width < 1024) {
      itemsPerSlide = 2; // Tablet: 2 items
    }
    
    const slides = [];
    for (let i = 0; i < projects.length; i += itemsPerSlide) {
      slides.push(projects.slice(i, i + itemsPerSlide));
    }
    return slides;
  };

  const [slides, setSlides] = useState(createSlides());

  useEffect(() => {
    const handleResize = () => {
      const newSlides = createSlides();
      setSlides(newSlides);
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing my latest work and creative solutions
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-16">
            <div 
              className="flex transition-transform duration-600 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {slide.map((project) => (
                      <div
                        key={project.id}
                        className="group bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center px-4">
                              <h3 className="text-lg font-bold text-white mb-3">{project.name}</h3>
                              <div className="flex gap-3 justify-center">
                                <a
                                  href={project.liveUrl}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center text-sm"
                                >
                                  <ExternalLink size={14} className="mr-1" />
                                  Live Demo
                                </a>
                                <a
                                  href={project.githubUrl}
                                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center text-sm"
                                >
                                  <Github size={14} className="mr-1" />
                                  Code
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-100 mb-2">{project.name}</h3>
                          <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-indigo-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-lime-500 hover:bg-lime-400 text-gray-900 px-8 py-3 rounded-lg transition-colors font-semibold text-lg inline-flex items-center">
            See More Projects
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;