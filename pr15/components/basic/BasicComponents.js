import React, { useState } from 'react';
import './BasicComponents.css';

const WelcomeMessage = ({ name, age }) => (
  <div className="welcome">Привет, {name}! Тебе {age} лет.</div>
);

const UserCard = ({ user }) => (
  <div className="user-card" style={{ borderColor: user.isOnline ? 'green' : 'gray' }}>
    <img src={user.avatar} alt="avatar" />
    <h4>{user.name} {user.isOnline ? '(Online)' : '(Offline)'}</h4>
    <p>Email: {user.email}</p>
  </div>
);

const Button = ({ variant = 'primary', onClick, children }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>{children}</button>
);

const Card = ({ title, children }) => (
  <div className="card">
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

const Toggle = ({ buttonText, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>{buttonText}</button>
      {isVisible && <div style={{ marginTop: '10px' }}>{children}</div>}
    </div>
  );
};

const ConditionalMessage = ({ status }) => {
  if (status === 'success') return <span className="success">Успешно!</span>;
  if (status === 'error') return <span className="error">Ошибка!</span>;
  if (status === 'warning') return <span className="warning">Внимание!</span>;
  return null;
};

function BasicComponents() {
  const userData = { name: "Анна Иванова", email: "anna@example.com", avatar: "https://i.pravatar.cc/100", isOnline: true };

  return (
    <section className="task-section">
      <h2>Базовые компоненты</h2>
      <div className="component-demo">
        <h3>Задание 1: Компоненты с props</h3>
        <div id="basic-output-1" className="output">
          <WelcomeMessage name="Иван" age={25} />
          <UserCard user={userData} />
          <Button variant="primary" onClick={() => alert('Клик!')}>Нажми меня</Button>
          <Button variant="secondary">Вторичная</Button>
        </div>
      </div>
      <div className="component-demo">
        <h3>Задание 2: Children и условный рендеринг</h3>
        <div id="basic-output-2" className="output">
          <Card title="Пример карточки"><p>Это содержимое карточки</p></Card>
          <Toggle buttonText="Показать/скрыть"><p>Секретный контент!</p></Toggle>
          <div>Статус: <ConditionalMessage status="success" /></div>
        </div>
      </div>
    </section>
  );
}
export default BasicComponents;
