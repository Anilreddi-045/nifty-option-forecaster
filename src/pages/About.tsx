
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Adv. Rama Kanth Reddy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            With extensive experience in various areas of law, my practice has established a reputation for excellence, integrity, and client-focused representation in Kurnool and across Andhra Pradesh.
          </p>
          
          <h2>My Philosophy</h2>
          <p>
            I believe that effective legal representation begins with understanding my clients' unique needs and objectives. Every case is approached with meticulous attention to detail and a commitment to achieving the best possible outcome.
          </p>
          
          <h2>My Expertise</h2>
          <p>
            My practice specializes in criminal law, civil litigation, property law, and family law. I have successfully represented clients in complex legal matters across multiple courts in Andhra Pradesh, establishing precedents and securing favorable outcomes.
          </p>
          
          <h2>My Approach</h2>
          <p>
            I combine thorough legal knowledge with strategic thinking to navigate complex legal challenges. My approach is both pragmatic and innovative, ensuring that I find effective solutions to even the most difficult legal problems.
          </p>
          
          <h2>Professional Background</h2>
          <p>
            After graduating with honors from a prestigious law university, I began my career at the Kurnool Court, where I have built a strong reputation for ethical practice and legal excellence. I regularly participate in legal education programs and stay updated with the latest developments in Indian law.
          </p>
          
          <h2>Community Involvement</h2>
          <p>
            I am committed to giving back to the community through pro bono work and involvement in local legal aid initiatives. I believe that access to quality legal representation should be available to all, regardless of financial circumstances.
          </p>
        </div>
        
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Schedule a Consultation</h3>
          <p className="mb-4">
            Interested in learning more about how I can assist with your legal needs? Contact me today to schedule a consultation.
          </p>
          <Button 
            onClick={() => navigate('/contact')} 
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
