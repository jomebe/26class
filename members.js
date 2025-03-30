document.addEventListener('DOMContentLoaded', function() {
    // 학생 샘플 데이터
    const students = [
        {
            id: 1,
            name: '김철수',
            number: '2206',
            role: 'class-president',
            roleLabel: '반장',
            specialty: ['프로그래밍', '수학'],
            avatar: 'images/members/student1.jpg',
            bio: '안녕하세요, 2학년 6반 반장 김철수입니다. 프로그래밍과 수학에 관심이 많고, 반 친구들을 위해 항상 노력하고 있습니다. 궁금한 점이나 도움이 필요하면 언제든지 말씀해주세요!',
            contact: {
                email: 'student1@sunrin.high.kr',
                social: '@student1'
            }
        },
        {
            id: 2,
            name: '이영희',
            number: '2207',
            role: 'vice-president',
            roleLabel: '부반장',
            specialty: ['디자인', '영어'],
            avatar: 'images/members/student2.jpg',
            bio: '안녕하세요, 2학년 6반 부반장 이영희입니다. 디자인과 영어를 좋아하고, UI/UX 디자인에 관심이 많습니다. 반장님과 함께 우리 반을 더 좋은 공동체로 만들겠습니다.',
            contact: {
                email: 'student2@sunrin.high.kr',
                social: '@student2'
            }
        },
        {
            id: 3,
            name: '박민준',
            number: '2208',
            role: 'treasurer',
            roleLabel: '회계',
            specialty: ['경제', '회계'],
            avatar: 'images/members/student3.jpg',
            bio: '2학년 6반 회계 담당 박민준입니다. 경제와 회계에 관심이 많고, 학급비를 투명하게 관리하고 있습니다. 학급비 관련 문의사항은 저에게 연락주세요.',
            contact: {
                email: 'student3@sunrin.high.kr',
                social: '@student3'
            }
        },
        {
            id: 4,
            name: '정다희',
            number: '2209',
            role: 'class-rep',
            roleLabel: '학급대표',
            specialty: ['토론', '리더십'],
            avatar: 'images/members/student4.jpg',
            bio: '학급대표 정다희입니다. 토론과 리더십 활동을 좋아하며, 우리 반의 의견을 잘 대변하기 위해 노력하고 있습니다. 학교 행사나 대회에 관한 정보가 필요하면 언제든 물어보세요.',
            contact: {
                email: 'student4@sunrin.high.kr',
                social: '@student4'
            }
        },
        {
            id: 5,
            name: '장우진',
            number: '2210',
            role: '',
            roleLabel: '',
            specialty: ['체육', '축구'],
            avatar: 'images/members/student5.jpg',
            bio: '축구를 좋아하는 장우진입니다. 교내 축구부 활동을 하고 있고, 체육 대회에서 우리 반을 대표해 열심히 뛰겠습니다. 함께 운동하고 싶은 친구들은 연락주세요!',
            contact: {
                email: 'student5@sunrin.high.kr',
                social: '@student5'
            }
        },
        {
            id: 6,
            name: '송미나',
            number: '2211',
            role: '',
            roleLabel: '',
            specialty: ['음악', '피아노'],
            avatar: 'images/members/student6.jpg',
            bio: '피아노를 전공하고 있는 송미나입니다. 음악을 좋아하고, 교내 음악 동아리에서 활동 중입니다. 축제나 행사에서 반 공연을 담당하고 있으니 관련 문의는 저에게 해주세요.',
            contact: {
                email: 'student6@sunrin.high.kr',
                social: '@student6'
            }
        },
        {
            id: 7,
            name: '한지민',
            number: '2212',
            role: '',
            roleLabel: '',
            specialty: ['미술', '일러스트'],
            avatar: 'images/members/student7.jpg',
            bio: '그림 그리기를 좋아하는 한지민입니다. 일러스트레이션과 디지털 아트에 관심이 많고, 학급 게시판과 행사 포스터 디자인을 맡고 있습니다. 디자인이 필요하면 언제든 말씀해주세요.',
            contact: {
                email: 'student7@sunrin.high.kr',
                social: '@student7'
            }
        },
        {
            id: 8,
            name: '최준호',
            number: '2213',
            role: '',
            roleLabel: '',
            specialty: ['과학', '로봇공학'],
            avatar: 'images/members/student8.jpg',
            bio: '과학과 로봇공학에 관심이 많은 최준호입니다. 교내 과학 동아리 활동을 하고 있으며, 로봇 경진대회에 출전한 경험이 있습니다. 과학 관련 질문이나 로봇 만들기에 관심 있는 친구들은 언제든 환영해요!',
            contact: {
                email: 'student8@sunrin.high.kr',
                social: '@student8'
            }
        },
        {
            id: 9,
            name: '김지훈',
            number: '2214',
            role: '',
            roleLabel: '',
            specialty: ['웹개발', '자바스크립트'],
            avatar: 'images/members/student9.jpg',
            bio: '웹 개발을 좋아하는 김지훈입니다. JavaScript와 React를 주로 사용하며, 이 학급 웹사이트 개발에도 참여했습니다. 코딩에 관심 있거나 웹사이트 관련 문의가 있으면 연락주세요.',
            contact: {
                email: 'student9@sunrin.high.kr',
                social: '@student9'
            }
        },
        {
            id: 10,
            name: '이서연',
            number: '2215',
            role: '',
            roleLabel: '',
            specialty: ['영상편집', '사진'],
            avatar: 'images/members/student10.jpg',
            bio: '영상 편집과 사진 촬영에 관심이 많은 이서연입니다. 교내 방송부에서 활동하고 있으며, 우리 반 행사 기록을 담당하고 있습니다. 좋은 추억을 남기기 위해 항상 노력하겠습니다!',
            contact: {
                email: 'student10@sunrin.high.kr',
                social: '@student10'
            }
        }
    ];

    // 역할별 라벨 가져오기
    function getRoleLabel(role) {
        const roleMap = {
            'class-president': '반장',
            'vice-president': '부반장',
            'treasurer': '회계',
            'class-rep': '학급대표'
        };
        return roleMap[role] || '';
    }

    // 자리 배치도 셀 수를 6x6으로 설정
    const totalSeats = 36;
    
    // 자리 배치도 렌더링 함수
    function renderSeatingPlan() {
        const classroomGrid = document.querySelector('.classroom-grid');
        classroomGrid.innerHTML = '';
        
        // 학생 목록 섞기 (자리 배치 랜덤화)
        const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
        
        // 36개 자리 생성
        for (let i = 0; i < totalSeats; i++) {
            const seat = document.createElement('div');
            
            if (i < shuffledStudents.length) {
                // 학생이 있는 자리
                const student = shuffledStudents[i];
                seat.className = 'seat';
                seat.dataset.id = student.id;
                
                seat.innerHTML = `
                    <div class="student-name">${student.name}</div>
                    <div class="student-number">${student.number}</div>
                `;
            } else {
                // 빈 자리
                seat.className = 'seat empty';
                seat.innerHTML = '<div class="empty-text">빈자리</div>';
            }
            
            classroomGrid.appendChild(seat);
        }
        
        // 자리 클릭 이벤트 (학생 정보 표시)
        document.querySelectorAll('.seat:not(.empty)').forEach(seat => {
            seat.addEventListener('click', function() {
                const studentId = parseInt(this.dataset.id);
                openStudentDetail(studentId);
            });
        });
    }

    // 학생 목록 렌더링 함수
    function renderStudentsList(filteredStudents = students) {
        const studentsList = document.querySelector('.students-list');
        studentsList.innerHTML = '';
        
        filteredStudents.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'student-card';
            studentCard.dataset.id = student.id;
            
            // 학생 카드 이니셜 생성 (아바타 이미지가 없을 경우)
            const initial = student.name.charAt(0);
            
            studentCard.innerHTML = `
                <div class="student-header">
                    <div class="student-avatar">
                        ${student.avatar ? 
                            `<img src="${student.avatar}" alt="${student.name}">` : 
                            initial}
                    </div>
                    <div class="student-basic-info">
                        <h3>${student.name}</h3>
                        <div class="student-number">${student.number}</div>
                    </div>
                </div>
                <div class="student-body">
                    ${student.role ? 
                        `<div class="student-role role-${student.role}">${student.roleLabel || getRoleLabel(student.role)}</div>` : 
                        ''}
                    <div class="student-specialty">전문 분야: ${student.specialty.join(', ')}</div>
                </div>
            `;
            
            studentsList.appendChild(studentCard);
        });
        
        // 학생 카드 클릭 이벤트 (상세 정보 모달)
        document.querySelectorAll('.student-card').forEach(card => {
            card.addEventListener('click', function() {
                const studentId = parseInt(this.dataset.id);
                openStudentDetail(studentId);
            });
        });
    }

    // 학생 상세 정보 모달 열기 함수
    function openStudentDetail(studentId) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        
        const modal = document.getElementById('student-modal');
        const detailContainer = document.querySelector('.student-detail-container');
        
        // 학생 이니셜 생성 (아바타 이미지가 없을 경우)
        const initial = student.name.charAt(0);
        
        detailContainer.innerHTML = `
            <div class="student-detail-avatar">
                ${student.avatar ? 
                    `<img src="${student.avatar}" alt="${student.name}">` : 
                    `<div class="student-avatar-placeholder">${initial}</div>`}
            </div>
            <div class="student-detail-info">
                <div class="student-detail-header">
                    <h3>${student.name}</h3>
                    <div class="student-detail-meta">
                        <div class="student-number">학번: ${student.number}</div>
                        ${student.role ? 
                            `<div class="student-detail-role role-${student.role}">${student.roleLabel || getRoleLabel(student.role)}</div>` : 
                            ''}
                    </div>
                </div>
                
                <div class="student-detail-section">
                    <h4>전문 분야</h4>
                    <div class="student-detail-specialty">
                        ${student.specialty.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
                    </div>
                </div>
                
                <div class="student-detail-section">
                    <h4>자기소개</h4>
                    <div class="student-detail-bio">
                        ${student.bio}
                    </div>
                </div>
                
                <div class="student-detail-section">
                    <h4>연락처</h4>
                    <div class="student-detail-contact">
                        <p><strong>이메일:</strong> ${student.contact.email}</p>
                        ${student.contact.social ? 
                            `<p><strong>소셜:</strong> ${student.contact.social}</p>` : 
                            ''}
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // 초기 자리 배치도 및 학생 목록 렌더링
    renderSeatingPlan();
    renderStudentsList();

    // 자리 섞기 버튼 이벤트
    document.getElementById('random-seats').addEventListener('click', function() {
        renderSeatingPlan();
    });

    // 학생 검색 기능
    document.getElementById('student-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterAndRenderStudents();
    });

    // 역할 필터 변경 이벤트
    document.getElementById('role-filter').addEventListener('change', function() {
        filterAndRenderStudents();
    });

    // 학생 필터링 및 렌더링 함수
    function filterAndRenderStudents() {
        const searchTerm = document.getElementById('student-search').value.toLowerCase().trim();
        const roleFilter = document.getElementById('role-filter').value;
        
        // 필터링 적용
        const filteredStudents = students.filter(student => {
            // 이름 검색 필터
            if (searchTerm && !student.name.toLowerCase().includes(searchTerm)) {
                return false;
            }
            
            // 역할 필터
            if (roleFilter !== 'all' && student.role !== roleFilter) {
                return false;
            }
            
            return true;
        });
        
        renderStudentsList(filteredStudents);
    }

    // 모달 닫기 버튼 이벤트
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('student-modal').style.display = 'none';
    });

    // 외부 클릭 시 모달 닫기
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('student-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('student-modal').style.display = 'none';
        }
    });
}); 