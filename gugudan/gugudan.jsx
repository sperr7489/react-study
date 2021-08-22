class GuGuDan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: "",
      result: "",
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState((preState) => {
        console.log(preState.value);
        return {
          result: "정답 " + preState.value,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: " ",
        };
      });
    } else {
      this.setState({
        result: "땡",
        value: " ",
      });
    }
    this.input.focus();
  };
  onRefInput = (c) => {
    this.input = c;
    console.log(c, "바보");
  };
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            type="number"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
          <button>입력</button>
        </form>
        <div>
          <div> {this.state.result}</div>
        </div>
      </React.Fragment>
    );
  }
}
module.exports = GuGuDan;
