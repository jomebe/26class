document.addEventListener('DOMContentLoaded', function() {
    // 공지사항 샘플 데이터
    const notices = [
        {
            id: 1,
            title: '3월 교내 코딩 경진대회 안내',
            category: 'event',
            date: '2024-03-15',
            author: '김선생',
            content: '3월 25일부터 시작하는 교내 코딩 경진대회 참가 신청을 받습니다. 관심 있는 학생들은 담임 선생님께 3월 20일까지 신청해주세요.',
            comments: 5
        },
        {
            id: 2,
            title: '4월 중간고사 시간표 안내',
            category: 'exam',
            date: '2024-03-10',
            author: '교무부장',
            content: '4월 중간고사 시간표가 확정되었습니다. 첨부파일을 확인하시고 시험 준비에 만전을 기해주세요.',
            comments: 12
        },
        {
            id: 3,
            title: '동아리 발표회 일정',
            category: 'academic',
            date: '2024-03-05',
            author: '학생회장',
            content: '동아리 발표회가 5월 첫째 주에 예정되어 있습니다. 각 동아리별 발표 준비를 시작해주세요.',
            comments: 3
        },
        {
            id: 4,
            title: '졸업앨범 촬영 안내',
            category: 'event',
            date: '2024-03-03',
            author: '김선생',
            content: '졸업앨범 촬영이 4월 15일에 예정되어 있습니다. 당일 교복을 단정하게 입고 등교해주세요.',
            comments: 8
        },
        {
            id: 5,
            title: '학생증 재발급 안내',
            category: 'etc',
            date: '2024-02-28',
            author: '행정실',
            content: '학생증을 분실한 학생들은 행정실에서 재발급 신청을 할 수 있습니다. 재발급 비용은 5,000원입니다.',
            comments: 2
        }
    ];

    // 카테고리 한글 변환 함수
    function getCategoryName(category) {
        const categoryMap = {
            'academic': '학사일정',
            'exam': '시험',
            'event': '행사',
            'etc': '기타'
        };
        return categoryMap[category] || '기타';
    }

    // 공지사항 렌더링 함수
    function renderNotices(filteredNotices = notices) {
        const noticeList = document.querySelector('.notice-list');
        noticeList.innerHTML = '';

        filteredNotices.forEach(notice => {
            const noticeEl = document.createElement('div');
            noticeEl.className = 'notice-item';
            noticeEl.dataset.id = notice.id;

            noticeEl.innerHTML = `
                <h3>${notice.title}</h3>
                <div class="notice-meta">
                    <span class="notice-category category-${notice.category}">${getCategoryName(notice.category)}</span>
                    <span>${notice.date} | 작성자: ${notice.author}</span>
                </div>
                <div class="notice-content">
                    ${notice.content}
                </div>
                <div class="notice-footer">
                    <div class="notice-actions">
                        <button class="like-btn"><i class="fas fa-thumbs-up"></i> 좋아요</button>
                        <button class="comment-btn"><i class="fas fa-comment"></i> 댓글</button>
                    </div>
                    <div class="comment-count">댓글 ${notice.comments}개</div>
                </div>
            `;

            noticeList.appendChild(noticeEl);
        });
    }

    // 초기 공지사항 렌더링
    renderNotices();

    // 카테고리 필터링 기능
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        let filteredNotices;

        if (selectedCategory === 'all') {
            filteredNotices = notices;
        } else {
            filteredNotices = notices.filter(notice => notice.category === selectedCategory);
        }

        renderNotices(filteredNotices);
    });

    // 글쓰기 버튼 및 모달 기능
    const writeBtn = document.getElementById('write-notice');
    const modal = document.getElementById('notice-modal');
    const closeBtn = document.querySelector('.close');
    const noticeForm = document.getElementById('notice-form');

    // 로그인 상태 체크 (교사만 글쓰기 가능)
    function checkLoginStatus() {
        const userType = localStorage.getItem('userType');
        if (userType === 'teacher') {
            writeBtn.style.display = 'block';
        } else {
            writeBtn.style.display = 'none';
        }
    }

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 글쓰기 버튼 클릭 시 모달 열기
    writeBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // 모달 닫기
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // 외부 클릭 시 모달 닫기
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 공지사항 작성 폼 제출
    noticeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('notice-title').value;
        const category = document.getElementById('notice-category').value;
        const content = document.getElementById('notice-content').value;
        
        // 실제로는 서버에 데이터를 전송해야 함
        // 여기서는 간단한 데모로 처리
        const newNotice = {
            id: notices.length + 1,
            title,
            category,
            date: new Date().toISOString().split('T')[0],
            author: localStorage.getItem('userName') || '관리자',
            content,
            comments: 0
        };
        
        // 배열 맨 앞에 추가
        notices.unshift(newNotice);
        
        // UI 업데이트
        renderNotices();
        
        // 모달 닫기
        modal.style.display = 'none';
        
        // 폼 초기화
        noticeForm.reset();
        
        alert('공지사항이 등록되었습니다.');
    });

    // 페이지네이션 기능
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 실제로는 서버에서 해당 페이지 데이터를 가져와야 함
            // 여기서는 간단한 데모로 처리
            pageButtons.forEach(b => b.classList.remove('active'));
            
            if (this.dataset.page !== 'next') {
                this.classList.add('active');
            }
            
            // 페이지 번호에 따라 다른 공지사항을 보여준다고 가정
            alert(`${this.dataset.page} 페이지로 이동합니다.`);
        });
    });

    // 첫 번째 페이지 버튼 활성화
    pageButtons[0].classList.add('active');
}); 