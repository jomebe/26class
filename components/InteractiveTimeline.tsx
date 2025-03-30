import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  image?: string
  tags: string[]
  likes: number
  comments: Comment[]
}

interface Comment {
  id: string
  author: string
  text: string
  date: string
}

const InteractiveTimeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [newComment, setNewComment] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiInsights, setAiInsights] = useState<string>('')
  
  // Simulate fetching timeline data
  useEffect(() => {
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      setEvents([
        {
          id: 'event-1',
          date: '2025-03-02',
          title: '2학년 6반 첫 등교일',
          description: '새로운 학년, 새로운 반에서의 첫 날. 선생님과 반 친구들과의 첫 만남.',
          image: 'https://source.unsplash.com/random/800x600/?classroom',
          tags: ['입학', '첫날', '반편성'],
          likes: 24,
          comments: [
            {
              id: 'comment-1-1',
              author: '김학생',
              text: '그날 정말 긴장됐었는데, 좋은 친구들을 많이 만나서 다행이었어요!',
              date: '2025-03-03'
            }
          ]
        },
        {
          id: 'event-2',
          date: '2025-03-15',
          title: '반 단합 체육대회',
          description: '체육관에서 진행된 미니 체육대회. 농구, 배드민턴, 줄다리기 등 다양한 종목에서 6반의 단합을 다졌습니다.',
          image: 'https://source.unsplash.com/random/800x600/?sports',
          tags: ['체육대회', '단합', '스포츠'],
          likes: 31,
          comments: [
            {
              id: 'comment-2-1',
              author: '이학생',
              text: '줄다리기에서 우리 반이 우승했을 때 정말 기뻤어요!',
              date: '2025-03-16'
            },
            {
              id: 'comment-2-2',
              author: '박학생',
              text: '다음에는 농구에서도 이겨보자!',
              date: '2025-03-17'
            }
          ]
        },
        {
          id: 'event-3',
          date: '2025-04-10',
          title: '프로그래밍 경진대회 준비',
          description: '교내 프로그래밍 경진대회를 위한 팀 구성 및 아이디어 회의. 6반에서는 3개 팀이 참가 예정.',
          image: 'https://source.unsplash.com/random/800x600/?coding',
          tags: ['코딩', '대회', '팀워크'],
          likes: 18,
          comments: [
            {
              id: 'comment-3-1',
              author: '정학생',
              text: '우리 팀은 AR 기술을 활용한 교육 앱을 개발하기로 했어요.',
              date: '2025-04-11'
            }
          ]
        },
        {
          id: 'event-4',
          date: '2025-05-20',
          title: '봄 소풍',
          description: '남산으로 떠난 봄 소풍. 맑은 날씨 속에서 즐거운 시간을 보냈습니다.',
          image: 'https://source.unsplash.com/random/800x600/?picnic',
          tags: ['소풍', '봄', '야외활동'],
          likes: 42,
          comments: [
            {
              id: 'comment-4-1',
              author: '최학생',
              text: '날씨가 정말 좋았어요! 반 친구들과 찍은 사진이 정말 마음에 들어요.',
              date: '2025-05-21'
            }
          ]
        },
        {
          id: 'event-5',
          date: '2025-06-15',
          title: '기말고사 스터디 그룹',
          description: '기말고사를 대비해 반 친구들과 함께 스터디 그룹을 만들어 공부했습니다.',
          image: 'https://source.unsplash.com/random/800x600/?study',
          tags: ['시험', '공부', '협력'],
          likes: 27,
          comments: [
            {
              id: 'comment-5-1',
              author: '김학생',
              text: '함께 공부하니 어려운 개념도 쉽게 이해할 수 있었어요.',
              date: '2025-06-16'
            },
            {
              id: 'comment-5-2',
              author: '이학생',
              text: '다음 시험도 같이 준비해요!',
              date: '2025-06-18'
            }
          ]
        }
      ])
      setLoading(false)
    }, 1500)
  }, [])
  
  // Get active event
  const getActiveEvent = () => {
    return events.find(event => event.id === activeEventId)
  }
  
  // Handle event click
  const handleEventClick = (eventId: string) => {
    setActiveEventId(eventId === activeEventId ? null : eventId)
  }
  
  // Filter events by tag
  const getFilteredEvents = () => {
    if (filter === 'all') return events
    return events.filter(event => event.tags.includes(filter))
  }
  
  // Get all unique tags
  const getAllTags = () => {
    const tags = new Set<string>()
    events.forEach(event => {
      event.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }
  
  // Add comment to event
  const handleAddComment = () => {
    if (!activeEventId || !newComment.trim()) return
    
    const newCommentObj: Comment = {
      id: `comment-${activeEventId}-${Date.now()}`,
      author: '나',
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    }
    
    setEvents(events.map(event => {
      if (event.id === activeEventId) {
        return {
          ...event,
          comments: [...event.comments, newCommentObj]
        }
      }
      return event
    }))
    
    setNewComment('')
  }
  
  // Like event
  const handleLikeEvent = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          likes: event.likes + 1
        }
      }
      return event
    }))
  }
  
  // Generate AI insights
  const handleGenerateInsights = () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const insights = [
        '6반은 학업과 체육 활동 모두에서 균형 잡힌 참여를 보이고 있습니다.',
        '가장 많은 호응을 받은 활동은 봄 소풍으로, 학생들의 단합에 큰 역할을 했습니다.',
        '프로그래밍 경진대회 준비는 창의적 사고 개발에 긍정적인 영향을 주었습니다.',
        '스터디 그룹 활동은 협동 학습의 효과를 잘 보여주는 사례입니다.',
        '모든 이벤트에서 볼 수 있듯이, 6반은 강한 유대감과 팀워크를 중요시합니다.'
      ]
      
      setAiInsights(insights.join('\n\n'))
      setIsAnalyzing(false)
    }, 2000)
  }
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold text-sunrin-gold mb-6">반 추억 타임라인</h3>
      
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sunrin-gold"></div>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <div className="flex flex-wrap items-center mb-4">
              <h4 className="text-white text-lg font-semibold mr-4">필터:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    filter === 'all' 
                      ? 'bg-sunrin-blue text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  전체
                </button>
                
                {getAllTags().map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded text-sm ${
                      filter === tag 
                        ? 'bg-sunrin-blue text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setFilter(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
              <p className="text-gray-300">타임라인 이벤트를 클릭하여 상세 내용을 확인하세요.</p>
              
              <button
                className="bg-sunrin-gold text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition-colors flex items-center"
                onClick={handleGenerateInsights}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-gray-900 rounded-full mr-2"></span>
                    AI 분석 중...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    AI 인사이트 생성
                  </>
                )}
              </button>
            </div>
          </div>
          
          {aiInsights && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700 p-4 rounded-lg mb-8 border-l-4 border-sunrin-gold"
            >
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                <span className="text-sunrin-gold mr-2">🤖</span>
                AI 타임라인 인사이트
              </h4>
              <p className="text-gray-300 whitespace-pre-line">
                {aiInsights}
              </p>
            </motion.div>
          )}
          
          <div className="relative">
            {/* Timeline axis */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-600 transform md:translate-x-0 translate-x-4"></div>
            
            {/* Timeline events */}
            <div className="space-y-10">
              {getFilteredEvents().map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${
                    index % 2 === 0 
                      ? 'md:pl-0 md:pr-8 md:text-right md:ml-0 md:mr-auto'
                      : 'md:pl-8 md:pr-0 md:text-left md:ml-auto md:mr-0'
                  } pl-10 md:w-1/2`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-auto ${
                    index % 2 === 0 ? 'md:right-0' : 'md:left-0'
                  } top-0 h-8 w-8 rounded-full bg-sunrin-blue flex items-center justify-center transform translate-x-0.5 md:translate-x-0 ${
                    index % 2 === 0 ? 'md:translate-x-4' : 'md:-translate-x-4'
                  }`}>
                    <span className="h-3 w-3 rounded-full bg-white"></span>
                  </div>
                  
                  {/* Event date */}
                  <div className={`absolute top-0 left-10 md:left-auto ${
                    index % 2 === 0 ? 'md:right-10' : 'md:left-10'
                  }`}>
                    <span className="bg-gray-700 text-sunrin-gold px-2 py-1 rounded text-sm">
                      {new Date(event.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {/* Event card */}
                  <motion.div
                    className={`mt-10 bg-gray-700 rounded-lg overflow-hidden cursor-pointer ${
                      activeEventId === event.id ? 'ring-2 ring-sunrin-gold' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEventClick(event.id)}
                  >
                    {event.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h5 className="text-xl font-bold text-white mb-2">{event.title}</h5>
                      <p className="text-gray-300 mb-3">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <button 
                          className="flex items-center hover:text-sunrin-gold"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLikeEvent(event.id)
                          }}
                        >
                          <span className="mr-1">❤️</span>
                          {event.likes}
                        </button>
                        <span>{event.comments.length} 댓글</span>
                      </div>
                    </div>
                    
                    {/* Expanded comments section */}
                    {activeEventId === event.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-600 p-4"
                      >
                        <h6 className="font-semibold text-white mb-3">댓글</h6>
                        
                        {event.comments.length > 0 ? (
                          <div className="space-y-3 mb-4">
                            {event.comments.map(comment => (
                              <div key={comment.id} className="bg-gray-800 p-3 rounded">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-semibold text-white">{comment.author}</span>
                                  <span className="text-xs text-gray-400">
                                    {new Date(comment.date).toLocaleDateString('ko-KR')}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm">{comment.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 mb-4 text-sm">아직 댓글이 없습니다.</p>
                        )}
                        
                        <div className="flex">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요..."
                            className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-sunrin-gold"
                          />
                          <button
                            className="bg-sunrin-blue text-white px-3 py-2 rounded-r text-sm hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddComment()
                            }}
                            disabled={!newComment.trim()}
                          >
                            등록
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveTimeline 