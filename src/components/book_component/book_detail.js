import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import BookForm from './book_form.js';

const ROOT_URL      = 'http://localhost:3001/api/v1';

class BookDetail extends Component {
	constructor(props) {
		super(props);
		
		const apiKey = localStorage.getItem('apiKey') || null;
		this.state = {
			authorization: apiKey,
			book: {},
			isUpdate: false,
			fireRedirect: false
		}
		this.renderDetail = this.renderDetail.bind(this);
		this.onUpdate     = this.onUpdate.bind(this);
		this.onDelete     = this.onDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let book          = null;
		const { id }        = this.props.match.params;
		const Authorization = this.state.authorization;

		axios
			.get(`${ROOT_URL}/books/${id}`, { headers: { Authorization }})
			.then((res) => {
				book = res.data.results;
				this.setState({ book });
			});
	}

	handleChange(field, value) {
		const state       = this.state.book;
		
		state[field] = value;
		this.setState({state});
	}

	// Render Book details
	renderDetail(book) {
		return(
			<div className="col-sm-12 col-md-12">
        <div className="well-block">
        <Link to="/books">Back</Link><br/><br/>
          <div className="well-title">
              <h2>{book.fullname}</h2>
          </div>
          <div className="feature-block">
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Get in touch</h4>
              <div className="feature-content">
                  <p>Want to send a feedback? Send an email to <strong>{book.email}</strong></p>
              </div>
            </div>
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Experienced</h4>
              <div className="feature-content">
                  <p>Aliquam sit amet mi eu libero fermentum bibendum pulvinar a turpis. Vestibulum quis feugiat risus. </p>
              </div>
            </div>
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Published books</h4>
              <div className="feature-content">
                  <p>Praesent eu sollicitudin nunc. Cras malesuada vel nisi consequat pretium. Integer auctor elementum nulla suscipit in.</p>
              </div>
            </div>
          </div><br/>
					<button className="btn btn-primary" onClick={this.onUpdate}>Update Book data</button>
					<button className="btn btn-danger" onClick={this.onDelete} style={{ marginLeft: 10 }}>Remove Book</button>
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
		const { id }        = this.props.match.params;
		const Authorization = this.state.authorization;

		axios
			.delete(`${ROOT_URL}/books/${id}`, { headers: { Authorization }})
			.then((res) => {
				this.setState({ fireRedirect: !this.state.fireRedirect });
			});
	}

	render() {
		const { book, isUpdate, fireRedirect } = this.state;

		let theBook = null;
		if (_.isEmpty(book)) {
			theBook = 'Loading...';
		} else if(isUpdate) {
			// set book and methods as props to the BookForm
			theBook = <BookForm 
										book={book}
										onUpdate={this.onUpdate} 
										onFieldChange={this.handleChange} />;
		} else {
			theBook = this.renderDetail(book);
		}

		return(
			<div className="container">
				{theBook}
				{ fireRedirect && (<Redirect to="/books" />) }
			</div>
		);
	}
}

export default BookDetail;