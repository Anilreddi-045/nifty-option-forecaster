
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, UserCircle, Award, BookOpen, MessageSquare } from "lucide-react";

const About = () => {
  // Education data
  const education = [
    {
      degree: "Juris Doctor",
      institution: "Harvard Law School",
      year: "2005-2008",
      honors: "Magna Cum Laude"
    },
    {
      degree: "Bachelor of Arts, Political Science",
      institution: "Yale University",
      year: "2001-2005",
      honors: "Summa Cum Laude"
    }
  ];
  
  // Professional experience
  const experience = [
    {
      position: "Senior Partner",
      company: "Smith & Associates Law Firm",
      period: "2018-Present",
      description: "Leading the corporate litigation and property law departments, managing a team of 8 associates, and handling high-profile cases for Fortune 500 clients."
    },
    {
      position: "Partner",
      company: "Johnson, Williams & Partners",
      period: "2012-2018",
      description: "Specialized in complex civil litigation and corporate law, with a focus on intellectual property disputes and contract negotiations."
    },
    {
      position: "Associate Attorney",
      company: "Global Legal Advisors",
      period: "2008-2012",
      description: "Worked on various corporate and civil cases under the mentorship of senior partners, developing expertise in contract law and commercial disputes."
    }
  ];
  
  // Professional certifications
  const certifications = [
    "Certified Mediator, National Mediation Board",
    "Board Certified in Civil Trial Law",
    "Certified Corporate Law Specialist"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">Advocate Profile</Link>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/cases" className="text-gray-600 hover:text-gray-900">Cases</Link>
              <Link to="/about" className="text-primary font-medium">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <div className="bg-gray-200 rounded-full p-6 w-40 h-40 flex items-center justify-center">
              <UserCircle className="w-28 h-28 text-gray-500" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About John Smith, Esq.</h1>
              <p className="text-xl text-gray-600 mt-2">Senior Legal Counsel</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">Corporate Law</Badge>
                <Badge variant="secondary">Civil Litigation</Badge>
                <Badge variant="secondary">Property Law</Badge>
                <Badge variant="secondary">Contract Negotiation</Badge>
                <Badge variant="secondary">Administrative Law</Badge>
              </div>
              
              <p className="mt-6 text-gray-700">
                I am a dedicated legal professional with over 15 years of experience in various aspects of law. 
                My practice focuses on providing comprehensive legal solutions to complex problems, always 
                with a client-centered approach and commitment to achieving the best possible outcomes.
              </p>
              
              <p className="mt-4 text-gray-700">
                Throughout my career, I have successfully represented individuals, small businesses, 
                and large corporations in a wide range of legal matters. My approach combines thorough 
                legal knowledge with practical business acumen to deliver solutions that work in the 
                real world, not just on paper.
              </p>
            </div>
          </div>
          
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <BookOpen className="mr-2 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}, {edu.year}</p>
                    <Badge className="mt-2">{edu.honors}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <BriefcaseIcon className="mr-2 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Professional Experience</h2>
            </div>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between flex-wrap">
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <span className="text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{exp.company}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Award className="mr-2 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                        <Award size={14} />
                      </div>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <div className="flex items-center mb-6">
              <MessageSquare className="mr-2 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Professional Approach</h2>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  My legal philosophy centers on three core principles:
                </p>
                
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div>
                      <strong>Client-Centered Advocacy</strong>
                      <p className="text-gray-600 mt-1">
                        I believe in truly understanding each client's unique needs and circumstances to provide 
                        tailored legal solutions rather than one-size-fits-all approaches.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div>
                      <strong>Strategic Problem-Solving</strong>
                      <p className="text-gray-600 mt-1">
                        Legal challenges require not just knowledge of the law but strategic thinking. I focus on 
                        identifying the most effective path to achieve my clients' goals.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div>
                      <strong>Ethical Practice</strong>
                      <p className="text-gray-600 mt-1">
                        I maintain the highest ethical standards in all aspects of my practice, 
                        prioritizing integrity, transparency, and honesty in client relationships.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Advocate Profile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
