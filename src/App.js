import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import  "./App.css";

const App = () => {
  // استخدام useState لتخزين البريد الإلكتروني المدخل
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [content,setContent]=useState('');
  const [name,setName]=useState('');

  // دالة لمعالجة إرسال النموذج
  const sendEmail = (e) => {
    e.preventDefault();

    // التحقق من صحة البريد الإلكتروني
    if (validateEmail(email)) {
      const templateParams = {
        user_email: email,
        message: 'مرحباً! شكراً لتسجيلك معنا.',
        content:content,
        name:name,
      };

      // إرسال البريد باستخدام EmailJS
      emailjs.send('service_29uqqx3','template_vfjrp0c',templateParams,'zoFQrkt_C5pvam_6v')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setMessage('تم إرسال البريد الإلكتروني بنجاح!');
        }, (error) => {
          console.log('FAILED...', error);
          setMessage('حدث خطأ أثناء إرسال البريد الإلكتروني.');
        });
    } else {
      setMessage('الرجاء إدخال بريد إلكتروني صالح.');
    }
  };

  // دالة التحقق من صحة البريد الإلكتروني
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="container">
      <h1>أدخل بريدك الإلكتروني</h1>
      <form onSubmit={sendEmail} className='form'>
      <input
          type="text"
          placeholder="أدخل اسم المرسل إليه "
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='input'
          required
        />
        <input
          type="email"
          placeholder="أدخل بريده الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input'
          required
        />
        <input
          type="text"
          placeholder="أدخل محتوى البريد الإلكتروني"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='input'
          required
        />
        <button type="submit" className='button'>إرسال</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export default App;
