import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Auth
import setAuthToken from './utils/setAuthToken';

// Context
import AuthState from './context/auth/AuthState';
import EmailState from './context/email/EmailState';
import AlertState from './context/alert/AlertState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // 检查localStorage中是否有token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      language="zh-CN"
    >
      <AuthState>
        <EmailState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="main-content">
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route component={Routes} />
                  </Switch>
                </div>
                <Footer />
              </Fragment>
            </Router>
          </AlertState>
        </EmailState>
      </AuthState>
    </GoogleReCaptchaProvider>
  );
};

export default App; 