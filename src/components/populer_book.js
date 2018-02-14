import React from 'react';

const PopulerBook = ({ populerList }) => {
	return(		
		<div className="col-sm-2 col-md-2">
			<div className="panel panel-primary">
			  <div className="panel-heading">
			    <h3 className="panel-title">Populer Book</h3>
			  </div>
			</div>
			<ul className="list-group">
			{
				populerList.map((list) => {
					return <li className="list-group-item" key={list._id}>{list.title}</li>
				})
			}
			</ul>
		</div>
	);
};

export default PopulerBook;