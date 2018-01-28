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
			removeSelected: true,
			authorization: apiKey,
			disabled: false,
			stayOpen: false,
			value: [],
			authors: {},
			options: [],
			rtl: false,			
		}

		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	componentDidMount() {
		let authors;
		const Authorization = this.state.authorization;
		this.setState({ options: [] });

		axios
			.get(`${ROOT_URL}/authors`, { headers: { Authorization }
			})
			.then((res) => {
				// initialize authors value & change state
				authors = _.mapKeys(res.data.results, '_id');
				this.setState({ authors });
			});	
	}
	
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	}

	render () {
		const { authors, disabled, stayOpen, value, options } = this.state;

		_.map(authors, (author) => { 
			options.push({ label: author.fullname, value: author._id });
		});

		return (
			<div className="form-group">
				<label htmlFor="author">{this.props.label}</label>
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select Author"
          removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={value}
				/>
			</div>
		);
	}	
} 

SelectCategory.propTypes = {
  label: PropTypes.string
};

export default SelectCategory;