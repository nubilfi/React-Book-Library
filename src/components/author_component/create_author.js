import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL      = 'http://localhost:3001/api/v1';
const Authorization = localStorage.getItem('apiKey');

const FIELDS = {
	fullname: {
		type: 'input',
		name: 'fullname',
		label: 'Fullname'
	},
	email: {
		type: 'input',
		name: 'email',
		label: 'Email'
	}
}

class CreateAuthor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {
				fullname: '',
				email: ''
			},
			fireRedirect: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderField  = this.renderField.bind(this);
	}

	renderField(fieldConfig) {
		return(
		  <div className="form-group" key={fieldConfig.name}>
		    <label className="col-sm-2 control-label">{fieldConfig.label}</label>
		    <div className="col-sm-10">
		      <fieldConfig.type type="text" className="form-control" placeholder={`Author ${fieldConfig.name}`} value={this.state.fields[fieldConfig.name]} name={fieldConfig.name} onChange={this.handleChange}/>
		    </div>
		  </div>
		);
	}

	handleChange(e) {
		const state = this.state.fields;

		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();

		// get form data out of state
		const { fullname, email } = this.state.fields;

		axios
			.post(`${ROOT_URL}/authors`, { fullname, email }, { headers: { Authorization }})
			.then((res) => {
				if (res.data.success) {
					this.setState({ fireRedirect: true });
				}
			});
	}

	render() {
		const { fireRedirect } = this.state;

		return(
			<div className="container">
				<h3>New Author</h3><hr/>
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					{/* === Generate fields === */}
					{
						_.map(FIELDS, this.renderField)
					}
				  <div className="form-group">
				    <div className="col-sm-offset-2 col-sm-10">
				      <button type="submit" className="btn btn-success">Save</button>
							<Link className="btn btn-danger" to="/authors" style={{ marginLeft: 10 }}>Back</Link>
				    </div>
				  </div>
				</form>
				{
					fireRedirect &&
					( <Redirect to="/authors" />)
				}
			</div>
		);
	}
}

export default CreateAuthor;