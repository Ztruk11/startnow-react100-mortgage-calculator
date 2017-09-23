import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);

    this.state = {
      balance: '',
      rate: '',
      term: 15,
      period: '',
      output: ''
    };

    this.handleBalanceChange = this
      .handleBalanceChange
      .bind(this);

    this.handleRateChange = this
      .handleRateChange
      .bind(this);

    this.handleTermChange = this
      .handleTermChange
      .bind(this);

    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleBalanceChange(event) {
    this.setState({balance: event.target.value});
  }

  handleRateChange(event) {
    this.setState({rate: event.target.value});
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleSubmit(event) {
    console.log('This is the balance: ' + this.state.balance + ', This is the rate: ' + this.state.rate + ', This is the selected term: ' + this.state.term);

    let r = ((this.state.rate / 12) / 100);
    let n = (this.state.term * 12);
    let denominatorTerm = (1 + (r));
    let denominator = (Math.pow(denominatorTerm, (n)) - 1);
    let numeratorTerm = (Math.pow((1 + r), (n)))
    let numerator = ((r) * numeratorTerm);
    let fraction = numerator / denominator;
    let output = Number(Math.round(((this.state.balance * fraction) * 100)) / 100);
    this.setState({output: output});
    console.log(output)
    event.preventDefault();
  }

  render() {
    return (
      <div className='container'>

        <div className="page-header">
          <h3>Mortgage Calculator</h3>
        </div>
        {/* your JSX goes here */}

        <div className="form-group">
          <label>Loan balance:</label>
          <input
            type="number"
            name='balance'
            className="form-control"
            value={this.state.balance}
            onChange={this.handleBalanceChange}/>
        </div>

        <div className="form-group">
          <label>Interest Rate:</label>
          <input
            type="number"
            name='rate'
            className="form-control"
            value={this.state.rate}
            onChange={this.handleRateChange}/>
        </div>

        <div className="form-group">
          <label>Loan Term (years):</label>
          <select
            className="form-control"
            name='term'
            value={this.state.term}
            onChange={this.handleTermChange}>
            <option value='15'>15</option>
            <option value='30'>30</option>
          </select>
        </div>

        <div className="form-group">
          <button
            onClick={this.handleSubmit}
            type="submit"
            name='submit'
            value="Submit"
            className="btn btn-primary btn-block">Calculate</button>
        </div>

        <h3 className='form-group alert' name='output' id='output'>${this.state.output}
          is your payment.</h3>
      </div>
    );
  }
}
