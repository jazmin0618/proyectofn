// components/Chatbot.js
export default function Chatbot() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',   
      width: '60px',
      height: '60px',
      backgroundColor: '#007bff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    }}>
      <span style={{ color: 'white', fontSize: '20px' }}>💬</span>
    </div>
  );
}