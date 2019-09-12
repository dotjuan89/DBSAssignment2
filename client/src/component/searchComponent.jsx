import React from "react";
import { Card, Modal, Button, Spinner } from "react-bootstrap";
import "./searchComponent.css";
import $ from "jquery";

// Search Component
class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		// Initial state of the component
		this.state = {
			YELP_API_KEY:
				"exSErej__H2MAjCHY-AJnLalkdVbjP80E256JvI0cf2cLGeG1GUcOqyLqGQAA7o6a7ZnrdYl_an9xMfrcfu6q_0N9x-d2bPiQFD56FQF84kwRYQ47QImG_NKnTJ5XXYx",
			GOOGLE_API_KEY: "AIzaSyArGf72P9aHqdnE343sFthXg6N3zzwr8qE",
			mapShow: false,
			mapLatitude: 0,
			mapLongitude: 0,
			searchText: "",
			searchQuery: "",
			searchLocation: "",
			searchResult: {},
			countries: [],
			isLoading: false,
		};

		// Binding of function to class constructor
		this.changeSearchText = this.changeSearchText.bind(this);
		this.submitSearchText = this.submitSearchText.bind(this);
		this.processSearchText = this.processSearchText.bind(this);
		this.generateSearchResult = this.generateSearchResult.bind(this);
		this.generateDisplayAddress = this.generateDisplayAddress.bind(this);
		this.generateMapModal = this.generateMapModal.bind(this);

		// Closes Map Modal
		this.closeMap = () => {
			this.setState({
				mapShow: false,
			});
		};
	}

	// Executes after rendering is done
	componentDidMount() {
		// Ajax call to pull country list
		$.ajax({
			method: "GET",
			url: "https://restcountries.eu/rest/v2/all",
			dataType: "json",
		}).then(data => {
			this.setState({
				countries: data,
			});
		});
	}

	// Handles text changes and update input
	changeSearchText(event) {
		this.setState({
			searchText: event.target.value,
		});
	}

	// Processes search text input.
	// Try to find search string for any country that is from country list.
	// If found, set the searchLocation to country
	async processSearchText(callback) {
		for (let i = 0; i < this.state.countries.length; i++) {
			if (this.state.searchText.toLowerCase().includes(this.state.countries[i].name.toLowerCase())) {
				await this.setState({
					searchLocation: this.state.countries[i].name,
					searchQuery: this.state.searchText.replace(this.state.countries[i].name, ""),
				});
				break;
			}
		}
		callback();
	}

	// Executes upon clicking search
	async submitSearchText(event) {
		event.preventDefault();

		// Resets state of search results
		await this.setState({
			searchLocation: "",
			searchQuery: "",
			searchResult: {},
			isLoading: true,
		});

		// Finds country in search string
		this.processSearchText(() => {
			// After processing, check if country and query is set and ready to search
			if (this.state.searchQuery && this.state.searchLocation) {
				// Utilizes Yelp's Api to search for businesses based on location and query.
				// Since Yelp's Api doesn't handle cors, we shall use heroku to help with cors handling.
				$.ajax({
					url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`,
					headers: {
						Authorization: `Bearer ${this.state.YELP_API_KEY}`,
					},
					method: "GET",
					dataType: "json",
					data: {
						term: this.state.searchQuery,
						location: this.state.searchLocation,
					},
				}).then(data => {
					// Populates search results
					this.setState({ searchResult: data, isLoading: false });
				});
			} else {
				this.setState({ searchResult: { businesses: [] }, isLoading: false });
			}
		});
	}

	// Generates Search Results based on search result array
	generateSearchResult() {
		let searchPanel = [];
		// Check if businesses exist in search array
		// If not, it means user has yet to begin searching
		if (this.state.searchResult["businesses"]) {
			// Once search is done, check if there are any results found
			if (this.state.searchResult["businesses"].length > 0) {
				// Loops the business to populate with bootstrap react card theme
				for (let i = 0; i < this.state.searchResult.businesses.length; i++) {
					// Pushes JSX into array
					searchPanel.push(
						// Reactive portion of the webpage is done here.
						// XL will display 4 cards
						// LG will display 3 cards
						// MD will display 2 cards
						// SM will display 1 card
						// Sets unique ID for each card
						<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={this.state.searchResult.businesses[i].id}>
							<Card>
								<Card.Img variant="top" src={this.state.searchResult.businesses[i].image_url} />
								<Card.Body>
									<Card.Title>{this.state.searchResult.businesses[i].name}</Card.Title>
									<Card.Subtitle>
										{this.state.searchResult.businesses[i].display_phone} · {this.state.searchResult.businesses[i].rating}
										<br />
										{this.state.searchResult.businesses[i].price}
									</Card.Subtitle>
									<Card.Text>
										{this.generateDisplayAddress(this.state.searchResult.businesses[i].location.display_address)}
									</Card.Text>
								</Card.Body>
								<Card.Body>
									<Card.Link href={this.state.searchResult.businesses[i].url} target="_blank" rel="noopener noreferrer">
										Yelp
									</Card.Link>
									<Card.Link href="#" onClick={e => this.updateCoordinates(e, this.state.searchResult.businesses[i].coordinates)}>
										Open Map
									</Card.Link>
								</Card.Body>
							</Card>
						</div>
					);
				}
			} else {
				// No businesses was found, thus display no restaurant error
				searchPanel.push(
					<div className="col-12" style={{ color: "red" }} key="0">
						<h4>Unable to find any Restaurants</h4>
					</div>
				);
			}
		}
		return searchPanel;
	}

	// Piece together the address for display
	generateDisplayAddress(displayAddressArr) {
		let displayAddressString = "";
		for (var i = 0; i < displayAddressArr.length - 1; i++) {
			displayAddressString += displayAddressArr[i];
			if (displayAddressArr.length - 1 !== i) {
				displayAddressString += " ";
			}
		}
		return displayAddressString;
	}

	// Update coordinates for map view
	updateCoordinates(e, businessLocation) {
		e.preventDefault();
		this.setState({
			mapLatitude: businessLocation.latitude,
			mapLongitude: businessLocation.longitude,
			mapShow: true,
		});
	}

	// Setup Map Modal for map popup
	generateMapModal() {
		return (
			<Modal size="lg" show={this.state.mapShow} onHide={this.closeMap}>
				<Modal.Header closeButton>
					<Modal.Title>Store Location</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="iframe-responsive">
						<iframe
							title="Restaurant Location"
							frameBorder="0"
							style={{ border: "0" }}
							src={`https://www.google.com/maps/embed/v1/place?key=${this.state.GOOGLE_API_KEY}&q=${this.state.mapLatitude},${this.state.mapLongitude}`}
						></iframe>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.closeMap}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	render() {
		return (
			<div className="SearchComponent">
				<div className="container">
					{/* Form for search submission */}
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
								{/* Search button will be hidden upon search start */}
								<button hidden={this.state.isLoading} className="btn btn-primary" type="submit">
									Search
								</button>
								{/* Loading pseudo button */}
								<Button hidden={!this.state.isLoading} variant="primary" disabled>
									<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
								</Button>
							</div>
						</div>
					</form>
					<br />
					{/* Displays the restaurant results below */}
					<p className="h3">Restaurants</p>
					<div className="row">{this.generateSearchResult()}</div>
				</div>
				{/* Map modal is generated here */}
				{this.generateMapModal()}
			</div>
		);
	}
}

export default SearchComponent;
