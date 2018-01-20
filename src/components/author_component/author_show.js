import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL      = 'http://localhost:3001/api/v1';
const Authorization = localStorage.getItem('apiKey');

class AuthorShow extends Component {
	constructor(props) {
		super(props);

		this.state = {
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

		// send state as params to the server
		axios
			.get(`${ROOT_URL}/authors`, { 
				headers: { Authorization },
				params: { limit: this.state.perPage, offset: this.state.offset }
			})
			.then((res) => {
				// initialize dataTable value & change state
				dataTable = _.mapKeys(res.data.results, '_id');
				pageCount = res.data.total ? Math.ceil(res.data.total / res.data.limit) : '';
				this.setState({ dataTable, pageCount });
			});		
	}

	componentDidMount() {
		this.loadDataFromServer();
	}

	renderRow(author, number) {
		return(
			<tr key={author._id}>
				<td>{number}</td>
				<td>{author.fullname}</td>
				<td>{author.email}</td>
				<td>
					<Link className="btn btn-primary btn-xs" to={`/authors/${author._id}`}>
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
			tableRows = <tr><td colSpan="4">Loading...</td></tr>;
		} else {
			let number = 0;
			tableRows =_.map(this.state.dataTable, (author) => {
				number++;
				return this.renderRow(author, number);
			});
		}

		return(
			<div className="container">
				<Link className="btn btn-primary" to="/authors/create">New author</Link><br/><br/>

				<table className="table table-hover table-bordered text-center">
					<thead>
						<tr>
							<th>No</th>
							<th>Fullname</th>
							<th>Email</th>
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

export default AuthorShow;