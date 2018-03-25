const React = require('react');
const NumberConverter = require('../number');
const NumberGuess = require('./numberGuess');

class Home extends React.Component {
	getNewState() {
	  var number = Math.floor(Math.random() * 1000);

		return {
			number,
			numberAsString: NumberConverter.numToWords(number),
			guess: "",
			revealAnswer: false
		}
	}

	updateNumber() {
		this.setState(this.getNewState());
	}

	constructor(props) {
		super(props);
		this.state = this.getNewState();
	}

  handleGuessChange(event) {
    this.setState({
			guess: event.target.value
		});
  }

	revealAnswer() {
		this.setState({
			revealAnswer: true
		});
	}

	render() {
		var guessInput = (<input
		  className="form-control form-control-lg"
		  autoFocus="autofocus"
			type="text"
			value={this.state.guess}
			onChange={(e) => this.handleGuessChange(e)}
		/>);

		var revealButton = this.state.revealAnswer ?
			undefined :
			(<button 
				className="btn btn-outline-secondary btn-lg"
				type="button"
				onClick={() => this.revealAnswer()}>
				Reveal answer
			</button>);

		return (
			<div className="container">
				<div className="number my-5">
					Bagaimana bilang
					<span className="display-3">
					  {" " + this.state.number + " "}
					</span>
					di Bahasa Indonesia?
				</div>

				<div className="mb-5">
					{guessInput}
				</div>

				<div className="mb-5">
					<NumberGuess correctAnswer={this.state.numberAsString} guess={this.state.guess} />
				</div>

				<div className="number-string mb-3">
					{this.state.revealAnswer ? this.state.numberAsString : "" }
				</div>

				<form>
					<div className="form-group">
						<button
							className="btn btn-primary btn-lg mr-2"
							type="button"
							onClick={() => this.updateNumber() }>
							Generate new number
						</button>
						{ revealButton }
					</div>
				</form>
			</div>
		);
	}
};

module.exports = Home;
