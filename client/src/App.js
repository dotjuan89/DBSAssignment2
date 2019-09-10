import React, { Component } from "react";
import "./App.css";

class App extends Component {
	getText(data) {
		console.log(data);
	}

	render() {
		return (
			<div className="App">
				<nav className="navbar navbar-light bg-light">
					<a className="navbar-brand" href="#">
						DBS Eatery
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navDrop">
						<span className="navbar-toggler-icon"></span>
					</button>
				</nav>
				<br />
				<div className="container">
					<div className="input-group">
						{/* <input className="form-control" type="text" placeholder="Search" onChange={this.getText(this.value)} /> */}
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="button">
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default App;
