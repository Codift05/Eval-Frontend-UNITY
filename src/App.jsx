import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'dashboard', 'leaderboard'
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (studentData) => {
    setCurrentUser(studentData);
    setCurrentView('dashboard');
  };

  const handleNavigateToLeaderboard = () => {
    setCurrentView('leaderboard');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div style={{ minHeight: '100dvh', width: '100%' }}>
      {currentView === 'login' && <Login onLogin={handleLogin} />}
      
      {currentView === 'dashboard' && currentUser && (
        <Dashboard 
          studentData={currentUser} 
          onNavigateToLeaderboard={handleNavigateToLeaderboard} 
        />
      )}
      
      {currentView === 'leaderboard' && currentUser && (
        <Leaderboard onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;
