document.addEventListener('DOMContentLoaded', function() {
    // 과제 샘플 데이터
    const homeworkData = [
        {
            id: 1,
            title: '2차 함수 그래프 과제',
            subject: 'math',
            description: '교과서 78페이지 연습문제 1-10번을 풀고 노트에 정리해오세요.',
            deadline: '2024-04-10',
            files: ['수학_과제안내.pdf'],
            status: 'pending'
        },
        {
            id: 2,
            title: '소설 감상문 작성',
            subject: 'korean',
            description: '\"소나기\" 소설을 읽고 감상문을 A4 1장 분량으로 작성해오세요.',
            deadline: '2024-04-15',
            files: ['국어_감상문양식.docx'],
            status: 'completed'
        },
        {
            id: 3,
            title: '영어 에세이 제출',
            subject: 'english',
            description: '주제: "Technology in Our Lives" 에 대한 에세이를 300단어 내외로 작성하세요.',
            deadline: '2024-04-20',
            files: ['영어_에세이가이드라인.pdf'],
            status: 'pending'
        },
        {
            id: 4,
            title: '화학반응식 균형 맞추기',
            subject: 'science',
            description: '교과서 92-93페이지에 있는 화학반응식의 균형을 맞추는 문제를 풀어오세요.',
            deadline: '2024-04-12',
            files: [],
            status: 'pending'
        },
        {
            id: 5,
            title: '근현대사 연표 만들기',
            subject: 'history',
            description: '1900년부터 1950년까지의 주요 사건을 정리한 연표를 만들어오세요.',
            deadline: '2024-04-18',
            files: ['역사_연표예시.jpg'],
            status: 'completed'
        },
        {
            id: 6,
            title: '웹 페이지 프로젝트',
            subject: 'programming',
            description: 'HTML, CSS, JavaScript를 사용하여 자신을 소개하는 간단한 웹 페이지를 만드세요.',
            deadline: '2024-04-25',
            files: ['웹_프로젝트_명세서.pdf', '예시코드.zip'],
            status: 'pending'
        }
    ];

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

    // 날짜 포맷팅 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}월 ${day}일`;
    }

    // 과제 렌더링 함수
    function renderHomework(filteredData = homeworkData) {
        const homeworkList = document.querySelector('.homework-list');
        homeworkList.innerHTML = '';

        filteredData.forEach(homework => {
            const card = document.createElement('div');
            card.className = 'homework-card';
            card.dataset.id = homework.id;

            card.innerHTML = `
                <div class="homework-header-area">
                    <div class="homework-subject">
                        <span class="subject-tag ${homework.subject}">${getSubjectName(homework.subject)}</span>
                    </div>
                    <h3 class="homework-title">${homework.title}</h3>
                </div>
                <div class="homework-body">
                    <p class="homework-description">${homework.description}</p>
                    ${homework.files.length > 0 ? `
                        <div class="homework-files">
                            ${homework.files.map(file => `
                                <span class="file-item">
                                    <i class="fas fa-file"></i> ${file}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="homework-footer">
                    <div class="deadline">
                        <span class="date">마감: ${formatDate(homework.deadline)}</span>
                        <span class="countdown">${getDaysRemaining(homework.deadline)}</span>
                    </div>
                    <div class="homework-status">
                        ${homework.status === 'completed' ? 
                            `<span class="status-label completed">제출완료</span>` : 
                            `<button class="submit-button" data-id="${homework.id}">제출하기</button>`
                        }
                    </div>
                </div>
            `;

            homeworkList.appendChild(card);
        });

        // 제출하기 버튼 이벤트 리스너 추가
        document.querySelectorAll('.submit-button').forEach(button => {
            button.addEventListener('click', function() {
                const homeworkId = parseInt(this.dataset.id);
                submitHomework(homeworkId);
            });
        });
    }

    // 과제 제출 함수
    function submitHomework(homeworkId) {
        // 실제로는 서버에 제출 처리를 해야 함
        // 여기서는 간단한 상태 변경만 구현
        const homework = homeworkData.find(hw => hw.id === homeworkId);
        if (homework) {
            homework.status = 'completed';
            renderHomework(applyFilters());
            alert('과제가 제출되었습니다!');
        }
    }

    // 필터링 적용 함수
    function applyFilters() {
        const subjectFilter = document.getElementById('subject-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        
        return homeworkData.filter(homework => {
            // 과목 필터링
            if (subjectFilter !== 'all' && homework.subject !== subjectFilter) {
                return false;
            }
            
            // 상태 필터링
            if (statusFilter !== 'all' && homework.status !== statusFilter) {
                return false;
            }
            
            return true;
        });
    }

    // 초기 과제 렌더링
    renderHomework();

    // 필터 변경 이벤트 처리
    document.getElementById('subject-filter').addEventListener('change', function() {
        renderHomework(applyFilters());
    });

    document.getElementById('status-filter').addEventListener('change', function() {
        renderHomework(applyFilters());
    });

    // 과제 추가 버튼 및 모달 기능
    const addBtn = document.getElementById('add-homework');
    const modal = document.getElementById('homework-modal');
    const closeBtn = document.querySelector('.close');
    const homeworkForm = document.getElementById('homework-form');

    // 로그인 상태 체크 (교사만 과제 추가 가능)
    function checkLoginStatus() {
        const userType = localStorage.getItem('userType');
        if (userType === 'teacher') {
            addBtn.style.display = 'block';
        } else {
            addBtn.style.display = 'none';
        }
    }

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 과제 추가 버튼 클릭 시 모달 열기
    addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        
        // 기본 마감일을 1주일 후로 설정
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 7);
        const yyyy = defaultDate.getFullYear();
        const mm = String(defaultDate.getMonth() + 1).padStart(2, '0');
        const dd = String(defaultDate.getDate()).padStart(2, '0');
        document.getElementById('hw-deadline').value = `${yyyy}-${mm}-${dd}`;
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

    // 과제 추가 폼 제출
    homeworkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('hw-title').value;
        const subject = document.getElementById('hw-subject').value;
        const description = document.getElementById('hw-description').value;
        const deadline = document.getElementById('hw-deadline').value;
        const fileInput = document.getElementById('hw-file');
        
        // 파일명 가져오기 (실제로는 서버에 업로드 해야 함)
        let files = [];
        if (fileInput.files.length > 0) {
            files = [fileInput.files[0].name];
        }
        
        // 새 과제 객체 생성
        const newHomework = {
            id: homeworkData.length > 0 ? Math.max(...homeworkData.map(hw => hw.id)) + 1 : 1,
            title,
            subject,
            description,
            deadline,
            files,
            status: 'pending'
        };
        
        // 과제 데이터에 추가
        homeworkData.unshift(newHomework);
        
        // UI 업데이트
        renderHomework(applyFilters());
        
        // 모달 닫기
        modal.style.display = 'none';
        
        // 폼 초기화
        homeworkForm.reset();
        
        alert('새 과제가 등록되었습니다.');
    });
}); 