import React, { useState } from 'react';

export default function RegisterModal({ isOpen, onClose, onRegisterSuccess, onSwitchToLogin }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError('Please enter the 4-digit OTP sent to your number');
      return;
    }

    const userData = {
      username: `user_${phone.slice(-4)}`,
      name: `User +91 ${phone}`,
      phone: phone,
      balance: '10,000.00',
      token: 'jwt_mock_token_' + Date.now()
    };

    localStorage.setItem('liosport_user', JSON.stringify(userData));
    onRegisterSuccess(userData);
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
        className="register-modal-card"
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
          Sign up
        </h3>

        {error && (
          <div style={{ color: '#ea3a4e', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            {/* Phone input with India flag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #ccc',
                overflow: 'hidden',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  backgroundColor: '#f5f5f5',
                  borderRight: '1px solid #ccc',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '18px' }}>🇮🇳</span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>+91</span>
              </div>
              <input
                type="tel"
                placeholder="Mobile number"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setPhone(val);
                  setError('');
                }}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#000'
                }}
              />
            </div>

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
                marginBottom: '20px'
              }}
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '12px', color: '#ccc', fontSize: '13px' }}>
              OTP sent to +91 {phone} (Use 1234 for demo)
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                maxLength={4}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ccc',
                  color: '#000',
                  fontSize: '16px',
                  letterSpacing: '4px',
                  textAlign: 'center',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

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
                marginBottom: '16px'
              }}
            >
              Verify & Register
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#888',
                fontSize: '13px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center',
                marginBottom: '16px'
              }}
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#888' }}>
          Already have an account?{' '}
          <span
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            style={{ color: '#e5a922', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
}
