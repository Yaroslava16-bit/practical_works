// ЗАДАНИЕ 1: Создание и вставка элементов
function createCard(title, content) {
    const div = document.createElement('div');
    div.className = 'card';
    
    const h4 = document.createElement('h4');
    h4.textContent = title;
    
    const p = document.createElement('p');
    p.textContent = content;
    
    div.appendChild(h4);
    div.appendChild(p);
    document.getElementById('target1').appendChild(div);
}

function createList(items) {
    const ol = document.createElement('ol');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });
    document.getElementById('target1').appendChild(ol);
}

// ЗАДАНИЕ 2: Навигация по DOM
function countChildren() {
    const parent = document.getElementById('parent-element');
    const count = parent.children.length;
    document.getElementById('children-count').textContent = count;
    return count;
}

function findSpecialChild() {
    const parent = document.getElementById('parent-element');
    const special = parent.querySelector('.special');
    const text = special ? special.textContent : 'Не найден';
    document.getElementById('special-child-text').textContent = text;
    return text;
}

function getParentBackground() {
    const child = document.querySelector('#parent-element .child');
    const parent = child.parentElement;
    return window.getComputedStyle(parent).backgroundColor;
}

// ЗАДАНИЕ 3: Работа с классами и стилями
function setupStyleToggle() {
    const btn = document.getElementById('toggle-style');
    const target = document.getElementById('style-target');
    btn.addEventListener('click', () => {
        target.classList.toggle('active-style');
    });
}

function changeHeaderColor() {
    const header = document.getElementById('main-header');
    const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    header.style.background = randomColor;
}

function animateElement() {
    const target = document.getElementById('style-target');
    target.style.transform = 'scale(1.2) rotate(5deg)';
    target.style.opacity = '0.5';
    setTimeout(() => {
        target.style.transform = 'scale(1) rotate(0deg)';
        target.style.opacity = '1';
    }, 500);
}

// ЗАДАНИЕ 4: Обработка событий
function setupClickCounter() {
    let count = 0;
    const btn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    
    btn.addEventListener('click', () => {
        count++;
        counter.textContent = count;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    
    input.addEventListener('input', (e) => {
        display.textContent = e.target.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        console.log(`Keydown: Клавиша "${e.key}", код "${e.code}"`);
    });
}

// ЗАДАНИЕ 5: Динамические списки
function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    const text = input.value.trim();
    
    if (!text) return;

    const li = document.createElement('li');
    li.className = 'list-item';
    
    const span = document.createElement('span');
    span.textContent = text;
    
    const btn = document.createElement('button');
    btn.textContent = 'Удалить';
    btn.className = 'delete-btn';
    
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
    
    input.value = '';
}

function removeListItem(event) {
    if (event.target.classList.contains('delete-btn')) {
        const li = event.target.closest('.list-item');
        if (li) li.remove();
    }
}

function clearList() {
    document.getElementById('dynamic-list').innerHTML = '';
}

function setupListEvents() {
    document.getElementById('add-item-btn').addEventListener('click', addListItem);
    document.getElementById('clear-list-btn').addEventListener('click', clearList);
    document.getElementById('dynamic-list').addEventListener('click', removeListItem);
    
    // Добавление по Enter
    document.getElementById('item-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addListItem();
    });
}

// ЗАДАНИЕ 6: Работа с формами
function validateForm(formData) {
    const errors = [];
    const name = formData.get('name');
    const email = formData.get('email');
    const age = parseInt(formData.get('age'));

    if (!name || name.trim().length < 2) {
        errors.push('Имя должно содержать минимум 2 символа.');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Введите корректный email.');
    }
    if (age && (age < 1 || age > 120)) {
        errors.push('Возраст должен быть от 1 до 120.');
    }
    return errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    errors.forEach(err => {
        const div = document.createElement('div');
        div.className = 'error-message';
        div.textContent = err;
        output.appendChild(div);
    });
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'success-message';
    div.innerHTML = `<h4>Успешно!</h4><p>Имя: ${userData.name}</p><p>Email: ${userData.email}</p><p>Возраст: ${userData.age || 'не указан'}</p>`;
    output.appendChild(div);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
        displayFormErrors(errors);
    } else {
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            age: formData.get('age')
        };
        displayFormSuccess(userData);
        form.reset();
    }
}

function setupForm() {
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit);
}

// ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
function initializeApp() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();
    
    // Смена цвета шапки и анимация
    document.getElementById('change-color-btn').addEventListener('click', changeHeaderColor);
    document.getElementById('animate-btn').addEventListener('click', animateElement);

    // Демонстрация
    createCard('Пример карточки', 'Это содержимое карточки создано через JS.');
    createList(['Первый элемент', 'Второй элемент', 'Третий элемент']);
    countChildren();
    findSpecialChild();

    console.log('Приложение инициализировано!');
}

document.addEventListener('DOMContentLoaded', initializeApp);
