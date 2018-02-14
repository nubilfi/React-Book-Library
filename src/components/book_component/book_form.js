import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

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
			authors: [],
			categories: [],
			authorValue: '',
			categoryValue: '',
			fireRedirect: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	componentDidMount() {
		let authors, categories = null;
		const Authorization = this.state.authorization;

		
		fetch(`${ROOT_URL}/authors`, { headers: { Authorization } })
			.then(res => res.json() )
			.then((data) => {
				// initialize authors value & change state
				authors = data.results;
				this.setState({ authors });
				
				return fetch(`${ROOT_URL}/categories`, { headers: { Authorization }});
			})
			.then(res => res.json() )
			.then((data) => {
				// initialize categories value & change state
				categories = data.results;
				this.setState({ categories });				
			});	
	}

	handleStateChange(e) {
		const state = this.state.book;

		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();
		const Authorization = this.state.authorization;

		if (this.props.book) {
			// get form data out of props
			const { _id, title, category, author, published, pages } = this.props.book;

			// Use PUT endpoint to update the book data
			fetch(`${ROOT_URL}/books/${_id}`, {
				headers: { Authorization, 'Content-Type': 'application/json'  },
				body: JSON.stringify({ title, category, author, published, pages }), 
				method: 'PUT'
			})
			.then(res => res.json() )
			.then((data) => {
				if (data.success) {
					this.setState({ fireRedirect: true });
				}
			});
		} else {
			// get form data out of state
			const { title, category, author, published, pages } = this.state.book;

			// Use POST endpoint to create new book
				fetch(`${ROOT_URL}/books`, {
					headers: { Authorization, 'Content-Type': 'application/json'  },
					body: JSON.stringify({ title, category, author, published, pages }),
					method: 'POST'
				})
				.then(res => res.json() )
				.then((data) => {
					if (data.success) {
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
		const { fireRedirect, authors, categories, book } = this.state;
		let headerTitle, titleField, categoryField, authorField, publishedField, pagesField, formButton;

		let selectAuthor = [];
		let selectCategory = [];

		authors.map(val => {
			return selectAuthor.push(<option value={val._id} key={val._id}>{val.fullname}</option>);
		});

		categories.map(val => {
			return selectCategory.push(<option value={val._id} key={val._id}>{val.category_name}</option>);
		});

		// when the component has book props, set up the value
		if (this.props.book) {
			headerTitle = <h2>Update Book</h2>;
			titleField  = <input name="title" type="text" 
										className="form-control input-md" 
			              value={title}
			              onChange={this.handleFieldChange} />;
    	categoryField = <select 
    									className="form-control"
    									name="category" 
    									value={category['_id']} 
    									onChange={this.handleFieldChange}>{selectCategory}</select>;
    	authorField = <select 
    									className="form-control"
    									name="author" 
    									value={author['_id']} 
    									onChange={this.handleFieldChange}>{selectAuthor}</select>;
    	publishedField 	= <input name="published" type="text" 
									    		className="form-control input-md" 
			                		value={moment(published).format('DD/MM/YYYY')}
			                		onChange={this.handleFieldChange} />;
    	pagesField 	= <input name="pages" type="text" 
									   	className="form-control input-md" 
			               	value={pages}
			               	onChange={this.handleFieldChange} />;
    	formButton 	= <div className="form-group">
				               <button className="btn btn-default">Save changes</button>
				               <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={this.props.onUpdate}>Cancel</button>
			               </div>;
		} else {
			// show the empty field and it's state handler
			headerTitle = <h2>New Book</h2>;
			titleField  = <input name="title" type="text" 
											className="form-control input-md"
											placeholder="Title" 
			               	value={book['title']}
			               	onChange={this.handleStateChange} />;
    	categoryField = <select 
    									className="form-control"
    									name="category" 
    									value={book['category']} 
    									onChange={this.handleStateChange}>{selectCategory}</select>;
    	authorField = <select 
    									className="form-control"
    									name="author" 
    									value={book['author']} 
    									onChange={this.handleStateChange}>{selectAuthor}</select>;
    	publishedField 	= <input name="published" type="text" 
									    	className="form-control input-md" 
									    	placeholder="Published"
			                	value={book['published']}
			                	onChange={this.handleStateChange} />;	
    	pagesField 	= <input name="pages" type="text" 
								    	className="form-control input-md" 
								    	placeholder="Pages"
			               	value={book['pages']}
			               	onChange={this.handleStateChange} />;				              
    	formButton 	= <div className="form-group">
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
	            {/* Select options */}
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="published">Author</label>
	                {authorField}
	              </div>
	            </div>
	            {/* Select options */}
	            <div className="col-sm-6 col-md-6 col-lg-12">
	              <div className="form-group">
	                <label className="control-label" htmlFor="published">Category</label>
	                {categoryField}
	              </div>
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