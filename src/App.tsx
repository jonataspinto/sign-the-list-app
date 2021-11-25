import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppProvider } from "./contexts/app";
import { AuthProvider } from "./contexts/auth";
import { Home, ListItemPage, Login } from "./pages";

export const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
          <Route exact path="/list/:id">
            <Layout>
              <ListItemPage />
            </Layout>
          </Route>
          <Route exact path="/login" component={Login} />
        </Switch>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
