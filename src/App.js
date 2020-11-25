import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/splashpage";
import Dashboard from "./pages/dashboard";
import TasksIndex from "./pages/tasksIndex";
import NotFound from "./components/NotFound";

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 9999;
`;

function App() {
  return (
    <Router>
      <div className="App">
        <Sticky>
          <Navbar />
        </Sticky>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/tasks" component={TasksIndex} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
