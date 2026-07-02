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
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Rank</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Peserta</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Proyek</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600, textAlign: 'right' }}>Total Skor</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((student, index) => (
                  <tr 
                    key={student.id} 
                    style={{ 
                      borderBottom: '1px solid var(--glass-border)',
                      background: index === 0 ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = index === 0 ? 'rgba(245, 158, 11, 0.1)' : 'transparent'}
                  >
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {index === 0 && <Medal size={24} color="var(--warning)" />}
                        {index === 1 && <Medal size={24} color="#9ca3af" />}
                        {index === 2 && <Medal size={24} color="#b45309" />}
                        <span style={{ fontWeight: index < 3 ? 700 : 500, color: index < 3 ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '1.1rem' }}>
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500, fontSize: '1.1rem' }}>{student.student_name}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)' }}>{student.project_name}</td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right', fontWeight: 700, fontSize: '1.25rem', color: index === 0 ? 'var(--warning)' : 'inherit' }}>
                      {student.total_score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
