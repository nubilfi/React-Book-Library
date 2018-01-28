import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import SelectCategory from './select_category_component';
import 'react-select/dist/react-select.css';

const ROOT_URL      = 'http://localhost:3001/api/v1';

class BookForm extends Component {
	constructor(props) {
		super(props);

		const apiKey = localStorage.getItem('apiKey');
		this.state = {
			authorization: apiKey,
			book: {
				title: '',
				category: '',
				author: '',
				published: '',
				pages: ''
			},
			fireRedirect: false
		};

		this.handleSubmit      = this.handleSubmit.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleStateChange(e) {
		const state = this.state.book;

		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();
		const Authorization            = this.state.authorization;

		if (this.props.book) {
			// get form data out of props
			const { _id, title, category, author, published, pages } = this.props.book;

			// Use PUT endpoint to update the book data
			axios
				.put(`${ROOT_URL}/books/${_id}`, { title, category, author, published, pages }, { headers: { Authorization }})
				.then((res) => {
					if (res.data.success) {
						this.setState({ fireRedirect: true });
					}
				});
		} else {
			// get form data out of state
			const { title, category, author, published, pages } = this.state.book;

			// Use POST endpoint to create new book
			axios
				.post(`${ROOT_URL}/books`, { title, category, author, published, pages }, { headers: { Authorization }})
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
		const { title, category, author, published, pages } = this.props.book || {};
		const { fireRedirect }    = this.state;
		let headerTitle, titleField, categoryField, authorField, publishedField, pagesField, formButton;

		// when the component has book props, set up the value
		if (this.props.book) {
			headerTitle 				= <h2>Update Book</h2>;
			titleField = <input name="title" type="text" 
												className="form-control input-md" 
			                	value={title}
			                	onChange={this.handleFieldChange} />;
    	categoryField 		= <input name="category" type="text" 
									    	className="form-control input-md" 
			                	value={category}
			                	onChange={this.handleFieldChange} />;
    	authorField 		= <SelectCategory label="Author" author={author} />
    	publishedField 		= <input name="published" type="text" 
									    	className="form-control input-md" 
			                	value={published}
			                	onChange={this.handleFieldChange} />;
    	pagesField 		= <input name="pages" type="text" 
									    	className="form-control input-md" 
			                	value={pages}
			                	onChange={this.handleFieldChange} />;
    	formButton 		= <div className="form-group">
				                <button className="btn btn-default">Save changes</button>
				                <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={this.props.onUpdate}>Cancel</button>
			                </div>;
		} else {
			// show the empty field and it's state handler
			headerTitle 				= <h2>New Book</h2>;
			titleField = <input name="title" type="text" 
												className="form-control input-md"
												placeholder="Title" 
			                	value={this.state.book['title']}
			                	onChange={this.handleStateChange} />;
    	categoryField 		= <input name="category" type="text" 
									    	className="form-control input-md" 
									    	placeholder="Category"
			                	value={this.state.book['category']}
			                	onChange={this.handleStateChange} />;	
    	authorField 		= <SelectCategory label="Author" />
    	publishedField 		= <input name="published" type="text" 
									    	className="form-control input-md" 
									    	placeholder="Published"
			                	value={this.state.book['published']}
			                	onChange={this.handleStateChange} />;	
    	pagesField 		= <input name="pages" type="text" 
									    	className="form-control input-md" 
									    	placeholder="Pages"
			                	value={this.state.book['pages']}
			                	onChange={this.handleStateChange} />;				              
    	formButton 		= <div className="form-group">
				                <button className="btn btn-default">Save</button>
				                <Link className="btn btn-danger" style={{ marginLeft: 10 }} to="/books">Cancel</Link>
				              </div>;
		}

		return(
			<div className="col-sm-12 col-md-12">
	      <div className="well-block">
	        <div className="well-title">
	          {headerTitle}
	        </div>
	        <form onSubmit={this.handleSubmit}>
	          {/* Form start */}
	          <div className="row">
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="name">Title</label>
	                {titleField}
	              </div>
	            </div>
	            {/* Text input*/}
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="category">Category</label>
	                {categoryField}
	              </div>
	            </div>
	            {/* Select options */}
	            <div className="col-sm-6 col-md-6 col-lg-12">
                {authorField}
	            </div>
	            {/* Text input*/}
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="published">Published</label>
	                {publishedField}
	              </div>
	            </div>
	            {/* Text input*/}
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="pages">Pages</label>
	                {pagesField}
	              </div>
	            </div>
	            {/* Button */}
	            <div className="col-md-12">
	              {formButton}
	            </div>
	          </div>
	        </form>
	        {/* form end */}
	        { fireRedirect && (<Redirect to="/books" />) }
	      </div>
	    </div>
		);		
	}
};

export default BookForm;