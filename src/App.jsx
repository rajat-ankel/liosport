import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import MobileSidebar from './components/MobileSidebar';
import HeroBanner from './components/HeroBanner';
import CategoryNav from './components/CategoryNav';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import SearchModal from './components/SearchModal';
import GameLaunchModal from './components/GameLaunchModal';
import ProfileDrawer from './components/ProfileDrawer';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import MyBetsModal from './components/MyBetsModal';
import AccountStatementModal from './components/AccountStatementModal';
import ExchangeView from './components/ExchangeView';
import AeroView from './components/AeroView';
import EvolutionView from './components/EvolutionView';
import SlotsView from './components/SlotsView';
import ProviderLobbyView from './components/ProviderLobbyView';
import VimplayView from './components/VimplayView';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('roulette');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isMyBetsOpen, setIsMyBetsOpen] = useState(false);
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Check saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('liosport_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('liosport_user');
    setUser(null);
  };

  const handleGameClick = (game) => {
    if (!user) {
      setIsLoginOpen(true);
    } else {
      setSelectedGame(game);
    }
  };

  const handleBannerClick = () => {
    if (!user) {
      setIsRegisterOpen(true);
    } else {
      setActiveCategory('crash');
    }
  };

  const handleDepositSuccess = (amount) => {
    if (!user) return;
    const current = parseFloat((user.balance || '0').replace(/,/g, '')) || 0;
    const updatedBal = (current + amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const updatedUser = { ...user, balance: updatedBal };
    setUser(updatedUser);
    localStorage.setItem('liosport_user', JSON.stringify(updatedUser));
  };

  const handleWithdrawSuccess = (amount) => {
    if (!user) return;
    const current = parseFloat((user.balance || '0').replace(/,/g, '')) || 0;
    const updatedBal = Math.max(0, current - amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const updatedUser = { ...user, balance: updatedBal };
    setUser(updatedUser);
    localStorage.setItem('liosport_user', JSON.stringify(updatedUser));
  };

  return (
    <div className="liosports-app" style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Header */}
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isLoggedIn={!!user}
        user={user}
        onLogout={handleLogout}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenDeposit={() => setIsDepositOpen(true)}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
        onOpenMyBets={() => setIsMyBetsOpen(true)}
        onOpenStatement={() => setIsStatementOpen(true)}
      />

      {/* Mobile Drawer Menu */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Main Content Router */}
      <Routes>
        {/* Main Casino Home Lobby */}
        <Route
          path="/"
          element={
            <main className="main">
              <HeroBanner onBannerClick={handleBannerClick} />
              <div className="casino-games">
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                />
                <GameGrid
                  activeCategory={activeCategory}
                  onGameClick={handleGameClick}
                />
              </div>
            </main>
          }
        />
        <Route
          path="/home"
          element={
            <main className="main">
              <HeroBanner onBannerClick={handleBannerClick} />
              <div className="casino-games">
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                />
                <GameGrid
                  activeCategory={activeCategory}
                  onGameClick={handleGameClick}
                />
              </div>
            </main>
          }
        />

        {/* Exchange Lobby Routes */}
        <Route
          path="/sports/Cricket"
          element={
            <ExchangeView
              user={user}
              isAGSE={false}
              onDepositSuccess={handleDepositSuccess}
              onBack={() => navigate('/')}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          }
        />
        <Route
          path="/exchange"
          element={
            <ExchangeView
              user={user}
              isAGSE={false}
              onDepositSuccess={handleDepositSuccess}
              onBack={() => navigate('/')}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          }
        />

        {/* New Exchange (AGSE) Route */}
        <Route
          path="/sports/AGSE"
          element={
            <ExchangeView
              user={user}
              isAGSE={true}
              onDepositSuccess={handleDepositSuccess}
              onBack={() => navigate('/')}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          }
        />
        <Route
          path="/sports/:gameId"
          element={
            <ExchangeView
              user={user}
              isAGSE={false}
              onDepositSuccess={handleDepositSuccess}
              onBack={() => navigate('/')}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          }
        />

        {/* Aero Crash Game Routes */}
        <Route
          path="/casino/zenithgpktbg-aero"
          element={
            <AeroView
              user={user}
              onDepositSuccess={handleDepositSuccess}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/aero"
          element={
            <AeroView
              user={user}
              onDepositSuccess={handleDepositSuccess}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* Evolution Live Dealer Routes */}
        <Route
          path="/casino/aggapevolutiongaming-evolution-top-games"
          element={
            <EvolutionView
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/evolution"
          element={
            <EvolutionView
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* Slots Catalog Route */}
        <Route
          path="/slots"
          element={
            <SlotsView
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* XPG Live Lobby Routes */}
        <Route
          path="/casino/xpg"
          element={
            <ProviderLobbyView
              providerKey="xpg"
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/xpg"
          element={
            <ProviderLobbyView
              providerKey="xpg"
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* Qtech Games Lobby Routes */}
        <Route
          path="/casino/qtech"
          element={
            <ProviderLobbyView
              providerKey="qtech"
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/qtech"
          element={
            <ProviderLobbyView
              providerKey="qtech"
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* Supernowa Indian Casino Routes */}
        <Route
          path="/casino/supernowa"
          element={
            <ProviderLobbyView
              providerKey="supernowa"
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/supernowa"
          element={
            <ProviderLobbyView
              providerKey="supernowa"
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* Vimplay Route */}
        <Route
          path="/vimplay"
          element={
            <VimplayView
              onGameClick={handleGameClick}
              onBack={() => navigate('/')}
            />
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <main className="main">
              <HeroBanner onBannerClick={handleBannerClick} />
              <div className="casino-games">
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                />
                <GameGrid
                  activeCategory={activeCategory}
                  onGameClick={handleGameClick}
                />
              </div>
            </main>
          }
        />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Modals & Drawers */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={(userData) => setUser(userData)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectGame={(game) => {
          handleGameClick(game);
        }}
      />

      <GameLaunchModal
        game={selectedGame}
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onOpenDeposit={() => setIsDepositOpen(true)}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
        onOpenMyBets={() => setIsMyBetsOpen(true)}
        onOpenStatement={() => setIsStatementOpen(true)}
        onLogout={handleLogout}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDepositSuccess={handleDepositSuccess}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        balance={user?.balance || '0.00'}
        onWithdrawSuccess={handleWithdrawSuccess}
      />

      <MyBetsModal
        isOpen={isMyBetsOpen}
        onClose={() => setIsMyBetsOpen(false)}
      />

      <AccountStatementModal
        isOpen={isStatementOpen}
        onClose={() => setIsStatementOpen(false)}
        balance={user?.balance || '0.00'}
      />
    </div>
  );
}
