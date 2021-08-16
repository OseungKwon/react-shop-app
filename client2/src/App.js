import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Topbar from './components/Topbar';
import DetailProductPage from './pages/DetailProductPage';
import LandingPage from './pages/LandingPage/LandingPage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Auth from './components/hoc/auth';
import CartPage from './pages/CartPage/CartPage';

function App() {
  return (
    <>
      <Topbar />
      <Suspense fallback={(<div>Loading...</div>)}>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/product/upload" component={Auth(UploadPage, true)} />
            <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
            <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
