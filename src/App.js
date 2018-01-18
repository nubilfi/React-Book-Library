import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import components
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import SignIn from './components/useraccess_component/user_signin';
import SignUp from './components/useraccess_component/user_signup';
import AuthorShow from './components/author_component/author_show';
import AuthorForm from './components/author_component/author_form';
import AuthorDetail from './components/author_component/author_detail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoggedIn: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(isLoggedIn) {
    this.setState({ isLoggedIn: isLoggedIn });
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} />

        <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/authors" exact component={AuthorShow}/>
          <Route path="/authors/create" exact component={AuthorForm}/>
          <Route path="/authors/:id" exact component={AuthorDetail}/>
          <Redirect to="/"/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
