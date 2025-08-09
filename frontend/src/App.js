import React, { useState } from 'react';
import './App.css';
import { Dashboard, Transactions, Goals, Reports, Investments, CreditCards, Profile, Sidebar, Login, ThemeProvider } from './components';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'creditcards':
        return <CreditCards />;
      case 'investments':
        return <Investments />;
      case 'goals':
        return <Goals />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Se não estiver logado, mostra a tela de login */}
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
            <div className="flex-1 overflow-auto">
              {renderContent()}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;