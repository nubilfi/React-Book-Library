import React, { Component } from 'react';
import axios from 'axios';
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
		axios
			.get(`${ROOT_URL}/books/display`, {
				params: { limit: this.state.perPage, offset: this.state.offset }
			})
			.then((res) => {
				// initialize books value & change state
				let books = res.data.results;
				let pageCount = res.data.total ? Math.ceil(res.data.total / res.data.limit) : '';
				this.setState({ books, pageCount });
				return axios.get(`${ROOT_URL}/books/populer`);
			})
			.then((res) => {
				let populer_book = res.data.results;
				this.setState({ populer_book });
			});
	}

	bookSearch(title) {
		axios
			.get(`${ROOT_URL}/books/display/${title}`)
			.then((res) => {
				let books = res.data.results;
				this.setState({ books });
			});
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