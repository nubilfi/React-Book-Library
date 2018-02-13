import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return(
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="">Book Library</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          { isLoggedIn ? 
            (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/books">Book</Link></li>
                <li><Link to="/categories">Category</Link></li>
                <li><Link to="/authors">Author</Link></li>
                <li className="dropdown">
                  <Link to="/" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="glyphicon glyphicon-user"></span> <span className="caret"></span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/signout">Sign Out</Link></li>
                  </ul>
                </li>
              </ul>
            ) :
            (
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <Link to="/" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="glyphicon glyphicon-user"></span> <span className="caret"></span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/signin">Sign In</Link></li>
                  </ul>
                </li>              
              </ul>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;