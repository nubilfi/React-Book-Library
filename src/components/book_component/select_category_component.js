import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL      = 'http://localhost:3001/api/v1';

class SelectCategory extends Component {
	constructor(props) {
		super(props);

		let apiKey = localStorage.getItem('apiKey');

		this.state = {
			selectValue: '',
			authorization: apiKey,
			value: [],
			authors: {}
		}

		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	componentDidMount() {
		// let authors;
		const Authorization = this.state.authorization;

		axios
			.get(`${ROOT_URL}/authors`, { headers: { Authorization }
			})
			.then((authors) => {
				// initialize authors value & change state
				// authors = _.mapKeys(res.data.results, '_id');
				this.setState({ authors });
			});	
	}

	handleSelectChange (newValue) {
		console.log('You\'ve selected:', newValue);
		this.setState({
			selectValue: newValue,
		});
	}

	render () {
		let options = [];
		_.map(this.state.authors, (author) => {
			options.push({ value: author._id, label: author.fullname });
		});

		return (
			<div className="form-group">
				<label htmlFor="author">{this.props.label}</label>
				<Select
					id="author"
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					autoFocus
					options={options}
					simpleValue
					name="author"
					value={this.state.selectValue}
					onChange={this.handleSelectChange}
				/>
			</div>
		);
	}	
} 

SelectCategory.propTypes = {
  label: PropTypes.string
};

export default SelectCategory;