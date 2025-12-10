// Параллакс эффект
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (parallaxBg) {
            const bgY = scrolled * 0.8;
            parallaxBg.style.transform = `translateY(${bgY}px)`;
        }
    });
    });
// Функция для показа номеров телефонов
function showPhoneNumbers() {
    const modal = document.getElementById('phoneModal');
    modal.style.display = 'flex';
    
    // Блокируем скролл страницы при открытом модальном окне
    document.body.style.overflow = 'hidden';
}
// Функция для закрытия модального окна
function closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    modal.style.display = 'none';
    
    // Возвращаем скролл страницы
    document.body.style.overflow = 'auto';
}
// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('phoneModal');
    if (event.target == modal) {
        closePhoneModal();
    }
}
// Закрытие модального окна по клавише ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePhoneModal();
    }
});      
// Слайдер акций
class DiscountSlider {
    constructor() {
        this.slidesContainer = document.querySelector('.slidesOne');
        this.slides = document.querySelectorAll('.slideActions');
        this.indicators = document.querySelectorAll('.indicator');
        this.timerElement = document.querySelector('.timer-text');
        this.timerFill = document.querySelector('.timer-fill');
        this.sliderElement = document.querySelector('.slider_discount');
        
        this.currentSlideIndex = 0;
        this.totalSlides = this.slides.length;
        this.slideDuration = 5000; // 30 секунд на слайд
        this.timerInterval = null;
        this.autoSlideInterval = null;
        this.timeLeft = this.slideDuration / 1000;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Запускаем таймер
        this.startTimer();
        
        // Автоматическое переключение слайдов
        this.startAutoSlide();
        
        // Обновляем индикаторы
        this.updateIndicators();
        
        // Добавляем обработчики событий
        this.addEventListeners();
    }
    
    // Запуск автослайдера
    startAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        
        this.autoSlideInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.slideDuration);
    }
    
    // Переход к следующему слайду
    nextSlide() {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    // Переход к предыдущему слайду
    prevSlide() {
        this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    // Переход к конкретному слайду
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlideIndex = index;
            this.updateSlider();
        }
    }
    
    // Обновление слайдера
    updateSlider() {
        // Сбрасываем таймер
        this.resetTimer();
        
        // Перемещаем слайды
        const translateValue = -(this.currentSlideIndex * 100 / this.totalSlides) + '%';
        this.slidesContainer.style.transform = 'translateX(' + translateValue + ')';
        
        // Обновляем активные классы
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlideIndex);
        });
        
        // Обновляем индикаторы
        this.updateIndicators();
    }
    
    // Обновление индикаторов
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlideIndex);
        });
    }
    
    // Запуск таймера
    startTimer() {
        this.timeLeft = this.slideDuration / 1000;
        this.updateTimerDisplay();
        
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    clearInterval(this.timerInterval);
                }
            }
        }, 1000);
    }
    
    // Сброс таймера
    resetTimer() {
        clearInterval(this.timerInterval);
        this.startTimer();
    }
    
    
    
    
    // Обновление отображения таймера
    updateTimerDisplay() {
        if (this.timerElement && this.timerFill) {
            this.timerElement.textContent = this.timeLeft;
            }
    }
    
    // Добавление обработчиков событий
    addEventListeners() {
        // Остановка при фокусе на кнопках
        document.querySelectorAll('.slider-btn, .indicator').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.pause();
            });
            
        });
    }
}
// Глобальные переменные и функции
let discountSlider = null;
// Инициализация слайдера
function initDiscountSlider() {
    discountSlider = new DiscountSlider();
}
// Функции для глобального доступа
function nextDiscountSlide() {
    if (discountSlider) {
        discountSlider.nextSlide();
    }
}
function prevDiscountSlide() {
    if (discountSlider) {
        discountSlider.prevSlide();
    }
}
function goToDiscountSlide(index) {
    if (discountSlider) {
        discountSlider.goToSlide(index);
    }
}
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем слайдер
    initDiscountSlider();
    // Управление с клавиатуры
    document.addEventListener('keydown', function(event) {
        // Предотвращаем стандартное поведение только для нужных клавиш
        if (['ArrowLeft', 'ArrowRight', '1', '2', '3'].includes(event.key)) {
            event.preventDefault();
            
            switch(event.key) {
                case 'ArrowLeft':
                    prevDiscountSlide();
                    break;
                case 'ArrowRight':
                    nextDiscountSlide();
                    break;
                case '1':
                    goToDiscountSlide(0);
                    break;
                case '2':
                    goToDiscountSlide(1);
                    break;
                case '3':
                    goToDiscountSlide(2);
                    break;
            }
        }
    });
    // Фокусировка на слайдере при клике (для лучшей работы клавиатуры)
    document.querySelector('.slider_discount').addEventListener('click', function() {
        this.focus();
    });
    // Установка табуляции для доступности
    document.querySelectorAll('.slider-btn, .indicator').forEach((btn, index) => {
        btn.setAttribute('tabindex', index + 1);
    });
    // Обработка фокуса для доступности
    document.querySelector('.slider_discount').setAttribute('tabindex', '0');
    document.querySelector('.slider_discount').addEventListener('focus', function() {
        if (discountSlider) {
            discountSlider.pause();
        }
    });
    document.querySelector('.slider_discount').addEventListener('blur', function() {
        if (discountSlider) {
            discountSlider.resume();
        }
    });
});
// Обработка видимости страницы
document.addEventListener('visibilitychange', function() {
    if (document.hidden && discountSlider) {
        // Пауза при скрытии страницы
        discountSlider.pause();
    } else if (discountSlider) {
        // Возобновление при показе страницы
        discountSlider.resume();
    }
});
// Обработка кликов на индикаторы (альтернативный метод)
document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.addEventListener('click', function(e) {
        e.stopPropagation(); // Предотвращаем всплытие
        goToDiscountSlide(index);
    });
});
document.querySelector('.next-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    nextDiscountSlide();
});
// Слайдер акций
let currentSlideIndex = 0;
const slidesContainer = document.querySelector('.slider_discount .slides');
const totalSlides = document.querySelectorAll('.slideActions').length;
function updateCurrentSlide() {
    if (!slidesContainer) return;
    const translateValue = -(currentSlideIndex * 100 / totalSlides) + '%';
    slidesContainer.style.transform = 'translateX(' + translateValue + ')';
}
if (slidesContainer) {
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex === totalSlides - 1) ? 0 : currentSlideIndex + 1;
        updateCurrentSlide();
    }, 3000);
}
function openModal(imgElement) {
    var modalImg = document.getElementById("fullscreen-img");
    modalImg.src = imgElement.src;
    document.getElementById("my-modal").style.display = "block";
}
function closeModal() {
    document.getElementById("my-modal").style.display = "none";
}
// Функция прокрутки наверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// Инициализация кнопки "Наверх"
const toTopBtn = document.querySelector('.to-top-btn');
if (toTopBtn) {
    if (window.scrollY > 300) {
        toTopBtn.classList.add('visible');
    }
}
function scrollToFeedback() {
    const section = document.getElementById('feedback');
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}