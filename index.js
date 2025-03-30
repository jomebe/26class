document.addEventListener('DOMContentLoaded', function() {
    // 로그인 상태 확인 및 사용자 영역 업데이트
    function updateUserArea() {
        const userArea = document.getElementById('user-area');
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        
        if (isLoggedIn) {
            const userName = localStorage.getItem('userName');
            const userType = localStorage.getItem('userType');
            const avatarSrc = userType === 'teacher' ? 'images/members/teacher.jpg' : 'images/members/student1.jpg';
            
            userArea.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="${avatarSrc}" alt="${userName}">
                    </div>
                    <div class="user-name">${userName}</div>
                </div>
                <div class="auth-buttons">
                    <a href="#" id="logout-btn" class="auth-btn logout-btn">로그아웃</a>
                </div>
            `;
            
            // 로그아웃 버튼 이벤트 리스너
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                
                // 로그인 상태 삭제
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userName');
                localStorage.removeItem('userType');
                
                // 페이지 새로고침
                window.location.reload();
            });
        } else {
            userArea.innerHTML = `
                <div class="auth-buttons">
                    <a href="login.html" class="auth-btn login-btn">로그인</a>
                </div>
            `;
        }
    }

    // 공지사항 샘플 데이터
    const notices = [
        {
            id: 1,
            title: '3월 교내 코딩 경진대회 안내',
            category: 'event',
            date: '2024-03-15',
            author: '김선생',
            content: '3월 25일부터 시작하는 교내 코딩 경진대회 참가 신청을 받습니다.'
        },
        {
            id: 2,
            title: '4월 중간고사 시간표 안내',
            category: 'exam',
            date: '2024-03-10',
            author: '교무부장',
            content: '4월 중간고사 시간표가 확정되었습니다.'
        },
        {
            id: 3,
            title: '동아리 발표회 일정',
            category: 'academic',
            date: '2024-03-05',
            author: '학생회장',
            content: '동아리 발표회가 5월 첫째 주에 예정되어 있습니다.'
        }
    ];

    // 일정 샘플 데이터
    const events = [
        { date: '2024-04-10', title: '과학의 날 행사' },
        { date: '2024-04-15', title: '중간고사 시작' },
        { date: '2024-04-25', title: '프로그래밍 실습 발표' },
        { date: '2024-05-05', title: '어린이날(공휴일)' },
        { date: '2024-05-10', title: '학교 축제' }
    ];

    // 과제 샘플 데이터
    const homeworks = [
        {
            id: 1,
            title: '2차 함수 그래프 과제',
            subject: 'math',
            deadline: '2024-04-10',
            status: 'pending'
        },
        {
            id: 2,
            title: '소설 감상문 작성',
            subject: 'korean',
            deadline: '2024-04-15',
            status: 'pending'
        },
        {
            id: 3,
            title: '영어 에세이 제출',
            subject: 'english',
            deadline: '2024-04-20',
            status: 'pending'
        },
        {
            id: 4,
            title: '웹 페이지 프로젝트',
            subject: 'programming',
            deadline: '2024-04-25',
            status: 'pending'
        }
    ];

    // 투표 샘플 데이터
    const votes = [
        {
            id: 1,
            title: '학급 체육대회 종목 선택',
            deadline: '2024-04-05T18:00:00',
            participants: 22,
            options: [
                { name: '축구', votes: 8 },
                { name: '농구', votes: 6 },
                { name: '배구', votes: 3 },
                { name: '달리기', votes: 5 }
            ]
        },
        {
            id: 2,
            title: '프로젝트 발표 일정',
            deadline: '2024-03-29T15:00:00',
            participants: 35,
            options: [
                { name: '4월 10일 (월)', votes: 12 },
                { name: '4월 12일 (수)', votes: 8 },
                { name: '4월 14일 (금)', votes: 15 }
            ]
        }
    ];

    // 날짜 포맷팅 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}월 ${day}일`;
    }

    // 남은 일수 계산 함수
    function getDaysRemaining(deadlineDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const deadline = new Date(deadlineDate);
        deadline.setHours(0, 0, 0, 0);
        
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return '마감됨';
        } else if (diffDays === 0) {
            return '오늘 마감';
        } else {
            return `${diffDays}일 남음`;
        }
    }

    // 남은 시간 계산 함수
    function getTimeRemaining(deadlineStr) {
        const now = new Date();
        const deadline = new Date(deadlineStr);
        const timeDiff = deadline - now;
        
        if (timeDiff <= 0) {
            return '마감됨';
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            return `${days}일 ${hours}시간 남음`;
        } else {
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            return `${hours}시간 ${minutes}분 남음`;
        }
    }

    // 공지사항 렌더링 함수
    function renderNotices() {
        const noticeList = document.getElementById('recent-notices');
        
        notices.slice(0, 3).forEach(notice => {
            const noticeItem = document.createElement('div');
            noticeItem.className = 'notice-item';
            
            noticeItem.innerHTML = `
                <div class="notice-title">
                    <a href="notice.html">${notice.title}</a>
                </div>
                <div class="notice-meta">
                    <span>${notice.author}</span>
                    <span>${formatDate(notice.date)}</span>
                </div>
            `;
            
            noticeList.appendChild(noticeItem);
        });
    }

    // 일정 렌더링 함수
    function renderEvents() {
        const eventsList = document.getElementById('upcoming-events');
        
        events.slice(0, 4).forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            
            const eventDate = new Date(event.date);
            
            eventItem.innerHTML = `
                <div class="event-date">${formatDate(event.date)}</div>
                <div class="event-title">${event.title}</div>
            `;
            
            eventsList.appendChild(eventItem);
        });
    }

    // 과제 렌더링 함수
    function renderHomeworks() {
        const homeworkList = document.getElementById('pending-homework');
        
        // 마감일이 가까운 순으로 정렬
        const sortedHomeworks = [...homeworks].sort((a, b) => {
            return new Date(a.deadline) - new Date(b.deadline);
        });
        
        sortedHomeworks.slice(0, 3).forEach(homework => {
            const homeworkItem = document.createElement('div');
            homeworkItem.className = 'homework-item';
            
            homeworkItem.innerHTML = `
                <div class="homework-subject subject-${homework.subject}">${getSubjectName(homework.subject)}</div>
                <div class="homework-info">
                    <div class="homework-title">${homework.title}</div>
                    <div class="homework-deadline">${getDaysRemaining(homework.deadline)} (${formatDate(homework.deadline)})</div>
                </div>
            `;
            
            homeworkList.appendChild(homeworkItem);
        });
    }

    // 과목명 가져오기 함수
    function getSubjectName(subject) {
        const subjectMap = {
            'math': '수학',
            'korean': '국어',
            'english': '영어',
            'science': '과학',
            'history': '역사',
            'programming': '프로그래밍'
        };
        return subjectMap[subject] || '기타';
    }

    // 투표 렌더링 함수
    function renderVotes() {
        const votesList = document.getElementById('active-votes');
        
        votes.slice(0, 2).forEach(vote => {
            const voteItem = document.createElement('div');
            voteItem.className = 'vote-item';
            
            // 가장 많은 표를 받은 옵션 찾기
            const maxVotes = Math.max(...vote.options.map(opt => opt.votes));
            const maxVotePercentage = vote.participants > 0 ? 
                Math.round((maxVotes / vote.participants) * 100) : 0;
            
            voteItem.innerHTML = `
                <div class="vote-item-title">${vote.title}</div>
                <div class="vote-item-deadline">${getTimeRemaining(vote.deadline)}</div>
                <div class="vote-item-progress">
                    <div class="vote-item-bar" style="width: ${maxVotePercentage}%"></div>
                </div>
                <div class="vote-item-stats">
                    <span>참여자 ${vote.participants}명</span>
                    <span><a href="vote.html">투표하기</a></span>
                </div>
            `;
            
            votesList.appendChild(voteItem);
        });
    }

    // 초기화 함수
    function initialize() {
        // 사용자 영역 업데이트
        updateUserArea();
        
        // 공지사항 렌더링
        renderNotices();
        
        // 일정 렌더링
        renderEvents();
        
        // 과제 렌더링
        renderHomeworks();
        
        // 투표 렌더링
        renderVotes();
    }

    // 애플리케이션 초기화
    initialize();
}); 