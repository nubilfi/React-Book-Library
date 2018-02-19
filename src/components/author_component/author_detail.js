import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import AuthorForm from './author_form.js';

const ROOT_URL = 'http://localhost:3001/api/v1';

class AuthorDetail extends Component {
	constructor(props) {
		super(props);
		
		const apiKey = localStorage.getItem('apiKey') || null;
		this.state = {
			authorization: apiKey,
			author: {},
			isUpdate: false,
			fireRedirect: false
		}
		this.renderDetail = this.renderDetail.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let author;
		const { id } = this.props.match.params;
		const Authorization = this.state.authorization;

		fetch(`${ROOT_URL}/authors/${id}`, { headers: { Authorization }})
			.then(res => res.json() )
			.then((data) => {
				author = data.results;
				this.setState({ author });
			})
			.catch(err => console.error('Error: ', err));
	}

	handleChange(field, value) {
		const state = this.state.author;
		
		state[field] = value;
		this.setState({ state });
	}

	// Render Author details
	renderDetail(author) {
		return(
			<div className="col-sm-12 col-md-12">
        <div className="well-block">
        <Link to="/authors">Back</Link><br/><br/>
          <div className="well-title">
              <h2>{author.fullname}</h2>
          </div>
          <div className="feature-block">
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Get in touch</h4>
              <div className="feature-content">
                  <p>Want to send a feedback? Send an email to <strong>{author.email}</strong></p>
              </div>
            </div>
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Published books</h4>
              <div className="feature-content">
                  <p>Check all published books by this author here:</p>
              </div>
            </div>
          </div><br/>
					<button className="btn btn-primary" onClick={this.onUpdate}>Update Author data</button>
					<button className="btn btn-danger" onClick={this.onDelete} style={{ marginLeft: 10 }}>Remove Author</button>
        </div>
	    </div>
		);
	}

	onUpdate(e) {
		e.preventDefault();

		// reverse the value when button is clicked
		this.setState({ isUpdate: !this.state.isUpdate });
	}

	onDelete() {
		const { id } = this.props.match.params;
		const Authorization = this.state.authorization;

		fetch(`${ROOT_URL}/authors/${id}`, { 
			headers: { Authorization },
			method: 'DELETE'
		})
		.then((res) => {
			this.setState({ fireRedirect: !this.state.fireRedirect });
		})
		.catch(err => console.error('Error: ', err));
	}

	render() {
		const { author, isUpdate, fireRedirect } = this.state;

		let theAuthor = null;
		if (Object.keys(author).length === 0) {
			theAuthor = 'Loading...';
		} else if(isUpdate) {
			// set author and methods as props to the AuthorForm
			theAuthor = <AuthorForm 
										author={author}
										onUpdate={this.onUpdate} 
										onFieldChange={this.handleChange} />;
		} else {
			theAuthor = this.renderDetail(author);
		}

		return(
			<div className="container">
				{theAuthor}
				{ fireRedirect && (<Redirect to="/authors" />) }
			</div>
		);
	}
}

export default AuthorDetail;