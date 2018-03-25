const React = require('react');
const NumberConverter = require('../number');
const NumberGuess = require('./numberGuess');

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
				<NumberGuess correctAnswer="abc" guess="abc" />
			</div>
		);
	}
};

module.exports = Home;
