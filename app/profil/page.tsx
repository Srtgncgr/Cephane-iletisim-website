'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './profil.module.css';
import { FaUser, FaHistory, FaTools } from 'react-icons/fa';

export default function ProfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/giris');
    }
  }, [status, router]);

  useEffect(() => {
    // Kullanıcı bilgilerini getir
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/user/profile');
          const data = await response.json();
          setUsername(data.username);
        } catch (error) {
          console.error('Kullanıcı bilgileri alınamadı:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === 'loading') {
    return <div className={styles.loading}>Yükleniyor...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1>Profil Bilgilerim</h1>
        </div>
        
        <div className={styles.content}>
          <div className={styles.infoGroup}>
            <label>Kullanıcı Adı</label>
            <p>{username || 'Yükleniyor...'}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>E-posta</label>
            <p>{session.user?.email}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.editButton}>
            Bilgileri Düzenle
          </button>
        </div>

        <div className={styles['profile-actions']}>
          <button 
            className={styles['action-button']}
            onClick={() => router.push('/servis-takip')}
          >
            <FaTools className={styles['button-icon']} />
            <span>Servis Takip</span>
          </button>

          <button 
            className={styles['action-button']}
            onClick={() => router.push('/profil/gecmis')}
          >
            <FaHistory className={styles['button-icon']} />
            <span>Servis Geçmişi</span>
          </button>
        </div>
      </div>
    </div>
  );
} 