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
				<div className="col-md-4 col-md-offset-4">
					<h1>Sign In</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="username">
								<input 
									type="text" 
									className="form-control" 
									name="username" 
									placeholder="Username"
									alue={this.state.username} 
									onChange={this.handleChange} />
							</label>
							<label htmlFor="password">
								<input 
									type="password" 
									className="form-control" 
									name="password" 
									placeholder="Password"
									value={this.state.password} 
									onChange={this.handleChange} />
							</label><br/><br/>

							<button type="submit" className="btn btn-primary">Sign In</button>
						</div>
					</form>
					{ 
						fireRedirect && 
						(
							<Redirect to="/"/>
						)
					}
				</div>
			</div>
		);
	}
}

export default UserSignin;