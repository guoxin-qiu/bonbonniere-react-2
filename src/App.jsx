import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppLayout from './components/Layout';
import { Home, Counter } from './pages';

const App = () => (
  <BrowserRouter>
    <AppLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/counter" component={Counter} />
      </Switch>
    </AppLayout>
  </BrowserRouter>
);

export default App;
