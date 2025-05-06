import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Silahkan login terlebih dahulu');
      return;
    }

    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single(); 

    if (error || !data) {
      setMessage('Username atau password salah');
    } else if (data.username !== 'haloadmin') {
      setMessage('Anda bukan admin!');
    } else {
      history.push('/admin-dashboard'); 
    }
  };

  return (
    <div className="pusing">
      <div className="container-adm">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-form">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>
          <div className="input-form">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          <button type="submit">Masuk</button>
        </form>

        {message && <p className="pesan">{message}</p>}
      </div>
    </div>
  );
};

export default Admin;
