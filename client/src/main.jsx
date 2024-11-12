import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from './common/Configuration.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>

    <App />
    <Toaster  position="top-right" />
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
