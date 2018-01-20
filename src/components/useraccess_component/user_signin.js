import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/api/v1';

class UserSignin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			fireRedirect: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const state = this.state;

		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();

		const { username, password } = this.state;

		axios
			.post(`${ROOT_URL}/signin`, { username, password })
			.then(res => {
				if (res.data.success) {
					this.setState({ fireRedirect: true });
					localStorage.setItem('apiKey', res.data.token);
				}
			});
	}

	render() {
		const { fireRedirect } = this.state;

		return(
			<div className="container">
				<div className="col-md-12">
			    <div className="panel panel-default">
					  <div className="panel-heading"><h3 className="panel-title"><strong>Sign In </strong></h3></div>
					  <div className="panel-body">
				    	{/* Form start */}
					    <form onSubmit={this.handleSubmit}>
					    	{/* Text input*/}
							  <div className="form-group">
							    <label htmlFor="username">Username</label>
									<input 
										type="text" 
										className="form-control" 
										name="username" 
										placeholder="Username"
										value={this.state.username} 
										onChange={this.handleChange} />
							  </div>
							  {/* Text input*/}
							  <div className="form-group">
							    <label htmlFor="password">Password</label>
									<input 
										type="password" 
										className="form-control" 
										name="password" 
										placeholder="Password"
										value={this.state.password} 
										onChange={this.handleChange} />
							  </div>
								{/* button */}
							  <button type="submit" className="btn btn-sm btn-success">Sign in</button>
							</form><br/>
							{/* Form end */}
							{ 
								fireRedirect && 
								(
									<Redirect to="/"/>
								)
							}
					  	<p>Doesn't have account, Sign up <Link to="/signup">here</Link>.</p>
					  </div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserSignin;