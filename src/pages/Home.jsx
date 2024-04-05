import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/test').then((res) => {
      setHello(res.data);
    });
  });
  return (
    <>
      <h1>danum-frontend12120</h1>
      <p>Backend Data : {hello}</p>
    </>
  );
}
