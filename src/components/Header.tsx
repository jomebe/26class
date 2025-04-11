import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-sunrin-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">선린인터넷고등학교 2학년 6반</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:underline">홈</Link></li>
            <li><Link href="/services" className="hover:underline">서비스</Link></li>
            <li><Link href="/about" className="hover:underline">소개</Link></li>
            <li><Link href="/login" className="hover:underline">로그인</Link></li>
            <li><Link href="/register" className="hover:underline">회원가입</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 