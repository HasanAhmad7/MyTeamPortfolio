import Image from "next/image";
import Hero from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics",
    category: "Machine Learning",
    description: "A comprehensive analytics platform leveraging machine learning to provide real-time insights.",
    tags: ["React", "Python", "TensorFlow"],
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    title: "Cloud Infrastructure",
    category: "DevOps",
    description: "Scalable cloud infrastructure solution for enterprise applications.",
    tags: ["Kubernetes", "Docker", "AWS"],
    color: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    title: "Real-time Chat App",
    category: "Web Development",
    description: "Full-stack real-time messaging application with WebSocket support.",
    tags: ["Node.js", "React", "WebSocket"],
    color: "from-green-600 to-emerald-500",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
