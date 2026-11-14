import React, { useState, useEffect, useCallback } from 'react';

// ЗАДАНИЕ 7: Кастомные хуки
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка сети');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(prev => !prev), []);
  return [value, toggle];
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Дописан недостающий хук useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

// Компоненты-демонстрации
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('username', '');
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useLocalStorage</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя (сохранится)" />
      <div>Текущее имя: {name}</div>
      <button onClick={() => setName('')}>Очистить</button>
    </div>
  );
}

function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useFetch</h3>
      {loading && <div>Загрузка пользователей...</div>}
      {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
      {data && (
        <div>
          <h4>Пользователи (первые 3):</h4>
          <ul>
            {data.slice(0, 3).map(user => <li key={user.id}>{user.name} ({user.email})</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function ToggleDemo() {
  const [isVisible, toggleVisible] = useToggle(false);
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useToggle</h3>
      <button onClick={toggleVisible}>{isVisible ? 'Скрыть' : 'Показать'}</button>
      {isVisible && <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0' }}>Секретный контент!</div>}
    </div>
  );
}

function DebounceDemo() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearch) {
      setResults([`Результат 1 для "${debouncedSearch}"`, `Результат 2 для "${debouncedSearch}"`]);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useDebounce</h3>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск (с debounce 500ms)" />
      <div>Ввод: {search}</div>
      <div>Debounced: {debouncedSearch}</div>
      {results.length > 0 && <ul>{results.map((r, i) => <li key={i}>{r}</li>)}</ul>}
    </div>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useWindowSize</h3>
      <div>Ширина окна: {width}px</div>
      <div>Высота окна: {height}px</div>
    </div>
  );
}

function CustomHooks() {
  return (
    <div style={{ padding: '20px', border: '2px solid purple', margin: '10px' }}>
      <h2>Кастомные хуки</h2>
      <p>Создайте и используйте собственные хуки для повторного использования логики</p>
      <div>
        <h3>Задание 7: Создание кастомных хуков</h3>
        <LocalStorageDemo />
        <FetchDemo />
        <ToggleDemo />
        <DebounceDemo />
        <WindowSizeDemo />
      </div>
    </div>
  );
}
export default CustomHooks;
