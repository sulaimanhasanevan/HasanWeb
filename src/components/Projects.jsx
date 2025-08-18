import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { allProjects } from './projectData'; // Import data from separate file

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectImageIndex, setProjectImageIndex] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // Initialize project image indices
  React.useEffect(() => {
    const initialIndices = {};
    allProjects.forEach(project => {
      initialIndices[project.id] = 0;
    });
    setProjectImageIndex(initialIndices);
  }, []);

  // Get unique categories from all projects with safety check
  const allCategories = useMemo(() => {
    const categorySet = new Set();
    allProjects.forEach(project => {
      // Safety check: ensure project.category exists and is an array
      if (project.category && Array.isArray(project.category)) {
        project.category.forEach(cat => categorySet.add(cat));
      }
    });
    return ['All', ...Array.from(categorySet)];
  }, [allProjects]);

  // Filter projects based on selected filter with safety check
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') {
      return allProjects;
    }
    return allProjects.filter(project => 
      project.category && Array.isArray(project.category) && project.category.includes(selectedFilter)
    );
  }, [selectedFilter, allProjects]);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  const nextProjectImage = (projectId) => {
    setProjectImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % 4
    }));
  };

  const prevProjectImage = (projectId) => {
    setProjectImageIndex(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 0 ? 3 : prev[projectId] - 1
    }));
  };

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

  const toggleDescription = (projectId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101828' }}>
      <div className="max-w-none mx-auto px-4 py-12" style={{ maxWidth: '1450px' }}>
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-12" style={{ color: '#e5e7eb' }}>
          Projects
        </h1>

        {/* Sorting System */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedFilter(category);
                setVisibleProjects(9);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border-b-2 ${
                selectedFilter === category
                  ? 'border-b-2 text-white'
                  : 'border-transparent hover:border-opacity-50'
              }`}
              style={{
                backgroundColor: selectedFilter === category ? '#1f2937' : 'transparent',
                color: selectedFilter === category ? '#e5e7eb' : '#9ca3af',
                borderBottomColor: selectedFilter === category ? '#00bcff' : 'transparent',
                borderBottomWidth: selectedFilter === category ? '2px' : '2px'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayedProjects.map((project) => {
            const isExpanded = expandedDescriptions[project.id];
            const shouldShowReadMore = project.description.length > 600;
            const displayDescription = isExpanded ? project.description : project.description.substring(0, 600);
            
            return (
              <div
                key={project.id}
                className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 group flex flex-col"
                style={{ backgroundColor: '#1f2937' }}
              >
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative w-full aspect-video lg:h-[33vh] md:h-[25vh] h-[50vw]">
                    <img
                      src={project.images[projectImageIndex[project.id] || 0]}
                      alt={`${project.name} - Image ${(projectImageIndex[project.id] || 0) + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation Dots */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setProjectImageIndex(prev => ({
                            ...prev,
                            [project.id]: index
                          }))}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (projectImageIndex[project.id] || 0) === index
                              ? 'bg-white'
                              : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => prevProjectImage(project.id)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>

                    <button
                      onClick={() => nextProjectImage(project.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <button
                    onClick={() => openImageModal(project.images, projectImageIndex[project.id] || 0)}
                    className="absolute top-2 right-2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  >
                    <ZoomIn className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Project Name */}
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#e5e7eb' }}>
                    {project.name}
                  </h3>

                  {/* Technologies Used (Display only) */}
                  <div className="mb-4">
                    <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>
                      Technologies: 
                    </span>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: '#e5e7eb' }}>
                      {project.technologies}
                    </p>
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
                  <div className="flex-1">
                    <p className="text-base leading-relaxed font-normal" style={{ color: '#ffffff' }}>
                      {shouldShowReadMore && !isExpanded ? displayDescription + '...' : displayDescription}
                    </p>
                    
                    {shouldShowReadMore && (
                      <button
                        onClick={() => toggleDescription(project.id)}
                        className="mt-2 text-sm font-medium transition-colors duration-300 hover:underline"
                        style={{ color: '#38bdf8' }}
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
            <div className="relative w-full max-w-6xl aspect-video md:h-[75vh] h-[50vh]">
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              {/* Image */}
              <img
                src={selectedImage[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Image Counter */}
              <div
                className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 md:px-4 md:py-2 rounded-full"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <span className="text-white text-xs md:text-sm">
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