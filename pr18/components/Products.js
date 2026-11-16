import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics' },
    { id: 2, name: 'Смартфон', price: 30000, category: 'electronics' },
    { id: 3, name: 'Книга', price: 500, category: 'books' },
    { id: 4, name: 'Наушники', price: 4000, category: 'electronics' },
    { id: 5, name: 'Футболка', price: 1500, category: 'clothing' }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.category === filter);

  return (
    <div>
      <h2>Наши товары</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Фильтр по категории: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Все</option>
          <option value="electronics">Электроника</option>
          <option value="books">Книги</option>
          <option value="clothing">Одежда</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} руб.</p>
            <p>Категория: {product.category}</p>
            {/* Ссылка с использованием шаблонной строки */}
            <Link to={`/products/${product.id}`}>Подробнее</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
