import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile'
import Nav from "./components/Nav";
import OrderHistory from "./pages/OrderHistory";
import Success from './pages/Success'
import { Provider } from 'react-redux';
import store from './redux/store';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql'
// });

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
<<<<<<< HEAD
  uri: 'http://localhost:3001/graphql',
=======
  // uri: 'http://localhost:3001/graphql',
  uri: '/graphql',
>>>>>>> 0acb02124f7e2c4d49ed90fa9e17aaad06c60188
})



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/editProfile" component={EditProfile} />
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/offerings/:id" component={Detail} />
            <Route exact path="/success" component={Success} />
            <Route component={NoMatch} />
          </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>

  );
}


//redux change
export default App;
