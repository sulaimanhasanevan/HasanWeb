import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  // Sample project data - replace with your actual data
  const allProjects = [
    {
      id: 1,
      name: "E-commerce Website",
      mainTech: ["Wordpress", "React Js"],
      images: [
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+1+Image+1",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+1+Image+2",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+1+Image+3",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+1+Image+4"
      ],
      projectLink: "https://example.com",
      githubLink: "https://github.com/example",
      description: "A full-featured e-commerce platform with modern design and responsive layout. Features include product catalog, shopping cart, and secure checkout process."
    },
    {
      id: 2,
      name: "Portfolio Website",
      mainTech: ["React Js"],
      images: [
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+2+Image+1",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+2+Image+2",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+2+Image+3",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+2+Image+4"
      ],
      projectLink: "https://portfolio.example.com",
      githubLink: "",
      description: "Personal portfolio website showcasing projects and skills with smooth animations and modern UI components."
    },
    {
      id: 3,
      name: "Blog Management System",
      mainTech: ["Wordpress"],
      images: [
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+3+Image+1",
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+3+Image+2",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+3+Image+3",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+3+Image+4"
      ],
      projectLink: "",
      githubLink: "https://github.com/blog-example",
      description: "Custom WordPress theme with advanced blog management features, SEO optimization, and user-friendly admin interface."
    },
    {
      id: 4,
      name: "Task Management App",
      mainTech: ["Java", "React Js"],
      images: [
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+4+Image+1",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+4+Image+2",
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+4+Image+3",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+4+Image+4"
      ],
      projectLink: "https://taskapp.example.com",
      githubLink: "https://github.com/taskapp",
      description: "Full-stack task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface."
    },
    {
      id: 5,
      name: "Restaurant Website",
      mainTech: ["Wordpress", "Java"],
      images: [
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+5+Image+1",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+5+Image+2",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+5+Image+3",
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+5+Image+4"
      ],
      projectLink: "https://restaurant.example.com",
      githubLink: "",
      description: "Modern restaurant website with online reservation system, menu showcase, and integrated payment processing."
    },
    {
      id: 6,
      name: "Weather Dashboard",
      mainTech: ["React Js"],
      images: [
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+6+Image+1",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+6+Image+2",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+6+Image+3",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+6+Image+4"
      ],
      projectLink: "https://weather.example.com",
      githubLink: "https://github.com/weather-dashboard",
      description: "Interactive weather dashboard with real-time data, forecasts, and beautiful data visualizations."
    },
    {
      id: 7,
      name: "Learning Management System",
      mainTech: ["Java"],
      images: [
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+7+Image+1",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+7+Image+2",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+7+Image+3",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+7+Image+4"
      ],
      projectLink: "",
      githubLink: "https://github.com/lms-java",
      description: "Comprehensive learning management system with course management, student tracking, and assessment tools."
    },
    {
      id: 8,
      name: "Social Media Dashboard",
      mainTech: ["React Js", "Java"],
      images: [
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+8+Image+1",
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+8+Image+2",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+8+Image+3",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+8+Image+4"
      ],
      projectLink: "https://social.example.com",
      githubLink: "https://github.com/social-dashboard",
      description: "Social media analytics dashboard with real-time metrics, engagement tracking, and performance insights."
    },
    {
      id: 9,
      name: "Corporate Website",
      mainTech: ["Wordpress"],
      images: [
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+9+Image+1",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+9+Image+2",
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+9+Image+3",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+9+Image+4"
      ],
      projectLink: "https://corporate.example.com",
      githubLink: "",
      description: "Professional corporate website with custom design, content management system, and SEO optimization."
    },
    {
      id: 10,
      name: "Mobile Banking App",
      mainTech: ["Java", "React Js"],
      images: [
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+10+Image+1",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+10+Image+2",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+10+Image+3",
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+10+Image+4"
      ],
      projectLink: "https://banking.example.com",
      githubLink: "https://github.com/banking-app",
      description: "Secure mobile banking application with transaction management, account monitoring, and advanced security features."
    },
    {
      id: 11,
      name: "Inventory System",
      mainTech: ["Java"],
      images: [
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+11+Image+1",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+11+Image+2",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+11+Image+3",
        "https://via.placeholder.com/400x300/84cc16/ffffff?text=Project+11+Image+4"
      ],
      projectLink: "",
      githubLink: "https://github.com/inventory-system",
      description: "Enterprise inventory management system with barcode scanning, stock tracking, and automated reporting."
    },
    {
      id: 12,
      name: "News Portal",
      mainTech: ["Wordpress", "React Js"],
      images: [
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Project+12+Image+1",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Project+12+Image+2",
        "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Project+12+Image+3",
        "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Project+12+Image+4"
      ],
      projectLink: "https://news.example.com",
      githubLink: "https://github.com/news-portal",
      description: "Dynamic news portal with real-time updates, categorized content, and user engagement features."
    }
  ];

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    allProjects.forEach(project => {
      project.mainTech.forEach(tech => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet)];
  }, [allProjects]);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') {
      return allProjects;
    }
    return allProjects.filter(project => 
      project.mainTech.includes(selectedFilter)
    );
  }, [selectedFilter, allProjects]);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  const openImageModal = (images, index) => {
    setSelectedImage(images);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedImage.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImage.length - 1 : prev - 1
    );
  };

  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 3);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-12" style={{ color: '#e5e7eb' }}>
          Projects
        </h1>

        {/* Sorting System */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => {
                setSelectedFilter(tech);
                setVisibleProjects(9); // Reset to show first 9 when filter changes
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border-b-2 ${
                selectedFilter === tech
                  ? 'border-b-2 text-white'
                  : 'border-transparent hover:border-opacity-50'
              }`}
              style={{
                backgroundColor: selectedFilter === tech ? '#1f2937' : 'transparent',
                color: selectedFilter === tech ? '#e5e7eb' : '#9ca3af',
                borderBottomColor: selectedFilter === tech ? '#00bcff' : 'transparent',
                borderBottomWidth: selectedFilter === tech ? '2px' : '2px'
              }}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: '#1f2937' }}
            >
              {/* Image Gallery */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-1 h-48">
                  {project.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={image}
                        alt={`${project.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                      />
                      <div
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <ZoomIn
                          className="w-6 h-6 text-white"
                          onClick={() => openImageModal(project.images, index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openImageModal(project.images, 0)}
                  className="absolute top-2 right-2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Project Details */}
              <div className="p-6">
                {/* Project Name */}
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#e5e7eb' }}>
                  {project.name}
                </h3>

                {/* Tech Stack */}
                <div className="mb-4">
                  <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>
                    Tech Used: 
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.mainTech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: '#6366f1', color: '#ffffff' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex gap-4 mb-4">
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300"
                      style={{ 
                        backgroundColor: '#84cc16',
                        color: '#ffffff'
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-300"
                      style={{ 
                        borderColor: '#38bdf8',
                        color: '#38bdf8'
                      }}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center">
            <button
              onClick={loadMoreProjects}
              className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#84cc16',
                color: '#ffffff'
              }}
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full h-3/4">
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <img
                src={selectedImage[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Image Counter */}
              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <span className="text-white text-sm">
                  {currentImageIndex + 1} / {selectedImage.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;