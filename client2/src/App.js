import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Topbar from './components/Topbar';
import DetailProductPage from './pages/DetailProductPage';
import LandingPage from './pages/LandingPage/LandingPage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Auth from './components/hoc/auth';

function App() {
  return (
    <>
      <Topbar />
      <Suspense fallback={(<div>Loading...</div>)}>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/product/upload" component={UploadPage} />
            <Route exact path="/product/:productId" component={DetailProductPage} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
