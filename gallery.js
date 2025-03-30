document.addEventListener('DOMContentLoaded', function() {
    // 앨범 데이터
    const albums = [
        {
            id: 'field-trip',
            title: '수학여행',
            coverImage: 'images/gallery/field-trip-cover.jpg',
            count: 12
        },
        {
            id: 'festival',
            title: '축제',
            coverImage: 'images/gallery/festival-cover.jpg',
            count: 8
        },
        {
            id: 'sports-day',
            title: '체육대회',
            coverImage: 'images/gallery/sports-day-cover.jpg',
            count: 15
        },
        {
            id: 'class',
            title: '학급활동',
            coverImage: 'images/gallery/class-cover.jpg',
            count: 10
        }
    ];

    // 사진 데이터
    const photos = [
        // 수학여행 사진들
        {
            id: 1,
            album: 'field-trip',
            title: '부산 해운대 단체사진',
            description: '수학여행 첫째 날, 해운대에서 반 친구들과 함께',
            date: '2024-03-20',
            image: 'images/gallery/field-trip/photo1.jpg',
            likes: 24,
            comments: [
                { author: '김철수', date: '2024-03-21', text: '다들 햇빛 때문에 눈 감고 있네요 ㅋㅋ' },
                { author: '이영희', date: '2024-03-21', text: '다음에는 그늘에서 찍어요!' }
            ]
        },
        {
            id: 2,
            album: 'field-trip',
            title: '용궁사 방문',
            description: '용궁사에서 소원 빌기',
            date: '2024-03-20',
            image: 'images/gallery/field-trip/photo2.jpg',
            likes: 18,
            comments: []
        },
        {
            id: 3,
            album: 'field-trip',
            title: '호텔 저녁 식사',
            description: '수학여행 첫날 저녁, 뷔페에서',
            date: '2024-03-20',
            image: 'images/gallery/field-trip/photo3.jpg',
            likes: 15,
            comments: [
                { author: '박민준', date: '2024-03-21', text: '음식이 정말 맛있었어요!' }
            ]
        },
        
        // 축제 사진들
        {
            id: 4,
            album: 'festival',
            title: '축제 공연 준비',
            description: '학교 축제 준비 중인 우리 반',
            date: '2024-05-10',
            image: 'images/gallery/festival/photo1.jpg',
            likes: 30,
            comments: []
        },
        {
            id: 5,
            album: 'festival',
            title: '댄스 공연',
            description: '우리 반 댄스팀의 열정적인 무대',
            date: '2024-05-12',
            image: 'images/gallery/festival/photo2.jpg',
            likes: 42,
            comments: [
                { author: '정다희', date: '2024-05-13', text: '연습한 보람이 있네요! 정말 멋졌어요!' },
                { author: '김선생', date: '2024-05-13', text: '모두들 열심히 준비한 만큼 멋진 공연이었습니다.' }
            ]
        },
        
        // 체육대회 사진들
        {
            id: 6,
            album: 'sports-day',
            title: '체육대회 개회식',
            description: '2024 선린인터넷고 체육대회 시작!',
            date: '2024-04-05',
            image: 'images/gallery/sports-day/photo1.jpg',
            likes: 25,
            comments: []
        },
        {
            id: 7,
            album: 'sports-day',
            title: '계주 경기',
            description: '남자 400m 계주에서 1등한 우리 반!',
            date: '2024-04-05',
            image: 'images/gallery/sports-day/photo2.jpg',
            likes: 38,
            comments: [
                { author: '장우진', date: '2024-04-06', text: '마지막 주자 엄청 빨랐어요!' }
            ]
        },
        
        // 학급활동 사진들
        {
            id: 8,
            album: 'class',
            title: '생일 파티',
            description: '3월 생일인 친구들 축하파티',
            date: '2024-03-30',
            image: 'images/gallery/class/photo1.jpg',
            likes: 27,
            comments: []
        },
        {
            id: 9,
            album: 'class',
            title: '단체 봉사활동',
            description: '지역 복지센터 방문 봉사',
            date: '2024-04-15',
            image: 'images/gallery/class/photo2.jpg',
            likes: 33,
            comments: [
                { author: '김지훈', date: '2024-04-16', text: '보람찬 하루였어요!' },
                { author: '송미나', date: '2024-04-16', text: '다음에도 꼭 참여하고 싶어요.' }
            ]
        }
    ];

    // 앨범에 대한 실제 사진 수 계산 함수
    function updateAlbumCounts() {
        albums.forEach(album => {
            album.count = photos.filter(photo => photo.album === album.id).length;
        });
    }

    // 앨범 렌더링 함수
    function renderAlbums() {
        const albumList = document.querySelector('.album-list');
        albumList.innerHTML = '';

        // 전체 앨범 옵션 추가
        const allAlbum = document.createElement('div');
        allAlbum.className = 'album-item active';
        allAlbum.dataset.album = 'all';
        
        allAlbum.innerHTML = `
            <div class="album-cover" style="background-image: url('images/gallery/all-photos.jpg')"></div>
            <div class="album-info">
                <div class="album-title">전체 사진</div>
                <div class="album-count">${photos.length}장</div>
            </div>
        `;
        
        albumList.appendChild(allAlbum);

        // 각 앨범 렌더링
        albums.forEach(album => {
            const albumEl = document.createElement('div');
            albumEl.className = 'album-item';
            albumEl.dataset.album = album.id;
            
            albumEl.innerHTML = `
                <div class="album-cover" style="background-image: url('${album.coverImage}')"></div>
                <div class="album-info">
                    <div class="album-title">${album.title}</div>
                    <div class="album-count">${album.count}장</div>
                </div>
            `;
            
            albumList.appendChild(albumEl);
        });

        // 앨범 클릭 이벤트 처리
        document.querySelectorAll('.album-item').forEach(albumEl => {
            albumEl.addEventListener('click', function() {
                const albumId = this.dataset.album;
                
                // 선택된 앨범 활성화
                document.querySelectorAll('.album-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                
                // 앨범 필터 업데이트
                document.getElementById('album-filter').value = albumId;
                
                // 사진 필터링 및 렌더링
                filterAndRenderPhotos(albumId);
            });
        });
    }

    // 사진 렌더링 함수
    function renderPhotos(photosToRender = photos) {
        const photoGrid = document.querySelector('.photo-grid');
        photoGrid.innerHTML = '';

        photosToRender.forEach(photo => {
            const photoEl = document.createElement('div');
            photoEl.className = 'photo-item';
            photoEl.dataset.id = photo.id;
            
            photoEl.innerHTML = `
                <img src="${photo.image}" alt="${photo.title}" class="photo-img">
                <div class="photo-info">
                    <div class="photo-title">${photo.title}</div>
                    <div class="photo-date">${formatDate(photo.date)}</div>
                </div>
            `;
            
            photoGrid.appendChild(photoEl);
        });

        // 사진 클릭 이벤트 처리
        document.querySelectorAll('.photo-item').forEach(photoEl => {
            photoEl.addEventListener('click', function() {
                const photoId = parseInt(this.dataset.id);
                openPhotoViewer(photoId);
            });
        });
    }

    // 날짜 포맷팅 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    }

    // 필터링 및 사진 렌더링 함수
    function filterAndRenderPhotos(albumId = 'all') {
        let filteredPhotos;
        
        if (albumId === 'all') {
            filteredPhotos = photos;
        } else {
            filteredPhotos = photos.filter(photo => photo.album === albumId);
        }
        
        renderPhotos(filteredPhotos);
    }

    // 앨범 이름 가져오기 함수
    function getAlbumName(albumId) {
        const album = albums.find(a => a.id === albumId);
        return album ? album.title : '기타';
    }

    // 사진 뷰어 열기 함수
    function openPhotoViewer(photoId) {
        const photo = photos.find(p => p.id === photoId);
        if (!photo) return;
        
        const modal = document.getElementById('photo-modal');
        const enlargedPhoto = document.getElementById('enlarged-photo');
        const photoTitle = document.getElementById('photo-modal-title');
        const photoDescription = document.getElementById('photo-modal-description');
        const photoDate = document.getElementById('photo-modal-date');
        const photoAlbum = document.getElementById('photo-modal-album');
        const likeCount = document.getElementById('like-count');
        
        // 이미지 및 정보 설정
        enlargedPhoto.src = photo.image;
        enlargedPhoto.alt = photo.title;
        photoTitle.textContent = photo.title;
        photoDescription.textContent = photo.description;
        photoDate.textContent = formatDate(photo.date);
        photoAlbum.textContent = getAlbumName(photo.album);
        likeCount.textContent = photo.likes;
        
        // 현재 사진 ID 저장 (좋아요, 댓글용)
        modal.dataset.currentPhoto = photoId;
        
        // 댓글 렌더링
        renderComments(photo.comments);
        
        // 모달 표시
        modal.style.display = 'block';
        
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', closeOnEsc);
    }

    // 댓글 렌더링 함수
    function renderComments(comments) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments">아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>';
            return;
        }
        
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment-item';
            
            commentEl.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${formatDate(comment.date)}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
            `;
            
            commentsContainer.appendChild(commentEl);
        });
    }

    // ESC 키로 모달 닫기 핸들러
    function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closePhotoViewer();
        }
    }

    // 사진 뷰어 닫기 함수
    function closePhotoViewer() {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
        document.removeEventListener('keydown', closeOnEsc);
    }

    // 초기 앨범 및 사진 렌더링
    updateAlbumCounts();
    renderAlbums();
    renderPhotos();

    // 앨범 필터 변경 이벤트 처리
    document.getElementById('album-filter').addEventListener('change', function() {
        const albumId = this.value;
        
        // 선택된 앨범 활성화
        document.querySelectorAll('.album-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.album === albumId) {
                item.classList.add('active');
            }
        });
        
        // 사진 필터링 및 렌더링
        filterAndRenderPhotos(albumId);
    });

    // 사진 업로드 버튼 및 모달 기능
    const uploadBtn = document.getElementById('upload-photos');
    const uploadModal = document.getElementById('upload-modal');
    const closeBtn = document.querySelector('.close');
    const uploadForm = document.getElementById('upload-form');
    const imagePreview = document.getElementById('image-preview');
    const fileInput = document.getElementById('photo-files');

    // 로그인 상태 체크 (누구나 업로드 가능)
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('userLoggedIn');
        if (isLoggedIn === 'true') {
            uploadBtn.style.display = 'block';
        } else {
            uploadBtn.style.display = 'none';
        }
    }

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 업로드 버튼 클릭 시 모달 열기
    uploadBtn.addEventListener('click', function() {
        uploadModal.style.display = 'block';
    });

    // 모달 닫기
    closeBtn.addEventListener('click', function() {
        uploadModal.style.display = 'none';
        imagePreview.innerHTML = '';
        uploadForm.reset();
    });

    // 외부 클릭 시 모달 닫기
    window.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            uploadModal.style.display = 'none';
            imagePreview.innerHTML = '';
            uploadForm.reset();
        }
    });

    // 파일 선택 시 미리보기 표시
    fileInput.addEventListener('change', function() {
        imagePreview.innerHTML = '';
        
        if (this.files) {
            Array.from(this.files).slice(0, 5).forEach(file => {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'preview-item';
                    imagePreview.appendChild(img);
                }
                
                reader.readAsDataURL(file);
            });
            
            if (this.files.length > 5) {
                const message = document.createElement('p');
                message.textContent = `외 ${this.files.length - 5}장의 사진이 선택되었습니다.`;
                message.style.fontSize = '0.8rem';
                imagePreview.appendChild(message);
            }
        }
    });

    // 사진 업로드 폼 제출
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const album = document.getElementById('photo-album').value;
        const title = document.getElementById('photo-title').value;
        const description = document.getElementById('photo-description').value;
        const files = document.getElementById('photo-files').files;
        
        if (files.length === 0) {
            alert('최소 1장의 사진을 선택해주세요.');
            return;
        }
        
        // 실제로는 서버에 업로드하고 URL을 받아야 함
        // 여기서는 데모용으로 가상의 URL 생성
        
        // 하나의 예시 사진만 추가 (실제로는 여러 장 처리 필요)
        const newPhotoId = photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1;
        const today = new Date().toISOString().split('T')[0];
        
        // 예시 이미지 URL (실제로는 업로드된 이미지 URL이어야 함)
        const imageUrl = `images/gallery/${album}/new-photo-${newPhotoId}.jpg`;
        
        // 새 사진 객체 생성
        const newPhoto = {
            id: newPhotoId,
            album: album,
            title: title,
            description: description,
            date: today,
            image: imageUrl, // 실제로는 업로드된 이미지 URL
            likes: 0,
            comments: []
        };
        
        // 사진 데이터에 추가
        photos.unshift(newPhoto);
        
        // 앨범 개수 업데이트
        updateAlbumCounts();
        
        // UI 업데이트
        renderAlbums();
        
        // 현재 선택된, 또는 선택한 앨범에 맞는 사진 렌더링
        const selectedAlbum = document.getElementById('album-filter').value;
        filterAndRenderPhotos(selectedAlbum);
        
        // 모달 닫기
        uploadModal.style.display = 'none';
        
        // 폼 초기화
        imagePreview.innerHTML = '';
        uploadForm.reset();
        
        alert('사진이 업로드되었습니다. (데모버전에서는 실제 이미지가 표시되지 않습니다)');
    });

    // 사진 뷰어 모달 닫기 버튼
    document.querySelector('.close-photo').addEventListener('click', closePhotoViewer);

    // 좋아요 버튼 처리
    document.getElementById('like-photo').addEventListener('click', function() {
        const photoId = parseInt(document.getElementById('photo-modal').dataset.currentPhoto);
        const photo = photos.find(p => p.id === photoId);
        
        if (photo) {
            photo.likes++;
            document.getElementById('like-count').textContent = photo.likes;
        }
    });

    // 다운로드 버튼 처리
    document.getElementById('download-photo').addEventListener('click', function() {
        const photoSrc = document.getElementById('enlarged-photo').src;
        
        // 실제로는 서버에서 원본 크기 이미지를 다운로드해야 함
        // 여기서는 간단한 데모 구현
        alert('이미지가 다운로드됩니다. (데모버전에서는 실제 다운로드되지 않습니다)');
    });

    // 댓글 작성 처리
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('userLoggedIn');
        if (isLoggedIn !== 'true') {
            alert('댓글을 작성하려면 로그인이 필요합니다.');
            return;
        }
        
        const photoId = parseInt(document.getElementById('photo-modal').dataset.currentPhoto);
        const commentText = document.getElementById('comment-text').value.trim();
        
        if (!commentText) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        
        const photo = photos.find(p => p.id === photoId);
        if (photo) {
            // 새 댓글 추가
            const userName = localStorage.getItem('userName') || '익명 사용자';
            const today = new Date().toISOString().split('T')[0];
            
            const newComment = {
                author: userName,
                date: today,
                text: commentText
            };
            
            photo.comments.push(newComment);
            
            // 댓글 목록 다시 렌더링
            renderComments(photo.comments);
            
            // 입력 필드 초기화
            document.getElementById('comment-text').value = '';
        }
    });

    // 이전/다음 버튼 처리
    document.querySelector('.prev-btn').addEventListener('click', function() {
        navigatePhotos('prev');
    });

    document.querySelector('.next-btn').addEventListener('click', function() {
        navigatePhotos('next');
    });

    // 사진 네비게이션 함수
    function navigatePhotos(direction) {
        const currentPhotoId = parseInt(document.getElementById('photo-modal').dataset.currentPhoto);
        const currentIndex = photos.findIndex(p => p.id === currentPhotoId);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        if (direction === 'prev') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        } else {
            nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        }
        
        openPhotoViewer(photos[nextIndex].id);
    }

    // 키보드 네비게이션
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('photo-modal').style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigatePhotos('prev');
            } else if (e.key === 'ArrowRight') {
                navigatePhotos('next');
            }
        }
    });
});