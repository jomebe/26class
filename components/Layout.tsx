import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = '선린인터넷고등학교 2학년 6반' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="선린인터넷고등학교 2학년 6반 웹사이트" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" 
          rel="stylesheet"
        />
      </Head>

      <header className="bg-sunrin-dark text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold mr-2">선린인터넷고등학교</span>
              <span className="text-sunrin-gold font-bold text-2xl">2학년 6반</span>
            </Link>
          </motion.div>
          
          <nav>
            <ul className="flex space-x-6">
              <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/" className="hover:text-sunrin-gold transition-colors">
                  홈
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/attendance" className="hover:text-sunrin-gold transition-colors">
                  출석체크
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/assistant" className="hover:text-sunrin-gold transition-colors">
                  AI 어시스턴트
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/study" className="hover:text-sunrin-gold transition-colors">
                  AI 스터디
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/ar" className="hover:text-sunrin-gold transition-colors">
                  AR 교실
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/memories" className="hover:text-sunrin-gold transition-colors">
                  추억공간
                </Link>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-sunrin-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} 선린인터넷고등학교 2학년 6반</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.sunrint.hs.kr" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-sunrin-gold transition-colors">
                학교 홈페이지
              </a>
              <a href="https://github.com/sunrint-26class" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-sunrin-gold transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 