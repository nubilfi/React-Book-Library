import React, { Component } from 'react';

class SearcBar extends Component {
	constructor(props) {
		super(props);

		this.state = { searchbox: '' };
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(e) {
		let searchbox = e.target.value;
		this.setState({ searchbox });
		this.props.onSearchboxChange(searchbox);
	}

	render() {
		return (
			<div className="col-sm-12 col-md-12 search-bar">
				<input
					type="text"
					className="form-control"
					placeholder="Search book title..."
					value={ this.state.searchbox }
					onChange={ this.onInputChange } />
			</div>
		);
	}
}

export default SearcBar;