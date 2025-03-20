
import ProfileHeader from "@/components/ProfileHeader";
import MainLayout from "@/components/layout/MainLayout";
import FeaturedCasesSection from "@/components/home/FeaturedCasesSection";
import PracticeAreas from "@/components/home/PracticeAreas";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <MainLayout>
      <ProfileHeader />
      <FeaturedCasesSection />
      <PracticeAreas />
      
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Client Testimonials</h2>
        <Testimonials />
      </section>
    </MainLayout>
  );
};

export default Index;
