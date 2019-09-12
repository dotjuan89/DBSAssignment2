import React, { Component } from "react";
import "./App.css";
import SearchComponent from "./component/searchComponent";
import NavComponent from "./component/navComponent";

class App extends Component {
	render() {
		return (
			// App Component
			<div className="App">
				<NavComponent />
				<br />
				<SearchComponent />
			</div>
		);
	}
}
export default App;
