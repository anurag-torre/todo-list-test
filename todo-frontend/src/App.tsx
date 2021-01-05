import './App.css';
import Todos from './components/Todos';
import Auth from './views/Auth';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import useToken from './network/useToken';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Auth setToken={setToken} />
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route key="Auth" path="/login">
            <Auth setToken={setToken} />
          </Route>
          <Route key="Todo" path="/">
            <Todos setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
