import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import AIStudyBuddy from '../components/AIStudyBuddy';

const StudyPage = () => {
  return (
    <Layout title="AI 학습 도우미 - 선린인터넷고등학교 2학년 6반">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-sunrin-blue">맞춤형</span> AI 학습 도우미
          </h1>
          
          <p className="text-lg mb-8">
            학습 스타일과 진도에 맞춘 개인화된 학습 콘텐츠와 퀴즈를 제공합니다.
            주제를 선택하고 학습을 시작해보세요!
          </p>
          
          <AIStudyBuddy />
          
          <div className="mt-12 bg-sunrin-light dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">학습 도우미 활용법</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium">주제 선택:</span> 관심 있는 학습 주제를 선택하면 AI가 개인화된 학습 콘텐츠를 제공합니다.
              </li>
              <li>
                <span className="font-medium">개념 학습:</span> 주요 개념과 이론을 이해하기 쉽게 설명한 콘텐츠를 학습합니다.
              </li>
              <li>
                <span className="font-medium">퀴즈 풀기:</span> 학습한 내용을 퀴즈로 복습하고 이해도를 테스트합니다.
              </li>
              <li>
                <span className="font-medium">진행 관리:</span> 완료한 주제는 자동으로 기록되어 학습 진행 상황을 쉽게 확인할 수 있습니다.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default StudyPage; 