import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from "./components/Register/Register";
import Chat from "./components/Chat/Chat";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Register} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
