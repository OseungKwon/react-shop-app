import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Topbar from './components/Topbar';
import LandingPage from './pages/LandingPage/LandingPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <>
      <Topbar />
      <Suspense fallback={(<div>Loading...</div>)}>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/product/upload" component={UploadPage} />
          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
