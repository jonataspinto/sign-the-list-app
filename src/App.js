import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "./contexts/app";
import { AuthProvider } from "./contexts/auth";
import { Home, ListItemPage, Login } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/list/:id" component={ListItemPage} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
