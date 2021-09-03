import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./components/Login";
import ToDo from "./components/Todo";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/todo" component={ToDo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
