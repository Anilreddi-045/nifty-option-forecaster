
import ProfileHeader from "@/components/ProfileHeader";
import MainLayout from "@/components/layout/MainLayout";
import FeaturedCasesSection from "@/components/home/FeaturedCasesSection";
import PracticeAreas from "@/components/home/PracticeAreas";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <MainLayout>
      <div className="relative mb-16 -mt-12 pb-12 pt-20 bg-gradient-to-r from-primary/10 to-secondary/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4">
          <ProfileHeader />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fighting for Fair Justice</h2>
              <p className="text-gray-700 mb-6">With over 5 years of experience in the legal field, I am dedicated to providing exceptional legal representation for clients throughout Andhra Pradesh. My approach combines thorough legal knowledge, strategic thinking, and a deep commitment to justice.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <h3 className="text-3xl font-bold text-primary">50+</h3>
                  <p className="text-sm text-gray-600">Cases Won</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <h3 className="text-3xl font-bold text-primary">5+</h3>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Justice scales and legal books" 
                className="rounded-lg shadow-md w-full"
              />
              <div className="absolute top-4 right-4 w-16 h-16 opacity-80">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="Emblem of India - Four Lions Symbol" 
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        <FeaturedCasesSection />
        <PracticeAreas />
        
        <section className="mt-16 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Client Testimonials</h2>
          <Testimonials />
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
