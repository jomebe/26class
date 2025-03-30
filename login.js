document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const registerLink = document.getElementById('register');

    // 로그인 폼 제출 처리
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;
        
        // 여기서는 간단한 예시 구현만 함 (실제로는 서버에 요청)
        if(userType === 'student') {
            // 학생 로그인 로직
            if(username === '2206' && password === 'password') {
                alert('학생으로 로그인 성공!');
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userType', 'student');
                localStorage.setItem('userName', '홍길동');
                window.location.href = 'index.html';
            } else {
                alert('로그인 실패. 학번과 비밀번호를 확인해주세요.');
            }
        } else {
            // 교사 로그인 로직
            if(username === 'teacher' && password === 'admin') {
                alert('교사로 로그인 성공!');
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userType', 'teacher');
                localStorage.setItem('userName', '김선생');
                window.location.href = 'index.html';
            } else {
                alert('로그인 실패. 아이디와 비밀번호를 확인해주세요.');
            }
        }
    });

    // 비밀번호 찾기 링크
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('비밀번호 찾기 기능은 준비 중입니다. 담임 선생님께 문의해주세요.');
    });

    // 회원가입 링크
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('회원가입은 담임 선생님을 통해 가능합니다.');
    });
}); 