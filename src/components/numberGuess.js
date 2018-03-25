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
				{
					formattedGuess.complete ? <div className="guess-complete alert alert-success mt-2">
						<span className="font-weight-bold">Correct!</span>
					</div> : <span>...</span>
				}
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
