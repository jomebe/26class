import React from 'react'
import { motion } from 'framer-motion'

interface Subject {
  id: string
  name: string
  difficulty: number
  topics: Array<{
    id: string
    name: string
    completed: boolean
  }>
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface TopicContent {
  title: string
  content: string
  completed: boolean
  quizQuestions: {
    question: string
    options: string[]
    correctAnswer: number
    explanation?: string
  }[]
}

const AIStudyBuddy: React.FC = () => {
  const [activeSubject, setActiveSubject] = React.useState<string | null>(null)
  const [activeTopic, setActiveTopic] = React.useState<string | null>(null)
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null)
  const [showExplanation, setShowExplanation] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [quizCompleted, setQuizCompleted] = React.useState(false)
  const [learningStyle, setLearningStyle] = React.useState<string>('visual')
  const [loading, setLoading] = React.useState(false)
  const [personalizedContent, setPersonalizedContent] = React.useState('')
  
  // Subjects data
  const subjects: Subject[] = [
    {
      id: 'math',
      name: '수학',
      difficulty: 4,
      topics: [
        { id: 'math-1', name: '미분과 적분', completed: false },
        { id: 'math-2', name: '벡터와 행렬', completed: false },
        { id: 'math-3', name: '확률과 통계', completed: false }
      ]
    },
    {
      id: 'programming',
      name: '프로그래밍',
      difficulty: 3,
      topics: [
        { id: 'prog-1', name: '알고리즘 기초', completed: true },
        { id: 'prog-2', name: '자료구조', completed: false },
        { id: 'prog-3', name: '웹 개발', completed: false }
      ]
    },
    {
      id: 'english',
      name: '영어',
      difficulty: 2,
      topics: [
        { id: 'eng-1', name: '독해', completed: true },
        { id: 'eng-2', name: '문법', completed: true },
        { id: 'eng-3', name: '작문', completed: false }
      ]
    }
  ]
  
  // Topics with personalized content
  const personalizedContents: Record<string, TopicContent> = {
    '수학': {
      title: '삼각함수의 그래프',
      content: `삼각함수의 그래프는 주기적인 패턴을 나타냅니다. 
      sin(x)의 그래프는 진폭이 1이고 주기가 2π인 파동 형태를 보입니다. 
      cos(x)는 sin(x)를 π/2만큼 왼쪽으로 이동한 것과 같으며, 
      tan(x)는 x = π/2 + nπ에서 정의되지 않는 특징이 있습니다.
      
      이러한 삼각함수의 성질을 이해하면 주기적인 현상을 모델링하는 데 큰 도움이 됩니다.
      물리학에서의 파동, 전기회로에서의 교류전압, 음향학에서의 소리 등 
      실생활의 많은 주기적 현상을 설명하는 데 삼각함수가 사용됩니다.`,
      completed: false,
      quizQuestions: [
        {
          question: 'sin(x)의 주기는 얼마인가요?',
          options: ['π', '2π', '3π', '4π'],
          correctAnswer: 1
        },
        {
          question: 'cos(x) 그래프는 sin(x) 그래프에 비해 어떻게 이동된 형태인가요?',
          options: ['π/2만큼 오른쪽으로', 'π/2만큼 왼쪽으로', 'π만큼 오른쪽으로', 'π만큼 왼쪽으로'],
          correctAnswer: 1
        },
        {
          question: 'tan(x)가 정의되지 않는 x 값은?',
          options: ['x = nπ', 'x = π/2 + nπ', 'x = 2π + n', 'x = π/4 + nπ'],
          correctAnswer: 1
        }
      ]
    },
    '과학': {
      title: '뉴턴의 운동 법칙',
      content: `뉴턴의 운동 법칙은 물체의 운동을 설명하는 기본 원리입니다.
      
      제1법칙(관성의 법칙): 외부에서 가해지는 힘이 없다면, 정지해 있는 물체는 계속 정지해 있고, 운동하는 물체는 계속해서 일정한 속도로 운동합니다.
      
      제2법칙(가속도의 법칙): 물체에 가해지는 힘은 물체의 질량과 가속도의 곱입니다. F = ma
      
      제3법칙(작용-반작용의 법칙): 모든 작용에는 크기가 같고 방향이 반대인 반작용이 존재합니다.
      
      이 법칙들은 우주선의 설계, 자동차의 안전장치, 스포츠 장비 등 현대 기술의 기초가 됩니다.`,
      completed: false,
      quizQuestions: [
        {
          question: '뉴턴의 제1법칙을 다른 말로 무엇이라고 하나요?',
          options: ['관성의 법칙', '가속도의 법칙', '작용-반작용의 법칙', '중력의 법칙'],
          correctAnswer: 0
        },
        {
          question: '뉴턴의 제2법칙을 나타내는 공식은?',
          options: ['F = mv', 'F = ma', 'F = mg', 'F = m/a'],
          correctAnswer: 1
        },
        {
          question: '다음 중 뉴턴의 제3법칙의 예로 가장 적절한 것은?',
          options: [
            '책상 위에 놓인 책이 움직이지 않음',
            '사과가 땅으로 떨어짐',
            '로켓이 가스를 뒤로 밀어내며 앞으로 나아감',
            '물체가 경사면을 따라 미끄러져 내려감'
          ],
          correctAnswer: 2
        }
      ]
    },
    '영어': {
      title: '영어 조건문의 활용',
      content: `영어 조건문은 if절을 사용하여 특정 조건과 그에 따른 결과를 표현합니다.
      
      Zero conditional: 항상 참인 일반적인 진리를 나타냅니다.
      If water reaches 100 degrees, it boils.
      
      First conditional: 현재나 미래에 일어날 가능성이 있는 상황을 나타냅니다.
      If it rains tomorrow, I will stay at home.
      
      Second conditional: 현재나 미래에 일어날 가능성이 낮거나 가상의 상황을 나타냅니다.
      If I won the lottery, I would travel the world.
      
      Third conditional: 과거에 일어나지 않은 상황과 그 결과를 가정합니다.
      If I had studied harder, I would have passed the exam.`,
      completed: false,
      quizQuestions: [
        {
          question: 'Zero conditional은 어떤 상황을 표현하는가?',
          options: ['미래에 일어날 가능성이 있는 상황', '현재의 가상 상황', '일반적인 진리', '과거의 가상 상황'],
          correctAnswer: 2
        },
        {
          question: '"If I _____ rich, I _____ buy a mansion."에 맞는 표현은?',
          options: ['am, will', 'were, would', 'had been, would have', 'am, would'],
          correctAnswer: 1
        },
        {
          question: '다음 중 Third conditional이 사용된 문장은?',
          options: [
            'If it rains, the match will be cancelled.',
            'If I were you, I would apologize.',
            'If water freezes, it turns into ice.',
            'If she had arrived earlier, she would have met him.'
          ],
          correctAnswer: 3
        }
      ]
    },
    '국어': {
      title: '현대시 이해하기',
      content: `현대시를 이해하기 위해서는 여러 요소를 분석해야 합니다.
      
      화자(시적 화자): 시에서 말하는 목소리, 시인과 반드시 일치하지는 않습니다.
      
      운율: 시의 리듬감을 만드는 요소로, 반복, 압운, 음보 등이 있습니다.
      
      이미지: 감각적 경험을 통해 전달되는 구체적인 표현입니다.
      
      비유: 직유, 은유, 의인화 등이 있으며 추상적인 개념을 구체적으로 표현합니다.
      
      시의 주제와 분위기는 이러한 요소들의 상호작용을 통해 형성됩니다.`,
      completed: false,
      quizQuestions: [
        {
          question: '시적 화자는 항상 시인 자신인가?',
          options: ['예, 항상 일치합니다.', '아니오, 반드시 일치하지는 않습니다.', '시대에 따라 다릅니다.', '시의 종류에 따라 다릅니다.'],
          correctAnswer: 1
        },
        {
          question: '다음 중 운율과 관련이 없는 것은?',
          options: ['반복', '압운', '음보', '이미지'],
          correctAnswer: 3
        },
        {
          question: '"달이 웃는다"는 어떤 표현 방법의 예인가?',
          options: ['직유', '은유', '의인화', '역설'],
          correctAnswer: 2
        }
      ]
    },
    '컴퓨터': {
      title: '웹 개발의 기초',
      content: `웹 개발은 HTML, CSS, JavaScript를 기초로 합니다.
      
      HTML(HyperText Markup Language): 웹 페이지의 구조와 내용을 정의합니다.
      주요 태그로는 <div>, <p>, <a>, <img>, <form> 등이 있습니다.
      
      CSS(Cascading Style Sheets): 웹 페이지의 디자인과 레이아웃을 담당합니다.
      선택자, 속성, 값으로 구성되며 다양한 스타일링이 가능합니다.
      
      JavaScript: 웹 페이지에 동적인 기능을 추가하는 프로그래밍 언어입니다.
      사용자 상호작용, API 호출, DOM 조작 등을 구현할 수 있습니다.
      
      이 세 가지 기술은 프론트엔드 개발의 핵심이며, 백엔드 개발과 결합하여 완전한 웹 애플리케이션을 만들 수 있습니다.`,
      completed: false,
      quizQuestions: [
        {
          question: '웹 페이지의 구조와 내용을 정의하는 언어는?',
          options: ['HTML', 'CSS', 'JavaScript', 'Python'],
          correctAnswer: 0
        },
        {
          question: '웹 페이지의 디자인과 레이아웃을 담당하는 것은?',
          options: ['HTML', 'CSS', 'JavaScript', 'PHP'],
          correctAnswer: 1
        },
        {
          question: '다음 중 JavaScript의 주요 기능이 아닌 것은?',
          options: ['사용자 상호작용 처리', 'DOM 조작', '서버 데이터베이스 직접 접근', 'API 호출'],
          correctAnswer: 2
        }
      ]
    }
  }
  
  const topicNames = Object.keys(personalizedContents)
  
  // Handle subject selection
  const handleSubjectSelect = (subjectId: string) => {
    setActiveSubject(subjectId)
    setActiveTopic(null)
    setQuizStarted(false)
    setQuizCompleted(false)
  }
  
  // Handle topic selection
  const handleTopicSelect = (topic: string) => {
    setActiveTopic(topic)
    setQuizStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
    
    // Simulate AI generating personalized content
    setLoading(true)
    setTimeout(() => {
      if (topic in personalizedContents) {
        setPersonalizedContent(personalizedContents[topic].content)
      } else {
        setPersonalizedContent('이 주제에 대한 맞춤형 학습 콘텐츠를 준비 중입니다.')
      }
      setLoading(false)
    }, 1500)
  }
  
  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
  }
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Prevent changing answer after selection
    
    setSelectedAnswer(answerIndex)
    
    if (activeTopic && personalizedContents[activeTopic].quizQuestions && personalizedContents[activeTopic].quizQuestions[currentQuestion].correctAnswer === answerIndex) {
      setScore(score + 1)
    }
    
    setShowExplanation(true)
  }
  
  // Move to next question
  const handleNextQuestion = () => {
    if (!activeTopic) return
    
    if (currentQuestion < personalizedContents[activeTopic].quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }
  
  // Reset quiz
  const handleResetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
  }
  
  // Change learning style
  const handleLearningStyleChange = (style: string) => {
    setLearningStyle(style)
    if (activeTopic && personalizedContents[activeTopic]) {
      setPersonalizedContent(personalizedContents[activeTopic].content)
    }
  }
  
  // Get active subject data
  const getActiveSubject = () => {
    return subjects.find(subject => subject.id === activeSubject)
  }
  
  // Get active topic data
  const getActiveTopic = () => {
    const subject = getActiveSubject()
    return subject?.topics.find(topic => topic.id === activeTopic)
  }
  
  // Get current quiz question
  const getCurrentQuestion = () => {
    if (!activeTopic || !personalizedContents[activeTopic].quizQuestions) return null
    return personalizedContents[activeTopic].quizQuestions[currentQuestion]
  }
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold text-sunrin-gold mb-6">AI 학습 도우미</h3>
      
      {!activeSubject ? (
        // Subject selection
        <div>
          <p className="text-white mb-6">학습하고 싶은 과목을 선택하세요.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.map(subject => (
              <motion.div
                key={subject.id}
                className="bg-gray-700 p-5 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubjectSelect(subject.id)}
              >
                <h4 className="text-xl font-bold text-white mb-2">{subject.name}</h4>
                <div className="flex items-center mb-3">
                  <span className="text-gray-300 mr-2">난이도:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`h-3 w-3 rounded-full mx-0.5 ${
                          i < subject.difficulty ? 'bg-sunrin-gold' : 'bg-gray-500'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {subject.topics.filter(topic => topic.completed).length}/{subject.topics.length} 주제 완료
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : !activeTopic ? (
        // Topic selection
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-white">
              {getActiveSubject()?.name} 학습
            </h4>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveSubject(null)}
            >
              ← 돌아가기
            </button>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold text-white">학습 스타일 설정</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'visual', name: '시각적', icon: '👁️' },
                { id: 'auditory', name: '청각적', icon: '👂' },
                { id: 'reading', name: '독서/글', icon: '📚' },
                { id: 'kinesthetic', name: '체험적', icon: '🤹' }
              ].map(style => (
                <button
                  key={style.id}
                  className={`p-3 rounded-lg flex items-center justify-center ${
                    learningStyle === style.id 
                      ? 'bg-sunrin-blue text-white' 
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                  onClick={() => handleLearningStyleChange(style.id)}
                >
                  <span className="mr-2">{style.icon}</span>
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-white mb-4">학습할 주제를 선택하세요:</p>
          
          <div className="space-y-3">
            {topicNames.map(topic => (
              <motion.div
                key={topic}
                className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTopicSelect(topic)}
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-lg font-semibold text-white">{topic}</h5>
                  {personalizedContents[topic].completed && (
                    <span className="bg-green-500 text-white text-xs py-1 px-2 rounded">완료</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : !quizStarted ? (
        // Topic content & quiz intro
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-white">
              {getActiveTopic()?.name}
            </h4>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveTopic(null)}
            >
              ← 돌아가기
            </button>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h5 className="text-xl font-semibold text-white mb-4">맞춤형 학습 자료</h5>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sunrin-gold"></div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  {personalizedContent}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h5 className="text-xl font-semibold text-white mb-4">지식 확인 퀴즈</h5>
            <p className="text-gray-300 mb-6">
              이 주제에 대한 이해도를 테스트하는 퀴즈입니다. 
              {activeTopic && personalizedContents[activeTopic].quizQuestions 
                ? `총 ${personalizedContents[activeTopic].quizQuestions.length}개의 문제가 있습니다.` 
                : ''}
            </p>
            
            <button
              className="bg-sunrin-blue text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors"
              onClick={handleStartQuiz}
            >
              퀴즈 시작하기
            </button>
          </div>
        </div>
      ) : !quizCompleted ? (
        // Quiz in progress
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-white">
              {getActiveTopic()?.name} 퀴즈
            </h4>
            <div className="text-gray-300">
              {activeTopic && personalizedContents[activeTopic].quizQuestions 
                ? `${currentQuestion + 1}/${personalizedContents[activeTopic].quizQuestions.length}` 
                : ''}
            </div>
          </div>
          
          {getCurrentQuestion() && (
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="mb-6">
                <h5 className="text-xl font-semibold text-white mb-4">
                  {getCurrentQuestion()?.question}
                </h5>
                
                <div className="space-y-3">
                  {getCurrentQuestion()?.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        selectedAnswer === index 
                          ? selectedAnswer === getCurrentQuestion()?.correctAnswer
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                          : selectedAnswer !== null && index === getCurrentQuestion()?.correctAnswer
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white hover:bg-gray-500'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {showExplanation && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h6 className="font-semibold text-sunrin-gold mb-2">설명:</h6>
                  <p className="text-gray-300">
                    {getCurrentQuestion()?.explanation || "추가 설명이 없습니다."}
                  </p>
                  
                  <button
                    className="mt-4 bg-sunrin-blue text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors"
                    onClick={handleNextQuestion}
                  >
                    {activeTopic && personalizedContents[activeTopic].quizQuestions && currentQuestion < personalizedContents[activeTopic].quizQuestions.length - 1 
                      ? '다음 문제' 
                      : '결과 보기'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Quiz completed
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-white">
              퀴즈 결과
            </h4>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveTopic(null)}
            >
              ← 다른 주제 선택하기
            </button>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <div className="mb-6">
              <div className="inline-block rounded-full bg-gray-800 p-6 mb-4">
                <div className="text-4xl">
                  {activeTopic && personalizedContents[activeTopic].quizQuestions 
                    ? score === personalizedContents[activeTopic].quizQuestions.length
                      ? '🏆'
                      : score >= personalizedContents[activeTopic].quizQuestions.length / 2
                        ? '👍'
                        : '🤔'
                    : ''}
                </div>
              </div>
              
              <h5 className="text-2xl font-bold text-white mb-2">
                {activeTopic && personalizedContents[activeTopic].quizQuestions 
                  ? `${score}/${personalizedContents[activeTopic].quizQuestions.length} 정답`
                  : ''}
              </h5>
              
              <p className="text-gray-300">
                {activeTopic && personalizedContents[activeTopic].quizQuestions ? (
                  score === personalizedContents[activeTopic].quizQuestions.length
                    ? '완벽해요! 이 주제를 완전히 이해하셨군요.'
                    : score >= personalizedContents[activeTopic].quizQuestions.length / 2
                      ? '좋은 결과입니다! 일부 개념을 복습하면 더 완벽해질 거예요.'
                      : '더 많은 학습이 필요해요. 주제를 다시 복습해보세요.'
                ) : ''}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-sunrin-blue text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors"
                onClick={handleResetQuiz}
              >
                퀴즈 다시 풀기
              </button>
              <button
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-500 transition-colors"
                onClick={() => setActiveTopic(null)}
              >
                다른 주제 학습하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIStudyBuddy 