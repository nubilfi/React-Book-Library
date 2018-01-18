import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL      = 'http://localhost:3001/api/v1';
const Authorization = localStorage.getItem('apiKey');

class AuthorShow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataTable: {}
		}
		this.renderRow = this.renderRow.bind(this);
	}

	componentDidMount() {
		let dataTable = null;

		axios
			.get(`${ROOT_URL}/authors`, { headers: { Authorization }})
			.then((res) => {
				dataTable = _.mapKeys(res.data.results, '_id');
				this.setState({ dataTable });
			});
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

	render() {
		const { dataTable } = this.state;

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
			</div>
		);
	}
}

export default AuthorShow;