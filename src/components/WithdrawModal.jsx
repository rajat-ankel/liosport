import React, { useState } from 'react';

export default function WithdrawModal({ isOpen, onClose, balance, onWithdrawSuccess }) {
  const [amount, setAmount] = useState('500');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentBal = parseFloat((balance || '0').replace(/,/g, '')) || 0;

  const handleWithdraw = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num < 500) {
      alert('Minimum withdrawal amount is ₹500');
      return;
    }
    if (num > currentBal) {
      alert(`Insufficient balance! Your current balance is ₹${currentBal.toFixed(2)}`);
      return;
    }
    if (!accountNo || !ifsc || !name) {
      alert('Please fill in all bank account details.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      onWithdrawSuccess(num);
      setSubmitting(false);
      onClose();
      alert(`Withdrawal request of ₹${num.toFixed(2)} submitted successfully!`);
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
        className="withdraw-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#1b1b1b',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
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

        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#e5a922', marginBottom: '8px' }}>
          Withdraw Funds
        </h3>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
          Available Balance: <strong style={{ color: '#fff' }}>₹{balance}</strong>
        </div>

        <form onSubmit={handleWithdraw}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
              Withdraw Amount (₹):
            </label>
            <input
              type="number"
              min="500"
              max={currentBal}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#121212',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
              Account Holder Name:
            </label>
            <input
              type="text"
              placeholder="Full name as in passbook"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#121212',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
              Bank Account Number:
            </label>
            <input
              type="text"
              placeholder="Account Number"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#121212',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
              IFSC Code:
            </label>
            <input
              type="text"
              placeholder="e.g. HDFC0001234"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#121212',
                border: '1px solid #444',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
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
            {submitting ? 'Submitting Request...' : `Withdraw ₹${amount || '0'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
