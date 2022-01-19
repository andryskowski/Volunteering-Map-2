import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
import { PlacesContextProvider } from './contexts/PlacesContext';
import { UsersContextProvider } from './contexts/UsersContext';
import CurrentUserContext, { CURRENT_USER_FROM_CONTEXT } from './contexts/CurrentUserContext';
import './i18next';

ReactDOM.render(
  <Suspense fallback={(<div>Loading ~~~~</div>)}>
    <React.StrictMode>
      <CurrentUserContext.Provider value={CURRENT_USER_FROM_CONTEXT}>
        <PlacesContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </PlacesContextProvider>
      </CurrentUserContext.Provider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
