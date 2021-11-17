import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "./contexts/app";
import { Home } from "./pages";
import { ListItemPage } from "./pages/ListItemPage";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/list/:id">
            <ListItemPage />
          </Route>
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
