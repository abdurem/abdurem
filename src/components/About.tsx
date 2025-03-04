const About = () => {
  return (
    <section id="about" className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg">Hi, I'm X 👋</p>
      <p className="text-lg">I am a passionate <strong>Software Engineer</strong> specializing in <strong>Fullstack Development</strong>, with a strong focus on <strong>AI and Backend</strong>. I love building scalable and efficient solutions that leverage cutting-edge technologies.</p>
      <h3 className="text-2xl font-bold mt-6 mb-4">🔥 What I Do</h3>
      <ul className="list-disc list-inside">
        <li><strong>AI & Machine Learning:</strong> Developing intelligent systems that solve real-world problems.</li>
        <li><strong>Backend Development:</strong> Designing and building robust APIs and microservices.</li>
        <li><strong>Fullstack Engineering:</strong> Creating seamless user experiences from front to back.</li>
      </ul>
      <h3 className="text-2xl font-bold mt-6 mb-4">🛠️ Technologies & Tools</h3>
      <ul className="list-disc list-inside">
        <li><strong>Backend:</strong> Node.js, ASP.NET Core, Python, Django, FastAPI</li>
        <li><strong>Frontend:</strong> React, Next.js, Vue.js</li>
        <li><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</li>
        <li><strong>AI & ML:</strong> TensorFlow, OpenAI API, LangChain</li>
        <li><strong>DevOps:</strong> Docker, Kubernetes, Caddy, Nginx</li>
      </ul>
    </section>
  );
};

export default About;