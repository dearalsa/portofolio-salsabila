import React from "react";
import { Switch, Route } from "react-router-dom";
import Admin from "./page/Admin";
import Mainpage from "./page/Mainpage";
import Layout from "./component/Layout";
import SertifikatAdmin from "./page/SertifikatAdmin";
import AdminDashboard from "./page/AdminDashboard";
import HomeAdmin from "./page/HomeAdmin";
import AboutAdmin from "./page/AboutAdmin";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/" component={Mainpage} />
        <Route exact path="/sertifikat" component={SertifikatAdmin} />
        <Route exact path="/home" component={HomeAdmin} />
        <Route exact path="/about" component={AboutAdmin} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
      </Switch>
    </Layout>
  );
};

export default App;
