import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const ROOT_URL = 'http://localhost:3001/api/v1';

class CategoryShow extends Component {
	constructor(props) {
		super(props);

		const apiKey = localStorage.getItem('apiKey');

		this.state = {
			tags: [],
			authorization: apiKey
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleTagClick = this.handleTagClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loadDataFromServer = this.loadDataFromServer.bind(this);
	}

	loadDataFromServer() {
		const Authorization = this.state.authorization;
		let tagsData = [];

		fetch(`${ROOT_URL}/categories`, {
			headers: { Authorization }
		})
		.then(res => res.json() )
		.then((data) => {
			data.results.map((result) => {
				const { _id: id, category_name: text } = { ...result};
				return tagsData.push(Object.assign({}, { id, text}));
			});
			this.setState({ tags: [...tagsData] });
		})
		.catch(err => console.error('Error: ', err));
	}

	componentDidMount() {
		this.loadDataFromServer();
	}

	handleDelete(i) {
		let tags = this.state.tags;
		const Authorization = this.state.authorization;

		fetch(`${ROOT_URL}/categories/${tags[i].id}`, {
			headers: { Authorization },
			method: 'DELETE'
		})
		.then((res) => {
			this.setState(prevState => ({
				tags: prevState.tags.filter(tag => tag !== tags[i])
			}));			
		})
		.catch(err => console.error('Error: ', err));
	}

	handleAddition(tag) {
		const Authorization = this.state.authorization;
		fetch(`${ROOT_URL}/categories`, {
			headers: { Authorization, 'Content-Type': 'application/json'  },
			body: JSON.stringify({ category_name: tag }),
			method: 'POST'
		})
		.then(res => res.json() )
		.then((data) => {
			this.loadDataFromServer();	
		})
		.catch(err => console.error('Error: ', err));
	}

	handleTagClick(tag) {
		// console.log(tag)
	}

	handleInputChange(tag) {
		// console.log(tag)
	}

	render() {
		return(
			<div className="container">
				<ReactTags
					classNames={{
						tags: 'input-tags',
			      tagInputField: 'form-control input-field'
			    }}
			    placeholder="Add new category"
			    name="category_name"
					tags={this.state.tags}
					handleInputChange={this.handleInputChange}
					handleTagClick={this.handleTagClick}
					handleAddition={this.handleAddition}
					handleDelete={this.handleDelete}/>
			</div>
		);
	}
}

export default CategoryShow;