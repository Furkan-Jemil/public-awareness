const CommunityGallerySection = () => {
  return (
    <section className="py-24 px-6 lg:px-20 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">FIX RESULTS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
              Fixed Road
            </div>
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
              Community Garden
            </div>
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
              Repaired Bench
            </div>
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
              Fixed Street Light
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityGallerySection;