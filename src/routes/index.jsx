import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AdminLogin = React.lazy(() =>
  import("../Components/pages/AdminLogin/AdminLogin")
);
const UserLogin = React.lazy(() => import("../Components/pages/Login/Login"));
const AdminDashboard = React.lazy(() =>
  import("../Components/pages/AdminDashboard/Dashboard")
);
const AdminTable = React.lazy(() =>
  import("../Components/pages/AdminTable/AdminTable")
);
const UserView = React.lazy(() =>
  import("../Components/pages/Userview/Userview")
);

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={AdminLogin} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/table" component={AdminTable} />
          <Route exact path="/user" component={UserLogin} />
          <Route exact path="/user/view" component={UserView} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default AppRouter;
