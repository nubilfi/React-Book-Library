import React, { Component } from 'react';
import BookView from './book_view';

class BookCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isView: false
		};
		this.handleView = this.handleView.bind(this);
	}

	handleView(id) {
		this.setState({ isView: !this.state.isView, bookid: id });
	}

	render() {
		const { books } = this.props;
		const { isView } = this.state;
		let cards;

		if (books.length === 0) {
			return <div>loading...</div>;
		}

		if (!isView) {
			cards = books.map((val) => {
						return (
							<div className="col-sm-6 col-md-6 col-lg-4" key={val._id}>
								<div className="thumbnail">
									<div className="caption">
										<img src="http://placekitten.com/g/400/500" alt="img" style={{ width: '100%' }}/>
										<h5><strong>{val.title}</strong></h5>
										<small>{val.author.fullname}</small>
										<div className="clearfix">
											<div className="price pull-left">
												<button className="btn btn-success btn-sm pull-left" onClick={this.handleView.bind(this, val._id)}>View</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})
		} else {
			cards = <BookView book={this.state.bookid} onHandleView={this.handleView}/>
		}
		
		return(
			<div className="col-sm-10 col-md-10 col-lg-10" id="book-card">
				{ cards }
			</div>
		);
	}
}

export default BookCard;