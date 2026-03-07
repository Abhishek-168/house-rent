import React, { useEffect, useState } from 'react';

export default function Toast({ message, type = 'info' }){
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if(!visible || !message) return null;
  const accent = type === 'error' ? '#ef4444' : type === 'success' ? '#f59e0b' : '#f59e0b';
  return (
    <div className="toast" role="status" style={{borderLeft:`3px solid ${accent}`,background:'#111'}}>
      {message}
    </div>
  );
}
