import React, { useState, useEffect } from 'react';
import { Trophy, Medal, ArrowLeft, Loader2 } from 'lucide-react';
import { mockEvaluations } from '../data/mockEvaluations';

export default function Leaderboard({ onBack }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sort data by total_score descending
        const sortedData = [...mockEvaluations].sort((a, b) => b.total_score - a.total_score);
        setLeaderboardData(sortedData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="animate-fade-in-up" style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={onBack} className="btn-glass" style={{ marginBottom: '2rem', borderRadius: '8px' }}>
        <ArrowLeft size={18} /> Kembali ke Dashboard
      </button>

      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Trophy size={56} color="var(--warning)" />
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Global Leaderboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Top Rank Final Project Frontend</p>
      </header>

      <div className="glass-panel" style={{ overflow: 'hidden', minHeight: '300px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <Loader2 size={48} color="var(--accent-color)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem' }}>
            {leaderboardData.map((student, index) => (
              <div 
                key={student.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1.25rem', 
                  background: index === 0 ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                  border: index === 0 ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid var(--border-light)',
                  borderRadius: '12px',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, background 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px' }}>
                  {index === 0 ? <Medal size={28} color="var(--warning)" /> : 
                   index === 1 ? <Medal size={28} color="#e5e7eb" /> : 
                   index === 2 ? <Medal size={28} color="#b45309" /> : 
                   <span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>#{index + 1}</span>}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {student.student_name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {student.project_name}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.5rem', color: index === 0 ? 'var(--warning)' : 'var(--text-primary)' }}>
                    {student.total_score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
