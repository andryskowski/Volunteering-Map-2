/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import '../../scss/base/_common.scss';
import '../../scss/base/_contact.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import people from '../../assets/people-contact-page-2.png';

function Contact() {
  const CURRENT_USER = useContext(CurrentUserContext);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const validation = () => {
    if (subject === '') { alert('Pole tematu nie moze byc puste.'); }
    else if (message === '') { alert('Pole wiadomosci nie moze byc puste.'); }
    else { return true; }
    return false;
  };

  function sendEmail(e) {
    e.preventDefault();
    const isValidated = validation();
    if (isValidated === true) {
      emailjs.sendForm('service_ht9ycji', 'template_s3vzm0j', e.target, 'user_sUt0KQRlhNXDQuf9BzGLr').then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
      alert('Wiadomosc zostala wyslana do administratora.');
      e.target.reset();
    }
  }

  return (
    <div className="page-container contact-page">
      <div>
        <h1 className="page-header">Kontakt</h1>
        <h4 className="contact-header-2"><b>Masz pytanie? Zauważyłeś błąd na stronie? Za pomocą poniższego formularza możesz z łatwością skontaktować się z administratorem portalu.</b></h4>
        <form onSubmit={sendEmail} className="form form-contact">
          <label htmlFor="name">
            Nazwa użytkownika:
            <input id="name" defaultValue={CURRENT_USER.userInfo.name} type="text" name="name" />
          </label>
          <label htmlFor="email">
            Email:
            <input id="email" defaultValue={CURRENT_USER.userInfo.email} type="text" name="email" />
          </label>
          <label htmlFor="subject">
            Temat:
            <input id="subject" onChange={(e) => setSubject(e.target.value)} type="text" name="subject" />
          </label>
          <label htmlFor="message">
            Wiadomość:
            <textarea onChange={(e) => setMessage(e.target.value)} id="message" type="text" name="message" className="message-input" />
          </label>
          <input type="submit" value="Send Message" />
        </form>
      </div>
      {/* <div className="contact-bcg-image-container">
        <img className="contact-bcg-image" alt="no people img" src={people} />
      </div> */}
    </div>
  );
}

export default Contact;
