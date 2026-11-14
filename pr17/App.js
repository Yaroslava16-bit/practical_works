import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Практическая работа №17: Работа с формами</h1>
        <p>Управляемые, валидируемые и неуправляемые компоненты</p>
      </header>

      <main>
        {/* Задание 1 */}
        <UserRegistrationForm />
        
        {/* Задание 2 */}
        <UserRegistrationFormWithValidation />
        
        {/* Задание 3 */}
        <ContactFormUncontrolled />
      </main>
    </div>
  );
}

export default App;
