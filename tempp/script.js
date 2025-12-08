// الانتقال بين أقسام الموقع
document.addEventListener('DOMContentLoaded', function() {
    // عناصر التنقل
    const navCards = document.querySelectorAll('.nav-card');
    const backButtons = document.querySelectorAll('.back-btn');
    const startButton = document.getElementById('start-btn');
    
    // الانتقال من الصفحة الرئيسية
    if (startButton) {
        startButton.addEventListener('click', function() {
            // إخفاء زر البداية وعناصر الموسيقى
            document.querySelector('.start-adventure').classList.add('hidden');
            // إظهار بطاقات التنقل
            document.querySelector('.navigation-preview').classList.remove('hidden');
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
            // العودة للشاشة الرئيسية مع إظهار التنقل
            document.querySelector('.start-adventure').classList.add('hidden');
            document.querySelector('.navigation-preview').classList.remove('hidden');
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
    
    // إعداد الألعاب الأساسية
    setupMatchingGame();
    setupStarGame();
    setupQuestionGame();
    
    // إعداد الألعاب الجديدة
    setupDayNightGame();
    setupTwinklingStarsGame();
    setupSunStagesGame();
    setupPharaohDoctorGame();
    setupHerbsMatchingGame();
    setupMummificationStepsGame();
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

// إعداد لعبة "اختار صورة النهار"
function setupDayNightGame() {
    const options = document.querySelectorAll('#day-night-game .option-box');
    const feedback = document.querySelector('#day-night-game .feedback');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            // إعادة تعيين جميع الخيارات
            options.forEach(opt => {
                opt.style.backgroundColor = '#e8d0a9';
            });
            
            if (isCorrect) {
                this.style.backgroundColor = '#2ecc71';
                feedback.innerHTML = '<span style="color:green">أحسنت! نرى الشمس في النهار.</span>';
                feedback.style.backgroundColor = '#d4f8d4';
            } else {
                this.style.backgroundColor = '#e74c3c';
                feedback.innerHTML = '<span style="color:red">ليس صحيح، الشمس تظهر في النهار!</span>';
                feedback.style.backgroundColor = '#f8d4d4';
            }
        });
    });
}

// إعداد لعبة "اضغط على النجوم اللامعة"
function setupTwinklingStarsGame() {
    const stars = document.querySelectorAll('#twinkling-stars-game .star-click');
    const checkButton = document.getElementById('check-stars-btn');
    const feedback = document.querySelector('#twinkling-stars-game .feedback');
    const clickedCountSpan = document.getElementById('clicked-count');
    
    let clickedStars = [];
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const starId = Array.from(stars).indexOf(this);
            
            if (clickedStars.includes(starId)) {
                // إزالة النجمة إذا كانت مضغوطة مسبقًا
                clickedStars = clickedStars.filter(id => id !== starId);
                this.style.backgroundColor = '#2c3e50';
            } else {
                // إضافة النجمة
                clickedStars.push(starId);
                this.style.backgroundColor = '#f1c40f';
            }
            
            clickedCountSpan.textContent = clickedStars.length;
        });
    });
    
    checkButton.addEventListener('click', function() {
        let correctSelections = 0;
        let incorrectSelections = 0;
        
        stars.forEach((star, index) => {
            const isTwinkling = star.getAttribute('data-twinkling') === 'true';
            const isSelected = clickedStars.includes(index);
            
            if (isTwinkling && isSelected) {
                correctSelections++;
            } else if (!isTwinkling && isSelected) {
                incorrectSelections++;
            }
        });
        
        if (correctSelections === 3 && incorrectSelections === 0) {
            feedback.innerHTML = '<span style="color:green">أحسنت! ضغطت على النجوم اللامعة فقط.</span>';
            feedback.style.backgroundColor = '#d4f8d4';
        } else {
            feedback.innerHTML = `<span style="color:red">ليس صحيح تماماً. ضغطت على ${correctSelections} نجوم لامعة و ${incorrectSelections} نجوم غير لامعة.</span>`;
            feedback.style.backgroundColor = '#f8d4d4';
        }
    });
}

// إعداد لعبة "ترتيب مراحل الشمس"
function setupSunStagesGame() {
    const sortableItems = document.querySelectorAll('#sun-stages-game .sortable-item');
    const checkButton = document.getElementById('check-sun-order-btn');
    const feedback = document.querySelector('#sun-stages-game .feedback');
    
    // جعل العناصر قابلة للسحب
    sortableItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-order'));
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // إضافة إمكانية السحب والإفلات للقائمة
    const sortableList = document.querySelector('#sun-stages-game .sortable-list');
    
    sortableList.addEventListener('dragover', function(e) {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const siblings = [...sortableList.querySelectorAll('.sortable-item:not(.dragging)')];
        
        const nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
        
        sortableList.insertBefore(draggingItem, nextSibling);
    });
    
    checkButton.addEventListener('click', function() {
        const items = [...sortableList.querySelectorAll('.sortable-item')];
        const order = items.map(item => parseInt(item.getAttribute('data-order')));
        const isCorrect = JSON.stringify(order) === JSON.stringify([1, 2, 3]);
        
        if (isCorrect) {
            feedback.innerHTML = '<span style="color:green">أحسنت! رتبت مراحل الشمس بالترتيب الصحيح.</span>';
            feedback.style.backgroundColor = '#d4f8d4';
        } else {
            feedback.innerHTML = '<span style="color:red">ليس بالترتيب الصحيح. الترتيب الصحيح: شروق - منتصف السماء - غروب</span>';
            feedback.style.backgroundColor = '#f8d4d4';
        }
    });
}

// إعداد لعبة "طبيب الفرعون"
function setupPharaohDoctorGame() {
    const tools = document.querySelectorAll('#pharaoh-doctor-game .tool-option');
    const checkButton = document.getElementById('check-tools-btn');
    const feedback = document.querySelector('#pharaoh-doctor-game .feedback');
    const selectedCountSpan = document.getElementById('selected-tools-count');
    
    let selectedTools = [];
    
    tools.forEach(tool => {
        tool.addEventListener('click', function() {
            const toolId = Array.from(tools).indexOf(this);
            
            if (selectedTools.includes(toolId)) {
                // إزالة الأداة إذا كانت مختارة مسبقًا
                selectedTools = selectedTools.filter(id => id !== toolId);
                this.style.backgroundColor = '#e8d0a9';
            } else {
                // إضافة الأداة
                selectedTools.push(toolId);
                this.style.backgroundColor = '#3498db';
            }
            
            selectedCountSpan.textContent = selectedTools.length;
        });
    });
    
    checkButton.addEventListener('click', function() {
        let correctSelections = 0;
        let incorrectSelections = 0;
        
        tools.forEach((tool, index) => {
            const isCorrect = tool.getAttribute('data-correct') === 'true';
            const isSelected = selectedTools.includes(index);
            
            if (isCorrect && isSelected) {
                correctSelections++;
                tool.style.backgroundColor = '#2ecc71';
            } else if (isCorrect && !isSelected) {
                tool.style.backgroundColor = '#2ecc71';
            } else if (!isCorrect && isSelected) {
                incorrectSelections++;
                tool.style.backgroundColor = '#e74c3c';
            } else if (!isCorrect && !isSelected) {
                tool.style.backgroundColor = '#e8d0a9';
            }
        });
        
        if (correctSelections === 2 && incorrectSelections === 0) {
            feedback.innerHTML = '<span style="color:green">أحسنت! اخترت العسل والضمادة، وهما ما استخدمه الفراعنة لعلاج الجروح.</span>';
            feedback.style.backgroundColor = '#d4f8d4';
        } else {
            feedback.innerHTML = `<span style="color:red">ليس صحيح تماماً. كان الفراعنة يستخدمون العسل (كمضاد للبكتيريا) والضمادة لعلاج الجروح.</span>`;
            feedback.style.backgroundColor = '#f8d4d4';
        }
    });
}

// إعداد لعبة "الأعشاب الفرعونية"
function setupHerbsMatchingGame() {
    const herbs = document.querySelectorAll('#herbs-matching-game .herb-item');
    const uses = document.querySelectorAll('#herbs-matching-game .use-item');
    const checkButton = document.getElementById('check-herbs-btn');
    const feedback = document.querySelector('#herbs-matching-game .feedback');
    
    let connections = [];
    let selectedHerb = null;
    let selectedUse = null;
    
    // تعيين النتائج الصحيحة
    const correctMatches = {
        'حلبة': 'حمى',
        'ثوم': 'مناعة',
        'عسل': 'جروح',
        'كمون': 'معدة'
    };
    
    herbs.forEach(herb => {
        herb.addEventListener('click', function() {
            // إلغاء اختيار العشبة السابقة
            herbs.forEach(h => h.classList.remove('selected'));
            uses.forEach(u => u.classList.remove('selected'));
            
            // اختيار العشبة الحالية
            this.classList.add('selected');
            selectedHerb = this.getAttribute('data-herb');
            
            // إذا كان هناك استخدام مختار مسبقًا، إنشاء اتصال
            if (selectedUse) {
                createConnection(selectedHerb, selectedUse);
                selectedHerb = null;
                selectedUse = null;
            }
        });
    });
    
    uses.forEach(use => {
        use.addEventListener('click', function() {
            // إلغاء اختيار الاستخدام السابق
            herbs.forEach(h => h.classList.remove('selected'));
            uses.forEach(u => u.classList.remove('selected'));
            
            // اختيار الاستخدام الحالي
            this.classList.add('selected');
            selectedUse = this.getAttribute('data-use');
            
            // إذا كان هناك عشبة مختارة مسبقًا، إنشاء اتصال
            if (selectedHerb) {
                createConnection(selectedHerb, selectedUse);
                selectedHerb = null;
                selectedUse = null;
            }
        });
    });
    
    function createConnection(herb, use) {
        // إضافة الاتصال
        connections.push({ herb, use });
        
        // تحديث العرض
        updateConnectionsDisplay();
    }
    
    function updateConnectionsDisplay() {
        // في التطبيق الكامل، سيتم رسم خطوط بين العناصر المتصلة
        // هنا سنقوم فقط بتغيير الألوان للإشارة إلى الاتصال
        herbs.forEach(herb => {
            const herbName = herb.getAttribute('data-herb');
            const connection = connections.find(c => c.herb === herbName);
            
            if (connection) {
                herb.style.backgroundColor = '#3498db';
                herb.style.color = 'white';
            } else {
                herb.style.backgroundColor = '#e8d0a9';
                herb.style.color = '#5a3921';
            }
        });
        
        uses.forEach(use => {
            const useName = use.getAttribute('data-use');
            const connection = connections.find(c => c.use === useName);
            
            if (connection) {
                use.style.backgroundColor = '#3498db';
                use.style.color = 'white';
            } else {
                use.style.backgroundColor = '#d4a762';
                use.style.color = '#5a3921';
            }
        });
    }
    
    checkButton.addEventListener('click', function() {
        let correctCount = 0;
        let totalCount = Object.keys(correctMatches).length;
        
        connections.forEach(connection => {
            if (correctMatches[connection.herb] === connection.use) {
                correctCount++;
            }
        });
        
        if (correctCount === totalCount && connections.length === totalCount) {
            feedback.innerHTML = '<span style="color:green">أحسنت! وصّلت كل نبات باستخدامه الطبي الصحيح.</span>';
            feedback.style.backgroundColor = '#d4f8d4';
        } else {
            feedback.innerHTML = `<span style="color:red">ليس صحيح تماماً. ${correctCount} من أصل ${totalCount} اتصالات صحيحة.</span>`;
            feedback.style.backgroundColor = '#f8d4d4';
        }
    });
}

// إعداد لعبة "تحنيط افتراضي"
function setupMummificationStepsGame() {
    const stepItems = document.querySelectorAll('#mummification-steps-game .step-item');
    const checkButton = document.getElementById('check-steps-btn');
    const feedback = document.querySelector('#mummification-steps-game .feedback');
    
    // جعل العناصر قابلة للسحب
    stepItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-step'));
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // إضافة إمكانية السحب والإفلات للقائمة
    const stepsList = document.querySelector('#mummification-steps-game .steps-list');
    
    stepsList.addEventListener('dragover', function(e) {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const siblings = [...stepsList.querySelectorAll('.step-item:not(.dragging)')];
        
        const nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
        
        stepsList.insertBefore(draggingItem, nextSibling);
        
        // تحديث أرقام الخطوات
        updateStepNumbers();
    });
    
    function updateStepNumbers() {
        const items = [...stepsList.querySelectorAll('.step-item')];
        items.forEach((item, index) => {
            item.querySelector('.step-number').textContent = index + 1;
        });
    }
    
    checkButton.addEventListener('click', function() {
        const items = [...stepsList.querySelectorAll('.step-item')];
        const order = items.map(item => parseInt(item.getAttribute('data-step')));
        const isCorrect = JSON.stringify(order) === JSON.stringify([1, 2, 3, 4]);
        
        if (isCorrect) {
            feedback.innerHTML = '<span style="color:green">أحسنت! رتبت خطوات التحنيط بالترتيب الصحيح.</span>';
            feedback.style.backgroundColor = '#d4f8d4';
        } else {
            feedback.innerHTML = '<span style="color:red">ليس بالترتيب الصحيح. الترتيب الصحيح: 1. تنظيف الجسد 2. إزالة السوائل 3. وضع الملح 4. لف القماش</span>';
            feedback.style.backgroundColor = '#f8d4d4';
        }
    });
    
    // تحديث أرقام الخطوات في البداية
    updateStepNumbers();
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
        case 'day-night':
            resetDayNightGame();
            break;
        case 'twinkling-stars':
            resetTwinklingStarsGame();
            break;
        case 'sun-stages':
            resetSunStagesGame();
            break;
        case 'pharaoh-doctor':
            resetPharaohDoctorGame();
            break;
        case 'herbs-matching':
            resetHerbsMatchingGame();
            break;
        case 'mummification-steps':
            resetMummificationStepsGame();
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

// إعادة تعيين لعبة "اختار صورة النهار"
function resetDayNightGame() {
    const options = document.querySelectorAll('#day-night-game .option-box');
    const feedback = document.querySelector('#day-night-game .feedback');
    
    options.forEach(option => {
        option.style.backgroundColor = '#e8d0a9';
        option.style.cursor = 'pointer';
    });
    
    feedback.innerHTML = '';
    feedback.style.backgroundColor = 'transparent';
}

// إعادة تعيين لعبة "اضغط على النجوم اللامعة"
function resetTwinklingStarsGame() {
    const stars = document.querySelectorAll('#twinkling-stars-game .star-click');
    const feedback = document.querySelector('#twinkling-stars-game .feedback');
    const clickedCountSpan = document.getElementById('clicked-count');
    
    stars.forEach(star => {
        star.style.backgroundColor = '#2c3e50';
    });
    
    feedback.innerHTML = '<p>تم الضغط على <span id="clicked-count">0</span> من <span id="total-twinkling">3</span> نجوم لامعة</p>';
    feedback.style.backgroundColor = 'transparent';
    clickedCountSpan.textContent = '0';
}

// إعادة تعيين لعبة "ترتيب مراحل الشمس"
function resetSunStagesGame() {
    const sortableList = document.querySelector('#sun-stages-game .sortable-list');
    const feedback = document.querySelector('#sun-stages-game .feedback');
    
    // إعادة ترتيب العناصر إلى ترتيبها الأصلي
    const items = [...sortableList.querySelectorAll('.sortable-item')];
    items.sort((a, b) => {
        return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'));
    });
    
    items.forEach(item => {
        sortableList.appendChild(item);
    });
    
    feedback.innerHTML = '';
    feedback.style.backgroundColor = 'transparent';
}

// إعادة تعيين لعبة "طبيب الفرعون"
function resetPharaohDoctorGame() {
    const tools = document.querySelectorAll('#pharaoh-doctor-game .tool-option');
    const feedback = document.querySelector('#pharaoh-doctor-game .feedback');
    const selectedCountSpan = document.getElementById('selected-tools-count');
    
    tools.forEach(tool => {
        tool.style.backgroundColor = '#e8d0a9';
    });
    
    feedback.innerHTML = '<p>اخترت <span id="selected-tools-count">0</span> أداة</p>';
    feedback.style.backgroundColor = 'transparent';
    selectedCountSpan.textContent = '0';
}

// إعادة تعيين لعبة "الأعشاب الفرعونية"
function resetHerbsMatchingGame() {
    const herbs = document.querySelectorAll('#herbs-matching-game .herb-item');
    const uses = document.querySelectorAll('#herbs-matching-game .use-item');
    const feedback = document.querySelector('#herbs-matching-game .feedback');
    
    herbs.forEach(herb => {
        herb.style.backgroundColor = '#e8d0a9';
        herb.style.color = '#5a3921';
        herb.classList.remove('selected');
    });
    
    uses.forEach(use => {
        use.style.backgroundColor = '#d4a762';
        use.style.color = '#5a3921';
        use.classList.remove('selected');
    });
    
    feedback.innerHTML = '';
    feedback.style.backgroundColor = 'transparent';
}

// إعادة تعيين لعبة "تحنيط افتراضي"
function resetMummificationStepsGame() {
    const stepsList = document.querySelector('#mummification-steps-game .steps-list');
    const feedback = document.querySelector('#mummification-steps-game .feedback');
    
    // إعادة ترتيب العناصر إلى ترتيبها الأصلي
    const items = [...stepsList.querySelectorAll('.step-item')];
    items.sort((a, b) => {
        return Math.random() - 0.5; // ترتيب عشوائي
    });
    
    items.forEach(item => {
        stepsList.appendChild(item);
    });
    
    feedback.innerHTML = '';
    feedback.style.backgroundColor = 'transparent';
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