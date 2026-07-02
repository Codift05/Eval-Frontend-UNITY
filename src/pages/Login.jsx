import React, { useState } from 'react';
import { LogIn, Loader2 } from 'lucide-react';
import { mockEvaluations } from '../data/mockEvaluations';

export default function Login({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = mockEvaluations.find(
        (evaluation) => evaluation.unique_code.toLowerCase() === code.toLowerCase()
      );

      if (data) {
        onLogin(data);
      } else {
        setError('Kode unik tidak valid atau terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', boxSizing: 'border-box' }}>
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Portal Penilaian</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Masukkan kode unik Anda untuk melihat hasil evaluasi Final Project.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
            <label htmlFor="code" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Kode Unik</label>
            <input 
              id="code"
              type="text" 
              placeholder="Contoh: DANILL-8XF2" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              style={{ fontSize: '16px' }} 
            />
            {error && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</span>}
          </div>
          <button type="submit" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> : <LogIn size={18} />}
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
