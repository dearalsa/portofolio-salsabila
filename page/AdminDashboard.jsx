import React from 'react';
import { useHistory, useRouteMatch, Route, Switch } from 'react-router-dom';

const AdminDashboard = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleLogout = () => {
    history.replace('/admin');
  };

  const handleNavigation = (targetPath) => {
    history.push(targetPath);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Portofolio</h2>
        <ul>
          <li onClick={() => handleNavigation('/home')}>Home</li>
          <li onClick={() => handleNavigation('/about')}>About</li>
          <li onClick={() => handleNavigation('/sertifikat')}>Certificate</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="headerr">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="content-area">
          <Switch>
            <Route exact path={`${path}`}>
              <div className="ucapanadmin">
                <h3 className='typing'>Selamat datang di dashboard admin!🤩</h3>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
      <div className="footer">
        <p>@copyright by alsa</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
