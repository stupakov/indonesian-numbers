const React = require('react');
const PropTypes = require('prop-types');
const {format} = require('../guessFormatter');

class NumberGuess extends React.Component {
	render() {
		var formattedGuess = format(this.props.correctAnswer, this.props.guess);

		return (
			<div className="guess">
				<span className="guess-correct text-success">{formattedGuess.correct}</span>
				<span className="guess-incorrect text-danger">{formattedGuess.incorrect}</span>
				<div className="guess-complete">{
					formattedGuess.complete ? <span className="border border-success text-success font-weight-bold">Correct!</span> : "..."
				}</div>
		</div>
		);
	}
};

NumberGuess.propTypes = {
	correctAnswer: PropTypes.string,
	guess: PropTypes.string
}

NumberGuess.defaultProps = {
	correctAnswer: "",
	guess: ""
}

module.exports = NumberGuess;
