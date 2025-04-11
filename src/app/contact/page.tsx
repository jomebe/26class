'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 폼 제출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <>
      {/* 문의하기 페이지 헤더 */}
      <div className="bg-gradient-to-r from-sunrin-green to-sunrin-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">문의하기</h1>
          <p className="text-xl">선린인터넷고등학교 2학년 6반에 문의하실 내용이 있으신가요?</p>
        </div>
      </div>

      {/* 문의 폼 */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4 text-sunrin-green">✓</div>
                <h3 className="text-2xl font-bold mb-2">문의가 성공적으로 접수되었습니다!</h3>
                <p className="text-gray-600 mb-6">빠른 시일 내에 답변 드리겠습니다.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-sunrin-blue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  새 문의하기
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">문의 양식</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">이름</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunrin-blue"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">이메일</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunrin-blue"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">문의 주제</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunrin-blue"
                      required
                    >
                      <option value="">주제 선택</option>
                      <option value="서비스 문의">서비스 문의</option>
                      <option value="버그 신고">버그 신고</option>
                      <option value="기능 제안">기능 제안</option>
                      <option value="협업 제안">협업 제안</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">문의 내용</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunrin-blue"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-sunrin-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? '제출 중...' : '문의하기'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
          
          {/* 추가 연락처 정보 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4 text-sunrin-blue">✉️</div>
              <h3 className="font-bold mb-2">이메일</h3>
              <p className="text-gray-600">sunrin2-6@sunrint.hs.kr</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4 text-sunrin-green">📞</div>
              <h3 className="font-bold mb-2">전화번호</h3>
              <p className="text-gray-600">02-713-6211</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4 text-sunrin-red">📍</div>
              <h3 className="font-bold mb-2">주소</h3>
              <p className="text-gray-600">서울특별시 용산구 원효로97길 33-4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 