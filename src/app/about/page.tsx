import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* 소개 페이지 헤더 */}
      <div className="bg-gradient-to-r from-sunrin-blue to-sunrin-red text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">선린인터넷고등학교 2학년 6반 소개</h1>
          <p className="text-xl">혁신적인 IT 인재들이 모인 선린인터넷고등학교 2학년 6반</p>
        </div>
      </div>

      {/* 학교 및 반 소개 */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-sunrin-blue">우리 반 소개</h2>
          
          <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">선린인터넷고등학교</h3>
            <p className="text-gray-700 mb-6">
              선린인터넷고등학교는 1938년에 설립된 역사와 전통이 있는 학교로, 
              대한민국 IT 분야의 인재 양성에 중점을 두고 있는 특성화 고등학교입니다. 
              정보통신, 소프트웨어, 콘텐츠 등 다양한 분야의 특화된 교육과정을 제공하고 있으며, 
              많은 IT 기업들과 협력하여 실무 중심의 교육을 진행하고 있습니다.
            </p>
            <p className="text-gray-700">
              선린인터넷고등학교는 '창의', '협동', '봉사'의 교훈 아래 미래 정보통신 분야의 
              리더를 양성하기 위해 노력하고 있습니다.
            </p>
          </div>
          
          <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">2학년 6반</h3>
            <p className="text-gray-700 mb-6">
              선린인터넷고등학교 2학년 6반은 웹 프로그래밍과 앱 개발에 특화된 클래스입니다. 
              학생들은 HTML, CSS, JavaScript부터 React, Next.js와 같은 최신 프레임워크까지 
              배우고 있으며, 실제 프로젝트를 통해 실무 경험을 쌓고 있습니다.
            </p>
            <p className="text-gray-700 mb-6">
              우리 반의 학생들은 각자의 개성과 재능을 살려 다양한 분야에서 활약하고 있으며, 
              팀 프로젝트를 통해 협업 능력을 기르고 있습니다. 친구들과 함께 성장하는 과정에서 
              서로에게 긍정적인 자극을 주고 받으며 발전하고 있습니다.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-sunrin-blue mb-1">30</div>
                <div className="text-gray-600 text-sm">학생 수</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-sunrin-green mb-1">15+</div>
                <div className="text-gray-600 text-sm">수상 실적</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-sunrin-red mb-1">30+</div>
                <div className="text-gray-600 text-sm">웹 서비스</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-700 mb-1">100%</div>
                <div className="text-gray-600 text-sm">참여율</div>
              </div>
            </div>
            <p className="text-gray-700">
              우리 반의 모토는 "함께 성장하고, 함께 나아가자"입니다. 서로를 존중하고 배려하는 
              문화 속에서 IT 분야의 미래 인재로 성장하고 있습니다.
            </p>
          </div>
          
          <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">통합 웹 서비스 프로젝트</h3>
            <p className="text-gray-700 mb-6">
              이 웹사이트는 선린인터넷고등학교 2학년 6반 학생들의 협업으로 만들어진 통합 웹 서비스입니다. 
              학교 생활에 필요한 다양한 서비스를 한 곳에서 편리하게 이용할 수 있도록 기획되었으며, 
              학생들의 아이디어와 창의성이 담겨 있습니다.
            </p>
            <p className="text-gray-700 mb-6">
              총 30개의 다양한 서비스를 제공하고 있으며, 각 서비스는 학생들의 필요에 맞게 개발되었습니다. 
              당근마켓, 야구 스코어, 환율 계산기, 채팅 시스템 등 다양한 서비스를 통해 학생들의 생활을 
              더욱 편리하게 만들어주고 있습니다.
            </p>
            <p className="text-gray-700">
              우리의 목표는 이 프로젝트를 통해 실무 역량을 기르고, 함께 협업하는 방법을 배우며, 
              학교 생활을 더욱 풍요롭게 만드는 것입니다.
            </p>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/services" 
              className="bg-sunrin-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition inline-block mr-4"
            >
              서비스 둘러보기
            </Link>
            <Link 
              href="/contact" 
              className="bg-sunrin-green text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition inline-block"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 