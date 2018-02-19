import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

import BookForm from './book_form.js';

const ROOT_URL = 'http://localhost:3001/api/v1';

class BookDetail extends Component {
	constructor(props) {
		super(props);
		
		const apiKey = localStorage.getItem('apiKey') || null;
		this.state = {
			authorization: apiKey,
			book: {},
			isUpdate: false,
			fireRedirect: false
		};
		this.renderDetail = this.renderDetail.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let book;
		const { id } = this.props.match.params;
		const Authorization = this.state.authorization;

		fetch(`${ROOT_URL}/books/${id}`, { headers: { Authorization }})
			.then(res => res.json() )
			.then((data) => {
				book = data.results;
				this.setState({ book });
			})
			.catch(err => console.error('Error: ', err));
	}

	handleChange(field, value) {
		const state = this.state.book;
		
		state[field] = value;
		this.setState({ state });
	}

	// Render Book details
	renderDetail(book) {
		return(
			<div className="col-sm-12 col-md-12">
        <div className="well-block">
        <Link to="/books">Back</Link><br/><br/>
          <div className="well-title">
              <h2>{book.title}</h2>
          </div>
          <div className="feature-block">
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Descriptions</h4>
              <div className="feature-content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio non reprehenderit est enim corrupti? Similique laboriosam, alias repellendus, vero veritatis doloremque ipsam amet, quam libero itaque aperiam eligendi incidunt ullam.</p>
              </div>
            </div>
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Details</h4>
              <div className="feature-content">
                  <p>Author: {book.author.fullname}</p>
                  <p>Category: {book.category.category_name}</p>
                  <p>Published: {moment(book.published).format('DD/MM/YYYY')}</p>
                  <p>Page: {book.pages}</p>
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
		const { id } = this.props.match.params;
		const Authorization = this.state.authorization;

		fetch(`${ROOT_URL}/books/${id}`, {
			headers: { Authorization },
			method: 'DELETE'
		})
		.then((res) => {
			this.setState({ fireRedirect: !this.state.fireRedirect });
		})
		.catch(err => console.error('Error: ', err));
	}

	render() {
		const { book, isUpdate, fireRedirect } = this.state;

		let theBook;
		if (Object.keys(book).length === 0) {
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