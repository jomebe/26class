import React from 'react';
import { motion } from 'framer-motion';

interface FaceRecognitionProps {
  onMoodDetect?: (mood: string) => void;
}

interface Student {
  id: number;
  name: string;
  isPresent: boolean;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onMoodDetect }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [attendanceRecorded, setAttendanceRecorded] = React.useState<string[]>([]);
  const [recognizedName, setRecognizedName] = React.useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  // Mock student data - in a real app, this would come from a database
  const students: Student[] = [
    { id: 1, name: '김선린', isPresent: false },
    { id: 2, name: '이인터넷', isPresent: false },
    { id: 3, name: '박고등', isPresent: false },
    { id: 4, name: '최학교', isPresent: false },
    { id: 5, name: '정코딩', isPresent: false },
  ];

  React.useEffect(() => {
    // Simulate loading face recognition models
    const timer = setTimeout(() => {
      setIsLoading(false);
      startWebcam();
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      // Clean up video stream on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  
  const startWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }
  };
  
  const handleVideoPlay = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height
    };
    
    // In a real application, we would use face-api.js here
    // For demo purposes, we'll just simulate face detection
    
    const interval = setInterval(() => {
      simulateFaceRecognition();
      
      // Simulate mood detection for parent component
      if (onMoodDetect) {
        const moods = ['happy', 'sad', 'angry', 'surprised', 'neutral'];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        onMoodDetect(randomMood);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  };
  
  const simulateFaceRecognition = () => {
    // Randomly "recognize" a student sometimes
    if (Math.random() > 0.7 && students.length > 0) {
      const availableStudents = students.filter(
        student => !attendanceRecorded.includes(student.name)
      );
      
      if (availableStudents.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableStudents.length);
        const randomStudent = availableStudents[randomIndex].name;
        
        setAttendanceRecorded(prev => [...prev, randomStudent]);
        setRecognizedName(randomStudent);
        
        // Clear recognition message after a few seconds
        setTimeout(() => {
          setRecognizedName(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">얼굴 인식 출석 체크</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-sunrin-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>AI 모델을 불러오는 중...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-2/3">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="relative rounded-lg overflow-hidden border-2 border-sunrin-blue"
            >
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                autoPlay
                muted
                playsInline
                onPlay={handleVideoPlay}
                className="rounded-lg"
              />
              <canvas 
                ref={canvasRef} 
                className="absolute top-0 left-0 w-full h-full"
              />
              
              {recognizedName && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-0 right-0 bg-sunrin-blue text-white py-2 px-4 mx-4 rounded-lg text-center"
                >
                  <p className="font-bold">{recognizedName} 출석 확인!</p>
                </motion.div>
              )}
            </motion.div>
            
            <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              카메라를 향해 바라봐 주세요. 자동으로 얼굴을 인식합니다.
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-full">
              <h3 className="font-bold mb-3 border-b pb-2">출석 현황</h3>
              
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {students.map(student => (
                  <li 
                    key={student.id} 
                    className={`flex items-center justify-between p-2 rounded ${
                      attendanceRecorded.includes(student.name) 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span>{student.name}</span>
                    {attendanceRecorded.includes(student.name) ? (
                      <span className="text-green-600 dark:text-green-400">✓ 출석</span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">미출석</span>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-2 border-t">
                <p>출석 인원: {attendanceRecorded.length}/{students.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {new Date().toLocaleString('ko-KR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          * 데모 목적으로 만들어진 페이지입니다. 실제 얼굴 인식은 작동하지 않습니다.
        </p>
        <button 
          className="btn-primary"
          onClick={() => {
            // Simulate complete attendance for demo
            setAttendanceRecorded(students.map(s => s.name));
          }}
        >
          전체 출석 처리 (데모)
        </button>
      </div>
    </div>
  );
};

export default FaceRecognition; 