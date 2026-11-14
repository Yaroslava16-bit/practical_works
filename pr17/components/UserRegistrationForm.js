import React, { useState } from 'react';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    newsletter: false,
    age: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные формы (Задание 1):', formData);
    alert('Форма отправлена! Проверьте консоль.');
  };

  return (
    <div style={{ border: '2px solid #3498db', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2>Задание 1: Базовая форма (Управляемая)</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Имя: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Пароль: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <label>Подтверждение пароля: </label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div>
          <label>Пол: </label>
          <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Мужской</label>
          <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Женский</label>
        </div>

        <div>
          <label><input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> Подписаться на рассылку</label>
        </div>

        <div>
          <label>Возраст: </label>
          <select name="age" value={formData.age} onChange={handleChange} required>
            <option value="">Выберите возраст</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="50+">50+</option>
          </select>
        </div>

        <div>
          <label>О себе: </label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default UserRegistrationForm;
