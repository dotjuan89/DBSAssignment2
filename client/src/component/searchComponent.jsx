import React from "react";
import "./searchComponent.css";
import $ from "jquery";

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			API_KEY:
				"exSErej__H2MAjCHY-AJnLalkdVbjP80E256JvI0cf2cLGeG1GUcOqyLqGQAA7o6a7ZnrdYl_an9xMfrcfu6q_0N9x-d2bPiQFD56FQF84kwRYQ47QImG_NKnTJ5XXYx",
			searchText: "",
			searchResult: {
				businesses: [
					{
						alias: "starbucks-singapore-47",
						categories: [
							{
								alias: "coffee",
								title: "Coffee & Tea",
							},
						],
						coordinates: { latitude: 1.317325, longitude: 103.8435452 },
						display_phone: "+65 6910 1185",
						distance: 698.7583737355382,
						id: "HGoqrguS8WwwWZqsxeOhEw",
						image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/CVFLveyIIBkkcuSJiex4Xw/o.jpg",
						is_closed: false,
						location: {
							address1: "101 Thomson Rd",
							address2: "#01-01",
							address3: "",
							city: "Singapore",
							country: "SG",
							display_address: ["101 Thomson Rd", "#01-01", "Singapore 307591", "Singapore"],
							length: 4,
							state: "SG",
							zip_code: "307591",
						},
						name: "Starbucks",
						phone: "+6569101185",
						price: "$$",
						rating: 2.5,
						review_count: 5,
						transactions: [],
						url:
							"https://www.yelp.com/biz/starbucks-singapore-47?adjust_creative=5hsWlNDjpUXq6uQofMWmzw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5hsWlNDjpUXq6uQofMWmzw",
					},
				],
				region: {
					center: {
						latitude: 1.3141221482579457,
						longitude: 103.84895324707031,
					},
				},
			},
		};

		this.changeSearchText = this.changeSearchText.bind(this);
		this.submitSearchText = this.submitSearchText.bind(this);
	}

	changeSearchText(event) {
		this.setState({
			searchText: event.target.value,
		});
	}

	submitSearchText(event) {
		event.preventDefault();
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
			headers: {
				Authorization: "Bearer " + this.state.API_KEY,
			},
			method: "GET",
			dataType: "json",
			data: {
				term: "Starbucks",
				location: "Singapore",
			},
		}).then(data => {
			console.log(data);
		});
	}

	render() {
		return (
			<div className="SearchComponent">
				<div className="container">
					<form onSubmit={this.submitSearchText}>
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
					<br />
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th colSpan="2" style={{ width: "50" }}>
									Restaurant
								</th>
								{/* <th style={{ width: "50" }}>Map</th> */}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<img
										className="img-fluid restaurant-thumbnail"
										src={this.state.searchResult.businesses[0].image_url}
										alt="Starbucks"
									/>
									<iframe
										style={{ width: "300px", height: "225px", border: 0 }}
										src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyArGf72P9aHqdnE343sFthXg6N3zzwr8qE&q=${this.state.searchResult.businesses[0].coordinates.latitude},${this.state.searchResult.businesses[0].coordinates.longitude}&zoom=18`}
									></iframe>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default SearchComponent;
