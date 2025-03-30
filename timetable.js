document.addEventListener('DOMContentLoaded', function() {
    // 시간표 데이터 (2차원 배열: [요일][교시])
    const timetableData = [
        [ // 월요일
            { subject: 'math', name: '수학', teacher: '이수학', note: '' },
            { subject: 'korean', name: '국어', teacher: '김국어', note: '' },
            { subject: 'english', name: '영어', teacher: '박영어', note: '모의고사' },
            { subject: 'science', name: '과학', teacher: '최과학', note: '' },
            { subject: 'programming', name: '프로그래밍', teacher: '정코딩', note: '' },
            { subject: 'history', name: '역사', teacher: '한역사', note: '' },
            { subject: 'pe', name: '체육', teacher: '강체육', note: '' }
        ],
        [ // 화요일
            { subject: 'science', name: '과학', teacher: '최과학', note: '수행평가' },
            { subject: 'programming', name: '프로그래밍', teacher: '정코딩', note: '' },
            { subject: 'programming', name: '프로그래밍', teacher: '정코딩', note: '' },
            { subject: 'math', name: '수학', teacher: '이수학', note: '' },
            { subject: 'english', name: '영어', teacher: '박영어', note: '' },
            { subject: 'korean', name: '국어', teacher: '김국어', note: '' },
            { subject: 'etc', name: '자율학습', teacher: '담임', note: '' }
        ],
        [ // 수요일
            { subject: 'history', name: '역사', teacher: '한역사', note: '' },
            { subject: 'math', name: '수학', teacher: '이수학', note: '' },
            { subject: 'science', name: '과학', teacher: '최과학', note: '' },
            { subject: 'english', name: '영어', teacher: '박영어', note: '' },
            { subject: 'korean', name: '국어', teacher: '김국어', note: '' },
            { subject: 'programming', name: '프로그래밍', teacher: '정코딩', note: '실습' },
            { subject: 'programming', name: '프로그래밍', teacher: '정코딩', note: '실습' }
        ],
        [ // 목요일
            { subject: 'programming', name: '프로그래밍', teacher: '정코딩', note: '' },
            { subject: 'science', name: '과학', teacher: '최과학', note: '' },
            { subject: 'math', name: '수학', teacher: '이수학', note: '수행평가' },
            { subject: 'pe', name: '체육', teacher: '강체육', note: '' },
            { subject: 'english', name: '영어', teacher: '박영어', note: '' },
            { subject: 'korean', name: '국어', teacher: '김국어', note: '' },
            { subject: 'history', name: '역사', teacher: '한역사', note: '' }
        ],
        [ // 금요일
            { subject: 'korean', name: '국어', teacher: '김국어', note: '' },
            { subject: 'math', name: '수학', teacher: '이수학', note: '' },
            { subject: 'english', name: '영어', teacher: '박영어', note: '' },
            { subject: 'history', name: '역사', teacher: '한역사', note: '' },
            { subject: 'pe', name: '체육', teacher: '강체육', note: '' },
            { subject: 'science', name: '과학', teacher: '최과학', note: '' },
            { subject: 'etc', name: '동아리', teacher: '담당교사', note: '' }
        ]
    ];

    // 학사일정 특이사항 데이터
    const scheduleNotes = [
        { date: '2024-04-15', type: 'exam', content: '중간고사 시작' },
        { date: '2024-04-10', type: 'assignment', content: '수학 과제 제출' },
        { date: '2024-04-05', type: 'event', content: '과학의 날 행사' },
        { date: '2024-04-20', type: 'exam', content: '영어 모의고사' },
        { date: '2024-03-30', type: 'assignment', content: '프로그래밍 프로젝트 발표' }
    ];

    // 시간표 렌더링 함수
    function renderTimetable() {
        const timetableBody = document.querySelector('.timetable tbody');
        timetableBody.innerHTML = '';

        // 7교시까지 생성
        for (let period = 1; period <= 7; period++) {
            const row = document.createElement('tr');
            
            // 교시 열 추가
            const periodCell = document.createElement('th');
            periodCell.textContent = `${period}교시`;
            row.appendChild(periodCell);
            
            // 월~금 데이터 추가
            for (let day = 0; day < 5; day++) {
                const dayCell = document.createElement('td');
                const subjectData = timetableData[day][period-1];
                
                if (subjectData) {
                    const cellDiv = document.createElement('div');
                    cellDiv.className = `cell ${subjectData.subject}`;
                    
                    cellDiv.innerHTML = `
                        <div class="subject">${subjectData.name}</div>
                        <div class="teacher">${subjectData.teacher}</div>
                        ${subjectData.note ? `<div class="note">${subjectData.note}</div>` : ''}
                    `;
                    
                    dayCell.appendChild(cellDiv);
                }
                
                row.appendChild(dayCell);
            }
            
            timetableBody.appendChild(row);
        }
    }

    // 학사일정 특이사항 렌더링 함수
    function renderScheduleNotes() {
        const notesList = document.getElementById('schedule-notes-list');
        notesList.innerHTML = '';

        // 날짜순으로 정렬
        const sortedNotes = [...scheduleNotes].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        sortedNotes.forEach(note => {
            const li = document.createElement('li');
            const dateObj = new Date(note.date);
            const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
            
            li.innerHTML = `
                <span class="note-date">${formattedDate}</span>
                <span class="note-type ${note.type}">${getTypeLabel(note.type)}</span>
                <span class="note-content">${note.content}</span>
            `;
            
            notesList.appendChild(li);
        });
    }

    // 일정 유형 라벨 가져오기
    function getTypeLabel(type) {
        const typeMap = {
            'exam': '시험',
            'assignment': '과제',
            'event': '행사'
        };
        return typeMap[type] || '기타';
    }

    // 초기 렌더링
    renderTimetable();
    renderScheduleNotes();

    // 시간표 편집 기능
    const editBtn = document.getElementById('edit-timetable');
    const modal = document.getElementById('timetable-modal');
    const closeBtn = document.querySelector('.close');
    const timetableForm = document.getElementById('timetable-form');

    // 로그인 상태 체크 (교사만 편집 가능)
    function checkLoginStatus() {
        const userType = localStorage.getItem('userType');
        if (userType === 'teacher') {
            editBtn.style.display = 'block';
        } else {
            editBtn.style.display = 'none';
        }
    }

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 편집 버튼 클릭 시 모달 열기
    editBtn.addEventListener('click', function() {
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

    // 시간표 편집 폼 제출
    timetableForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const day = parseInt(document.getElementById('day-select').value);
        const period = parseInt(document.getElementById('period-select').value);
        const subject = document.getElementById('subject-select').value;
        const teacher = document.getElementById('teacher-input').value;
        const note = document.getElementById('note-input').value;
        
        // 과목 이름 맵핑
        const subjectNameMap = {
            'math': '수학',
            'korean': '국어',
            'english': '영어',
            'science': '과학',
            'history': '역사',
            'programming': '프로그래밍',
            'pe': '체육',
            'etc': '기타'
        };
        
        // 시간표 데이터 업데이트
        timetableData[day][period-1] = {
            subject: subject,
            name: subjectNameMap[subject],
            teacher: teacher,
            note: note
        };
        
        // UI 업데이트
        renderTimetable();
        
        // 모달 닫기
        modal.style.display = 'none';
        
        alert('시간표가 수정되었습니다.');
    });
}); 