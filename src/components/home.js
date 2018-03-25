const React = require('react');
const PropTypes = require('prop-types');
const NumberConverter = require('../number');

class Home extends React.Component {
	getNewState() {
	  var number = Math.floor(Math.random() * 1000);

		return {
			number,
			numberAsString: NumberConverter.numToWords(number)
		}
	}

	updateNumber() {
		this.setState(this.getNewState());
	}

	constructor(props) {
		super(props);
		this.state = this.getNewState();
	}

	render() {
		return (
			<div className="jumbotron">
				<h2>
					NUMBERS
				</h2>
				<button className="reset-button" onClick={() => this.updateNumber()}>
					Generate new number
				</button>
				<div className="number">
					{this.state.number}
				</div>
				<div className="number-string">
					{this.state.numberAsString}
				</div>
			</div>
		);
	}
};

// Home.propTypes = {
// 	numberAsString: PropTypes.string
// }

// Home.defaultProps = {
// 	numberAsString: "two hundred"
// }

module.exports = Home;
