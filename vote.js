                    <div class="vote-options">
                        <p class="option-count">${vote.options.length}개 항목 중 ${vote.type === 'single' ? '1개' : '여러 개'} 선택</p>
                        ${vote.status === 'ended' ? 
                            `<p><strong>결과:</strong> ${vote.type === 'single' ? 
                                vote.winner : 
                                vote.winners.join(', ')}</p>` : 
                            ''}
                        <div class="vote-progress">
                            <div class="vote-bar" style="width: ${maxVotePercentage}%"></div>
                        </div>
                    </div>
                </div>
                <div class="vote-card-footer">
                    <div class="vote-participants">
                        참여자 ${vote.participants}명
                    </div>
                    <button class="vote-action-btn ${vote.status === 'active' ? 'btn-vote' : 'btn-results'}">
                        ${vote.status === 'active' ? '투표하기' : '결과보기'}
                    </button>
                </div>
            `;
            
            container.appendChild(voteCard);
        });
        
        // 투표 카드 클릭 이벤트
        document.querySelectorAll('.vote-card').forEach(card => {
            card.addEventListener('click', function() {
                const voteId = parseInt(this.dataset.id);
                openVoteDetail(voteId);
            });
        });
    }

    // 투표 상세 페이지 열기 함수
    function openVoteDetail(voteId) {
        const vote = votes.find(v => v.id === voteId);
        if (!vote) return;
        
        const modal = document.getElementById('vote-detail-modal');
        const detailContainer = document.querySelector('.vote-detail-container');
        
        // 사용자가 투표한 옵션들
        let userVotedOptions = [];
        if (currentUser) {
            userVotedOptions = vote.options
                .filter(opt => opt.voters.includes(currentUser.id))
                .map(opt => opt.id);
        }
        
        // 총 투표 수
        const totalVotes = vote.participants;
        
        // 모달 내용 생성
        let modalContent = `
            <div class="vote-detail-header">
                <span class="vote-status status-${vote.status}">${vote.status === 'active' ? '진행 중' : '종료됨'}</span>
                <h2 class="vote-detail-title">${vote.title}</h2>
                <div class="vote-detail-meta">
                    <div class="vote-creator">만든 사람: ${vote.creator}</div>
                    <div class="vote-deadline">
                        ${vote.status === 'active' ? 
                            `마감까지: ${getTimeRemaining(vote.deadline)}` : 
                            `마감시간: ${formatDate(vote.deadline)}`}
                    </div>
                </div>
            </div>
            
            <div class="vote-detail-description">
                ${vote.description}
            </div>
        `;
        
        // 투표가 끝났을 때 결과 표시
        if (vote.status === 'ended') {
            modalContent += `
                <div class="vote-ended-notice">
                    이 투표는 종료되었습니다. ${vote.type === 'single' ? 
                        `결과: <strong>${vote.winner}</strong>` : 
                        `결과: <strong>${vote.winners.join(', ')}</strong>`}
                </div>
            `;
        }
        
        modalContent += `<div class="vote-detail-options">`;
        
        // 각 옵션 렌더링
        vote.options.forEach(option => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            const isVoted = userVotedOptions.includes(option.id);
            
            modalContent += `
                <div class="vote-detail-option ${isVoted ? 'voted-option' : ''}">
                    <div class="option-input-group">
                        ${vote.status === 'active' && currentUser ? 
                            (vote.type === 'single' ? 
                                `<input type="radio" name="vote-option" id="option-${option.id}" value="${option.id}" ${isVoted ? 'checked' : ''}>` : 
                                `<input type="checkbox" name="vote-option" id="option-${option.id}" value="${option.id}" ${isVoted ? 'checked' : ''}>`) : 
                            ''}
                        <label for="option-${option.id}" class="option-name">${option.name}</label>
                    </div>
                    
                    <div class="option-stats">
                        <span class="option-percentage">${percentage}%</span>
                        <span class="option-votes">${option.votes}표</span>
                    </div>
                    
                    <div class="option-progress">
                        <div class="option-bar" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        });
        
        modalContent += `</div>`;
        
        // 투표자 목록 (익명이 아닌 경우만)
        if (!vote.anonymous) {
            modalContent += `
                <div class="vote-detail-voters">
                    <div class="voters-heading">투표 참여자 (${totalVotes}명)</div>
                    <div class="voters-list">
                        ${vote.options.flatMap(opt => opt.voters).length > 0 ? 
                            [...new Set(vote.options.flatMap(opt => opt.voters))]
                                .map(voterId => {
                                    // 실제로는 사용자 정보를 가져와야 함
                                    const voterName = voterId === 'teacher' ? '김선생' : `학생 ${voterId}`;
                                    return `<span class="voter-pill">${voterName}</span>`;
                                }).join('') : 
                            '<span class="empty-voters">아직 투표한 사람이 없습니다.</span>'}
                    </div>
                </div>
            `;
        } else {
            modalContent += `
                <div class="vote-detail-voters">
                    <div class="voters-heading">투표 참여자</div>
                    <div class="anonymous-notice">이 투표는 익명으로 진행되므로 참여자 정보가 표시되지 않습니다.</div>
                </div>
            `;
        }
        
        // 투표 버튼 (진행 중인 투표만)
        if (vote.status === 'active' && currentUser) {
            modalContent += `
                <div class="vote-detail-actions">
                    <button class="vote-btn vote-submit-btn" id="submit-vote">투표하기</button>
                    <button class="vote-btn vote-cancel-btn" id="cancel-vote">취소</button>
                </div>
            `;
        }
        
        // 삭제 버튼 (본인이 만든 투표만)
        if (currentUser && (vote.creatorId === currentUser.id || currentUser.type === 'teacher')) {
            modalContent += `
                <div class="vote-detail-actions" style="justify-content: center; margin-top: 2rem;">
                    <button class="vote-btn vote-delete-btn" id="delete-vote">투표 삭제하기</button>
                </div>
            `;
        }
        
        detailContainer.innerHTML = modalContent;
        modal.style.display = 'block';
        
        // 투표 제출 이벤트 리스너
        const submitBtn = document.getElementById('submit-vote');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                submitVote(vote);
            });
        }
        
        // 취소 버튼 이벤트 리스너
        const cancelBtn = document.getElementById('cancel-vote');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // 삭제 버튼 이벤트 리스너
        const deleteBtn = document.getElementById('delete-vote');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                deleteVote(vote.id);
                modal.style.display = 'none';
            });
        }
    }

    // 투표 제출 함수
    function submitVote(vote) {
        if (!currentUser) {
            alert('투표하려면 로그인이 필요합니다.');
            return;
        }
        
        if (vote.status !== 'active') {
            alert('이 투표는 이미 종료되었습니다.');
            return;
        }
        
        // 선택된 옵션들
        const selectedOptions = [];
        
        if (vote.type === 'single') {
            // 단일 선택
            const selectedRadio = document.querySelector('input[name="vote-option"]:checked');
            if (selectedRadio) {
                selectedOptions.push(parseInt(selectedRadio.value));
            }
        } else {
            // 다중 선택
            const selectedCheckboxes = document.querySelectorAll('input[name="vote-option"]:checked');
            selectedCheckboxes.forEach(checkbox => {
                selectedOptions.push(parseInt(checkbox.value));
            });
        }
        
        if (selectedOptions.length === 0) {
            alert('최소 하나의 옵션을 선택해주세요.');
            return;
        }
        
        // 이전에 투표한 옵션들
        const previousVotes = vote.options
            .filter(opt => opt.voters.includes(currentUser.id))
            .map(opt => opt.id);
        
        // 투표 취소 (이전 투표 제거)
        if (previousVotes.length > 0) {
            previousVotes.forEach(optId => {
                const option = vote.options.find(opt => opt.id === optId);
                if (option) {
                    option.votes -= 1;
                    option.voters = option.voters.filter(id => id !== currentUser.id);
                }
            });
            
            // 참여자 수 감소 (단일 선택에서만)
            if (vote.type === 'single') {
                vote.participants -= 1;
            }
        }
        
        // 새 투표 추가
        selectedOptions.forEach(optId => {
            const option = vote.options.find(opt => opt.id === optId);
            if (option) {
                option.votes += 1;
                option.voters.push(currentUser.id);
            }
        });
        
        // 참여자 수 증가 (이전에 투표하지 않았던 경우)
        if (previousVotes.length === 0) {
            vote.participants += 1;
        }
        
        // UI 업데이트
        alert('투표가 완료되었습니다!');
        document.getElementById('vote-detail-modal').style.display = 'none';
        renderVotes();
    }

    // 투표 삭제 함수
    function deleteVote(voteId) {
        const index = votes.findIndex(v => v.id === voteId);
        if (index !== -1) {
            votes.splice(index, 1);
            renderVotes();
            alert('투표가 삭제되었습니다.');
        }
    }

    // 초기화 함수
    function initialize() {
        // 로그인 상태 확인
        checkLoginStatus();
        
        // 투표 목록 렌더링
        renderVotes();
        
        // 필터 변경 이벤트 리스너
        document.getElementById('status-filter').addEventListener('change', function() {
            const status = this.value;
            
            // 진행 중인 섹션과 종료된 섹션 표시/숨김 처리
            const activeSection = document.querySelector('.active-votes');
            const endedSection = document.querySelector('.ended-votes');
            
            if (status === 'all') {
                activeSection.style.display = 'block';
                endedSection.style.display = 'block';
            } else if (status === 'active') {
                activeSection.style.display = 'block';
                endedSection.style.display = 'none';
            } else if (status === 'ended') {
                activeSection.style.display = 'none';
                endedSection.style.display = 'block';
            }
        });
        
        // 투표 생성 버튼 클릭 이벤트
        document.getElementById('create-vote').addEventListener('click', function() {
            if (!currentUser) {
                alert('투표를 만들려면 로그인이 필요합니다.');
                return;
            }
            
            // 투표 생성 모달 열기
            document.getElementById('vote-modal').style.display = 'block';
            
            // 기본 마감일을 3일 후로 설정
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() + 3);
            const yyyy = defaultDate.getFullYear();
            const mm = String(defaultDate.getMonth() + 1).padStart(2, '0');
            const dd = String(defaultDate.getDate()).padStart(2, '0');
            const hh = String(defaultDate.getHours()).padStart(2, '0');
            const min = String(defaultDate.getMinutes()).padStart(2, '0');
            
            document.getElementById('vote-deadline').value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        });
        
        // 옵션 추가 버튼 클릭 이벤트
        document.getElementById('add-option').addEventListener('click', function() {
            const optionsContainer = document.getElementById('options-container');
            const optionCount = optionsContainer.children.length + 1;
            
            const newOption = document.createElement('div');
            newOption.className = 'option-input';
            newOption.innerHTML = `<input type="text" name="options[]" placeholder="옵션 ${optionCount}" required>`;
            
            optionsContainer.appendChild(newOption);
        });
        
        // 투표 생성 모달 닫기 버튼 이벤트
        document.querySelector('#vote-modal .close').addEventListener('click', function() {
            document.getElementById('vote-modal').style.display = 'none';
            document.getElementById('vote-form').reset();
        });
        
        // 투표 상세 모달 닫기 버튼 이벤트
        document.querySelector('#vote-detail-modal .close').addEventListener('click', function() {
            document.getElementById('vote-detail-modal').style.display = 'none';
        });
        
        // 외부 클릭 시 모달 닫기
        window.addEventListener('click', function(e) {
            const voteModal = document.getElementById('vote-modal');
            const detailModal = document.getElementById('vote-detail-modal');
            
            if (e.target === voteModal) {
                voteModal.style.display = 'none';
                document.getElementById('vote-form').reset();
            } else if (e.target === detailModal) {
                detailModal.style.display = 'none';
            }
        });
        
        // 투표 생성 폼 제출 이벤트
        document.getElementById('vote-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!currentUser) {
                alert('투표를 만들려면 로그인이 필요합니다.');
                return;
            }
            
            const title = document.getElementById('vote-title').value;
            const description = document.getElementById('vote-description').value;
            const deadline = document.getElementById('vote-deadline').value;
            const type = document.getElementById('vote-type').value;
            const anonymous = document.getElementById('vote-anonymous').checked;
            
            // 옵션들 가져오기
            const optionInputs = document.querySelectorAll('#options-container input');
            const options = Array.from(optionInputs).map(input => input.value.trim());
            
            // 중복 옵션 체크
            const uniqueOptions = [...new Set(options)];
            if (uniqueOptions.length !== options.length) {
                alert('중복된 옵션이 있습니다. 모든 옵션은 고유해야 합니다.');
                return;
            }
            
            // 새 투표 객체 생성
            const newVote = {
                id: nextVoteId++,
                title,
                description,
                creator: currentUser.name,
                creatorId: currentUser.id,
                createdAt: new Date().toISOString(),
                deadline: new Date(deadline).toISOString(),
                status: 'active',
                type,
                anonymous,
                options: options.map((name, idx) => ({
                    id: idx + 1,
                    name,
                    votes: 0,
                    voters: []
                })),
                participants: 0
            };
            
            // 투표 목록에 추가
            votes.push(newVote);
            
            // UI 업데이트
            renderVotes();
            
            // 모달 닫기 및 폼 초기화
            document.getElementById('vote-modal').style.display = 'none';
            document.getElementById('vote-form').reset();
            
            alert('새 투표가 생성되었습니다!');
        });
    }

    // 애플리케이션 초기화
    initialize();
}); 