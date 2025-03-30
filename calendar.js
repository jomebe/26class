document.addEventListener('DOMContentLoaded', function() {
    // 현재 날짜 정보
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    
    // 현재 표시 모드 (월간/목록)
    let currentView = 'month';
    
    // 선택된 카테고리 필터
    let selectedCategories = ['academic', 'exam', 'event', 'holiday', 'class'];
    
    // 학사일정 데이터 (샘플 데이터 - 실제로는 API에서 가져와야 함)
    const events = [
        {
            id: 1,
            title: '입학식',
            date: '2024-03-04',
            category: 'academic',
            description: '2024학년도 신입생 입학식이 대강당에서 진행됩니다.'
        },
        {
            id: 2,
            title: '삼일절',
            date: '2024-03-01',
            category: 'holiday',
            description: '국경일'
        },
        {
            id: 3,
            title: '1학기 중간고사',
            date: '2024-04-15',
            category: 'exam',
            description: '1학기 중간고사가 시작됩니다. 시간표는 별도 공지 예정입니다.'
        },
        {
            id: 4,
            title: '중간고사 종료',
            date: '2024-04-19',
            category: 'exam',
            description: '1학기 중간고사가 종료됩니다.'
        },
        {
            id: 5,
            title: '과학의 날 행사',
            date: '2024-04-21',
            category: 'event',
            description: '과학의 날을 맞아 다양한 과학 관련 행사가 진행됩니다.'
        },
        {
            id: 6,
            title: '학급 봉사활동',
            date: '2024-04-27',
            category: 'class',
            description: '2학년 6반 단체 봉사활동이 진행됩니다. 집합 장소: 학교 정문 09:00'
        },
        {
            id: 7,
            title: '어린이날',
            date: '2024-05-05',
            category: 'holiday',
            description: '공휴일'
        },
        {
            id: 8,
            title: '학교 축제',
            date: '2024-05-20',
            category: 'event',
            description: '선린인터넷고등학교 축제가 진행됩니다.'
        },
        {
            id: 9,
            title: '축제 준비',
            date: '2024-05-19',
            category: 'class',
            description: '학교 축제 준비 - 2학년 6반 담당: 먹거리 부스 운영'
        },
        {
            id: 10,
            title: '부처님 오신 날',
            date: '2024-05-15',
            category: 'holiday',
            description: '공휴일'
        },
        {
            id: 11,
            title: '학부모 상담 주간',
            date: '2024-04-08',
            category: 'academic',
            description: '학부모 상담 주간이 시작됩니다.'
        },
        {
            id: 12,
            title: '학부모 상담 주간 종료',
            date: '2024-04-12',
            category: 'academic',
            description: '학부모 상담 주간이 종료됩니다.'
        },
        {
            id: 13,
            title: '체육대회',
            date: '2024-06-07',
            category: 'event',
            description: '교내 체육대회가 운동장에서 진행됩니다.'
        },
        {
            id: 14,
            title: '1학기 기말고사',
            date: '2024-07-01',
            category: 'exam',
            description: '1학기 기말고사가 시작됩니다.'
        },
        {
            id: 15,
            title: '기말고사 종료',
            date: '2024-07-05',
            category: 'exam',
            description: '1학기 기말고사가 종료됩니다.'
        }
    ];

    // 카테고리명 가져오기 함수
    function getCategoryName(category) {
        const categoryMap = {
            'academic': '학사일정',
            'exam': '시험',
            'event': '행사',
            'holiday': '공휴일',
            'class': '학급일정'
        };
        return categoryMap[category] || '기타';
    }

    // 특정 날짜의 이벤트 필터링 함수
    function getEventsForDate(dateStr) {
        return events.filter(event => {
            return event.date === dateStr && selectedCategories.includes(event.category);
        });
    }

    // 특정 월의 모든 날짜 이벤트 가져오기
    function getEventsForMonth(year, month) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= startDate && eventDate <= endDate && selectedCategories.includes(event.category);
        });
    }

    // 현재 표시할 월 제목 업데이트
    function updateMonthTitle() {
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        document.getElementById('current-month').textContent = `${currentYear}년 ${monthNames[currentMonth]}`;
    }

    // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 월간 캘린더 렌더링 함수
    function renderMonthCalendar() {
        const monthCalendar = document.getElementById('month-calendar');
        
        // 현재 월의 첫날과 마지막 날
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // 이전 달의 마지막 날
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        
        // 첫날의 요일 (0: 일요일, 6: 토요일)
        const firstDayIndex = firstDay.getDay();
        
        // 캘린더 그리드 생성
        let calendarHTML = '<div class="calendar-grid">';
        
        // 요일 헤더
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        days.forEach(day => {
            calendarHTML += `<div class="calendar-header-cell">${day}</div>`;
        });
        
        // 이전 달의 날짜 채우기
        let dayCount = 1;
        for (let i = 0; i < firstDayIndex; i++) {
            const prevDate = prevMonthLastDay - firstDayIndex + i + 1;
            const dateObj = new Date(currentYear, currentMonth - 1, prevDate);
            const dateStr = formatDate(dateObj);
            
            calendarHTML += `
                <div class="calendar-cell other-month">
                    <div class="date-number">${prevDate}</div>
                    <div class="calendar-events"></div>
                </div>
            `;
        }
        
        // 현재 달의 날짜 채우기
        const today = new Date();
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const isToday = 
                currentYear === today.getFullYear() && 
                currentMonth === today.getMonth() && 
                i === today.getDate();
            
            const dateObj = new Date(currentYear, currentMonth, i);
            const dateStr = formatDate(dateObj);
            const dateEvents = getEventsForDate(dateStr);
            
            calendarHTML += `
                <div class="calendar-cell ${isToday ? 'today' : ''}" data-date="${dateStr}">
                    <div class="date-number">${i}</div>
                    <div class="calendar-events">
            `;
            
            // 최대 3개까지만 표시하고 나머지는 "더 보기"로 표시
            const maxDisplayEvents = 3;
            const displayEvents = dateEvents.slice(0, maxDisplayEvents);
            const hiddenEvents = dateEvents.length - maxDisplayEvents;
            
            displayEvents.forEach(event => {
                calendarHTML += `
                    <div class="calendar-event event-${event.category}" data-event-id="${event.id}">
                        ${event.title}
                    </div>
                `;
            });
            
            if (hiddenEvents > 0) {
                calendarHTML += `<div class="more-events" data-date="${dateStr}">+${hiddenEvents}개 더보기</div>`;
            }
            
            calendarHTML += `
                    </div>
                </div>
            `;
        }
        
        // 다음 달의 날짜 채우기
        const totalCells = 42; // 6주 x 7일
        const usedCells = firstDayIndex + lastDay.getDate();
        const nextMonthDays = totalCells - usedCells;
        
        for (let i = 1; i <= nextMonthDays; i++) {
            const dateObj = new Date(currentYear, currentMonth + 1, i);
            const dateStr = formatDate(dateObj);
            
            calendarHTML += `
                <div class="calendar-cell other-month">
                    <div class="date-number">${i}</div>
                    <div class="calendar-events"></div>
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        monthCalendar.innerHTML = calendarHTML;
        
        // 이벤트 클릭 리스너 추가
        document.querySelectorAll('.calendar-event').forEach(eventEl => {
            eventEl.addEventListener('click', function(e) {
                e.stopPropagation();
                const eventId = parseInt(this.dataset.eventId);
                showEventDetail(eventId);
            });
        });
        
        // 더 보기 클릭 리스너 추가
        document.querySelectorAll('.more-events').forEach(moreEl => {
            moreEl.addEventListener('click', function(e) {
                e.stopPropagation();
                const dateStr = this.dataset.date;
                showDateEvents(dateStr);
            });
        });
        
        // 날짜 셀 클릭 리스너 추가 (일정 추가용)
        document.querySelectorAll('.calendar-cell:not(.other-month)').forEach(cellEl => {
            cellEl.addEventListener('click', function() {
                const dateStr = this.dataset.date;
                if (dateStr) {
                    openAddEventModal(dateStr);
                }
            });
        });
    }

    // 목록 뷰 렌더링 함수
    function renderListCalendar() {
        const listCalendar = document.getElementById('list-calendar');
        
        // 현재 월의 이벤트 가져오기
        const monthEvents = getEventsForMonth(currentYear, currentMonth);
        
        // 날짜별로 그룹화
        const eventsByDate = {};
        monthEvents.forEach(event => {
            if (!eventsByDate[event.date]) {
                eventsByDate[event.date] = [];
            }
            eventsByDate[event.date].push(event);
        });
        
        // 날짜순으로 정렬된 키 배열
        const sortedDates = Object.keys(eventsByDate).sort();
        
        if (sortedDates.length === 0) {
            listCalendar.innerHTML = '<div class="no-events">이번 달 일정이 없습니다.</div>';
            return;
        }
        
        let listHTML = '';
        
        sortedDates.forEach(dateStr => {
            const date = new Date(dateStr);
            const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
            const dayName = dayNames[date.getDay()];
            
            listHTML += `
                <div class="event-group">
                    <div class="event-date-header">
                        <span class="date-number-large">${date.getDate()}</span>
                        <span class="date-day">${date.getFullYear()}년 ${date.getMonth() + 1}월 (${dayName})</span>
                    </div>
                    <div class="event-list">
            `;
            
            eventsByDate[dateStr].forEach(event => {
                listHTML += `
                    <div class="event-list-item ${event.category}" data-event-id="${event.id}">
                        <div class="event-list-title">${event.title}</div>
                        <div>
                            <span class="event-list-category ${event.category}">${getCategoryName(event.category)}</span>
                        </div>
                    </div>
                `;
            });
            
            listHTML += `
                    </div>
                </div>
            `;
        });
        
        listCalendar.innerHTML = listHTML;
        
        // 이벤트 클릭 리스너 추가
        document.querySelectorAll('.event-list-item').forEach(eventEl => {
            eventEl.addEventListener('click', function() {
                const eventId = parseInt(this.dataset.eventId);
                showEventDetail(eventId);
            });
        });
    }

    // 캘린더 뷰 전환 함수
    function switchView(view) {
        currentView = view;
        
        if (view === 'month') {
            document.getElementById('month-calendar').style.display = 'block';
            document.getElementById('list-calendar').style.display = 'none';
            document.getElementById('month-view').classList.add('active');
            document.getElementById('list-view').classList.remove('active');
            renderMonthCalendar();
        } else {
            document.getElementById('month-calendar').style.display = 'none';
            document.getElementById('list-calendar').style.display = 'block';
            document.getElementById('month-view').classList.remove('active');
            document.getElementById('list-view').classList.add('active');
            renderListCalendar();
        }
    }

    // 이벤트 상세 정보 표시 함수
    function showEventDetail(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        
        const detailContainer = document.getElementById('event-detail');
        const detailContent = document.getElementById('event-detail-content');
        
        // 날짜 형식화
        const eventDate = new Date(event.date);
        const formattedDate = `${eventDate.getFullYear()}년 ${eventDate.getMonth() + 1}월 ${eventDate.getDate()}일`;
        
        detailContent.innerHTML = `
            <div class="event-detail-header">
                <div class="event-detail-title">${event.title}</div>
                <div class="event-detail-category event-${event.category}">${getCategoryName(event.category)}</div>
            </div>
            <div class="event-detail-date">${formattedDate}</div>
            <div class="event-detail-description">${event.description || '설명이 없습니다.'}</div>
        `;
        
        detailContainer.style.display = 'block';
        
        // 스크롤 위치를 상세 정보로 이동
        detailContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // 특정 날짜의 모든 이벤트 표시 함수
    function showDateEvents(dateStr) {
        const dateEvents = getEventsForDate(dateStr);
        if (dateEvents.length === 0) return;
        
        const date = new Date(dateStr);
        const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        
        const detailContainer = document.getElementById('event-detail');
        const detailContent = document.getElementById('event-detail-content');
        
        let contentHTML = `<h4>${formattedDate} 일정</h4>`;
        
        dateEvents.forEach(event => {
            contentHTML += `
                <div class="event-list-item ${event.category}" data-event-id="${event.id}" style="margin-bottom: 0.8rem;">
                    <div class="event-list-title">${event.title}</div>
                    <div>
                        <span class="event-list-category ${event.category}">${getCategoryName(event.category)}</span>
                    </div>
                </div>
            `;
        });
        
        detailContent.innerHTML = contentHTML;
        detailContainer.style.display = 'block';
        
        // 이벤트 클릭 리스너 추가
        detailContent.querySelectorAll('.event-list-item').forEach(eventEl => {
            eventEl.addEventListener('click', function() {
                const eventId = parseInt(this.dataset.eventId);
                showEventDetail(eventId);
            });
        });
        
        // 스크롤 위치를 상세 정보로 이동
        detailContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // 이벤트 추가 모달 열기 함수
    function openAddEventModal(dateStr) {
        // 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const userType = localStorage.getItem('userType');
        
        // 교사만 일정 추가 가능
        if (!isLoggedIn || userType !== 'teacher') {
            alert('일정 추가는 교사 계정으로만 가능합니다.');
            return;
        }
        
        const modal = document.getElementById('event-modal');
        
        // 선택된 날짜 설정
        document.getElementById('event-date').value = dateStr;
        
        modal.style.display = 'block';
    }

    // 이벤트 추가 함수
    function addEvent(title, date, category, description) {
        const nextId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
        
        const newEvent = {
            id: nextId,
            title,
            date,
            category,
            description
        };
        
        events.push(newEvent);
        
        // 현재 뷰 업데이트
        if (currentView === 'month') {
            renderMonthCalendar();
        } else {
            renderListCalendar();
        }
    }

    // 초기화 함수
    function initialize() {
        // 현재 월 제목 업데이트
        updateMonthTitle();
        
        // 초기 월간 뷰 렌더링
        renderMonthCalendar();
        
        // 이전 달 버튼 클릭 이벤트
        document.getElementById('prev-month').addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateMonthTitle();
            
            if (currentView === 'month') {
                renderMonthCalendar();
            } else {
                renderListCalendar();
            }
        });
        
        // 다음 달 버튼 클릭 이벤트
        document.getElementById('next-month').addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateMonthTitle();
            
            if (currentView === 'month') {
                renderMonthCalendar();
            } else {
                renderListCalendar();
            }
        });
        
        // 뷰 전환 버튼 이벤트
        document.getElementById('month-view').addEventListener('click', function() {
            switchView('month');
        });
        
        document.getElementById('list-view').addEventListener('click', function() {
            switchView('list');
        });
        
        // 카테고리 필터 이벤트
        document.querySelectorAll('input[name="category"]').forEach(input => {
            input.addEventListener('change', function() {
                const category = this.value;
                
                if (this.checked) {
                    // 카테고리 추가
                    if (!selectedCategories.includes(category)) {
                        selectedCategories.push(category);
                    }
                } else {
                    // 카테고리 제거
                    selectedCategories = selectedCategories.filter(c => c !== category);
                }
                
                // 현재 뷰 업데이트
                if (currentView === 'month') {
                    renderMonthCalendar();
                } else {
                    renderListCalendar();
                }
            });
        });
        
        // 일정 상세 정보 닫기 버튼 이벤트
        document.getElementById('close-detail').addEventListener('click', function() {
            document.getElementById('event-detail').style.display = 'none';
        });
        
        // 모달 닫기 버튼 이벤트
        document.querySelector('#event-modal .close').addEventListener('click', function() {
            document.getElementById('event-modal').style.display = 'none';
            document.getElementById('event-form').reset();
        });
        
        // 외부 클릭 시 모달 닫기
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('event-modal');
            if (event.target === modal) {
                modal.style.display = 'none';
                document.getElementById('event-form').reset();
            }
        });
        
        // 이벤트 추가 폼 제출 이벤트
        document.getElementById('event-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('event-title').value;
            const date = document.getElementById('event-date').value;
            const category = document.getElementById('event-category').value;
            const description = document.getElementById('event-description').value;
            
            addEvent(title, date, category, description);
            
            // 모달 닫기 및 폼 초기화
            document.getElementById('event-modal').style.display = 'none';
            document.getElementById('event-form').reset();
            
            alert('일정이 추가되었습니다.');
        });
        
        // 학사일정 API 연동 (실제로는 API 호출 코드가 들어갈 자리)
        // 이 예제에서는 샘플 데이터를 이미 정의해 두었으므로 실제 API 호출은 생략
        console.log('학사일정 API 연동 준비 완료');
    }

    // 애플리케이션 초기화
    initialize();
}); 