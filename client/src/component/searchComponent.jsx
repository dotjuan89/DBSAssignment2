import React from "react";

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: ""
		};

		this.changeSearchText = this.changeSearchText.bind(this);
		this.submitSearchText = this.submitSearchText.bind(this);
	}

	changeSearchText(event) {
		this.setState({
			searchText: event.target.value
		});
	}

	submitSearchText(event) {
		console.log(this.state.searchText);
		event.preventDefault();
	}

	render() {
		return (
			<div className="SearchComponent">
				<div className="container">
					<form onSubmit={submitSearchText}>
						<div className="input-group">
							<input
								className="form-control"
								type="text"
								placeholder="Search"
								value={this.state.searchText}
								onChange={this.changeSearchText}
							/>
							<div className="input-group-append">
								<button className="btn btn-outline-secondary" type="submit">
									Search
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SearchComponent;
