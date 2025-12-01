// الانتقال بين أقسام الموقع
document.addEventListener('DOMContentLoaded', function() {
    // عناصر التنقل
    const navCards = document.querySelectorAll('.nav-card');
    const backButtons = document.querySelectorAll('.back-btn');
    const startButton = document.getElementById('start-btn');
    
    // الانتقال من الصفحة الرئيسية
    if (startButton) {
        startButton.addEventListener('click', function() {
            showSection('about-section');
        });
    }
    
    // التنقل باستخدام البطاقات
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(`${section}-section`);
        });
    });
    
    // أزرار العودة
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSection('start-screen');
        });
    });
    
    // التحكم بالموسيقى الخلفية
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (musicToggle && backgroundMusic) {
        // بدء الموسيقى بصوت منخفض
        backgroundMusic.volume = 0.3;
        
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                this.innerHTML = '<i class="fas fa-volume-up"></i> إيقاف الموسيقى';
            } else {
                backgroundMusic.pause();
                this.innerHTML = '<i class="fas fa-volume-up"></i> تشغيل الموسيقى';
            }
        });
    }
    
    // أزرار "اضغط لتعرف أكثر" في قسم الجولة
    const moreInfoButtons = document.querySelectorAll('.more-info-btn');
    moreInfoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moreInfo = this.nextElementSibling;
            moreInfo.classList.toggle('hidden');
            
            if (moreInfo.classList.contains('hidden')) {
                this.innerHTML = '<i class="fas fa-info-circle"></i> اضغط لتعرف أكثر';
            } else {
                this.innerHTML = '<i class="fas fa-times-circle"></i> إخفاء المعلومات';
            }
        });
    });
    
    // ألعاب قسم الألعاب التفاعلية
    setupGames();
    
    // قسم القصص
    setupStories();
    
    // قسم الإنجازات
    setupAchievements();
    
    // قسم المعلمة
    setupTeacherSection();
});

// عرض قسم معين وإخفاء الآخرين
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    const allSections = document.querySelectorAll('.screen');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // عرض القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // إذا كان قسم الألعاب، إعادة تعيين منطقة الألعاب
        if (sectionId === 'games-section') {
            resetGameArea();
        }
        
        // إذا كان قسم القصص، إعادة تعيين مشغل القصص
        if (sectionId === 'stories-section') {
            resetStoryPlayer();
        }
        
        // إذا كان قسم الإنجازات، إعادة تعيين الشهادة
        if (sectionId === 'achievements-section') {
            resetCertificate();
        }
    }
}

// إعداد الألعاب التفاعلية
function setupGames() {
    const playGameButtons = document.querySelectorAll('.play-game-btn');
    const backToGamesButtons = document.querySelectorAll('.back-to-games-btn');
    const gameArea = document.getElementById('game-area');
    
    // أزرار تشغيل الألعاب
    playGameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameType = this.getAttribute('data-game');
            
            // إخفاء جميع الألعاب
            document.querySelectorAll('.game').forEach(game => {
                game.classList.add('hidden');
            });
            
            // إخفاء قائمة الألعاب
            document.querySelector('.games-container').classList.add('hidden');
            
            // عرض منطقة الألعاب واللعبة المختارة
            gameArea.classList.remove('hidden');
            document.getElementById(`${gameType}-game`).classList.remove('hidden');
            
            // إعداد اللعبة المختارة
            setupSpecificGame(gameType);
        });
    });
    
    // أزرار العودة من الألعاب
    backToGamesButtons.forEach(button => {
        button.addEventListener('click', function() {
            resetGameArea();
        });
    });
    
    // إعداد لعبة المطابقة
    setupMatchingGame();
    
    // إعداد لعبة النجوم
    setupStarGame();
    
    // إعداد لعبة الأسئلة
    setupQuestionGame();
}

// إعادة تعيين منطقة الألعاب
function resetGameArea() {
    const gameArea = document.getElementById('game-area');
    const gamesContainer = document.querySelector('.games-container');
    
    gameArea.classList.add('hidden');
    gamesContainer.classList.remove('hidden');
    
    // إخفاء جميع الألعاب
    document.querySelectorAll('.game').forEach(game => {
        game.classList.add('hidden');
    });
}

// إعداد لعبة المطابقة
function setupMatchingGame() {
    const draggables = document.querySelectorAll('.draggable');
    const targets = document.querySelectorAll('.target');
    
    // إضافة سحب وإفلات للعناصر
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-name'));
            this.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    targets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        target.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const draggedName = e.dataTransfer.getData('text/plain');
            const targetName = this.getAttribute('data-name');
            
            if (draggedName === targetName) {
                this.innerHTML = `<strong>${draggedName}</strong> - صحيح!`;
                this.style.backgroundColor = '#2ecc71';
                
                // العثور على العنصر الذي تم سحبه وتحديثه
                draggables.forEach(draggable => {
                    if (draggable.getAttribute('data-name') === draggedName) {
                        draggable.style.backgroundColor = '#2ecc71';
                        draggable.style.cursor = 'default';
                        draggable.draggable = false;
                    }
                });
            } else {
                this.innerHTML += '<br><span style="color:red">خطأ، حاول مرة أخرى!</span>';
                this.style.backgroundColor = '#e74c3c';
            }
        });
    });
}

// إعداد لعبة النجوم
function setupStarGame() {
    const starOptions = document.querySelectorAll('#star-game .star-option');
    const feedback = document.querySelector('#star-game .feedback');
    
    starOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                this.style.backgroundColor = '#2ecc71';
                feedback.innerHTML = '<span style="color:green">أحسنت! رع هو إله الشمس لدى الفراعنة.</span>';
                feedback.style.backgroundColor = '#d4f8d4';
                
                // تعطيل جميع الخيارات بعد الإجابة الصحيحة
                starOptions.forEach(opt => {
                    opt.style.cursor = 'default';
                });
            } else {
                this.style.backgroundColor = '#e74c3c';
                feedback.innerHTML = '<span style="color:red">ليس صحيح، حاول مرة أخرى!</span>';
                feedback.style.backgroundColor = '#f8d4d4';
            }
        });
    });
}

// إعداد لعبة الأسئلة
function setupQuestionGame() {
    const answerOptions = document.querySelectorAll('#question-game .answer-option');
    const feedback = document.querySelector('#question-game .feedback');
    
    answerOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                this.style.backgroundColor = '#2ecc71';
                feedback.innerHTML = '<span style="color:green">أحسنت! تاج توت عنخ آمون كان ذهبياً.</span>';
                feedback.style.backgroundColor = '#d4f8d4';
                
                // تعطيل جميع الخيارات بعد الإجابة الصحيحة
                answerOptions.forEach(opt => {
                    opt.style.cursor = 'default';
                });
            } else {
                this.style.backgroundColor = '#e74c3c';
                feedback.innerHTML = '<span style="color:red">ليس صحيح، حاول مرة أخرى!</span>';
                feedback.style.backgroundColor = '#f8d4d4';
            }
        });
    });
}

// إعداد قسم القصص
function setupStories() {
    const readStoryButtons = document.querySelectorAll('.read-story-btn');
    const backToStoriesButtons = document.querySelectorAll('.back-to-stories-btn');
    const storyPlayer = document.getElementById('story-player');
    
    // أزرار قراءة القصص
    readStoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storyCard = this.closest('.story-card');
            const storyType = storyCard.getAttribute('data-story');
            
            // إخفاء قائمة القصص
            document.querySelector('.stories').classList.add('hidden');
            
            // عرض مشغل القصص
            storyPlayer.classList.remove('hidden');
            
            // تحميل القصة المحددة
            loadStory(storyType);
        });
    });
    
    // أزرار العودة من مشغل القصص
    backToStoriesButtons.forEach(button => {
        button.addEventListener('click', function() {
            resetStoryPlayer();
        });
    });
    
    // أزرار التحكم بالصوت (محاكاة)
    const playStoryBtn = document.getElementById('play-story-btn');
    const pauseStoryBtn = document.getElementById('pause-story-btn');
    
    if (playStoryBtn) {
        playStoryBtn.addEventListener('click', function() {
            alert('سيتم تشغيل القصة صوتياً. في النسخة الكاملة، ستتم إضافة ملفات صوتية حقيقية.');
        });
    }
    
    if (pauseStoryBtn) {
        pauseStoryBtn.addEventListener('click', function() {
            alert('تم إيقاف القصة مؤقتاً.');
        });
    }
}

// تحميل قصة محددة
function loadStory(storyType) {
    const storyTitle = document.getElementById('story-title');
    const storyText = document.getElementById('story-text');
    
    let title, content;
    
    switch(storyType) {
        case 'imhotep':
            title = 'الطبيب إيمحوتب';
            content = `
                <p>كان إيمحوتب طبيباً عبقرياً عاش في مصر القديمة. كان أول طبيب معروف في التاريخ!</p>
                <p>كان إيمحوتب يعالج الناس بالأعشاب والعلاجات الطبيعية. كما كان مهندساً بارعاً وشارك في بناء الهرم المدرج!</p>
                <p>كان المصريون القدماء يحترمون إيمحوتب كثيراً لدرجة أنهم اعتبروه إلهاً بعد وفاته!</p>
            `;
            break;
        case 'thoth':
            title = 'العالم الفلكي تحوت';
            content = `
                <p>تحوت هو إله الحكمة والكتابة والعلم في الميثولوجيا المصرية القديمة.</p>
                <p>كان المصريون القدماء يعتقدون أن تحوت علم الناس الكتابة والحساب والفلك.</p>
                <p>كانوا يرسمونه برأس طائر أبو منجل، ويرمز إليه بالقمر لأنه كان إله الوقت والتقويم أيضاً.</p>
            `;
            break;
        case 'tut':
            title = 'الملك توت عنخ آمون';
            content = `
                <p>توت عنخ آمون كان فرعوناً مصرياً من الأسرة الثامنة عشرة، حكم مصر وهو في التاسعة من عمره!</p>
                <p>اشتهر توت عنخ آمون بقبره الذي اكتشف سليماً تقريباً في وادي الملوك عام 1922.</p>
                <p>على الرغم من صغر سنه، ترك توت عنخ آمون إرثاً كبيراً من الكنوز التي ساعدتنا على فهم الحضارة المصرية القديمة.</p>
            `;
            break;
        default:
            title = 'قصة المتحف';
            content = `<p>اختر قصة من القائمة للاستماع إليها.</p>`;
    }
    
    storyTitle.textContent = title;
    storyText.innerHTML = content;
}

// إعادة تعيين مشغل القصص
function resetStoryPlayer() {
    const storyPlayer = document.getElementById('story-player');
    const storiesContainer = document.querySelector('.stories');
    
    storyPlayer.classList.add('hidden');
    storiesContainer.classList.remove('hidden');
}

// إعداد قسم الإنجازات
function setupAchievements() {
    const getAchievementButtons = document.querySelectorAll('.get-achievement-btn');
    const showCertificateBtn = document.getElementById('show-certificate-btn');
    const backToAchievementsBtn = document.querySelector('.back-to-achievements-btn');
    const printCertificateBtn = document.getElementById('print-certificate-btn');
    
    // تخزين الإنجازات التي حصل عليها الطفل
    let achievements = {
        star: false,
        crown: false,
        eye: false
    };
    
    // أزرار الحصول على الإنجازات
    getAchievementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const achievement = this.getAttribute('data-achievement');
            achievements[achievement] = true;
            
            // تحديث الزر
            this.innerHTML = '<i class="fas fa-check"></i> تم الحصول عليها!';
            this.style.backgroundColor = '#2ecc71';
            this.style.cursor = 'default';
            this.disabled = true;
            
            // تحديث الأيقونة
            const icon = this.closest('.achievement-card').querySelector('.achievement-icon');
            icon.classList.add('earned');
            
            // التحقق إذا حصل على جميع الإنجازات
            checkAllAchievements();
        });
    });
    
    // زر عرض الشهادة
    if (showCertificateBtn) {
        showCertificateBtn.addEventListener('click', function() {
            document.querySelector('.achievements').classList.add('hidden');
            document.querySelector('.certificate-prompt').classList.add('hidden');
            document.getElementById('certificate').classList.remove('hidden');
        });
    }
    
    // زر العودة من الشهادة
    if (backToAchievementsBtn) {
        backToAchievementsBtn.addEventListener('click', function() {
            resetCertificate();
        });
    }
    
    // زر طباعة الشهادة
    if (printCertificateBtn) {
        printCertificateBtn.addEventListener('click', function() {
            const childName = document.getElementById('child-name-input').value || 'المستكشف الصغير';
            alert(`سيتم طباعة شهادة إنجاز لـ: ${childName}\n\nفي النسخة الكاملة، سيتم فتح نافذة الطباعة.`);
        });
    }
}

// التحقق من حصول الطفل على جميع الإنجازات
function checkAllAchievements() {
    // في النسخة الحقيقية، سيتم تخزين الإنجازات والتأكد منها
    // هنا فقط محاكاة للوظيفة
    const showCertificateBtn = document.getElementById('show-certificate-btn');
    
    if (showCertificateBtn) {
        showCertificateBtn.disabled = false;
        showCertificateBtn.innerHTML = '<i class="fas fa-award"></i> عرض شهادة الإنجاز';
    }
}

// إعادة تعيين قسم الشهادة
function resetCertificate() {
    document.getElementById('certificate').classList.add('hidden');
    document.querySelector('.achievements').classList.remove('hidden');
    document.querySelector('.certificate-prompt').classList.remove('hidden');
}

// إعداد قسم المعلمة
function setupTeacherSection() {
    const printActivityButtons = document.querySelectorAll('.print-activity-btn');
    
    printActivityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityName = this.closest('.printable-activity').querySelector('h4').textContent;
            alert(`سيتم طباعة نشاط: ${activityName}\n\nفي النسخة الكاملة، سيتم فتح ملف PDF للطباعة.`);
        });
    });
}

// إعداد لعبة محددة
function setupSpecificGame(gameType) {
    // إعادة تعيين الألعاب عند فتحها
    switch(gameType) {
        case 'matching':
            resetMatchingGame();
            break;
        case 'star':
            resetStarGame();
            break;
        case 'question':
            resetQuestionGame();
            break;
    }
}

// إعادة تعيين لعبة المطابقة
function resetMatchingGame() {
    const draggables = document.querySelectorAll('.draggable');
    const targets = document.querySelectorAll('.target');
    
    draggables.forEach(draggable => {
        draggable.style.backgroundColor = '#e8d0a9';
        draggable.style.cursor = 'move';
        draggable.draggable = true;
    });
    
    targets.forEach(target => {
        target.style.backgroundColor = '#d4a762';
        target.innerHTML = target.getAttribute('data-name') === 'مبضع' ? 'أداة طبية حادة' :
                          target.getAttribute('data-name') === 'ميزان' ? 'لقياس الوزن' :
                          'رمز للحماية';
    });
}

// إعادة تعيين لعبة النجوم
function resetStarGame() {
    const starOptions = document.querySelectorAll('#star-game .star-option');
    const feedback = document.querySelector('#star-game .feedback');
    
    starOptions.forEach(option => {
        option.style.backgroundColor = '#e8d0a9';
        option.style.cursor = 'pointer';
    });
    
    feedback.innerHTML = '';
    feedback.style.backgroundColor = 'transparent';
}

// إعادة تعيين لعبة الأسئلة
function resetQuestionGame() {
    const answerOptions = document.querySelectorAll('#question-game .answer-option');
    const feedback = document.querySelector('#question-game .feedback');
    
    answerOptions.forEach(option => {
        option.style.backgroundColor = '#e8d0a9';
        option.style.cursor = 'pointer';
    });
    
    feedback.innerHTML = '';
    feedback.style.backgroundColor = 'transparent';
}