import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import SigninSignup from './pages/signin-signup/signin-signup';
import Header from './components/header/header';
import { auth } from './firebase/firebase.utils';
import { createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  /*  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  } */

  unsubscribeFromAuth = null;

  // Open subscription - open messaging system between application and firebase app
  // whenever any changes occur related to the app, firebase sends a msg that auth has changed
  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({ currentUser: user });
      // createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser(
            {
                id: snapShot.id,
                ...snapShot.data(),
              },
          );
        });
      } else {
        setCurrentUser( userAuth );
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
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/signin' render={()=> this.props.currentUser ?
          (<Redirect to='/' />): (<SigninSignup/>)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user})=> ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
