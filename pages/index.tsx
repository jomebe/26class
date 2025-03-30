import React from 'react'
import Head from 'next/head'
import { motion, useAnimation } from 'framer-motion'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// Import AI-related components dynamically to avoid SSR issues
const FaceRecognition = dynamic(() => import('../components/FaceRecognition'), { ssr: false })
const VoiceAssistant = dynamic(() => import('../components/VoiceAssistant'), { ssr: false })
const ARClassroom = dynamic(() => import('../components/ARClassroom'), { ssr: false })
const AIStudyBuddy = dynamic(() => import('../components/AIStudyBuddy'), { ssr: false })
const InteractiveTimeline = dynamic(() => import('../components/InteractiveTimeline'), { ssr: false })

const Home = () => {
  const [activeFeature, setActiveFeature] = React.useState<string | null>(null)
  const controls = useAnimation()
  const sceneRef = React.useRef<HTMLDivElement>(null)
  const [studentMood, setStudentMood] = React.useState<string>('neutral')
  const textMeshRef = React.useRef<THREE.Mesh | null>(null)
  
  // 3D animation for background
  React.useEffect(() => {
    if (!sceneRef.current) return
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    sceneRef.current.appendChild(renderer.domElement)
    
    // Create 3D class number floating in space
    const fontLoader = new FontLoader()
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const geometry = new TextGeometry('2-6', {
        font: font,
        size: 5,
        height: 1
      })
      
      const material = new THREE.MeshStandardMaterial({ color: 0xffff00 })
      textMeshRef.current = new THREE.Mesh(geometry, material)
      
      if (textMeshRef.current) {
        textMeshRef.current.position.set(0, 0, 0)
        scene.add(textMeshRef.current)
      }
    })
    
    camera.position.z = 15
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      if (textMeshRef.current) {
        textMeshRef.current.rotation.y += 0.01
        textMeshRef.current.rotation.x += 0.005
      }
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Cleanup
    return () => {
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  // Features animation when scrolling
  React.useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } })
  }, [controls])
  
  // Sections of the page with different AI features
  const features = [
    {
      title: '얼굴 인식 출석 시스템',
      description: 'AI 얼굴 인식 기술을 활용한 최첨단 출석체크 시스템으로 간편하게 출석을 관리합니다.',
      icon: '👤',
      link: '/attendance'
    },
    {
      title: '6반 전용 AI 어시스턴트',
      description: '6반 학생들만을 위한 AI 어시스턴트가 학습과 일상에 관한 다양한 질문에 답변해 드립니다.',
      icon: '🤖',
      link: '/assistant'
    },
    {
      title: 'AR 교실 체험',
      description: '증강 현실 기술을 활용해 교실 내에서 색다른 학습 경험을 제공합니다.',
      icon: '🥽',
      link: '/ar'
    },
    {
      title: 'AI 학습 도우미',
      description: '개인화된 학습 콘텐츠와 퀴즈로 효율적인 학습을 돕습니다.',
      icon: '📚',
      link: '/study'
    },
    {
      title: '6반 추억공간',
      description: '학급의 소중한 순간들을 타임라인으로 기록하고 공유하는 공간입니다.',
      icon: '🎞️',
      link: '/memories'
    }
  ]
  
  return (
    <Layout>
      <Head>
        <title>선린인터넷고등학교 2학년 6반</title>
        <meta name="description" content="선린인터넷고등학교 2학년 6반 웹페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen">
        {/* 3D Background */}
        <div ref={sceneRef} className="fixed inset-0 z-0" />
        
        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-transparent to-black bg-opacity-70 text-white">
          <motion.h1 
            className="text-6xl font-bold glowing-text mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            선린인터넷고등학교
          </motion.h1>
          <motion.h2 
            className="text-8xl font-extrabold glowing-text mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            2학년 6반
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            최첨단 AI 기술로 학습과 생활을 더욱 스마트하게, 즐겁게 만들어가는 미래지향적인 학급입니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button 
              className="btn-primary text-lg px-8 py-3"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })
              }}
            >
              AI 기능 살펴보기
            </button>
          </motion.div>
        </div>
        
        {/* Features Section */}
        <section className="relative z-10 py-20 bg-black bg-opacity-80">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              <span className="glowing-text">주요 기능</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card bg-gray-900 border border-gray-800 hover:border-sunrin-gold cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFeature(feature.link)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={controls}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-sunrin-gold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Active Feature Display */}
        {activeFeature && (
          <section className="relative z-10 py-16 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex justify-end mb-4">
                <button 
                  className="text-white hover:text-sunrin-gold"
                  onClick={() => setActiveFeature(null)}
                >
                  닫기 ✕
                </button>
              </div>
              
              {activeFeature === '/attendance' && <FaceRecognition onMoodDetect={setStudentMood} />}
              {activeFeature === '/assistant' && <VoiceAssistant studentMood={studentMood} />}
              {activeFeature === '/ar' && <ARClassroom />}
              {activeFeature === '/study' && <AIStudyBuddy />}
              {activeFeature === '/memories' && <InteractiveTimeline />}
            </div>
          </section>
        )}
        
        {/* About Section */}
        <section className="relative z-10 py-20 bg-black bg-opacity-70">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              <span className="glowing-text">반소개</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-sunrin-gold mb-4">선린인터넷고등학교 2학년 6반</h3>
                <p className="text-gray-300 mb-6">
                  우리 반은 창의적이고 혁신적인 아이디어로 가득한 선린인터넷고등학교의 2학년 6반입니다.
                  다양한 재능과 꿈을 가진 학생들이 모여 서로 배우고 성장하는 공간입니다.
                </p>
                <p className="text-gray-300">
                  AI와 최신 기술을 활용하여 더 나은 학습 환경을 만들어가고 있으며,
                  이 웹사이트는 우리 반의 특별한 여정을 함께 나누는 디지털 공간입니다.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  {/* Placeholder for class photo or 3D model */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sunrin-blue to-sunrin-gold opacity-80 flex items-center justify-center">
                    <p className="text-4xl font-bold text-white">2-6</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="relative z-10 py-8 bg-gray-900 text-white text-center">
          <div className="container mx-auto px-4">
            <p>© 2025 선린인터넷고등학교 2학년 6반. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">
              Powered by Next.js and AI technology
            </p>
          </div>
        </footer>
      </main>
    </Layout>
  )
}

export default Home 