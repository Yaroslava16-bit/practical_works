// ==========================================
// ЗАДАНИЕ 1: Базовые обработчики событий
// ==========================================
function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    output.textContent = `Клик! Target: ${event.target.tagName}, Координаты: X=${event.clientX}, Y=${event.clientY}`;
    
    event.target.classList.add('pulse');
    setTimeout(() => event.target.classList.remove('pulse'), 500);
}

function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');

    if (event.type === 'mouseenter') {
        box.style.background = '#e74c3c';
    } else if (event.type === 'mouseleave') {
        box.style.background = '#3498db';
    } else if (event.type === 'mousemove') {
        output.textContent = `Координаты мыши: X=${event.offsetX}, Y=${event.offsetY}`;
    }
}

function setupBasicEvents() {
    document.getElementById('basic-btn').addEventListener('click', handleBasicClick);
    const box = document.getElementById('color-box');
    box.addEventListener('mouseenter', handleMouseEvents);
    box.addEventListener('mouseleave', handleMouseEvents);
    box.addEventListener('mousemove', handleMouseEvents);
}

// ==========================================
// ЗАДАНИЕ 2: События клавиатуры
// ==========================================
function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    
    // Предотвращение комбинаций
    if (event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        output.textContent = 'Перехвачено: Ctrl + S (Сохранение отменено)';
        return;
    }
    if (event.altKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        output.textContent = 'Перехвачено: Alt + C';
        return;
    }
    if (event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        output.textContent = 'Перехвачено: Shift + A';
        return;
    }

    output.textContent = `Клавиша: ${event.key}, Код: ${event.code} | Ctrl: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}`;
}

function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    input.addEventListener('keydown', handleKeyEvents);
    input.addEventListener('keyup', (e) => {
        document.getElementById('key-output').textContent = 'Клавиша отпущена...';
    });
}

// ==========================================
// ЗАДАНИЕ 3: Делегирование событий
// ==========================================
function handleDelegationClick(event) {
    // Если кликнули по кнопке удаления
    if (event.target.classList.contains('delete')) {
        event.target.closest('.item').remove();
    } 
    // Если кликнули по самому элементу списка
    else if (event.target.classList.contains('item')) {
        event.target.classList.toggle('selected');
    }

    // Обновляем счетчик
    const selectedCount = document.querySelectorAll('.item.selected').length;
    document.getElementById('delegation-output').textContent = `Выбрано элементов: ${selectedCount}`;
}

function addNewItem() {
    const list = document.getElementById('item-list');
    const itemId = Date.now(); // уникальный ID
    
    const div = document.createElement('div');
    div.className = 'item';
    div.dataset.id = itemId;
    div.innerHTML = `<span>Элемент ${list.children.length + 1}</span> <span class="delete">✖</span>`;
    
    list.appendChild(div);
}

function setupDelegationEvents() {
    document.getElementById('item-list').addEventListener('click', handleDelegationClick);
    document.getElementById('add-item-btn').addEventListener('click', addNewItem);
}

// ==========================================
// ЗАДАНИЕ 4: Предотвращение поведения
// ==========================================
function preventLinkDefault(event) {
    event.preventDefault(); // Отменяем переход
    const output = document.getElementById('prevention-output');
    output.textContent = 'Переход по ссылке предотвращен!';
    
    event.target.classList.add('shake');
    setTimeout(() => event.target.classList.remove('shake'), 300);
}

function preventFormSubmit(event) {
    event.preventDefault(); // Отменяем перезагрузку страницы
    const input = document.getElementById('form-input');
    const output = document.getElementById('prevention-output');
    
    if (!input.value.trim()) {
        output.textContent = 'Ошибка: поле ввода не может быть пустым!';
        output.style.color = '#e74c3c';
    } else {
        output.textContent = `Форма отправлена! Данные: "${input.value}"`;
        output.style.color = '#28a745';
        input.value = '';
    }
}

function setupPreventionEvents() {
    document.getElementById('prevent-link').addEventListener('click', preventLinkDefault);
    document.getElementById('prevent-form').addEventListener('submit', preventFormSubmit);
}

// ==========================================
// ЗАДАНИЕ 5: Кастомные события
// ==========================================
function triggerCustomEvent() {
    const myEvent = new CustomEvent('customAction', {
        detail: { message: "Привет от кастомного события!" }
    });
    document.dispatchEvent(myEvent);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    output.textContent = `Получено кастомное событие: ${event.detail.message}`;
    
    const btn = document.getElementById('trigger-custom');
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
}

function setupMultipleListeners() {
    // Добавляем 3 разных слушателя на одно и то же событие
    document.addEventListener('customAction', () => console.log('Слушатель 1: Событие перехвачено!'));
    document.addEventListener('customAction', () => console.log('Слушатель 2: Данные получены.'));
    document.addEventListener('customAction', () => console.log('Слушатель 3: Работа завершена.'));
    
    document.getElementById('custom-output').textContent += ' (3 слушателя добавлены в консоль)';
}

function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);
    document.getElementById('trigger-custom').addEventListener('click', triggerCustomEvent);
    document.getElementById('multiple-listeners').addEventListener('click', setupMultipleListeners);
}

// ==========================================
// ЗАДАНИЕ 6: События загрузки и ошибок
// ==========================================
function loadImageWithEvents(url) {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    
    container.innerHTML = ''; 
    container.className = 'image-container loading';
    
    const img = new Image();
    
    img.addEventListener('loadstart', () => output.textContent = 'Статус загрузки: Начало...');
    img.addEventListener('load', () => {
        output.textContent = 'Статус загрузки: Успешно загружено!';
        container.className = 'image-container success';
    });
    img.addEventListener('error', () => {
        output.textContent = 'Статус загрузки: Ошибка загрузки!';
        container.className = 'image-container error';
    });
    img.addEventListener('loadend', () => output.textContent += ' (Завершено)');
    
    img.src = url;
    container.appendChild(img);
}

function simulateLoadError() {
    loadImageWithEvents('https://invalid-url-for-test.com/image.jpg');
}

function setupLoadingEvents() {
    document.getElementById('load-image').addEventListener('click', () => {
        loadImageWithEvents('https://picsum.photos/300/200');
    });
    document.getElementById('load-error').addEventListener('click', simulateLoadError);
}

// ==========================================
// ЗАДАНИЕ 7: Таймеры и асинхронные события
// ==========================================
let timerInterval;
let timerValue = 0;

function startTimer() {
    if (timerInterval) return; // Защита от множественного запуска
    timerInterval = setInterval(() => {
        timerValue++;
        document.getElementById('timer-output').textContent = `Таймер: ${timerValue}с`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerValue = 0;
    document.getElementById('timer-output').textContent = `Таймер остановлен и сброшен: 0с`;
}

function createDebounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createThrottle(func, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

function testDebounce() {
    const output = document.getElementById('async-output');
    output.textContent = 'Debounce: нажмите кнопку несколько раз быстро...';
    
    const debouncedLog = createDebounce(() => {
        output.textContent = `Debounce сработал! Время: ${new Date().toLocaleTimeString()}`;
    }, 1000);
    
    debouncedLog();
}

function testThrottle() {
    const output = document.getElementById('async-output');
    const throttledLog = createThrottle(() => {
        output.textContent = `Throttle сработал! Время: ${new Date().toLocaleTimeString()}`;
    }, 1000);
    
    throttledLog();
}

function setupTimerEvents() {
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('stop-timer').addEventListener('click', stopTimer);
    document.getElementById('debounce-btn').addEventListener('click', testDebounce);
    document.getElementById('throttle-btn').addEventListener('click', testThrottle);
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================
function initializeEventHandler() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
    console.log('Все обработчики событий инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeEventHandler);
