import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import PropertyDetails from "./components/property/PropertyDetails";

// WishList Imports
import WishList from "./components/wishList/WishList";
import Details from "./components/wishList/Details";
import ConfirmList from "./components/wishList/ConfirmList";
import Enquiry from "./components/wishList/Enquiry";

// List imports
import ListLists from "./components/list/ListLists";
import ListDetails from "./components/list/ListDetails";

// Auth or User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import PropertiesList from "./components/admin/PropertiesList";
import NewProperty from "./components/admin/NewProperty";
import UpdateProperty from "./components/admin/UpdateProperty";
import ListsList from "./components/admin/ListsList";
import ProcessList from "./components/admin/ProcessList";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import PropertyReviews from "./components/admin/PropertyReviews";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  let marginAdmin = "";
  if (isAuthenticated) {
    if (user.role === "admin") {
      marginAdmin = "0";
    }
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/property/:id" component={PropertyDetails} exact />

          <Route path="/wish/list" component={WishList} exact />
          <ProtectedRoute path="/wish/details" component={Details} exact />
          <ProtectedRoute path="/wish/confirm" component={ConfirmList} exact />
          <ProtectedRoute path="/wish/enquiry" component={Enquiry} exact />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />

          <ProtectedRoute path="/lists/me" component={ListLists} exact />
          <ProtectedRoute path="/list/:id" component={ListDetails} exact />
        </div>
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/properties"
          isAdmin={true}
          component={PropertiesList}
          exact
        />
        <ProtectedRoute
          path="/admin/property"
          isAdmin={true}
          component={NewProperty}
          exact
        />
        <ProtectedRoute
          path="/admin/property/:id"
          isAdmin={true}
          component={UpdateProperty}
          exact
        />
        <ProtectedRoute
          path="/admin/lists"
          isAdmin={true}
          component={ListsList}
          exact
        />
        <ProtectedRoute
          path="/admin/list/:id"
          isAdmin={true}
          component={ProcessList}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={PropertyReviews}
          exact
        />

        <Footer marginAdmin={marginAdmin} />
      </div>
    </Router>
  );
}

export default App;
