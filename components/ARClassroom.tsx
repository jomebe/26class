import React from 'react';
import { motion } from 'framer-motion';

const ARClassroom: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedObject, setSelectedObject] = React.useState<string | null>(null);
  const [showInfo, setShowInfo] = React.useState(false);
  
  // Simulated classroom objects that would be interactive in a real AR environment
  const classroomObjects = [
    { id: 'desk', name: '책상', description: '학생들이 사용하는 책상입니다. 조절 가능한 높이와 수납공간을 갖추고 있습니다.' },
    { id: 'chair', name: '의자', description: '학생들이 사용하는 의자입니다. 인체공학적 설계로 장시간 앉아있어도 편안합니다.' },
    { id: 'smartboard', name: '스마트보드', description: '최신 기술이 적용된 전자칠판입니다. 터치 인식과 인터넷 연결 기능을 갖추고 있습니다.' },
    { id: 'locker', name: '사물함', description: '학생들의 개인 물품을 보관하는 사물함입니다. 각자 자신의 사물함을 배정받습니다.' },
    { id: 'window', name: '창문', description: '교실의 환기와 채광을 담당하는 창문입니다. 이중 창으로 소음 차단 효과가 있습니다.' },
    { id: 'teacher-desk', name: '교사용 책상', description: '교사가 사용하는 책상입니다. 컴퓨터와 교재 등을 보관할 수 있습니다.' }
  ];
  
  React.useEffect(() => {
    // Simulate loading AR resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleObjectClick = (objectId: string) => {
    setSelectedObject(objectId);
    setShowInfo(true);
  };
  
  const closeInfo = () => {
    setShowInfo(false);
    setTimeout(() => setSelectedObject(null), 300);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">AR 교실 체험</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <div className="w-16 h-16 border-4 border-sunrin-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">AR 리소스를 불러오는 중...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">이 기능은 실제 AR 환경에서 가장 효과적으로 체험할 수 있습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 relative">
            <div className="bg-gray-900 rounded-lg overflow-hidden relative h-[500px]">
              {/* This would be replaced with actual AR/3D viewing in a production environment */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/classroom-placeholder.jpg" 
                  alt="교실 AR 체험" 
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Interactive hotspots would be placed based on actual 3D coordinates */}
                {classroomObjects.map((object, index) => (
                  <motion.div
                    key={object.id}
                    className={`absolute cursor-pointer ${
                      selectedObject === object.id ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      top: `${20 + index * 10}%`,
                      left: `${15 + (index % 3) * 30}%`,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleObjectClick(object.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedObject === object.id 
                        ? 'bg-sunrin-gold text-white' 
                        : 'bg-white text-sunrin-blue'
                    }`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* AR Instructions overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg text-sm">
                <p>
                  <span className="font-bold">AR 안내:</span> 실제 AR 환경에서는 카메라를 통해 교실을 비추면 
                  3D 객체가 실제 공간에 배치됩니다. 각 객체를 탭하여 정보를 확인하세요.
                </p>
              </div>
            </div>
            
            {/* Information popup for selected object */}
            {showInfo && selectedObject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl z-30 max-w-md"
              >
                <button 
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={closeInfo}
                >
                  ✕
                </button>
                
                <h3 className="text-xl font-bold mb-2">
                  {classroomObjects.find(obj => obj.id === selectedObject)?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classroomObjects.find(obj => obj.id === selectedObject)?.description}
                </p>
              </motion.div>
            )}
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-full">
              <h3 className="font-bold mb-3 border-b pb-2">교실 구성요소</h3>
              
              <ul className="space-y-3 max-h-[400px] overflow-y-auto">
                {classroomObjects.map((object, index) => (
                  <li 
                    key={object.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedObject === object.id
                        ? 'bg-sunrin-blue text-white'
                        : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                    onClick={() => handleObjectClick(object.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-white text-sunrin-blue flex items-center justify-center mr-3">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{object.name}</h4>
                        <p className={`text-sm ${selectedObject === object.id ? 'text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                          클릭하여 상세 정보 보기
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-2 border-t">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  * 실제 AR 체험은 스마트폰 또는 AR 글래스를 통해 보다 실감나게 제공됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARClassroom; 