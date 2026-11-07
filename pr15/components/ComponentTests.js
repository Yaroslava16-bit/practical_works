import React from 'react';

export function ComponentTests() {
  const runTests = () => {
    const testResults = [];
    
    const basicOutput = document.getElementById('basic-output-1');
    testResults.push({
      name: 'Базовые компоненты отрендерены',
      passed: !!basicOutput && basicOutput.innerHTML.length > 0,
      message: basicOutput ? 'Найдены' : 'Не найдены'
    });

    const statefulOutput = document.getElementById('stateful-output-1');
    testResults.push({
      name: 'Компоненты состояния отрендерены',
      passed: !!statefulOutput && statefulOutput.innerHTML.length > 0,
      message: statefulOutput ? 'Найдены' : 'Не найдены'
    });

    const hooksOutput = document.getElementById('hooks-output-1');
    testResults.push({
      name: 'Hooks компоненты отрендерены',
      passed: !!hooksOutput && hooksOutput.innerHTML.length > 0,
      message: hooksOutput ? 'Найдены' : 'Не найдены'
    });

    console.log('=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ ===');
    let passedCount = 0;
    testResults.forEach(t => {
      console.log(`${t.passed ? '✅' : '❌'} ${t.name}: ${t.message}`);
      if (t.passed) passedCount++;
    });

    alert(`Тестирование завершено: ${passedCount}/${testResults.length} тестов пройдено. Детали в консоли.`);
  };

  return (
    <div style={{ marginTop: '2rem', padding: '2rem', background: '#fff', borderRadius: '8px' }}>
      <h2>Тестирование</h2>
      <button 
        onClick={runTests}
        style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Запустить тесты компонентов
      </button>
      <div style={{ marginTop: '1rem', textAlign: 'left' }}>
        <h3>Инструкция по проверке:</h3>
        <ul>
          <li>Убедитесь, что все компоненты отображаются корректно</li>
          <li>Проверьте работу счетчиков и форм</li>
          <li>Убедитесь, что обработчики событий работают</li>
          <li>Проверьте работу хуков и жизненного цикла</li>
        </ul>
      </div>
    </div>
  );
}
export default ComponentTests;
