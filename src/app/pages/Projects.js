import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Dropdown from '../components/Dropdown';
import FilterTag from '../components/Tag';
import Modal from '../components/Modal';
import { fetchProjects } from '../services/projectsService';
import { useTheme } from '../ThemeProvider';

const Projects = () => {

  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState([]);
  const [technologyFilter, setTechnologyFilter] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isProjectTypeDropdownOpen, setIsProjectTypeDropdownOpen] = useState(false);
  const [isTechnologyDropdownOpen, setIsTechnologyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchProjects(setProjects, setFilteredProjects);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      (projectTypeFilter.length === 0 || projectTypeFilter.includes(project.type)) &&
      (technologyFilter.length === 0 || project.technologiesUsed.some(tech => technologyFilter.includes(tech)))
    );
    setFilteredProjects(filtered);
  }, [projectTypeFilter, technologyFilter, projects]);

  const handleTypeFilterChange = type => {
    const newFilter = projectTypeFilter.includes(type)
      ? projectTypeFilter.filter(t => t !== type)
      : [...projectTypeFilter, type];
    setProjectTypeFilter(newFilter);
  };

  const handleTechnologyFilterChange = tech => {
    const newFilter = technologyFilter.includes(tech)
      ? technologyFilter.filter(t => t !== tech)
      : [...technologyFilter, tech];
    setTechnologyFilter(newFilter);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-4" style={{ minHeight: '32px' }}>
        {projectTypeFilter.map(type => (
          <FilterTag key={type} label={type} onRemove={() => handleTypeFilterChange(type)} />
        ))}
        {technologyFilter.map(tech => (
          <FilterTag key={tech} label={tech} onRemove={() => handleTechnologyFilterChange(tech)} />
        ))}
      </div>

      
      <div className="flex justify-center gap-4 mb-6">
        <Dropdown
          title="Project Type"
          options={['Backend', 'Frontend', 'Desktop Application', 'Full Stack', 'AI/ML', 'Big Data', 'Web App']}
          selectedOptions={projectTypeFilter}
          onChange={handleTypeFilterChange}
          isOpen={isProjectTypeDropdownOpen}
          onOutsideClick={() => setIsProjectTypeDropdownOpen(false)}
        />
        <Dropdown
          title="Technology"
          options={['Symfony', 'Docker', 'MySQL', 'PHP', 'Kotlin Compose', 'Java', 'Kotlin', 'Spring Boot', 'MongoDB', 'Express.js', 'React', 'Node.js', 'TensorFlow', 'Keras', 'Python', 'Rust', 'Kafka', 'Flask', 'MariaDB', 'React Native', 'VueJS', 'Elixir', 'NextJS', 'Spacy']}
          selectedOptions={technologyFilter}
          onChange={handleTechnologyFilterChange}
          isOpen={isTechnologyDropdownOpen}
          onOutsideClick={() => setIsTechnologyDropdownOpen(false)}
        />
      </div>

      {isMobile ? (
        <Slider key={theme} {...settings}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
              isExpanded={expandedProject === project}
              onExpand={() => setExpandedProject(expandedProject === project ? null : project)}
              theme={theme}
            />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
              isExpanded={expandedProject === project}
              onExpand={() => setExpandedProject(expandedProject === project ? null : project)}
            />
          ))}
        </div>
      )}

      {selectedProject && (
        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
          <ProjectModalContent project={selectedProject} />
        </Modal>
      )}
    </>
  );
};

const ProjectCard = ({ project, onClick, isExpanded, onExpand , theme}) => (
  <motion.div
    className="p-4 rounded-lg shadow-lg overflow-hidden cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onExpand}
  >
    <Image width={640} height={360} src={project.screenshot} alt={project.name} className="object-cover h-32 w-full" />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
      <p className="mb-4">{isExpanded ? project.longDescription : project.shortDescription}</p>
      {isExpanded && (
        <>
          <div className="flex flex-row flex-wrap mb-2">
            {project.technologiesUsed.map((tech, index) => (
              <div key={index} className={`m-1 p-2 ${theme === 'dark' ?  'bg-gray-800 text-white' :'bg-gray-200  text-gray-700' } rounded`}>
                {tech}
              </div>
            ))}
          </div>
          <div className={`p-2 ${theme === 'dark' ?  'bg-gray-800 text-white' :'bg-gray-200  text-gray-700' } rounded mb-2`}>
            Type: {project.type}
          </div>
        </>
      )}
      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
    </div>
  </motion.div>
);


const ProjectModalContent = ({ project }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Image width={960} height={540} src={project.screenshots[1] || project.screenshot} alt={project.name} className="rounded-lg mb-4 w-full h-auto" />
    <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
    <p className="mb-4">{project.longDescription}</p>
    {/* Additional project details can be added here */}
  </motion.div>
);
const ArrowStyle = {
  fontSize: '24px',
  zIndex: 25,
  color: `rgb(var(--arrow-color))`, 
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, ...ArrowStyle }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, ...ArrowStyle }}
      onClick={onClick}
    />
  );
};



export default Projects;
