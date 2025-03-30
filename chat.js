document.addEventListener('DOMContentLoaded', function() {
    // 채팅 메시지 샘플 데이터 (채널별)
    const channelMessages = {
        'general': [
            {
                id: 1,
                sender: '김철수',
                senderId: 1,
                content: '안녕하세요! 모두 좋은 아침입니다.',
                timestamp: '2024-03-22T08:30:00',
                isSystem: false
            },
            {
                id: 2,
                sender: '이영희',
                senderId: 2,
                content: '안녕하세요~ 오늘 수학 과제 제출일인 거 다들 기억하시죠?',
                timestamp: '2024-03-22T08:32:00',
                isSystem: false
            },
            {
                id: 3,
                sender: '김선생',
                senderId: 'teacher',
                content: '네, 오늘까지입니다. 16시까지 제출해주세요!',
                timestamp: '2024-03-22T08:35:00',
                isSystem: false
            },
            {
                id: 4,
                isSystem: true,
                content: '박민준님이 채팅방에 입장했습니다.',
                timestamp: '2024-03-22T09:00:00'
            },
            {
                id: 5,
                sender: '박민준',
                senderId: 3,
                content: '안녕하세요! 늦게 왔네요. 다들 학교에서 만나요.',
                timestamp: '2024-03-22T09:01:00',
                isSystem: false
            }
        ],
        'notice': [
            {
                id: 1,
                sender: '김선생',
                senderId: 'teacher',
                content: '내일은 교내 코딩 경진대회가 있습니다. 참가 신청한 학생들은 9시까지 정보실에 모여주세요.',
                timestamp: '2024-03-22T10:00:00',
                isSystem: false
            },
            {
                id: 2,
                sender: '김선생',
                senderId: 'teacher',
                content: '다음 주 월요일부터 중간고사 대비 보충수업이 시작됩니다. 시간표는 게시판에 공지했으니 확인 바랍니다.',
                timestamp: '2024-03-22T10:05:00',
                isSystem: false
            }
        ],
        'study': [
            {
                id: 1,
                sender: '이영희',
                senderId: 2,
                content: '수학 문제 풀이 스터디 하실 분 있나요? 오늘 방과후에 도서관에서 모일 예정입니다.',
                timestamp: '2024-03-22T11:00:00',
                isSystem: false
            },
            {
                id: 2,
                sender: '최준호',
                senderId: 8,
                content: '저 참여할게요! 몇 시에 만날까요?',
                timestamp: '2024-03-22T11:02:00',
                isSystem: false
            },
            {
                id: 3,
                sender: '이영희',
                senderId: 2,
                content: '4시에 도서관 2층 스터디룸에서 만나요!',
                timestamp: '2024-03-22T11:05:00',
                isSystem: false
            }
        ],
        'free': [
            {
                id: 1,
                sender: '장우진',
                senderId: 5,
                content: '오늘 점심 메뉴 뭐였죠?',
                timestamp: '2024-03-22T12:30:00',
                isSystem: false
            },
            {
                id: 2,
                sender: '김지훈',
                senderId: 9,
                content: '돈까스와 미역국, 그리고 김치입니다!',
                timestamp: '2024-03-22T12:31:00',
                isSystem: false
            },
            {
                id: 3,
                sender: '장우진',
                senderId: 5,
                content: '감사합니다! 배고파서 빨리 먹으러 가야겠어요 ㅎㅎ',
                timestamp: '2024-03-22T12:32:00',
                isSystem: false
            }
        ]
    };

    // 온라인 사용자 샘플 데이터
    const onlineUsers = [
        { id: 1, name: '김철수', avatar: 'images/members/student1.jpg' },
        { id: 2, name: '이영희', avatar: 'images/members/student2.jpg' },
        { id: 3, name: '박민준', avatar: 'images/members/student3.jpg' },
        { id: 'teacher', name: '김선생', avatar: 'images/members/teacher.jpg' }
    ];

    // 현재 선택된 채널
    let currentChannel = 'general';
    
    // 로그인 상태 및 사용자 정보
    let isLoggedIn = false;
    let currentUser = null;

    // 로그인 상태 확인 함수
    function checkLoginStatus() {
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        isLoggedIn = userLoggedIn === 'true';
        
        if (isLoggedIn) {
            // 로그인 된 사용자 정보 가져오기
            const userName = localStorage.getItem('userName');
            const userType = localStorage.getItem('userType');
            
            currentUser = {
                name: userName,
                type: userType,
                id: userType === 'teacher' ? 'teacher' : 1 // 데모에서는 ID 1로 설정
            };
            
            // UI 업데이트
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-status').innerHTML = `
                <span class="status-indicator online"></span>
                <span class="status-text">온라인</span>
            `;
            
            // 아바타 이미지 설정 (실제로는 사용자 프로필에서 가져와야 함)
            const avatarSrc = userType === 'teacher' ? 'images/members/teacher.jpg' : 'images/members/student1.jpg';
            document.getElementById('user-avatar').src = avatarSrc;
            
            // 채팅 입력 활성화
            document.getElementById('chat-input').disabled = false;
            document.getElementById('send-button').disabled = false;
            document.getElementById('login-notice').style.display = 'none';
        } else {
            // 로그아웃 상태 UI
            document.getElementById('user-name').textContent = '로그인 필요';
            document.getElementById('user-status').innerHTML = `
                <span class="status-indicator offline"></span>
                <span class="status-text">오프라인</span>
            `;
            
            // 기본 아바타 이미지
            document.getElementById('user-avatar').src = 'images/default-avatar.jpg';
            
            // 채팅 입력 비활성화
            document.getElementById('chat-input').disabled = true;
            document.getElementById('send-button').disabled = true;
            document.getElementById('login-notice').style.display = 'block';
        }
    }

    // 온라인 사용자 목록 렌더링 함수
    function renderOnlineUsers() {
        const usersList = document.getElementById('online-users-list');
        usersList.innerHTML = '';
        
        onlineUsers.forEach(user => {
            const userEl = document.createElement('li');
            userEl.className = 'online-user';
            
            userEl.innerHTML = `
                <span class="user-status-dot"></span>
                <span class="user-name">${user.name}</span>
            `;
            
            usersList.appendChild(userEl);
        });
    }

    // 채팅 메시지 렌더링 함수
    function renderMessages(channel = currentChannel) {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '';
        
        if (!channelMessages[channel] || channelMessages[channel].length === 0) {
            messagesContainer.innerHTML = `
                <div class="welcome-message">
                    <h3>${getChannelName(channel)}에 오신 것을 환영합니다!</h3>
                    <p>아직 메시지가 없습니다. 첫 메시지를 보내보세요!</p>
                </div>
            `;
            return;
        }
        
        // 메시지 목록 렌더링
        channelMessages[channel].forEach(message => {
            if (message.isSystem) {
                // 시스템 메시지
                const systemMsgEl = document.createElement('div');
                systemMsgEl.className = 'system-message';
                
                systemMsgEl.innerHTML = `
                    <span class="system-message-content">${message.content}</span>
                `;
                
                messagesContainer.appendChild(systemMsgEl);
            } else {
                // 일반 메시지
                const isOutgoing = isLoggedIn && (
                    (currentUser.type === 'teacher' && message.senderId === 'teacher') ||
                    (currentUser.type === 'student' && message.senderId === 1) // 데모에서는 ID 1로 설정
                );
                
                const messageEl = document.createElement('div');
                messageEl.className = `message message-${isOutgoing ? 'outgoing' : 'incoming'}`;
                
                const formattedTime = formatMessageTime(message.timestamp);
                
                messageEl.innerHTML = `
                    <div class="message-bubble">
                        ${!isOutgoing ? `<div class="message-header">
                            <span class="message-sender">${message.sender}</span>
                        </div>` : ''}
                        <div class="message-content">${message.content}</div>
                        <div class="message-time">${formattedTime}</div>
                    </div>
                `;
                
                messagesContainer.appendChild(messageEl);
            }
        });
        
        // 스크롤을 가장 아래로 이동
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 메시지 시간 포맷팅 함수
    function formatMessageTime(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${ampm} ${hours}:${minutes}`;
    }

    // 채널 이름 가져오기 함수
    function getChannelName(channelId) {
        const channelMap = {
            'general': '전체 채팅',
            'notice': '공지사항',
            'study': '스터디',
            'free': '자유 채팅'
        };
        return channelMap[channelId] || channelId;
    }

    // 채팅 메시지 전송 함수
    function sendMessage(text) {
        if (!isLoggedIn || !text.trim()) return;
        
        // 현재 시간
        const now = new Date().toISOString();
        
        // 새 메시지 객체 생성
        const newMessage = {
            id: channelMessages[currentChannel].length + 1,
            sender: currentUser.name,
            senderId: currentUser.id,
            content: text.trim(),
            timestamp: now,
            isSystem: false
        };
        
        // 채널 메시지에 추가
        channelMessages[currentChannel].push(newMessage);
        
        // UI 업데이트
        renderMessages();
        
        // 입력창 초기화
        document.getElementById('chat-input').value = '';
    }

    // 초기화 함수
    function initialize() {
        // 로그인 상태 확인
        checkLoginStatus();
        
        // 온라인 사용자 목록 렌더링
        renderOnlineUsers();
        
        // 메시지 렌더링
        renderMessages();
        
        // 채널 버튼 이벤트 리스너 추가
        document.querySelectorAll('.channel').forEach(channelEl => {
            channelEl.addEventListener('click', function() {
                const channelId = this.dataset.channel;
                
                // 활성 채널 변경
                document.querySelectorAll('.channel').forEach(ch => {
                    ch.classList.remove('active');
                });
                this.classList.add('active');
                
                // 현재 채널 업데이트
                currentChannel = channelId;
                document.getElementById('current-channel-name').textContent = getChannelName(channelId);
                
                // 메시지 렌더링
                renderMessages();
            });
        });
        
        // 메시지 전송 이벤트 리스너
        document.getElementById('chat-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const messageText = document.getElementById('chat-input').value;
            sendMessage(messageText);
        });
        
        // 채팅 지우기 버튼 이벤트 리스너
        document.getElementById('clear-chat').addEventListener('click', function() {
            const messagesContainer = document.getElementById('chat-messages');
            messagesContainer.innerHTML = '';
            
            // 시스템 메시지 추가
            const systemMsg = {
                isSystem: true,
                content: '채팅이 지워졌습니다.',
                timestamp: new Date().toISOString()
            };
            
            // 기존 메시지 목록 저장 (실제로는 삭제하면 안됨)
            // const savedMessages = [...channelMessages[currentChannel]];
            
            // 채널 메시지 초기화 및 시스템 메시지 추가
            channelMessages[currentChannel] = [systemMsg];
            
            // UI 업데이트
            renderMessages();
        });
    }

    // 애플리케이션 초기화
    initialize();
}); 