import React, { useState, useEffect, createContext } from 'react';
import './HooksComponents.css';

const CounterWithHooks = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Хук-счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
};

const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Компонент смонтирован (аналог componentDidMount)');
    return () => console.log('Компонент размонтирован (аналог componentWillUnmount)');
  }, []);

  useEffect(() => {
    document.title = `Счетчик: ${count}`;
  }, [count]); 

  return (
    <div>
      <p>Счетчик (эффект меняет title): {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст без ререндера эффекта" />
    </div>
  );
};

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
};

const ThemeContext = createContext();
const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(theme === 'light' ? 'dark' : 'light') }}>
      <div className={theme === 'light' ? 'theme-light' : 'theme-dark'}>
        <p>Текущая тема: {theme}</p>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Переключить тему</button>
      </div>
    </ThemeContext.Provider>
  );
};

function HooksComponents() {
  const [localName, setLocalName] = useLocalStorage('name', 'Гость');

  return (
    <section className="task-section">
      <h2>React Hooks</h2>
      <div className="component-demo">
        <h3>Задание 6: useState и useEffect</h3>
        <div id="hooks-output-1" className="output">
          <CounterWithHooks />
          <EffectDemo />
        </div>
      </div>
      <div className="component-demo">
        <h3>Задание 7: Кастомные хуки и Context</h3>
        <div id="hooks-output-2" className="output">
          <div>
            <p>LocalStorage: {localName}</p>
            <input value={localName} onChange={(e) => setLocalName(e.target.value)} />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
}
export default HooksComponents;
