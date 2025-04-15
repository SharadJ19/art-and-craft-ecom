const LoadingSpinner = () => {
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  const styleSheet = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{styleSheet}</style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
