import React, { useState } from 'react';
import { paymentMethods } from '../data/siteData';

export default function DepositModal({ isOpen, onClose, onDepositSuccess }) {
  const [selectedGateway, setSelectedGateway] = useState('PhonePe');
  const [amount, setAmount] = useState('1000');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 25000];

  const handleDeposit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num < 100) {
      alert('Minimum deposit amount is ₹100');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      onDepositSuccess(num);
      setSubmitting(false);
      onClose();
      alert(`₹${num.toFixed(2)} deposited successfully via ${selectedGateway}!`);
    }, 600);
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2050,
        padding: '20px'
      }}
    >
      <div
        className="deposit-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#1b1b1b',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '500px',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.85)',
          border: '1px solid #333',
          color: '#ffffff'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            backgroundColor: '#ea3a4e',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: 1,
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          &times;
        </button>

        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#e5a922', marginBottom: '18px' }}>
          Deposit Funds
        </h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '8px' }}>
            Select Payment Method:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {paymentMethods.map((pm, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGateway(pm.name)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: selectedGateway === pm.name ? '#2d2510' : '#141414',
                  border: `2px solid ${selectedGateway === pm.name ? '#e5a922' : '#282828'}`,
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <img src={pm.image} alt={pm.name} style={{ height: '22px', maxWidth: '100%', marginBottom: '4px' }} />
                <span style={{ fontSize: '11px', color: selectedGateway === pm.name ? '#e5a922' : '#ccc' }}>
                  {pm.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleDeposit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
              Amount (₹):
            </label>
            <input
              type="number"
              min="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '6px',
                backgroundColor: '#121212',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {quickAmounts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setAmount(q.toString())}
                style={{
                  padding: '6px 12px',
                  backgroundColor: amount === q.toString() ? '#e5a922' : '#222',
                  color: amount === q.toString() ? '#000' : '#fff',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                +₹{q}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: '#e5a922',
              color: '#000',
              fontWeight: 600,
              fontSize: '15px',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer'
            }}
          >
            {submitting ? 'Processing Deposit...' : `Proceed to Pay ₹${amount || '0'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
