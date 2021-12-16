import { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Toast from "./components/Movies/common/Toast/Toast";
import Movies from "./components/Movies/Movies";
import { GlobalContext } from "./context/GlobalState";

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
        <Route exact path="/" component={Movies} />
        <Route path="/blog" component={Movies} />
      </Switch>

      {isActive && <Toast />}
    </div>
  );
}

export default App;
