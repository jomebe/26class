import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      {/* 메인 배너 */}
      <div className="bg-gradient-to-r from-sunrin-blue via-sunrin-green to-sunrin-red text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">선린인터넷고등학교 2학년 6반 통합 서비스</h2>
          <p className="text-xl mb-8">모든 서비스를 한 곳에서 간편하게 이용하세요.</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/services" 
              className="bg-white text-sunrin-blue px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
            >
              서비스 둘러보기
            </Link>
            <Link 
              href="/register" 
              className="bg-sunrin-green text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>

      {/* 서비스 목록 */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">인기 서비스</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
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
        
        <div className="mt-10 text-center">
          <Link 
            href="/services" 
            className="bg-sunrin-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition inline-block"
          >
            모든 서비스 보기
          </Link>
        </div>
      </div>
      
      {/* 소개 섹션 */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-sunrin-blue">선린인터넷고등학교 2학년 6반</h2>
              <p className="text-gray-700 mb-6">
                선린인터넷고등학교 2학년 6반은 IT 분야의 미래 인재들이 모인 곳입니다. 
                우리 반의 웹 통합 서비스는 학생들의 실력 향상과 편의를 위해 다양한 기능을 제공합니다.
              </p>
              <Link 
                href="/about" 
                className="text-sunrin-blue font-bold hover:underline"
              >
                더 알아보기 &rarr;
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sunrin-blue text-white p-6 rounded-lg">
                  <div className="text-3xl mb-2">30+</div>
                  <p>웹 서비스</p>
                </div>
                <div className="bg-sunrin-green text-white p-6 rounded-lg">
                  <div className="text-3xl mb-2">24/7</div>
                  <p>지원 서비스</p>
                </div>
                <div className="bg-sunrin-red text-white p-6 rounded-lg">
                  <div className="text-3xl mb-2">100%</div>
                  <p>학생 참여</p>
                </div>
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <div className="text-3xl mb-2">1000+</div>
                  <p>일일 사용자</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
