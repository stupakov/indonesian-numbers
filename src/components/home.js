const React = require('react');
const PropTypes = require('prop-types');

class Home extends React.Component {
	render() {
		return (
			<div className="jumbotron">
				<h2>
					NUMBERS
				</h2>
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
