import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages';
import { ListItemPage } from './pages/ListItemPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route exact path="/list/:id" >
          <ListItemPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
