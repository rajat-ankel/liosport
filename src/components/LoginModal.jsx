import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    const userData = {
      username: username.trim(),
      name: username.trim(),
      balance: '25,000.00',
      token: 'jwt_mock_token_' + Date.now()
    };

    localStorage.setItem('liosport_user', JSON.stringify(userData));
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
    >
      <div
        className="login-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#1b1b1b',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '440px',
          padding: '36px 30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
          border: '1px solid #2a2a2a',
          color: '#ffffff'
        }}
      >
        {/* Red close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-14px',
            right: '-14px',
            backgroundColor: '#ea3a4e',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: 1,
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            zIndex: 10
          }}
        >
          &times;
        </button>

        <h3
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#8b8b8b',
            marginBottom: '28px',
            textAlign: 'left'
          }}
        >
          Log in. It is fast and easy.
        </h3>

        {error && (
          <div style={{ color: '#ea3a4e', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '18px' }}>
            <input
              type="text"
              placeholder="Username *"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #ccc',
                color: '#000',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Password with eye toggle */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password *"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              style={{
                width: '100%',
                padding: '12px 42px 12px 16px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #ccc',
                color: '#000',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {/* Remember me & Forgot Password */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              fontSize: '13px'
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff', gap: '8px' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#e5a922' }}
              />
              Remember me
            </label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                alert('Please contact support via WhatsApp to reset password.');
              }}
              style={{ color: '#fff', textDecoration: 'none', fontSize: '13px' }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: '#e5a922',
              color: '#000',
              fontWeight: 600,
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginBottom: '16px'
            }}
          >
            Log In
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#888' }}>
          Don't have an account?{' '}
          <span
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            style={{ color: '#e5a922', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
