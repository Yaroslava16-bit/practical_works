function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    
    // Создаем контейнер для тестов в футере, чтобы не мешать верстке
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
    // Даем основному скрипту время на инициализацию
    setTimeout(() => {
        console.log('=== ЗАПУСК ТЕСТОВ ПР11 ===');

        // Тест 1: Создание карточки
        const target1 = document.getElementById('target1');
        runTest('createCard добавил элемент', target1.querySelector('.card') !== null, true);
        runTest('Текст карточки верный', target1.querySelector('.card h4').textContent, 'Пример карточки');

        // Тест 2: Навигация
        runTest('countChildren() вернул 3', countChildren(), 3);
        runTest('findSpecialChild() вернул текст', findSpecialChild().trim(), 'Особый дочерний элемент');

        // Тест 3: Классы
        const styleTarget = document.getElementById('style-target');
        document.getElementById('toggle-style').click();
        runTest('toggleStyle добавил класс', styleTarget.classList.contains('active-style'), true);
        document.getElementById('toggle-style').click();
        runTest('toggleStyle убрал класс', styleTarget.classList.contains('active-style'), false);

        // Тест 4: Динамический список
        const list = document.getElementById('dynamic-list');
        const itemInput = document.getElementById('item-input');
        itemInput.value = 'Тестовый элемент';
        addListItem();
        runTest('addListItem добавил элемент', list.children.length, 1);
        runTest('Текст элемента верный', list.querySelector('.list-item span').textContent, 'Тестовый элемент');
        
        // Удаление
        const deleteBtn = list.querySelector('.delete-btn');
        deleteBtn.click();
        runTest('removeListItem удалил элемент', list.children.length, 0);

        // Тест 5: Валидация формы
        const formDataValid = new FormData();
        formDataValid.append('name', 'Иван');
        formDataValid.append('email', 'test@mail.ru');
        formDataValid.append('age', '25');
        
        const formDataInvalid = new FormData();
        formDataInvalid.append('name', 'И'); // Короткое
        formDataInvalid.append('email', 'bad-email'); // Плохой
        formDataInvalid.append('age', '150'); // Много

        runTest('validateForm (валидная)', validateForm(formDataValid).length, 0);
        runTest('validateForm (невалидная) - 3 ошибки', validateForm(formDataInvalid).length, 3);

        console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
    }, 100);
});
