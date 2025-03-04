import ProjectCard from './ProjectCard';
import projects from '../data/projects.json';

const Projects = () => {
  return (
    <section id="projects" className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      {Object.keys(projects).map((type, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{type}</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {projects[type].map((project, index) => (
              <ProjectCard key={index} title={project.title} description={project.description} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;