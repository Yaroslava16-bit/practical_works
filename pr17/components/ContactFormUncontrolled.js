import React, { useRef } from 'react';

function ContactFormUncontrolled() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const resultRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    if (resultRef.current) {
      resultRef.current.innerText = `Отправлено: ${name} (${email}) - ${message}`;
      resultRef.current.style.display = 'block';
    }
  };

  return (
    <div style={{ border: '2px solid #e74c3c', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2>Задание 3: Неуправляемая форма</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Имя: </label>
          {/* defaultValue используется для начального значения (опционально) */}
          <input type="text" ref={nameRef} placeholder="Ваше имя" />
        </div>

        <div>
          <label>Email: </label>
          <input type="email" ref={emailRef} placeholder="your@email.com" />
        </div>

        <div>
          <label>Сообщение: </label>
          <textarea ref={messageRef} rows="3" placeholder="Ваше сообщение..." />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Отправить
        </button>
      </form>

      <div 
        ref={resultRef} 
        style={{ display: 'none', marginTop: '15px', padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '5px' }}
      ></div>
    </div>
  );
}

export default ContactFormUncontrolled;
