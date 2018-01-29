import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

const ROOT_URL      = 'http://localhost:3001/api/v1';

class BookShow extends Component {
	constructor(props) {
		super(props);

		const apiKey = localStorage.getItem('apiKey');

		this.state = {
			authorization: apiKey,
			dataTable: {},
			offset: 0,
			perPage: 10
		}
		this.renderRow          = this.renderRow.bind(this);
		this.handlePageClick    = this.handlePageClick.bind(this);
		this.loadDataFromServer = this.loadDataFromServer.bind(this);
	}

	loadDataFromServer() {
		let dataTable, pageCount = null;
		const Authorization      = this.state.authorization;

		// send state as params to the server
		axios
			.get(`${ROOT_URL}/books`, { 
				headers: { Authorization },
				params: { limit: this.state.perPage, offset: this.state.offset }
			})
			.then((res) => {
				// initialize dataTable value & change state
				dataTable = res.data.results;
				pageCount = res.data.total ? Math.ceil(res.data.total / res.data.limit) : '';
				this.setState({ dataTable, pageCount });
			});		
	}

	componentDidMount() {
		this.loadDataFromServer();
	}

	renderRow(book, number) {
		return(
			<tr key={book._id}>
				<td>{number}</td>
				<td>{book.title}</td>
				<td>{book.category.category_name}</td>
				<td>{book.author.fullname}</td>
				<td>{moment(book.published).format('DD/MM/YYYY')}</td>
				<td>{book.pages}</td>
				<td>
					<Link className="btn btn-primary btn-xs" to={`/books/${book._id}`}>
						<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Show detail
					</Link>
				</td>
			</tr>
		);
	}

	handlePageClick(data) {
		// 'selected' is ReactPaginate state (the page number)
		// start from index 0
		let selected = data.selected;
		let offset   = Math.ceil(selected * this.state.perPage);

		// change offset state, then call loadDataFromServer()
		this.setState({ offset }, () => {
			this.loadDataFromServer();
		});
	}

	render() {
		const { dataTable, pageCount } = this.state;

		let tableRows = null;
		if (_.isEmpty(dataTable)) {
			tableRows = <tr><td colSpan="7">Loading...</td></tr>;
		} else {
			let number = 0;
			tableRows  =_.map(dataTable, (book) => {
				number++;
				return this.renderRow(book, number);
			});
		}

		return(
			<div className="container">
				<Link className="btn btn-primary" to="/books/create">New book</Link><br/><br/>

				<table className="table table-hover table-bordered text-center">
					<thead>
						<tr>
							<th>No</th>
							<th>Title</th>
							<th>Category</th>
							<th>Author</th>
							<th>Published</th>
							<th>Pages</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{tableRows}
					</tbody>
				</table>
				{
					pageCount && 
					(<ReactPaginate
						previousLabel={"previous"}
						nextLabel={"next"}
						breakLabel={<a href="">...</a>}
	          breakClassName={"break-me"}
	          pageCount={this.state.pageCount}
	          marginPagesDisplayed={2}
	          pageRangeDisplayed={5}
	          onPageChange={this.handlePageClick}
	          containerClassName={"pagination"}
	          subContainerClassName={"pages pagination"}
	          activeClassName={"active"}
						/>)
				}
			</div>
		);
	}
}

export default BookShow;