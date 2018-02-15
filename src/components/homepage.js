import React, { Component } from 'react';
import _ from 'lodash';

import SearchBar from './search_bar';
import PopulerBook from './populer_book';
import BookCard from './book_component/book_card';

const ROOT_URL      = 'http://localhost:3001/api/v1';

class Homepage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			books: [],
			populer_book: [],
			offset: 0,
			perPage: 9
		};
	}

	componentDidMount() {
		let books,
			pageCount,
			populer_book;
		const { perPage, offset } = this.state;

		fetch(`${ROOT_URL}/books/display?limit=${perPage}&offset=${offset}`)
			.then(res => res.json() )
			.then((data) => {
				books = data.results;
				pageCount = data.total ? Math.ceil(data.total / data.limit) : '';
				this.setState({ books, pageCount });

				return fetch(`${ROOT_URL}/books/populer`);
			})
			.then(res => res.json() )
			.then((data) => {
				populer_book = data.results;
				this.setState({ populer_book });
			})
			.catch(err => console.error('Error: ', err));
	}

	bookSearch(title) {
		if (title === '') {
			const { perPage, offset } = this.state;
			let books;
			fetch(`${ROOT_URL}/books/display?limit=${perPage}&offset=${offset}`)
				.then(res => res.json() )
				.then((data) => {
					books = data.results;
					this.setState({ books });
				})
				.catch(err => console.error('Error: ', err));
		} else {
			let books;
			fetch(`${ROOT_URL}/books/display/${title}`)
				.then(res => res.json() )
				.then((data) => {
					books = data.results;
					this.setState({ books });
				})
				.catch(err => console.error('Error: ', err));			
		}
	}

	render() {
		const { books, populer_book } = this.state;
		const bookSearch = _.debounce((title) => { this.bookSearch(title) }, 900);

		return(
			<div className="container">
				<div className="row">
					<SearchBar onSearchboxChange={ bookSearch } />
				</div>
				<div className="row">
					<BookCard books={ books } />
					<PopulerBook populerList={ populer_book } />
				</div>
			</div>
		);
	}
}

export default Homepage;