import React, { useState, useEffect } from 'react';
import { Trophy, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Dashboard({ studentData, onNavigateToLeaderboard }) {
  const [showLeaderboardBtn, setShowLeaderboardBtn] = useState(false);

  useEffect(() => {
    // Show leaderboard button after a short delay to encourage reading the feedback
    const timer = setTimeout(() => {
      setShowLeaderboardBtn(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const ScoreBar = ({ label, score }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{score}/100</span>
      </div>
      <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${score}%`, 
            background: score >= 90 ? 'var(--success)' : score >= 80 ? 'var(--warning)' : 'var(--danger)',
            borderRadius: '4px',
            transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }} 
        />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in-up" style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Hasil Evaluasi</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Final Project Frontend</p>
      </header>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{studentData.student_name}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{studentData.project_name}</p>
          </div>
          
          <div style={{ 
            width: '160px', height: '160px', 
            borderRadius: '50%', 
            border: '2px solid var(--border-light)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent'
          }}>
            <span style={{ fontSize: '3.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {studentData.total_score}
            </span>
          </div>
          <span style={{ marginTop: '1.5rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '1rem' }}>
            <CheckCircle2 size={20} /> Lulus Evaluasi
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>Rincian Penilaian</h3>
          <ScoreBar label="UI/UX & Styling" score={studentData.score_ui_ux} />
          <ScoreBar label="Responsivitas" score={studentData.score_responsiveness} />
          <ScoreBar label="Fungsionalitas & State Management" score={studentData.score_logic} />
          <ScoreBar label="Struktur Komponen & Clean Code" score={studentData.score_clean_code} />
          <ScoreBar label="Kreativitas & Extra Effort" score={studentData.score_a11y_perf} />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Komentar Tutor
        </h3>
        <div style={{ lineHeight: 1.6, color: 'var(--text-secondary)', background: 'transparent', padding: '0', whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>
          {studentData.tutor_feedback}
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', minHeight: '60px' }}>
        {showLeaderboardBtn && (
          <button onClick={onNavigateToLeaderboard} className="animate-fade-in-up" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px' }}>
            Lihat Leaderboard Global
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
