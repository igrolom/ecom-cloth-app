import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import SigninSignup from './pages/signin-signup/signin-signup';
import Header from './components/header/header';
import { auth } from './firebase/firebase.utils';
import { createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  // Open subscription - open messaging system between application and firebase app
  // whenever any changes occur related to the app, firebase sends a msg that auth has changed
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({ currentUser: user });
      // createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
      console.log(this.setState);
    });
  }

  componentWillUnmount() {
    console.log(this);
    console.log(this.unsubscribeFromAuth);
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/signin' component={SigninSignup} />
        </Switch>
      </div>
    );
  }
}

export default App;
