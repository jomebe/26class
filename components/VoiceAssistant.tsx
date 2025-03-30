import React from 'react';
import { motion } from 'framer-motion';

interface VoiceAssistantProps {
  studentMood?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ studentMood = 'neutral' }) => {
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [conversationLog, setConversationLog] = React.useState<{type: 'user' | 'assistant', text: string}[]>([]);
  
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  
  // Common class-related questions and answers
  const qaDatabase = {
    '시간표': '오늘 시간표는 1교시 국어, 2교시 수학, 3교시 영어, 4교시 과학, 5교시 사회, 6교시 체육입니다.',
    '급식': '오늘 점심 메뉴는 김치찌개, 잡곡밥, 멸치볶음, 깍두기, 과일입니다.',
    '일정': '이번 주 주요 일정은 수요일 영어 퀴즈, 금요일 코딩 콘테스트가 있습니다.',
    '숙제': '오늘의 숙제는 수학 교과서 42페이지 1-5번, 영어 단어 40개 외우기입니다.',
    '담임': '6반 담임선생님은 홍길동 선생님이시며, 상담은 매일 점심시간에 가능합니다.',
    '시험': '중간고사는 4월 15일부터 19일까지 예정되어 있습니다.',
    '학급회비': '현재 학급회비 잔액은 235,000원입니다.',
    '청소': '오늘 청소 담당은 1모둠입니다. 창틀과 책상 정리 부탁드립니다.',
    '자리': '다음 주 월요일부터 새로운 자리 배치가 시작됩니다.',
    '동아리': '동아리 신청은 이번 주 금요일까지입니다. 신청서는 교무실에 제출하세요.',
  };
  
  React.useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ko-KR';
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          handleUserInput(transcript);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
    } else {
      setTranscript('');
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      setIsListening(true);
    }
  };
  
  const handleUserInput = (input: string) => {
    setLoading(true);
    
    // Add user message to conversation
    setConversationLog(prev => [...prev, { type: 'user', text: input }]);
    
    // Process the query and generate response
    setTimeout(() => {
      let foundResponse = '죄송합니다, 그 질문에 대한 답을 찾을 수 없습니다.';
      
      // Check for keywords in the question
      Object.entries(qaDatabase).forEach(([keyword, answer]) => {
        if (input.includes(keyword)) {
          foundResponse = answer;
        }
      });
      
      // Check for additional context specific questions
      if (input.includes('기분') || input.includes('분위기')) {
        foundResponse = `현재 학급의 분위기는 ${studentMood === 'happy' ? '밝고 활기찬' : 
          studentMood === 'sad' ? '다소 침체된' : 
          studentMood === 'angry' ? '약간 불안정한' : 
          '평온한'} 상태입니다.`;
      } else if (input.includes('안녕') || input.includes('반가워')) {
        foundResponse = '안녕하세요! 6반 AI 어시스턴트입니다. 무엇을 도와드릴까요?';
      } else if (input.includes('고마워') || input.includes('감사')) {
        foundResponse = '도움이 되어 기쁩니다. 다른 질문이 있으시면 언제든지 물어보세요!';
      }
      
      setResponse(foundResponse);
      setConversationLog(prev => [...prev, { type: 'assistant', text: foundResponse }]);
      setLoading(false);
      
      // Text-to-speech for the response
      speak(foundResponse);
    }, 1000);
  };
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      handleUserInput(transcript);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">6반 AI 음성 어시스턴트</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-[400px] overflow-y-auto">
            {conversationLog.length > 0 ? (
              <div className="space-y-4">
                {conversationLog.map((message, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-sunrin-blue text-white ml-auto' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-200 dark:bg-gray-600 max-w-[80%]">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p className="text-center">
                  안녕하세요! 6반 AI 어시스턴트입니다.<br />
                  시간표, 급식, 일정 등에 대해 물어보세요.
                </p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleManualSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunrin-blue"
              placeholder="질문을 입력하거나 마이크 버튼을 눌러 말해보세요..."
            />
            <button 
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-lg ${
                isListening 
                  ? 'bg-red-500 text-white' 
                  : 'bg-sunrin-blue text-white'
              }`}
            >
              {isListening ? (
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse mr-2"></span>
                  듣는 중...
                </span>
              ) : (
                '🎤'
              )}
            </button>
            <button 
              type="submit"
              className="bg-sunrin-blue text-white p-2 rounded-lg"
            >
              전송
            </button>
          </form>
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-full">
            <h3 className="font-bold mb-3 border-b pb-2">자주 묻는 질문</h3>
            
            <ul className="space-y-2">
              {Object.keys(qaDatabase).map((keyword, index) => (
                <li 
                  key={index} 
                  className="p-2 bg-gray-200 dark:bg-gray-600 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  onClick={() => handleUserInput(`${keyword}이 뭐야?`)}
                >
                  {keyword} 정보
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-2 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                * 음성 인식은 Chrome 브라우저에서 가장 잘 작동합니다.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                * 마이크 사용 권한을 허용해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant; 