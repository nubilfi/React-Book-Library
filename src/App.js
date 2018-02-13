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
import BookShow from './components/book_component/book_show';
import BookForm from './components/book_component/book_form';
import BookDetail from './components/book_component/book_detail';

class App extends Component {
  constructor(props) {
    super(props);

    const apiKey = localStorage.getItem('apiKey');
    this.state = { isLoggedIn: false, apiKey };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  componentDidMount() {
    if(this.state.apiKey !== null) this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <BrowserRouter>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />

        {
          isLoggedIn ?
            <Switch>
              <Route path="/" exact component={Homepage}/>
              <Route path="/signin" exact render={() => <SignIn isLoggedIn={this.handleLogin} />}/>
              <Route path="/signup" exact render={() => <SignUp isLoggedIn={this.handleLogin} />}/>
              <Route path="/authors" exact component={AuthorShow}/>
              <Route path="/authors/create" exact component={AuthorForm}/>
              <Route path="/authors/:id" exact component={AuthorDetail}/>
              <Route path="/books" exact component={BookShow}/>
              <Route path="/books/create" exact component={BookForm}/>
              <Route path="/books/:id" exact component={BookDetail}/>
              <Redirect to="/"/>
            </Switch>
          :
          <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/signin" exact render={() => <SignIn isLoggedIn={this.handleLogin} />}/>
            <Route path="/signup" exact render={() => <SignUp isLoggedIn={this.handleLogin} />}/>
            <Redirect to="/"/>
          </Switch>          
        }
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
