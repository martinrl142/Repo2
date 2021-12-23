import { Redirect, Route } from "react-router";

let token = null;
function theToken() {
  const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
  console.log(loggedUserJSON);
  if (loggedUserJSON) {
      token = JSON.parse(loggedUserJSON);
  };
  const config = {
      headers: {
          "Authorization": token
      }
  };
  return config;
}    


const PrivateRoute = ({ component: Component, ...rest }) => {
  theToken();
  return (
    <Route {...rest}>{token ? <Component /> : <Redirect to="/login" />}</Route>
  );
};

export default PrivateRoute;