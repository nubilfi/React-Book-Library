import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

const ROOT_URL      = 'http://localhost:3001/api/v1';
const Authorization = localStorage.getItem('apiKey');

class AuthorForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			author: {
				fullname: '',
				email: ''
			},
			fireRedirect: false
		};

		this.handleSubmit      = this.handleSubmit.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleStateChange(e) {
		const state = this.state.author;

		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.props.author) {
			// get form data out of props
			const { _id, fullname, email } = this.props.author;

			// Use PUT endpoint to update the author data
			axios
				.put(`${ROOT_URL}/authors/${_id}`, { fullname, email }, { headers: { Authorization }})
				.then((res) => {
					if (res.data.success) {
						this.setState({ fireRedirect: true });
					}
				});
		} else {
			// get form data out of state
			const { fullname, email } = this.state.author;

			// Use POST endpoint to create new author
			axios
				.post(`${ROOT_URL}/authors`, { fullname, email }, { headers: { Authorization }})
				.then((res) => {
					if (res.data.success) {
						this.setState({ fireRedirect: true });
					}
				});
		}
	}
	
	handleFieldChange(e) {
		this.props.onFieldChange(e.target.name, e.target.value);
	}

	render() {
		const { fullname, email } = this.props.author || {};
		const { fireRedirect }    = this.state;
		let title, fullnameField, emailField, formButton;

		// when the component has author props, set up the value
		if (this.props.author) {
			title 				= <h2>Update Author</h2>;
			fullnameField = <input name="fullname" type="text" 
												className="form-control input-md" 
			                	value={fullname}
			                	onChange={this.handleFieldChange} />;
    	emailField 		= <input name="email" type="text" 
									    	className="form-control input-md" 
			                	value={email}
			                	onChange={this.handleFieldChange} />;
    	formButton 		= <div className="form-group">
				                <button className="btn btn-default">Save changes</button>
				                <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={this.props.onUpdate}>Cancel</button>
			                </div>;
		} else {
			// show the empty field and it's state handler
			title 				= <h2>New Author</h2>;
			fullnameField = <input name="fullname" type="text" 
												className="form-control input-md"
												placeholder="Fullname" 
			                	value={this.state.author['fullname']}
			                	onChange={this.handleStateChange} />;
    	emailField 		= <input name="email" type="text" 
									    	className="form-control input-md" 
									    	placeholder="Email"
			                	value={this.state.author['email']}
			                	onChange={this.handleStateChange} />;				              
    	formButton 		= <div className="form-group">
				                <button className="btn btn-default">Save</button>
				                <Link className="btn btn-danger" style={{ marginLeft: 10 }} to="/authors">Cancel</Link>
				              </div>;
		}

		return(
			<div className="col-sm-12 col-md-12">
	      <div className="well-block">
	        <div className="well-title">
	          {title}
	        </div>
	        <form onSubmit={this.handleSubmit}>
	          {/* Form start */}
	          <div className="row">
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="name">Fullname</label>
	                {fullnameField}
	              </div>
	            </div>
	            {/* Text input*/}
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="email">Email</label>
	                {emailField}
	              </div>
	            </div>
	            {/* Button */}
	            <div className="col-md-12">
	              {formButton}
	            </div>
	          </div>
	        </form>
	        {/* form end */}
	        { fireRedirect && (<Redirect to="/authors" />) }
	      </div>
	    </div>
		);		
	}
};

export default AuthorForm;