import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import VoiceAssistant from '../components/VoiceAssistant';

const AssistantPage = () => {
  return (
    <Layout title="AI 어시스턴트 - 선린인터넷고등학교 2학년 6반">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-sunrin-blue">6반 전용</span> AI 음성 어시스턴트
          </h1>
          
          <p className="text-lg mb-8">
            6반만의 정보를 알고 있는 AI 어시스턴트입니다. 
            시간표, 급식, 일정, 숙제 등 궁금한 것을 물어보세요!
          </p>
          
          <VoiceAssistant />
          
          <div className="mt-12 bg-sunrin-light dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">활용 Tip</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium">전체 기능:</span> 시간표, 급식, 일정, 숙제, 담임, 시험, 학급회비, 청소, 자리, 동아리 관련 질문을 할 수 있어요.
              </li>
              <li>
                <span className="font-medium">마이크 사용:</span> 크롬 브라우저에서 마이크 버튼을 누르고 질문해보세요. 자동으로 인식하고 답변합니다.
              </li>
              <li>
                <span className="font-medium">텍스트 입력:</span> 마이크가 없어도 텍스트로 질문할 수 있어요.
              </li>
              <li>
                <span className="font-medium">퀵 메뉴:</span> 오른쪽의 자주 묻는 질문 목록을 클릭하면 바로 답변을 들을 수 있어요.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AssistantPage; 