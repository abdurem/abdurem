const Contact = () => {
  return (
    <section id="contact" className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-lg">Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-lg">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-lg">Message</label>
          <textarea className="w-full p-2 border border-gray-300 rounded"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
      </form>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">📫 Get in Touch</h3>
        <ul className="list-disc list-inside">
          <li><strong>GitHub:</strong> <a href="your_github_link" className="text-blue-500">your_github_link</a></li>
          <li><strong>LinkedIn:</strong> <a href="your_linkedin_link" className="text-blue-500">your_linkedin_link</a></li>
          <li><strong>Email:</strong> <a href="mailto:your_email" className="text-blue-500">your_email</a></li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;