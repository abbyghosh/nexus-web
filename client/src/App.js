import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route path="/blog" component={Movies} />
      </Switch>
    </div>
  );
}

export default App;
