import React, { Component } from 'react';

class BookCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { books } = this.props;
		if (books.length === 0) {
			return <div>loading...</div>;
		}
		
		return(
			<div className="col-sm-10 col-md-10 col-lg-10" id="book-card">
				{
					books.map((val) => {
						return (<div className="col-sm-6 col-md-6 col-lg-4" key={val._id}>
							<div className="thumbnail">
								<div className="caption">
								<h3>{val.title}</h3>
								<small><strong>{val.author.fullname}</strong></small>
								<p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque nemo temporibus officiis, sit beatae vitae iste ullam distinctio. Consequatur nam fugit id, debitis magnam alias deserunt enim molestias magni sit.</p>
								<div className="clearfix">
									<div className="price pull-left">
										<button className="btn btn-success">Rate</button>
									</div>
								</div>

								</div>
							</div>
						</div>);
					})
				}
				</div>
		);
	}
}

export default BookCard;