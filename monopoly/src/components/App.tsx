import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AuthProvider, useAuth } from "../hooks";
import { DefaultLayout } from "../layout";
import { IndexPage, LoginPage, NotFound, RegisterPage } from "../pages";

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

function App() {
  let auth = useAuth();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route
              path="/dashboard"
              element={
                <DefaultLayout>
                  {auth && (
                    <span className="text-xl">
                      {JSON.stringify(auth, null, 2)}
                    </span>
                  )}
                </DefaultLayout>
              }
            />
          </Route>
          <Route
            path="/protected"
            element={
              <DefaultLayout>
                {auth && (
                  <span className="text-xl">
                    {JSON.stringify(auth, null, 2)}
                  </span>
                )}
              </DefaultLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
