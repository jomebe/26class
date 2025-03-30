import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import FaceRecognition from '../components/FaceRecognition';

const AttendancePage = () => {
  const [studentMood, setStudentMood] = React.useState<string>('');
  
  const handleMoodDetection = (mood: string) => {
    setStudentMood(mood);
  };
  
  return (
    <Layout title="출석체크 - 선린인터넷고등학교 2학년 6반">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-sunrin-blue">AI 얼굴 인식</span> 출석체크 시스템
          </h1>
          
          <p className="text-lg mb-8">
            최첨단 AI 기술로 얼굴을 인식하여 빠르고 정확하게 출석을 체크합니다. 
            카메라를 향해 바라보고 잠시만 기다리면 자동으로 인식됩니다.
          </p>
          
          <FaceRecognition onMoodDetect={handleMoodDetection} />
          
          {studentMood && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-sunrin-light dark:bg-gray-700 rounded-lg"
            >
              <h3 className="font-bold mb-2">분위기 감지 결과</h3>
              <p>
                현재 전체 학생들의 분위기: <span className="font-medium">{getMoodEmoji(studentMood)} {getMoodLabel(studentMood)}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                * AI가 분석한 전체적인 학급 분위기입니다. 학습 환경 개선에 참고해주세요.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

// Helper functions for mood display
const getMoodEmoji = (mood: string): string => {
  const moods: Record<string, string> = {
    happy: '😊',
    sad: '😔',
    angry: '😠',
    surprised: '😲',
    neutral: '😐',
    disgusted: '🤢',
    fearful: '😨'
  };
  
  return moods[mood] || '🤔';
};

const getMoodLabel = (mood: string): string => {
  const labels: Record<string, string> = {
    happy: '밝은 분위기',
    sad: '침체된 분위기',
    angry: '짜증난 분위기',
    surprised: '놀란 분위기',
    neutral: '평온한 분위기',
    disgusted: '불쾌한 분위기',
    fearful: '불안한 분위기'
  };
  
  return labels[mood] || '알 수 없는 분위기';
};

export default AttendancePage; 