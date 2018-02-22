import React, { Component } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

class BookRate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			defaultRate: 0,
			total: 5
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange({ rating, type }) {
		if (type === 'click') {
			this.setState({
				defaultRate: rating
			});
		}
	}

	render() {
		return(
			<div>
				<Rater
		      total={this.state.total}
		      rating={this.state.defaultRate}
		      onRate={this.handleChange} />
			</div>
		);
	}
}

export default BookRate;