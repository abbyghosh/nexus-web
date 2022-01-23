import { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { GlobalContext } from "./context/GlobalState";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header/Header";
import Toast from "./components/Movies/common/Toast/Toast";
import Movies from "./components/Movies/Movies";
import Blog from "./components/Blog/Blog";
import Resume from "./components/Resume/Resume";
import Websites from "./components/Websites/Websites";
import NotFound from "./components/NotFound";

import ROUTES from "./routes.json";

function App() {
  let { MOVIES, RESUME, BLOG, WEBSITES } = ROUTES;

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
        <ProtectedRoute path={WEBSITES.url} component={Websites} />
        <ProtectedRoute path={BLOG.url} component={Blog} />
        <ProtectedRoute path={RESUME.url} component={Resume} />
        <Route path={MOVIES.url} exact component={Movies} />
        <Route component={NotFound} />
      </Switch>

      {isActive && <Toast />}
    </div>
  );
}

export default App;
