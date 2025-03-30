import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ARClassroom from '../components/ARClassroom';

const ARPage = () => {
  return (
    <Layout title="AR 교실 체험 - 선린인터넷고등학교 2학년 6반">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-sunrin-blue">증강현실</span> 교실 체험
          </h1>
          
          <p className="text-lg mb-8">
            증강현실(AR) 기술을 활용하여 교실의 다양한 구성요소를 인터랙티브하게 탐색해보세요.
            실제 교실 환경에서 더욱 생생한 체험이 가능합니다.
          </p>
          
          <ARClassroom />
          
          <div className="mt-12 bg-sunrin-light dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">AR 체험 가이드</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium">AR 모드 활성화:</span> 스마트폰이나 태블릿에서 접속 시 카메라 권한을 허용하여 실제 공간에 교실 객체를 배치해보세요.
              </li>
              <li>
                <span className="font-medium">인터랙션:</span> 각 객체를 탭하면 상세 정보와 특징을 확인할 수 있습니다.
              </li>
              <li>
                <span className="font-medium">학습 활용:</span> 교실 환경에 대한 이해를 높이고 공간 구성에 대해 학습해보세요.
              </li>
              <li>
                <span className="font-medium">확장 기능:</span> 실제 AR 글래스와 연동 시 더욱 몰입감 있는 체험이 가능합니다.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ARPage; 