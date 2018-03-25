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
				className="btn"
				type="button"
				onClick={() => this.revealAnswer()}>
				Reveal answer
			</button>);

		return (
			<div className="jumbotron">
				<div className="number">
					Bagaimana bilang
					<span className="display-3">
					  {" " + this.state.number + " "}
					</span>
					di Bahasa Indonesia?
				</div>

				{guessInput}
				<NumberGuess correctAnswer={this.state.numberAsString} guess={this.state.guess} />


				<div className="number-string">
					{this.state.revealAnswer ? this.state.numberAsString : "" }
				</div>

				<form>
					<div className="form-group">
						<button
							className="btn"
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
