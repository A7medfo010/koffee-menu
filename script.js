// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ الصفحة جاهزة!");
    
    // عند الضغط على لغة
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            // نزيل النشاط من الكل
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // نضيف النشاط للاختيار
            this.classList.add('active');
            
            // نختار اللغة
            const lang = this.getAttribute('data-lang');
            currentLang = lang;
            
            // ننتقل للمنيو
            setTimeout(() => {
                showMenu(lang);
            }, 300);
        });
    });
    
    // عند الضغط على تصنيف
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // نزيل النشاط من الكل
            document.querySelectorAll('.cat-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // نضيف النشاط للزر
            this.classList.add('active');
            
            // نظهر القسم المطلوب
            const cat = this.getAttribute('data-cat');
            showCategory(cat);
            
            // نلصق قائمة التصنيفات في الأعلى
            scrollToTop();
        });
    });
    
    // إضافة تأثيرات تفاعلية
    addInteractiveEffects();
});

// الحالة الحالية للغة
let currentLang = 'ar';
let sizeFilter = 'all'; // all, medium, large

// إظهار المنيو
function showMenu(lang) {
    console.log("🚀 الانتقال للقائمة باللغة:", lang);
    
    // نخفي شاشة اللغة
    document.getElementById('languageScreen').style.display = 'none';
    
    // نظهر شاشة المنيو
    const menuScreen = document.getElementById('menuScreen');
    menuScreen.style.display = 'block';
    
    // نظهر فلتر الأحجام
    const sizeFilterContainer = document.querySelector('.size-filter-container');
    if (sizeFilterContainer) {
        sizeFilterContainer.style.display = 'flex';
    }
    
    // نغير كل النصوص
    translateAllTexts(lang);
    
    // نظهر القسم الأول
    showCategory('hot');
    
    // ننشئ أحداث فلتر الأحجام
    setupSizeFilter();
    
    // نطبق فلتر الأحجام
    applySizeFilter(sizeFilter);
}

// إعداد فلتر الأحجام
function setupSizeFilter() {
    const sizeFilterBtns = document.querySelectorAll('.size-filter-btn');
    
    sizeFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // نزيل النشاط من الكل
            sizeFilterBtns.forEach(b => {
                b.classList.remove('active');
            });
            
            // نضيف النشاط للزر
            this.classList.add('active');
            
            // نطبق الفلتر
            sizeFilter = this.getAttribute('data-size');
            applySizeFilter(sizeFilter);
        });
    });
}

// تطبيق فلتر الأحجام
function applySizeFilter(filter) {
    console.log("🔍 تطبيق فلتر الأحجام:", filter);
    
    document.querySelectorAll('.item').forEach(item => {
        const hasSizes = item.getAttribute('data-has-sizes') === 'true';
        
        if (filter === 'all') {
            // نعرض كل العناصر
            item.style.display = 'flex';
            
            // نظهر علامة M&L للعناصر اللي ليها حجمين
            if (hasSizes && !item.querySelector('.size-badge')) {
                addSizeBadge(item);
            }
            
            // نرجع الأسعار الأصلية
            restoreOriginalPrices(item);
        } 
        else if (filter === 'medium') {
            if (hasSizes) {
                // نظهر العناصر اللي ليها حجم متوسط
                item.style.display = 'flex';
                showMediumPrice(item);
            } else {
                // نخفي العناصر اللي ليس لها حجم متوسط
                item.style.display = 'none';
            }
        } 
        else if (filter === 'large') {
            if (hasSizes) {
                // نظهر العناصر اللي ليها حجم كبير
                item.style.display = 'flex';
                showLargePrice(item);
            } else {
                // نخفي العناصر اللي ليس لها حجم كبير
                item.style.display = 'none';
            }
        }
    });
}

// إضافة علامة M&L
function addSizeBadge(item) {
    const badge = document.createElement('span');
    badge.className = 'size-badge';
    badge.textContent = 'M & L';
    item.querySelector('.item-name').insertAdjacentElement('beforebegin', badge);
}

// عرض سعر M فقط
function showMediumPrice(item) {
    const priceAr = item.querySelector('.item-price-ar');
    const priceEn = item.querySelector('.item-price-en');
    
    if (priceAr && priceAr.classList.contains('split-price')) {
        const mPrice = priceAr.getAttribute('data-m');
        priceAr.textContent = mPrice + ' جـ (M)';
    }
    
    if (priceEn && priceEn.classList.contains('split-price')) {
        const mPrice = priceEn.getAttribute('data-m');
        priceEn.textContent = mPrice + ' LE (M)';
    }
}

// عرض سعر L فقط
function showLargePrice(item) {
    const priceAr = item.querySelector('.item-price-ar');
    const priceEn = item.querySelector('.item-price-en');
    
    if (priceAr && priceAr.classList.contains('split-price')) {
        const lPrice = priceAr.getAttribute('data-l');
        priceAr.textContent = lPrice + ' جـ (L)';
    }
    
    if (priceEn && priceEn.classList.contains('split-price')) {
        const lPrice = priceEn.getAttribute('data-l');
        priceEn.textContent = lPrice + ' LE (L)';
    }
}

// إعادة الأسعار الأصلية
function restoreOriginalPrices(item) {
    const priceAr = item.querySelector('.item-price-ar');
    const priceEn = item.querySelector('.item-price-en');
    
    if (priceAr && priceAr.classList.contains('split-price')) {
        const mPrice = priceAr.getAttribute('data-m');
        const lPrice = priceAr.getAttribute('data-l');
        priceAr.textContent = mPrice + '/' + lPrice + ' جـ';
    }
    
    if (priceEn && priceEn.classList.contains('split-price')) {
        const mPrice = priceEn.getAttribute('data-m');
        const lPrice = priceEn.getAttribute('data-l');
        priceEn.textContent = mPrice + '/' + lPrice + ' LE';
    }
}

// ترجمة جميع النصوص
function translateAllTexts(lang) {
    // نغير اتجاه الصفحة
    if (lang === 'en') {
        document.body.classList.add('english');
        document.body.dir = 'ltr';
    } else {
        document.body.classList.remove('english');
        document.body.dir = 'rtl';
    }
    
    // الترجمة
    const texts = {
        ar: {
            // شاشة اللغة
            'welcomeMessage': 'أهلاً بكم في كوفي كلتشر! يُرجى اختيار لغتك المفضلة.',
            'instruction': 'انقر على لغتك المفضلة للمتابعة',
            
            // الهيدر
            'tagline': 'قهوة مميزة • أجواء مريحة • طعم لا يُنسى',
            
            // أزرار التصنيفات
            'catHot': 'قهوة ساخنة',
            'catCold': 'قهوة باردة',
            'catMatcha': 'ماتشا',
            'catFrappe': 'فرايه',
            'catDrinks': 'مشروبات خاصة',
            'catBreakfast': 'إفطار',
            'catBagels': 'باجلز',
            'catSweets': 'حلويات',
            'catExtras': 'إضافات كيه كيه',
            
            // عناوين الأقسام
            'sectionTitleHot': 'قهوة ساخنة',
            'sectionTitleCold': 'قهوة باردة',
            'sectionTitleMatcha': 'ماتشا كالتشر',
            'sectionTitleFrappe': 'فرايه',
            'sectionTitleDrinks': 'مشروبات خاصة',
            'sectionTitleBreakfast': 'إفطار كيه كيه',
            'sectionTitleBagels': 'باجلز كالتشر',
            'sectionTitleSweets': 'حلويات كالتشر',
            'sectionTitleExtras': 'إضافات كيه كيه',
            
            // الفوتر
            'footerHours': 'مواعيد العمل',
            'workHours1': 'الأحد - الخميس: ٧ صباحاً - ١٢ منتصف الليل',
            'workHours2': 'الجمعة - السبت: ٨ صباحاً - ٢ بعد منتصف الليل',
            'footerLocation': 'العنوان',
            'addressText': 'كراسة، المدينة',
            'phoneText': 'هاتف: 01069092238',
            'footerRights': 'جميع الحقوق محفوظة'
        },
        en: {
            // شاشة اللغة
            'welcomeMessage': 'Welcome to Koffee Kulture! Please select your preferred language.',
            'instruction': 'Click on your preferred language to continue',
            
            // الهيدر
            'tagline': 'Premium Coffee • Cozy Atmosphere • Unforgettable Taste',
            
            // أزرار التصنيفات
            'catHot': 'Hot Coffee',
            'catCold': 'Cold Coffee',
            'catMatcha': 'Matcha',
            'catFrappe': 'Frappe',
            'catDrinks': 'Special Drinks',
            'catBreakfast': 'Breakfast',
            'catBagels': 'Bagels',
            'catSweets': 'Sweets',
            'catExtras': 'KK Extras',
            
            // عناوين الأقسام
            'sectionTitleHot': 'Hot Coffee',
            'sectionTitleCold': 'Cold Coffee',
            'sectionTitleMatcha': 'Matcha Kulture',
            'sectionTitleFrappe': 'Frappe',
            'sectionTitleDrinks': 'Special Drinks',
            'sectionTitleBreakfast': 'KK Breakfast',
            'sectionTitleBagels': 'Bagels Kulture',
            'sectionTitleSweets': 'Sweet Tooth Kulture',
            'sectionTitleExtras': 'KK Extras',
            
            // الفوتر
            'footerHours': 'Opening Hours',
            'workHours1': 'Sunday - Thursday: 7 AM - 12 AM',
            'workHours2': 'Friday - Saturday: 8 AM - 2 AM',
            'footerLocation': 'Location',
            'addressText': 'Kerdasa, City',
            'phoneText': 'Phone: 01069092238',
            'footerRights': 'All rights reserved'
        }
    };

    // تحديث النصوص
    Object.keys(texts[lang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = texts[lang][key];
        }
    });
    
    // ترجمة عناوين المجموعات
    translateGroupTitles(lang);
}

// ترجمة عناوين المجموعات
function translateGroupTitles(lang) {
    const translations = {
        ar: {
            'Espresso': 'إسبريسو',
            'Classic Lattes': 'لاتيه كلاسيك',
            'Special Lattes (Medium/Large)': 'لاتيه خاص (متوسط/كبير)',
            'Mocha (Medium/Large)': 'موكا (متوسط/كبير)',
            'Hot Chocolate': 'هوت تشوكلت',
            'Iced Coffee (Medium/Large)': 'قهوة مثلجة (متوسط/كبير)',
            'Special Iced Coffee (Medium/Large)': 'قهوة باردة خاصة (متوسط/كبير)',
            'Blended Coffee (Medium/Large)': 'قهوة بلندد (متوسط/كبير)',
            'Hot Matcha (Medium/Large)': 'ماتشا ساخن (متوسط/كبير)',
            'Iced Matcha (Medium/Large)': 'ماتشا مثلج (متوسط/كبير)',
            'Blended Matcha (Medium/Large)': 'ماتشا بلندد (متوسط/كبير)',
            'Coffee Frappe (Medium/Large)': 'فرابيه قهوة (متوسط/كبير)',
            'Mojito (Medium/Large)': 'موهيتو (متوسط/كبير)',
            'Redbull (Medium/Large)': 'ريدبول (متوسط/كبير)',
            'Refreshers & Ice Tea (Medium/Large)': 'منعشات وآيس تي (متوسط/كبير)',
            'Smoothies & Love Story (Medium/Large)': 'سموذي وقصة حب (متوسط/كبير)',
            'Sandwiches': 'ساندوتشات',
            'Toast & Croissant': 'توست وكرواسون',
            'Omelette & Eggs': 'أومليت وبيض',
            'Classic Bagels': 'باجلز كلاسيك',
            'Special Bagels': 'باجلز خاص',
            'Cake & Cheesecake': 'كيك وشيزكيك',
            'Sweet Croissant': 'كرواسون حلو',
            'Small Sweets': 'حلويات صغيرة',
            'Salads': 'سلطات',
            'Add-ons': 'إضافات',
            'Classic Syrups': 'سيروبات كلاسيك',
            'Extra Ingredients for Omelette': 'مكونات إضافية للأومليت'
        },
        en: {
            // النصوص الإنجليزية تبقى كما هي
        }
    };
    
    // تحديث عناوين المجموعات
    document.querySelectorAll('.group-title').forEach(title => {
        const originalText = title.textContent;
        if (lang === 'ar' && translations.ar[originalText]) {
            title.textContent = translations.ar[originalText];
        } else if (lang === 'en' && originalText.includes('(Medium/Large)')) {
            // الحفاظ على النص الإنجليزي
            title.textContent = originalText;
        }
    });
}

// إظهار قسم معين
function showCategory(cat) {
    console.log("📂 عرض قسم:", cat);
    
    // نخفي كل الأقسام
    document.querySelectorAll('.menu-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // نظهر القسم المطلوب
    const sectionId = 'section' + cat.charAt(0).toUpperCase() + cat.slice(1);
    const section = document.getElementById(sectionId);
    
    if (section) {
        section.style.display = 'block';
        
        // نطبق فلتر الأحجام على القسم الجديد
        setTimeout(() => {
            applySizeFilter(sizeFilter);
        }, 50);
    }
}

// التمرير للأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// تأثيرات تفاعلية
function addInteractiveEffects() {
    // تأثيرات لصور KK
    const kkImages = document.querySelectorAll('.kk-main-image, .kk-header-image');
    kkImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease-out';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        img.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // تأثيرات للمرور على العناصر
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(156, 175, 136, 0.1)';
            this.style.paddingLeft = '15px';
            this.style.paddingRight = '15px';
            this.style.marginLeft = '-15px';
            this.style.marginRight = '-15px';
            this.style.borderRadius = '10px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.paddingLeft = '0';
            this.style.paddingRight = '0';
            this.style.marginLeft = '0';
            this.style.marginRight = '0';
            this.style.borderRadius = '0';
        });
    });
    
    // جعل قائمة التصنيفات لاصقة عند التمرير
    window.addEventListener('scroll', function() {
        const categories = document.querySelector('.categories');
        if (categories) {
            if (window.scrollY > 100) {
                categories.style.position = 'fixed';
                categories.style.top = '10px';
                categories.style.left = '50%';
                categories.style.transform = 'translateX(-50%)';
                categories.style.width = '90%';
                categories.style.maxWidth = '1200px';
                categories.style.zIndex = '1000';
                categories.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                categories.style.position = 'sticky';
                categories.style.top = '10px';
                categories.style.left = 'auto';
                categories.style.transform = 'none';
                categories.style.width = '100%';
                categories.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            }
        }
    });
}

console.log("📄 JavaScript محمل بنجاح!");