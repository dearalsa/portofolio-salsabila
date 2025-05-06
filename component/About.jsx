import React, { useState, useEffect } from 'react';
import "../app.css";  
import { supabase } from '../supabase/supabaseClient';

export default function About() {
  const [kotakPertama, setKotakPertama] = useState('Belum di isi apapun!');
  const [kotakKedua, setKotakKedua] = useState('Belum di isi apapun!');
  const [kotakKetiga, setKotakKetiga] = useState('Belum di isi apapun!');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('about')  
        .select('*')
        .limit(1) 
        .single(); 

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setKotakPertama(data?.kotak_pertama || 'Belum di isi apapun!');
        setKotakKedua(data?.kotak_kedua || 'Belum di isi apapun!');
        setKotakKetiga(data?.kotak_ketiga || 'Belum di isi apapun!');
      }
    };

    fetchData();
  }, []);  

  return (
    <div id="about" className="container">
      <div className="box1">
        <div className="purple"></div>
        <p className="introduce">
          {kotakPertama}
        </p>
      </div>

      <div className="box2">
        <div className="green"></div>
        <p className="hobby">
          {kotakKedua}
        </p>
      </div>

      <div className="box3">
        <div className="pink"></div>
        <p className="motivasi">
          {kotakKetiga}
        </p>
      </div>
    </div>
  );
}
