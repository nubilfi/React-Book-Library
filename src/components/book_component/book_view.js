import React, { Component } from 'react';
import BookRate from './book_rate';

const ROOT_URL = 'http://localhost:3001/api/v1';

class BookView extends Component {
	constructor(props) {
		super(props);

		this.state = { synopsis: {} };
	}

	componentDidMount() {
		fetch(`${ROOT_URL}/books/synopsis/${this.props.book}`)
			.then(res => res.json( ))
			.then((data) => {
				this.setState({ synopsis: data.results });
			})
			.catch(err => console.error('Error: ', err));
	}

	render() {
		const { synopsis } = this.state;
		return(
			<div className="col-sm-12 col-md-12 col-lg-12">
        <div className="well-block">
        <a onClick={this.props.onHandleView}>Back</a><br/><br/>
          <div className="well-title">
            <h2>{synopsis.title}</h2>
          </div>
					<img src="http://placekitten.com/g/400/500" alt="img" style={{ width: '50%' }}/>
          <div className="feature-block">
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Descriptions</h4>
              <div className="feature-content">
                <p>{synopsis.synopsis}</p>
              </div>
            </div>
          </div>
          <div className="feature-block">
            <div className="feature feature-blurb-text">
              <h4 className="feature-title">Rate this book</h4>
              <div className="feature-content">
				        <BookRate bookid={synopsis._id}/>
              </div>
            </div>
          </div>
        </div>
	    </div>
		);
	}
}

export default BookView;