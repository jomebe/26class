// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 최근 공지사항 예시 데이터
    const notices = [
        {
            title: '3월 교내 대회 안내',
            date: '2024-03-15',
            content: '3월 25일부터 시작하는 교내 코딩 경진대회 참가 신청을 받습니다.'
        },
        {
            title: '중간고사 시간표 안내',
            date: '2024-03-10',
            content: '4월 중간고사 시간표가 공지되었습니다.'
        },
        {
            title: '동아리 발표회 일정',
            date: '2024-03-05',
            content: '동아리 발표회가 5월 첫째 주에 예정되어 있습니다.'
        }
    ];
    
    // 공지사항 목록 렌더링
    const noticeList = document.querySelector('.notice-list');
    if (noticeList) {
        notices.forEach(notice => {
            const noticeItem = document.createElement('div');
            noticeItem.className = 'notice-item';
            
            noticeItem.innerHTML = `
                <h3>${notice.title}</h3>
                <span class="date">${notice.date}</span>
                <p>${notice.content}</p>
            `;
            
            noticeList.appendChild(noticeItem);
        });
    }
    
    // 현재 날짜 기준으로 캘린더 초기화 (예시)
    initCalendar();
});

// 캘린더 초기화 함수
function initCalendar() {
    const calendar = document.querySelector('.calendar');
    if (!calendar) return;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // 이벤트 예시 데이터
    const events = [
        { date: '2024-04-10', title: '과학의 날 행사' },
        { date: '2024-04-15', title: '중간고사 시작' },
        { date: '2024-04-25', title: '프로그래밍 실습 발표' }
    ];
    
    // 간단한 이벤트 목록 표시 (실제 캘린더 대신)
    let calendarHTML = '<div class="event-list">';
    events.forEach(event => {
        const eventDate = new Date(event.date);
        calendarHTML += `
            <div class="event-item">
                <div class="event-date">${eventDate.getMonth() + 1}월 ${eventDate.getDate()}일</div>
                <div class="event-title">${event.title}</div>
            </div>
        `;
    });
    calendarHTML += '</div>';
    
    calendar.innerHTML = calendarHTML;
} 