import MainLayout from "@/components/layout/MainLayout";

const Cases = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Case Archive</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This would typically fetch and display all cases */}
          {/* For now, we'll assume this content would be implemented later */}
          <div className="p-8 text-center text-gray-500 border border-dashed rounded-lg">
            Case listing content would go here
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cases;
