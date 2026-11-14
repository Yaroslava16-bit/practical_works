import React, { useState } from 'react';

function UserRegistrationFormWithValidation() {
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

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Некорректный email';

    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 8) newErrors.password = 'Минимум 8 символов';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Подтвердите пароль';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';

    if (!formData.gender) newErrors.gender = 'Выберите пол';
    if (!formData.age) newErrors.age = 'Выберите возраст';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      console.log('Данные формы (Задание 2):', formData);
      setTimeout(() => setIsSubmitted(false), 3000); // Скрываем сообщение через 3 сек
    }
  };

  return (
    <div style={{ border: '2px solid #27ae60', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2>Задание 2: Форма с валидацией</h2>
      
      {isSubmitted && <div style={{ background: '#d4edda', color: '#155724', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>Успешно отправлено!</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Имя: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.name}</span>}
        </div>

        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.email}</span>}
        </div>

        <div>
          <label>Пароль: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.password}</span>}
        </div>

        <div>
          <label>Подтверждение пароля: </label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.confirmPassword}</span>}
        </div>

        <div>
          <label>Пол: </label>
          <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Мужской</label>
          <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Женский</label>
          {errors.gender && <span style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.gender}</span>}
        </div>

        <div>
          <label><input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> Подписаться на рассылку (необязательно)</label>
        </div>

        <div>
          <label>Возраст: </label>
          <select name="age" value={formData.age} onChange={handleChange}>
            <option value="">Выберите возраст</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="50+">50+</option>
          </select>
          {errors.age && <span style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.age}</span>}
        </div>

        <div>
          <label>О себе: </label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default UserRegistrationFormWithValidation;
