import MainLayout from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Our Practice</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            With over 15 years of experience in various areas of law, our practice has established a reputation for excellence, integrity, and client-focused representation.
          </p>
          
          <h2>Our Philosophy</h2>
          <p>
            We believe that effective legal representation begins with understanding our clients' unique needs and objectives. Every case is approached with meticulous attention to detail and a commitment to achieving the best possible outcome.
          </p>
          
          <h2>Our Expertise</h2>
          <p>
            Our team specializes in corporate law, civil litigation, and property law. We have successfully represented clients in complex legal matters across multiple jurisdictions, establishing precedents and securing favorable outcomes.
          </p>
          
          <h2>Our Approach</h2>
          <p>
            We combine thorough legal knowledge with strategic thinking to navigate complex legal challenges. Our approach is both pragmatic and innovative, ensuring that we find effective solutions to even the most difficult legal problems.
          </p>
          
          <h2>Professional Background</h2>
          <p>
            Our lead attorney graduated with honors from Harvard Law School and has been recognized by numerous legal organizations for contributions to the field. Prior to founding this practice, they served as a judicial clerk and worked at one of the nation's top law firms.
          </p>
          
          <h2>Community Involvement</h2>
          <p>
            We are committed to giving back to our community through pro bono work and involvement in local legal aid initiatives. We believe that access to quality legal representation should be available to all, regardless of financial circumstances.
          </p>
        </div>
        
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Schedule a Consultation</h3>
          <p className="mb-4">
            Interested in learning more about how we can assist with your legal needs? Contact us today to schedule a consultation.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'} 
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
