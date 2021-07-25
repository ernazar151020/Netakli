import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
// import Chat from "./components/Chat/Chat";
import Chat1 from "./components/Chat/Chat1";
import Profile from "./components/Profile";
import FooterNavbar from "./components/FooterNavbar";
import Home from "./components/Home";
import Questions from "./components/Questions";
import Search from "./components/Search";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./pages/PrivateRoute";
import useToken from "./components/useToken";

function App() {
  const { token, setToken } = useToken();
  const [categoryText, setCategoryText] = useState("");
  const [users, setUsers] = useState(localStorage.getItem("jwtTokens"));
  // if (!token) {
  //   return <SignIn setToken={setToken} />;
  // }

  return (
    <Router>
      <FooterNavbar />
      <Switch>
        <PrivateRoute path="/" exact>
          <Home setCategoryText={setCategoryText} />
        </PrivateRoute>
        <PrivateRoute path="/profile" exact>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/chat" exact>
          <Chat1 categoryText={categoryText} />
        </PrivateRoute>
        <PrivateRoute path="/begin" exact></PrivateRoute>
        <PrivateRoute path="/search" exact>
          <Search />
        </PrivateRoute>
        <PrivateRoute path="/questions" exact>
          <Questions />
        </PrivateRoute>
        <PrivateRoute path="/auth" exact></PrivateRoute>
        <Route path="/signin" exact>
          <SignIn setToken={setToken} token={token} />
        </Route>
        <Route path="/signup" exact>
          <SignUp setUsers={setUsers} users={setUsers} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
