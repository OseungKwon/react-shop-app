import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/product/upload" component={UploadPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
