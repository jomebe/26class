import ServiceCard from "@/components/ServiceCard";
import { services, categories } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      {/* 서비스 페이지 헤더 */}
      <div className="bg-gradient-to-r from-sunrin-blue to-sunrin-green text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">서비스 목록</h1>
          <p className="text-xl">선린인터넷고등학교 2학년 6반의 모든 서비스를 만나보세요.</p>
        </div>
      </div>

      {/* 모든 서비스 목록 */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">전체 서비스</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
              name={service.name}
              path={service.path}
              icon={service.icon}
              description={service.description}
            />
          ))}
        </div>
      </div>

      {/* 카테고리별 서비스 */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">카테고리별 서비스</h2>
          
          {categories.map((category) => (
            <div key={category.id} className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-sunrin-blue border-l-4 border-sunrin-blue pl-4">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {category.services.map((serviceId) => {
                  const service = services.find(s => s.id === serviceId);
                  if (!service) return null;
                  return (
                    <ServiceCard 
                      key={service.id}
                      id={service.id}
                      name={service.name}
                      path={service.path}
                      icon={service.icon}
                      description={service.description}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 