import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import User from "./views/User";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route to="/" exaact render={(props) => <User {...props} />} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
