// ملف JavaScript الرئيسي
document.addEventListener('DOMContentLoaded', function() {
    
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
    
    // عناصر DOM الرئيسية
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const startBtn = document.getElementById('start-btn');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const certificateBtn = document.getElementById('certificate-btn');
    const certificateModal = document.getElementById('certificate-modal');
    const closeCertificate = document.getElementById('close-certificate');
    const printCertificate = document.getElementById('print-certificate');
    const childNameInput = document.getElementById('child-name');
    const currentDateSpan = document.getElementById('current-date');
    
    // عناصر جولة المتحف
    const tourRooms = document.querySelectorAll('.tour-room');
    const roomIndicators = document.querySelectorAll('.indicator');
    const prevRoomBtn = document.getElementById('prev-room');
    const nextRoomBtn = document.getElementById('next-room');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const audioBtns = document.querySelectorAll('.audio-btn');
    
    // عناصر الألعاب
    const playGameBtns = document.querySelectorAll('.play-game-btn');
    const gameBoard = document.getElementById('game-board');
    const achievements = document.querySelectorAll('.achievement');
    
    // عناصر مختبر الفراعنة
    const experimentBtns = document.querySelectorAll('.experiment-instructions-btn');
    const experimentInstructions = document.getElementById('experiment-instructions');
    
    // عناصر القصص
    const storyBtns = document.querySelectorAll('.read-story-btn');
    const storyPlayer = document.getElementById('story-player');
    
    // عناصر قسم المعلمة
    const downloadBtns = document.querySelectorAll('.download-btn');
    const activityBtns = document.querySelectorAll('.activity-btn');
    const resourceDisplay = document.getElementById('resource-display');
    
    // متغيرات الحالة
    let currentRoom = 1;
    let totalRooms = tourRooms.length;
    let musicPlaying = false;
    let unlockedAchievements = {
        star: false,
        crown: false,
        eye: false
    };
    
    // تهيئة التاريخ الحالي في الشهادة
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateSpan.textContent = today.toLocaleDateString('ar-EG', options);
    
    // تبديل القائمة على الشاشات الصغيرة
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // بدء المغامرة
    startBtn.addEventListener('click', function() {
        // تمرير إلى قسم جولة المتحف
        document.getElementById('tour').scrollIntoView({ behavior: 'smooth' });
        
        // عرض رسالة ترحيبية
        showNotification('مرحبًا بك في رحلتك المثيرة! استمتع باكتشاف المتحف.', 'success');
        
        // إلغاء قفل أول إنجاز
        unlockAchievement('star');
    });
    
    // التحكم في الموسيقى الخلفية
    musicToggle.addEventListener('click', function() {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="sound-text">تشغيل الموسيقى</span>';
            musicPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log("لم يتم تشغيل الموسيقى بسبب سياسة المتصفح:", e);
                showNotification('لبدء الموسيقى، يرجى التفاعل مع الموقع أولاً (مثل النقر على زر)', 'info');
            });
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i><span class="sound-text>إيقاف الموسيقى</span>';
            musicPlaying = true;
        }
    });
    
    // عرض الشهادة
    certificateBtn.addEventListener('click', function() {
        certificateModal.classList.add('active');
    });
    
    // إغلاق الشهادة
    closeCertificate.addEventListener('click', function() {
        certificateModal.classList.remove('active');
    });
    
    // طباعة الشهادة
    printCertificate.addEventListener('click', function() {
        // التحقق من أن الاسم مملوء
        if (childNameInput.value.trim() === '') {
            showNotification('يرجى إدخال اسم الطفل أولاً', 'warning');
            childNameInput.focus();
            return;
        }
        
        // إنشاء محتوى قابل للطباعة
        const printContent = `
            <!DOCTYPE html>
            <html dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>شهادة إنجاز - رحلتي إلى متحف المصريين القدماء</title>
                <style>
                    body { 
                        font-family: 'Cairo', sans-serif; 
                        text-align: center; 
                        padding: 50px; 
                        background-color: #f5f5f5;
                    }
                    .certificate { 
                        background-color: white; 
                        padding: 60px; 
                        border: 20px solid #D4AF37; 
                        border-radius: 20px; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    }
                    h1 { color: #2C3E50; font-size: 40px; margin-bottom: 30px; }
                    h2 { color: #D4AF37; font-size: 50px; margin: 30px 0; }
                    p { font-size: 24px; margin: 20px 0; }
                    .name { font-size: 40px; color: #D4AF37; font-weight: bold; margin: 30px 0; }
                    .achievements { display: flex; justify-content: center; gap: 40px; margin: 40px 0; }
                    .achievement { font-size: 40px; }
                    .date { margin-top: 50px; font-size: 20px; }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <h1>شهادة إنجاز</h1>
                    <h2>⭐ "عالم صغير في حضارة مصر القديمة" ⭐</h2>
                    <p>هذه الشهادة تمنح لـ:</p>
                    <div class="name">${childNameInput.value}</div>
                    <p>لإكماله رحلة التعلم التفاعلية في موقع "رحلتي إلى متحف المصريين القدماء"</p>
                    <p>وإظهاره الفضول والمعرفة بالحضارة المصرية القديمة</p>
                    <div class="achievements">
                        <div class="achievement">⭐</div>
                        <div class="achievement">👑</div>
                        <div class="achievement">👁️</div>
                    </div>
                    <div class="date">تم منح هذه الشهادة في: ${today.toLocaleDateString('ar-EG', options)}</div>
                </div>
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    });
    
    // التحكم في جولة المتحف
    function showRoom(roomNumber) {
        // إخفاء جميع الغرف
        tourRooms.forEach(room => {
            room.classList.remove('active');
        });
        
        // إخفاء جميع المؤشرات
        roomIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // عرض الغرفة المطلوبة
        document.querySelector(`.tour-room[data-room="${roomNumber}"]`).classList.add('active');
        document.querySelector(`.indicator[data-room="${roomNumber}"]`).classList.add('active');
        
        currentRoom = roomNumber;
    }
    
    // الانتقال للغرفة السابقة
    prevRoomBtn.addEventListener('click', function() {
        let newRoom = currentRoom - 1;
        if (newRoom < 1) newRoom = totalRooms;
        showRoom(newRoom);
    });
    
    // الانتقال للغرفة التالية
    nextRoomBtn.addEventListener('click', function() {
        let newRoom = currentRoom + 1;
        if (newRoom > totalRooms) newRoom = 1;
        showRoom(newRoom);
        
        // إلغاء قفل الإنجاز الثاني بعد زيارة جميع الغرف
        if (newRoom === 1) {
            unlockAchievement('crown');
        }
    });
    
    // النقر على المؤشرات
    roomIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const roomNumber = parseInt(this.getAttribute('data-room'));
            showRoom(roomNumber);
        });
    });
    
    // زر "اضغط لتعرف أكثر" في جولة المتحف
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const infoType = this.getAttribute('data-info');
            let infoText = '';
            
            switch(infoType) {
                case 'mummification':
                    infoText = 'التحنيط هو عملية حفظ جثث الموتى التي كان يمارسها المصريون القدماء. كانت تستغرق 70 يومًا وتتضمن إزالة الأعضاء الداخلية وتجفيف الجسم بالملح ثم لفه بلفائف الكتان.';
                    break;
                case 'medical':
                    infoText = 'الأطباء المصريون القدماء كانوا متقدمين جدًا في وقتهم. استخدموا أدوات جراحية مثل المباضع والمشارط، وعرفوا كيفية علاج الجروح وكسور العظام وحتى إجراء عمليات جراحية بسيطة.';
                    break;
                case 'astronomy':
                    infoText = 'المصريون القدماء برعوا في علم الفلك. ابتكروا تقويمًا دقيقًا مكونًا من 365 يومًا، وعرفوا الكواكب والنجوم، وبنوا المعابد محاذية للنجوم والكواكب المهمة.';
                    break;
            }
            
            showNotification(infoText, 'info');
        });
    });
    
    // أزرار الاستماع للشرح في جولة المتحف
    audioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const audioType = this.getAttribute('data-audio');
            let audioText = '';
            
            switch(audioType) {
                case 'mummification':
                    audioText = 'هذه غرفة التحنيط! كان المصريون القدماء يحفظون أجساد الموتى بهذه الطريقة.';
                    break;
                case 'medical':
                    audioText = 'هنا نرى أداة كان يستخدمها الطبيب في الحضارة القديمة!';
                    break;
                case 'astronomy':
                    audioText = 'تخيّل! المصريون القدماء عرفوا الفلك قبل آلاف السنين!';
                    break;
            }
            
            // في المتصفح الحقيقي، يمكن استخدام Web Speech API
            // هنا نعرض النص فقط مع تأثير محاكاة
            simulateAudioPlayback(audioText);
        });
    });
    
    // محاكاة تشغيل الصوت
    function simulateAudioPlayback(text) {
        showNotification(`🔊 جاري تشغيل الصوت: "${text}"`, 'info');
        
        // في تطبيق حقيقي، يمكن استخدام:
        // const utterance = new SpeechSynthesisUtterance(text);
        // utterance.lang = 'ar-SA';
        // speechSynthesis.speak(utterance);
    }
    
    // تشغيل الألعاب
    playGameBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const gameType = this.getAttribute('data-game');
            loadGame(gameType);
        });
    });
    
    // تحميل اللعبة المختارة
    function loadGame(gameType) {
        let gameHTML = '';
        
        switch(gameType) {
            case 'matching':
                gameHTML = `
                    <div class="game-content">
                        <h3>لعبة المطابقة</h3>
                        <p>اسحب الصورة إلى الاسم المناسب لها</p>
                        <div class="matching-game-container">
                            <div class="matching-items">
                                <div class="item" data-item="scalpel">
                                    <div class="item-image">🔪</div>
                                    <div class="item-name">مبضع</div>
                                </div>
                                <div class="item" data-item="scale">
                                    <div class="item-image">⚖️</div>
                                    <div class="item-name">ميزان</div>
                                </div>
                                <div class="item" data-item="eye">
                                    <div class="item-image">👁️</div>
                                    <div class="item-name">عين حورس</div>
                                </div>
                            </div>
                            <div class="matching-targets">
                                <div class="target" data-target="scalpel">مبضع</div>
                                <div class="target" data-target="scale">ميزان</div>
                                <div class="target" data-target="eye">عين حورس</div>
                            </div>
                        </div>
                        <button id="check-matching" class="game-action-btn">تحقق من الإجابات</button>
                    </div>
                `;
                break;
                
            case 'star':
                gameHTML = `
                    <div class="game-content">
                        <h3>لعبة أين النجمة؟</h3>
                        <p>اختر النجمة الصحيحة المرتبطة برع أو تحوت</p>
                        <div class="star-game-container">
                            <div class="question">أي من هذه النجوم مرتبط بإله الشمس "رع"؟</div>
                            <div class="star-options">
                                <div class="star-option" data-correct="false">⭐</div>
                                <div class="star-option" data-correct="true">☀️</div>
                                <div class="star-option" data-correct="false">🌙</div>
                                <div class="star-option" data-correct="false">✨</div>
                            </div>
                        </div>
                        <button id="check-star" class="game-action-btn">تحقق من الإجابة</button>
                    </div>
                `;
                break;
                
            case 'question':
                gameHTML = `
                    <div class="game-content">
                        <h3>سؤال اليوم</h3>
                        <p>ما لون تاج الملك توت عنخ آمون؟</p>
                        <div class="question-game-container">
                            <div class="color-options">
                                <div class="color-option" data-color="red" style="background-color: #FF0000;"></div>
                                <div class="color-option" data-color="blue" style="background-color: #0000FF;"></div>
                                <div class="color-option" data-color="gold" style="background-color: #D4AF37;"></div>
                                <div class="color-option" data-color="green" style="background-color: #008000;"></div>
                            </div>
                            <div class="color-labels">
                                <div>أحمر</div>
                                <div>أزرق</div>
                                <div>ذهبي</div>
                                <div>أخضر</div>
                            </div>
                        </div>
                        <button id="check-question" class="game-action-btn">تحقق من الإجابة</button>
                    </div>
                `;
                break;
        }
        
        gameBoard.innerHTML = gameHTML;
        gameBoard.style.display = 'block';
        
        // إضافة مستمعي الأحداث للألعاب بعد تحميلها
        setTimeout(() => {
            setupGameEvents(gameType);
        }, 100);
    }
    
    // إعداد أحداث الألعاب
    function setupGameEvents(gameType) {
        switch(gameType) {
            case 'matching':
                setupMatchingGame();
                break;
            case 'star':
                setupStarGame();
                break;
            case 'question':
                setupQuestionGame();
                break;
        }
    }
    
    // إعداد لعبة المطابقة
    function setupMatchingGame() {
        const items = document.querySelectorAll('.matching-items .item');
        const targets = document.querySelectorAll('.matching-targets .target');
        const checkBtn = document.getElementById('check-matching');
        
        let draggedItem = null;
        
        // سحب العناصر
        items.forEach(item => {
            item.setAttribute('draggable', 'true');
            
            item.addEventListener('dragstart', function() {
                draggedItem = this;
                setTimeout(() => {
                    this.style.opacity = '0.4';
                }, 0);
            });
            
            item.addEventListener('dragend', function() {
                setTimeout(() => {
                    this.style.opacity = '1';
                    draggedItem = null;
                }, 0);
            });
        });
        
        // إسقاط العناصر
        targets.forEach(target => {
            target.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.backgroundColor = '#f0f0f0';
            });
            
            target.addEventListener('dragleave', function() {
                this.style.backgroundColor = '';
            });
            
            target.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.backgroundColor = '';
                
                if (draggedItem) {
                    const itemType = draggedItem.getAttribute('data-item');
                    const targetType = this.getAttribute('data-target');
                    
                    if (itemType === targetType) {
                        this.innerHTML = draggedItem.innerHTML;
                        this.classList.add('correct');
                        draggedItem.style.visibility = 'hidden';
                        showNotification('أحسنت! المطابقة صحيحة', 'success');
                    } else {
                        showNotification('حاول مرة أخرى!', 'warning');
                    }
                }
            });
        });
        
        // زر التحقق
        checkBtn.addEventListener('click', function() {
            const correctMatches = document.querySelectorAll('.target.correct').length;
            
            if (correctMatches === 3) {
                showNotification('ممتاز! لقد أكملت جميع المطابقات بنجاح!', 'success');
                unlockAchievement('eye');
            } else {
                showNotification(`لقد أكملت ${correctMatches} من 3 مطابقات. حاول إكمال الباقي!`, 'info');
            }
        });
    }
    
    // إعداد لعبة أين النجمة
    function setupStarGame() {
        const starOptions = document.querySelectorAll('.star-option');
        const checkBtn = document.getElementById('check-star');
        
        let selectedOption = null;
        
        starOptions.forEach(option => {
            option.addEventListener('click', function() {
                starOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedOption = this;
            });
        });
        
        checkBtn.addEventListener('click', function() {
            if (!selectedOption) {
                showNotification('يرجى اختيار إجابة أولاً', 'warning');
                return;
            }
            
            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                showNotification('صحيح! رع هو إله الشمس ويرمز له بقرص الشمس ☀️', 'success');
                selectedOption.classList.add('correct');
                unlockAchievement('star');
            } else {
                showNotification('ليس صحيحًا. حاول مرة أخرى!', 'warning');
                selectedOption.classList.add('wrong');
            }
        });
    }
    
    // إعداد سؤال اليوم
    function setupQuestionGame() {
        const colorOptions = document.querySelectorAll('.color-option');
        const checkBtn = document.getElementById('check-question');
        
        let selectedColor = null;
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedColor = this.getAttribute('data-color');
            });
        });
        
        checkBtn.addEventListener('click', function() {
            if (!selectedColor) {
                showNotification('يرجى اختيار لون أولاً', 'warning');
                return;
            }
            
            if (selectedColor === 'gold') {
                showNotification('صحيح! تاج توت عنخ آمون كان ذهبي اللون مثل معظم تيجان الفراعنة.', 'success');
                document.querySelector('.color-option[data-color="gold"]').classList.add('correct');
                unlockAchievement('crown');
            } else {
                showNotification('ليس صحيحًا. تذكر أن تيجان الملوك كانت عادة ذهبية!', 'warning');
                document.querySelector(`.color-option[data-color="${selectedColor}"]`).classList.add('wrong');
            }
        });
    }
    
    // إلغاء قفل الإنجازات
    function unlockAchievement(achievementType) {
        if (unlockedAchievements[achievementType]) return;
        
        unlockedAchievements[achievementType] = true;
        
        let achievementElement;
        switch(achievementType) {
            case 'star':
                achievementElement = document.getElementById('star-achievement');
                break;
            case 'crown':
                achievementElement = document.getElementById('crown-achievement');
                break;
            case 'eye':
                achievementElement = document.getElementById('eye-achievement');
                break;
        }
        
        if (achievementElement) {
            achievementElement.classList.add('unlocked');
            
            // تأثير مرئي للإنجاز
            achievementElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                achievementElement.style.transform = 'scale(1)';
            }, 300);
            
            showNotification(`🎉 مبروك! لقد حصلت على إنجاز جديد!`, 'success');
            
            // التحقق مما إذا تم إلغاء قفل جميع الإنجازات
            const allUnlocked = Object.values(unlockedAchievements).every(val => val === true);
            if (allUnlocked) {
                setTimeout(() => {
                    showNotification('🎊 مبروك! لقد حصلت على جميع الإنجازات! يمكنك الآن الحصول على شهادتك.', 'success');
                }, 1000);
            }
        }
    }
    
    // تعليمات مختبر الفراعنة
    experimentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const experimentType = this.getAttribute('data-experiment');
            showExperimentInstructions(experimentType);
        });
    });
    
    // عرض تعليمات التجربة
    function showExperimentInstructions(experimentType) {
        let instructionsHTML = '';
        
        switch(experimentType) {
            case 'sundial':
                instructionsHTML = `
                    <h3>صنع مزولة</h3>
                    <div class="instructions-content">
                        <h4>الأدوات المطلوبة:</h4>
                        <ul>
                            <li>كوب بلاستيكي أو ورقي</li>
                            <li>عصا مستقيمة (عصا أسنان أو قلم رصاص)</li>
                            <li>صمغ لاصق</li>
                            <li>مسطرة</li>
                            <li>قلم للعلامات</li>
                        </ul>
                        <h4>خطوات العمل:</h4>
                        <ol>
                            <li>الصق العصا في منتصف قاع الكوب من الداخل</li>
                            <li>ضع الكوب في مكان مشمس في الخارج</li>
                            <li>سجل مكان ظل العصا كل ساعة</li>
                            <li>ارسم علامات لكل ساعة على حافة الكوب</li>
                            <li>الآن يمكنك معرفة الوقت من خلال ظل العصا!</li>
                        </ol>
                        <div class="safety-note">
                            <strong>ملاحظة أمان:</strong> تأكد من وجود شخص بالغ معك عند استخدام الأدوات الحادة.
                        </div>
                    </div>
                `;
                break;
                
            case 'mummification':
                instructionsHTML = `
                    <h3>تجربة التحنيط المصغرة</h3>
                    <div class="instructions-content">
                        <h4>الأدوات المطلوبة:</h4>
                        <ul>
                            <li>تفاحة</li>
                            <li>ملعقة</li>
                            <li>ملح طعام</li>
                            <li>وعاءان</li>
                            <li>ماء</li>
                            <li>لفافة بلاستيكية</li>
                        </ul>
                        <h4>خطوات العمل:</h4>
                        <ol>
                            <li>اقطع التفاحة إلى نصفين</li>
                            <li>ضع نصف التفاحة في وعاء بدون ملح (هذا هو النصف المرجعي)</li>
                            <li>غط النصف الآخر بكثير من الملح في الوعاء الثاني</li>
                            <li>اترك الوعاءين لمدة أسبوع</li>
                            <li>لاحظ الفرق بين النصفين بعد أسبوع</li>
                            <li>النصف المغطى بالملح سيكون قد جف (مثل التحنيط!)</li>
                        </ol>
                        <div class="science-explanation">
                            <strong>التفسير العلمي:</strong> يمتص الملح الماء من التفاحة مما يمنع نمو البكتيريا ويحفظ التفاحة.
                        </div>
                    </div>
                `;
                break;
                
            case 'colors':
                instructionsHTML = `
                    <h3>صنع ألوان طبيعية</h3>
                    <div class="instructions-content">
                        <h4>الأدوات المطلوبة:</h4>
                        <ul>
                            <li>بنجر (للون الأحمر/الوردي)</li>
                            <li>كركم (للون الأصفر)</li>
                            <li>سبانخ (للون الأخضر)</li>
                            <li>توت أزرق (للون الأزرق/البنفسجي)</li>
                            <li>أوعاء صغيرة</li>
                            <li>ملاعق</li>
                            <li>ماء</li>
                            <li>ورق للرسم</li>
                        </ul>
                        <h4>خطوات العمل:</h4>
                        <ol>
                            <li>اهرس كل مادة نباتية في وعاء منفصل</li>
                            <li>أضف قليلًا من الماء وامزج جيدًا</li>
                            <li>صف الخليط لإزالة القطع الكبيرة</li>
                            <li>استخدم السوائل الملونة للرسم على الورق</li>
                            <li>جرب مزج الألوان لصنع ألوان جديدة!</li>
                        </ol>
                        <div class="historical-note">
                            <strong>ملاحظة تاريخية:</strong> استخدم المصريون القدماء ألوانًا طبيعية من النباتات والمعادن لرسم جدران المعابد والمقابر.
                        </div>
                    </div>
                `;
                break;
        }
        
        experimentInstructions.innerHTML = instructionsHTML;
        experimentInstructions.style.display = 'block';
        
        // تمرير إلى قسم التعليمات
        experimentInstructions.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // تشغيل القصص
    storyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const storyType = this.getAttribute('data-story');
            playStory(storyType);
        });
    });
    
    // تشغيل القصة المختارة
    function playStory(storyType) {
        let storyContent = '';
        
        switch(storyType) {
            case 'imhotep':
                storyContent = `
                    <div class="story-content">
                        <h3>قصة الطبيب إيمحوتب</h3>
                        <div class="story-text">
                            <p>في قديم الزمان، عاش رجل حكيم اسمه إيمحوتب. كان إيمحوتب طبيبًا ماهرًا ومهندسًا عبقريًا.</p>
                            <p>ذات يوم، مرض الملك زوسر مرضًا شديدًا. حاول جميع الأطباء علاجه لكنهم فشلوا. عندها جاء إيمحوتب وفحص الملك بعناية.</p>
                            <p>بعد الفحص، قال إيمحوتب: "يا مولاي، مرضك ليس بخطير. سأعد لك دواء من الأعشاب الطبيعية."</p>
                            <p>أعد إيمحوتب الدواء وأعطاه للملك. في خلال أيام قليلة، شفي الملك تمامًا!</p>
                            <p>منح الملك زوسر إيمحوتب ثقته وكلفه ببناء مقبرة عظيمة. فبنى إيمحوتب أول هرم في التاريخ، وهو الهرم المدرج في سقارة.</p>
                            <p>أصبح إيمحوتب مشهورًا في كل مصر. الناس كانوا يأتون إليه من كل مكان للعلاج. كما أنه كتب أول كتاب في الطب في التاريخ!</p>
                            <p>بعد وفاته، اعتبره المصريون القدماء إله الطب والتعلم. ولا يزال اسم إيمحوتب يذكر حتى اليوم كأول طبيب ومهندس معماري في التاريخ.</p>
                        </div>
                        <button class="close-story-btn">إغلاق القصة</button>
                    </div>
                `;
                break;
                
            case 'thoth':
                storyContent = `
                    <div class="story-content">
                        <h3>قصة الإله تحوت</h3>
                        <div class="story-text">
                            <p>تحوت هو إله الحكمة والمعرفة في مصر القديمة. كان يصور برأس طائر أبو منجل أو قرد البابون.</p>
                            <p>تقول الأسطورة أن تحوت اخترع الكتابة. ذات يوم، بينما كان جالسًا على ضفة النيل، لاحظ كيف تترك الطيور آثار أقدامها على الرمال.</p>
                            <p>فكر تحوت: "ماذا لو ابتكرنا رموزًا تمثل الكلمات والأفكار؟" وهكذا اخترع الكتابة الهيروغليفية.</p>
                            <p>علم تحوت الكتابة والحساب للناس. كما أنه ساعد في تنظيم الكون وحساب الوقت.</p>
                            <p>كان تحوت حكيمًا وعادلًا. في محكمة الموتى، كان يزن قلب الميت مقابل ريشة العدالة. إذا كان القلب أخف من الريشة، يدخل الميت الجنة.</p>
                            <p>كان المصريون القدماء يعتقدون أن تحوت يحمي العلماء والكتاب. حتى اليوم، نذكر تحوت كرمز للحكمة والمعرفة.</p>
                        </div>
                        <button class="close-story-btn">إغلاق القصة</button>
                    </div>
                `;
                break;
                
            case 'tutankhamun':
                storyContent = `
                    <div class="story-content">
                        <h3>قصة الملك توت عنخ آمون</h3>
                        <div class="story-text">
                            <p>كان توت عنخ آمون ملكًا صغيرًا على مصر. أصبح فرعونًا وهو في التاسعة من عمره فقط!</p>
                            <p>عاش توت عنخ آمون منذ أكثر من 3300 سنة. كان حكمه قصيرًا، لمدة تسع سنوات فقط.</p>
                            <p>عندما كان طفلاً، أحب توت عنخ آمون الصيد والرياضة. كان يمارس الرماية وقيادة العربات الحربية.</p>
                            <p>تزوج توت عنخ آمون من ابنة عمه، الملكة عنخ إسن آمون. كانا يعيشان في القصر الملكي في طيبة.</p>
                            <p>توفي توت عنخ آمون وهو في الثامنة عشرة من عمره. دفن في وادي الملوك في مقبرة صغيرة.</p>
                            <p>ظلت مقبرة توت عنخ آمون مخفية لمدة 3000 عام. في عام 1922، اكتشفها عالم الآثار هوارد كارتر.</p>
                            <p>كانت المقبرة مليئة بالكنوز الذهبية الرائعة، بما في ذلك القناع الذهبي الشهير الذي أصبح رمزًا للحضارة المصرية.</p>
                            <p>اليوم، يمكن رؤية كنوز توت عنخ آمون في المتحف المصري الكبير. قصة الفرعون الصغير لا تزال تجذب الناس من جميع أنحاء العالم.</p>
                        </div>
                        <button class="close-story-btn">إغلاق القصة</button>
                    </div>
                `;
                break;
        }
        
        storyPlayer.innerHTML = storyContent;
        storyPlayer.style.display = 'block';
        
        // إضافة مستمع حدث لإغلاق القصة
        setTimeout(() => {
            document.querySelector('.close-story-btn').addEventListener('click', function() {
                storyPlayer.style.display = 'none';
            });
        }, 100);
        
        // تمرير إلى مشغل القصص
        storyPlayer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // عرض موارد قسم المعلمة
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceType = this.getAttribute('data-resource');
            showResource(resourceType);
        });
    });
    
    // عرض الأنشطة القابلة للطباعة
    activityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const activityType = this.getAttribute('data-activity');
            showPrintableActivity(activityType);
        });
    });
    
    // عرض المورد المحدد
    function showResource(resourceType) {
        let resourceHTML = '';
        
        switch(resourceType) {
            case 'guide':
                resourceHTML = `
                    <h3>دليل استخدام الموقع</h3>
                    <div class="resource-content">
                        <h4>كيف تستفيد من الموقع في العملية التعليمية:</h4>
                        <ol>
                            <li><strong>التهيئة:</strong> شاهد الفيديو التعريفي في الصفحة الرئيسية مع الأطفال.</li>
                            <li><strong>الجولة الافتراضية:</strong> استخدم قسم "جولة المتحف" كبديل للزيارة الحقيقية.</li>
                            <li><strong>التعلم التفاعلي:</strong> شجع الأطفال على لعب الألعاب التعليمية.</li>
                            <li><strong>التجارب العملية:</strong> نفذ تجارب "مختبر الفراعنة" مع الأطفال.</li>
                            <li><strong>القصص:</strong> استخدم قصص المتحف كحكايات قبل النوم أو في حصص القراءة.</li>
                            <li><strong>التقييم:</strong> استخدم الشهادة كمكافأة للأطفال بعد إكمال الأنشطة.</li>
                        </ol>
                        <h4>نصائح للمعلمين:</h4>
                        <ul>
                            <li>خصص 30-45 دقيقة أسبوعيًا للأنشطة التفاعلية على الموقع.</li>
                            <li>ربط الدروس بالأنشطة الموجودة على الموقع (مثل ربط درس التاريخ بجولة المتحف).</li>
                            <li>استخدم الأنشطة القابلة للطباعة كواجبات منزلية.</li>
                            <li>شجع الأطفال على جمع جميع الإنجازات للحصول على الشهادة.</li>
                        </ul>
                        <button class="print-resource-btn">طباعة الدليل</button>
                    </div>
                `;
                break;
                
            case 'ideas':
                resourceHTML = `
                    <h3>أفكار لربط الزيارة الافتراضية بدرس داخل الصف</h3>
                    <div class="resource-content">
                        <h4>للصفوف الأولى (1-3):</h4>
                        <ul>
                            <li><strong>درس الألوان:</strong> اطلب من الأطفال تلوين رسومات فرعونية باستخدام الألوان الطبيعية كما في تجربة "مختبر الفراعنة".</li>
                            <li><strong>درس الحروف:</strong> علم الأطفال كتابة أسمائهم بالهيروغليفية باستخدام نشاط "كتابة هيروغليفية".</li>
                            <li><strong>درس الأرقام:</strong> استخدم نظام الأرقام المصرية القديمة لتعليم العد.</li>
                        </ul>
                        
                        <h4>للصفوف المتوسطة (4-6):</h4>
                        <ul>
                            <li><strong>درس التاريخ:</strong> قارن بين الحياة في مصر القديمة والحياة الحديثة.</li>
                            <li><strong>درس العلوم:</strong> ناقش كيفية حفظ المومياوات عبر تجربة التحنيط المصغرة.</li>
                            <li><strong>درس الجغرافيا:</strong> تتبع رحلة نهر النيل وأهميته للحضارة المصرية.</li>
                        </ul>
                        
                        <h4>أنشطة جماعية مقترحة:</h4>
                        <ul>
                            <li>مسابقة "من أنا؟" حيث يصف الطفل شخصية فرعونية ويحاول الآخرون التعرف عليها.</li>
                            <li>بناء نموذج مصغر للهرم باستخدام مكعبات أو طين.</li>
                            <li>تمثيل مسرحية قصيرة عن حياة فرعون مثل توت عنخ آمون.</li>
                        </ul>
                        
                        <button class="print-resource-btn">طباعة الأفكار</button>
                    </div>
                `;
                break;
        }
        
        resourceDisplay.innerHTML = resourceHTML;
        resourceDisplay.style.display = 'block';
        
        // إضافة مستمع حدث لطباعة المورد
        setTimeout(() => {
            document.querySelector('.print-resource-btn').addEventListener('click', function() {
                window.print();
            });
        }, 100);
        
        // تمرير إلى عرض المورد
        resourceDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // عرض النشاط القابل للطباعة
    function showPrintableActivity(activityType) {
        let activityHTML = '';
        
        switch(activityType) {
            case 'coloring':
                activityHTML = `
                    <h3>نشاط تلوين المومياء</h3>
                    <div class="activity-content">
                        <div class="coloring-page">
                            <div class="coloring-image">
                                <div style="text-align: center; font-size: 80px; margin: 20px 0;">⚰️</div>
                                <p style="text-align: center; font-size: 24px; margin-bottom: 30px;">مومياء فرعونية</p>
                            </div>
                            <div class="coloring-instructions">
                                <h4>تعليمات التلوين:</h4>
                                <ol>
                                    <li>اطبع هذه الصفحة</li>
                                    <li>استخدم الألوان الذهبية والبيج والفيروزي كما كانت تستخدم في مصر القديمة</li>
                                    <li>يمكنك إضافة رسومات هيروغليفية حول المومياء</li>
                                    <li>اكتب اسمك في المربع أدناه</li>
                                </ol>
                                <div class="name-box">
                                    <p>اسم الفنان الصغير: ___________________</p>
                                    <p>التاريخ: ___________________</p>
                                </div>
                            </div>
                        </div>
                        <button class="print-activity-btn">طباعة النشاط</button>
                    </div>
                `;
                break;
                
            case 'pyramid':
                activityHTML = `
                    <h3>نشاط تجميع الهرم</h3>
                    <div class="activity-content">
                        <div class="pyramid-activity">
                            <div class="pyramid-template">
                                <h4>قالب الهرم:</h4>
                                <div style="text-align: center; margin: 20px 0;">
                                    <div style="font-size: 60px;">🔺</div>
                                    <p>هرم مصري</p>
                                </div>
                                <div class="assembly-instructions">
                                    <h4>تعليمات التجميع:</h4>
                                    <ol>
                                        <li>اطبع هذه الصفحة على ورق مقوى</li>
                                        <li>اقطع الشكل على طول الخطوط</li>
                                        <li>اطوِ على الخطوط المنقطة</li>
                                        <li>الصق الأطراف باستخدام الغراء</li>
                                        <li>زين الهرم برسومات هيروغليفية</li>
                                    </ol>
                                    <div class="fun-fact">
                                        <strong>معلومة ممتعة:</strong> بنى المصريون القدماء الأهرامات كمقابر للملوك. هرم خوفو هو الأكبر ويبلغ ارتفاعه 146 مترًا!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="print-activity-btn">طباعة النشاط</button>
                    </div>
                `;
                break;
                
            case 'hieroglyphics':
                activityHTML = `
                    <h3>نشاط كتابة هيروغليفية</h3>
                    <div class="activity-content">
                        <div class="hieroglyphics-activity">
                            <h4>جدول الحروف الهيروغليفية:</h4>
                            <div class="hieroglyphics-chart">
                                <div class="hieroglyph-row">
                                    <div>أ = 🦅 (نسر)</div>
                                    <div>ب = 🦵 (رجل)</div>
                                    <div>ت = 🍞 (رغيف خبز)</div>
                                </div>
                                <div class="hieroglyph-row">
                                    <div>ج = 🪣 (سلة)</div>
                                    <div>د = ✋ (يد)</div>
                                    <div>ر = 👄 (فم)</div>
                                </div>
                                <div class="hieroglyph-row">
                                    <div>س = 🍼 (ماء مقسم)</div>
                                    <div>ع = 👁️ (عين)</div>
                                    <div>ف = 🐍 (أفعى)</div>
                                </div>
                            </div>
                            
                            <div class="writing-practice">
                                <h4>تدرب على كتابة اسمك:</h4>
                                <div class="practice-area">
                                    <p>اكتب اسمك بالعربية: ___________________</p>
                                    <p>اكتب اسمك بالهيروغليفية:</p>
                                    <div class="hieroglyph-box" style="border: 2px dashed #D4AF37; height: 100px; margin: 20px 0; padding: 10px;">
                                        <!-- مساحة لكتابة الهيروغليفية -->
                                    </div>
                                    <div class="hieroglyph-tip">
                                        <strong>تلميح:</strong> اكتب من اليمين لليسار أو من اليسار لليمين، أو حتى من الأعلى للأسفل!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="print-activity-btn">طباعة النشاط</button>
                    </div>
                `;
                break;
        }
        
        resourceDisplay.innerHTML = activityHTML;
        resourceDisplay.style.display = 'block';
        
        // إضافة مستمع حدث لطباعة النشاط
        setTimeout(() => {
            document.querySelector('.print-activity-btn').addEventListener('click', function() {
                window.print();
            });
        }, 100);
        
        // تمرير إلى عرض النشاط
        resourceDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // عرض الإشعارات
    function showNotification(message, type) {
        // إنصراف الإشعار إذا كان موجودًا بالفعل
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notification);
        
        // إظهار الإشعار بتحريكه
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إغلاق الإشعار عند النقر على الزر
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // إزالة الإشعار تلقائيًا بعد 5 ثوانٍ
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // إضافة أنماط الإشعارات
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateY(-100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            max-width: 500px;
            margin: 0 auto;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification-success {
            border-right: 5px solid var(--success-color);
        }
        
        .notification-warning {
            border-right: 5px solid var(--warning-color);
        }
        
        .notification-info {
            border-right: 5px solid var(--secondary-color);
        }
        
        .notification-content {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-message {
            font-size: 16px;
            flex-grow: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--dark-color);
            margin-right: 10px;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // إضافة أنماط إضافية للألعاب
    const gameStyles = document.createElement('style');
    gameStyles.textContent = `
        .matching-game-container {
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin: 30px 0;
        }
        
        .matching-items, .matching-targets {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .item, .target {
            width: 120px;
            height: 120px;
            border: 2px dashed var(--primary-color);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            cursor: move;
            background-color: white;
        }
        
        .target {
            cursor: default;
        }
        
        .target.correct {
            border-color: var(--success-color);
            border-style: solid;
            background-color: rgba(40, 167, 69, 0.1);
        }
        
        .item-name {
            font-size: 16px;
            margin-top: 10px;
        }
        
        .star-game-container, .question-game-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .star-options, .color-options {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        
        .star-option {
            font-size: 50px;
            cursor: pointer;
            padding: 10px;
            border-radius: 10px;
            transition: var(--transition);
        }
        
        .star-option.selected {
            background-color: var(--accent-color);
            transform: scale(1.1);
        }
        
        .star-option.correct {
            background-color: rgba(40, 167, 69, 0.2);
        }
        
        .star-option.wrong {
            background-color: rgba(220, 53, 69, 0.2);
        }
        
        .color-option {
            width: 80px;
            height: 80px;
            border-radius: 10px;
            cursor: pointer;
            border: 3px solid transparent;
            transition: var(--transition);
        }
        
        .color-option.selected {
            border-color: var(--dark-color);
            transform: scale(1.1);
        }
        
        .color-option.correct {
            border-color: var(--success-color);
        }
        
        .color-option.wrong {
            border-color: var(--danger-color);
        }
        
        .color-labels {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .color-labels div {
            width: 80px;
            text-align: center;
            font-size: 16px;
        }
        
        .game-action-btn {
            display: block;
            margin: 20px auto;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 30px;
            padding: 12px 30px;
            font-size: 18px;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .game-action-btn:hover {
            background-color: #b8941f;
        }
        
        .question {
            font-size: 22px;
            margin: 20px 0;
        }
    `;
    document.head.appendChild(gameStyles);
    
    // تهيئة أول غرفة في الجولة
    showRoom(1);
    
    // بدء الموسيقى تلقائيًا بعد تفاعل المستخدم
    document.addEventListener('click', function initMusic() {
        if (!musicPlaying) {
            backgroundMusic.play().then(() => {
                musicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i><span class="sound-text">إيقاف الموسيقى</span>';
            }).catch(e => {
                console.log("لم يتم تشغيل الموسيقى:", e);
            });
        }
        // إزالة مستمع الحدث بعد التفاعل الأول
        document.removeEventListener('click', initMusic);
    });
});