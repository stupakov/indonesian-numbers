const React = require('react');
const PropTypes = require('prop-types');

class Home extends React.Component {
	getNewNumber() {
		return Math.floor(Math.random() * 1000);
	}

	updateNumber() {
		this.setState({
			number: this.getNewNumber()
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			number: this.getNewNumber()
		};
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
					{this.props.numberAsString}
				</div>
			</div>
		);
	}
};

Home.propTypes = {
	numberAsString: PropTypes.string
}

Home.defaultProps = {
	numberAsString: "two hundred"
}

module.exports = Home;
