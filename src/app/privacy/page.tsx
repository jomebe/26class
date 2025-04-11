import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      {/* 개인정보처리방침 페이지 헤더 */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">개인정보처리방침</h1>
          <p className="text-xl">선린인터넷고등학교 2학년 6반 웹 서비스의 개인정보 보호 정책</p>
        </div>
      </div>

      {/* 개인정보처리방침 내용 */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              선린인터넷고등학교 2학년 6반(이하 "우리")은 이용자의 개인정보를 중요시하며, 개인정보보호법 및 관련 법령을 준수하고 있습니다. 
              우리는 개인정보처리방침을 통해 이용자에게 제공하는 서비스 이용에 있어 수집하는 개인정보의 항목, 수집 및 이용목적, 
              보유 및 이용기간, 제3자 제공 등에 관한 사항을 안내드리고 있습니다.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">1. 수집하는 개인정보 항목</h2>
            <p className="text-gray-700 mb-4">우리는 다음과 같은 개인정보를 수집하고 있습니다.</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>필수항목: 이름, 학번, 이메일 주소, 비밀번호</li>
              <li>선택항목: 프로필 이미지, 휴대폰 번호, 관심 분야</li>
              <li>자동 수집 항목: IP 주소, 접속 일시, 서비스 이용 기록</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">2. 개인정보의 수집 및 이용목적</h2>
            <p className="text-gray-700 mb-4">수집한 개인정보는 다음의 목적을 위해 이용됩니다.</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정이용 방지와 비인가 사용 방지, 가입의사 확인, 연령확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달</li>
              <li>서비스 제공: 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공</li>
              <li>통계 및 분석: 접속빈도 파악, 회원의 서비스 이용에 대한 통계</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">3. 개인정보의 보유 및 이용기간</h2>
            <p className="text-gray-700 mb-4">
              이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 
              단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>보존 항목: 이름, 학번, 이메일 주소, 서비스 이용 기록</li>
              <li>보존 근거: 서비스 이용의 혼선 방지, 분쟁 해결 및 민원처리</li>
              <li>보존 기간: 회원 탈퇴 후 1년</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">4. 개인정보의 파기</h2>
            <p className="text-gray-700 mb-4">
              우리는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 
              파기절차 및 방법은 다음과 같습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</li>
              <li>파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">5. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 mb-4">
              우리는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>이용자들이 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">6. 이용자의 권리와 행사 방법</h2>
            <p className="text-gray-700 mb-4">
              이용자는 개인정보 조회, 수정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.
              이를 위해서는 서비스 내 '내 계정' 메뉴를 이용하시거나, 개인정보 관리책임자에게 서면, 전화 또는 이메일로 연락하시면 
              지체 없이 조치하겠습니다.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">7. 개인정보의 안전성 확보 조치</h2>
            <p className="text-gray-700 mb-4">
              우리는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>개인정보 암호화: 이용자의 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</li>
              <li>해킹 등에 대비한 기술적 대책: 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신/점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</li>
              <li>개인정보에 대한 접근 제한: 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">8. 개인정보 관리책임자</h2>
            <p className="text-gray-700 mb-4">
              우리는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 
              피해구제 등을 위하여 아래와 같이 개인정보 관리책임자를 지정하고 있습니다.
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="font-medium text-gray-800">▶ 개인정보 관리책임자</p>
              <p className="text-gray-700">성명: 홍길동</p>
              <p className="text-gray-700">직위: 담당 교사</p>
              <p className="text-gray-700">연락처: privacy@sunrin.hs.kr</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">9. 개인정보처리방침 변경</h2>
            <p className="text-gray-700 mb-4">
              이 개인정보처리방침은 2024년 4월 11일부터 적용됩니다. 
              법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 
              공지사항을 통하여 고지할 것입니다.
            </p>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="bg-sunrin-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition inline-block"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 