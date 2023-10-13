import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./containers/Home/Home";

import { MetamaskContextProvider } from "./contexts/metamask/metamask.context";
import { MetamaskConnectContextProvider } from "./contexts/metamask/metamask.connect.context";


function App() {
  const runScript = () => {
    if (window.$) {
      let script = document.createElement("script");
      script.src = "/assets/js/app.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);

      script = document.createElement("script");
      script.src = "/assets/js/bootstrap.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);

      script = document.createElement("script");
      script.src = "/assets/js/jquery-1.12.4.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);

      script = document.createElement("script");
      script.src = "/assets/js/jquery.mobile.custom.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);
    } else {
      // Load Jquey in to window
      const script = document.createElement("script");
      script.src = "/assets/js/app.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);

      // wait 50 milliseconds and try again.
      window.setTimeout(runScript, 50);
    }
  };

  React.useEffect(() => {
    runScript();
  }, []);

  return (
    <div className="App">
      <MetamaskContextProvider>
        <MetamaskConnectContextProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
        </MetamaskConnectContextProvider>
      </MetamaskContextProvider>
    </div>
  );
}

export default App;
