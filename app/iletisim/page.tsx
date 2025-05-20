'use client';

import { useState } from 'react';
import styles from './contact.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
  };

  return (
    <div className={styles['contact-page']}>
      <div className={styles.contactHero}>
        <div className={styles.contactContainer}>
          <h1>İletişim</h1>
          <p>Bizimle iletişime geçin, en kısa sürede size dönüş yapalım.</p>
        </div>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactFormSection}>
          <div className={styles.contactWrapper}>
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h3>
                  <FaPhone className={styles.icon} />
                  Telefon
                </h3>
                <p>+90 (555) 123 45 67</p>
              </div>
              
              <div className={styles.infoCard}>
                <h3>
                  <FaEnvelope className={styles.icon} />
                  E-posta
                </h3>
                <p>info@teknikservis.com</p>
              </div>
              
              <div className={styles.infoCard}>
                <h3>
                  <FaMapMarkerAlt className={styles.icon} />
                  Adres
                </h3>
                <p>Merkez Mahallesi, Teknik Servis Sokak No:1, İstanbul</p>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta Adresiniz"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon Numaranız"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 