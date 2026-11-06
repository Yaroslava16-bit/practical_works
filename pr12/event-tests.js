function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    
    let testContainer = document.getElementById('test-results-container');
    if (!testContainer) {
        testContainer = document.createElement('div');
        testContainer.id = 'test-results-container';
        testContainer.style.marginTop = '20px';
        document.querySelector('.container').appendChild(testContainer);
    }

    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'test-success' : 'test-failure'}`;

    resultElement.innerHTML = `
        <strong>${testName}:</strong> 
        ${isEqual ? '✅ УСПЕХ' : '❌ ОШИБКА'}
        <br> Ожидалось: ${JSON.stringify(expected)}
        <br> Получено: ${JSON.stringify(actual)}
    `;
    testContainer.appendChild(resultElement);
    if (!isEqual) console.error(`${testName}: ОШИБКА`, {expected, actual});
}

document.addEventListener('DOMContentLoaded', function() {
    // Ждем инициализации обработчиков из основного скрипта
    setTimeout(() => {
        console.log('=== ЗАПУСК ТЕСТОВ ПР12 ===');

        // Тест 1: Клик по кнопке
        const btn = document.getElementById('basic-btn');
        btn.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 100, clientY: 50 }));
        const output = document.getElementById('basic-output').textContent;
        runTest('Basic Click сработал', output.includes('X=100, Y=50'), true);

        // Тест 2: Делегирование (создание элемента)
        const itemList = document.getElementById('item-list');
        const initialCount = itemList.children.length;
        document.getElementById('add-item-btn').click();
        runTest('Добавление элемента списка', itemList.children.length, initialCount + 1);

        // Тест 3: Делегирование (клик по элементу)
        const newItem = itemList.lastElementChild;
        newItem.click(); // Симулируем клик
        runTest('Клик по элементу добавляет класс selected', newItem.classList.contains('selected'), true);

        // Тест 4: Предотвращение отправки пустой формы
        const form = document.getElementById('prevent-form');
        const formInput = document.getElementById('form-input');
        formInput.value = ''; // Пустая форма
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        const preventionOutput = document.getElementById('prevention-output').textContent;
        runTest('Валидация пустой формы', preventionOutput.includes('не может быть пустым'), true);

        // Тест 5: Кастомные события
        document.getElementById('trigger-custom').click();
        const customOutput = document.getElementById('custom-output').textContent;
        runTest('Кастомное событие перехвачено', customOutput.includes('Привет от кастомного события!'), true);

        // Тест 6: Ошибка загрузки изображения
        document.getElementById('load-error').click();
        const loadingOutput = document.getElementById('loading-output').textContent;
        runTest('Симуляция ошибки загрузки', loadingOutput.includes('Ошибка загрузки'), true);

        console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
    }, 200); // Даем время initializeEventHandler() выполниться
});
