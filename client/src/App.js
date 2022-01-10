import { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { GlobalContext } from "./context/GlobalState";

import Header from "./components/Header/Header";
import Toast from "./components/Movies/common/Toast/Toast";
import Movies from "./components/Movies/Movies";
import Blog from "./components/Blog/Blog";
import Resume from "./components/Resume/Resume";
import NotFound from "./components/NotFound";

import ROUTES from "./routes.json";

function App() {
  let {
    toast: {
      toastState: { isActive },
      toastDispatch,
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        toastDispatch({ type: "DISABLE" });
      }, 5000);
    }
  }, [isActive]);

  return (
    <div>
      <Header />
      <Switch>
        <Route path={ROUTES[2].url} component={Blog} />
        <Route path={ROUTES[1].url} component={Resume} />
        <Route path={ROUTES[0].url} exact component={Movies} />
        <Route component={NotFound} />
      </Switch>

      {isActive && <Toast />}
    </div>
  );
}

export default App;
