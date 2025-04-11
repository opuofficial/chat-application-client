import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    {/* <StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </StrictMode> */}
  </HelmetProvider>
);
