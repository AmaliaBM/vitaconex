
import { useEffect, useState } from 'react';
import Clock from 'react-clock';

function Reloj() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
  <div className="reloj-contenedor">
    <Clock value={value} size={80} />
  </div>
);
}

export default Reloj;