import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import App from "./App.jsx";
import ThemeProvider from "./components/ui/ThemeProvider.jsx";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen">
            Carregando...
          </div>
        }
        persistor={persistor}
      >
        <ThemeProvider>
          <App />
          <Toaster position="bottom-right" closeButton />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
