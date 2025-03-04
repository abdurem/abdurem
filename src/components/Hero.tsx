const Hero = () => {
  return (
    <section className="bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm X, a Fullstack Developer specializing in AI & Backend 🚀</h1>
        <p className="text-xl">Showcasing my work and projects</p>
        <img src="/path/to/your/photo.jpg" alt="Your Photo" className="rounded-full w-32 h-32 mt-4 mx-auto" />
        <div className="mt-4">
          <a href="#projects" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View My Work</a>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="/path/to/your-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-block mx-2">
            <img src="/path/to/resume-icon.svg" alt="Resume" className="w-8 h-8" />
          </a>
          <a href="https://github.com/abdurem" target="_blank" rel="noopener noreferrer" className="inline-block mx-2">
            <img src="/path/to/github-icon.svg" alt="GitHub" className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com/in/abdurehmanmustefa" target="_blank" rel="noopener noreferrer" className="inline-block mx-2">
            <img src="/path/to/linkedin-icon.svg" alt="LinkedIn" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;