class NewYearCountDownApp {
  constructor(container) {
    this.container = container;
    const nextYear = new Date().getFullYear() + 1;
    this.state = {
      isNewYear: false,
      greet: "HAPPY NEW YEAR",
      endTime: new Date(nextYear, 0, 1),
      year: nextYear,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
    }

    this.init()
  }

  init() {
    setInterval(() => this.calculateRemainingTime(), 1000);
    this.setAppHTML();
  }

  setAppHTML() {
    this.container.innerHTML = this.render();
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    this.updateAppHTML();
  }
  updateAppHTML() {
    let numbers = this.container.querySelectorAll('.number');
    numbers.forEach((number, index) => {
      switch (index) {
        case 0:
          number.innerText = this.state.days;
          break;
        case 1:
          number.innerText = this.state.hours;
          break;
        case 2:
          number.innerText = this.state.minutes;
          break;
        case 3:
          number.innerText = this.state.seconds;
          break;
      }
    })
  }
  calculateRemainingTime() {

    let diff = this.state.endTime - new Date();
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;

    if (diff <= 0) {
      this.setState({
        isNewYear: true,
        endTime: new Date(this.date.year + 1, 0, 1),
        year: this.state.year + 1,
      })
    }
    this.setState({
      days: Math.floor(diff / _day),
      hours: Math.floor((diff % _day) / _hour),
      minutes: Math.floor((diff % _hour) / _minute),
      seconds: Math.floor((diff % _minute) / _second)
    })

  }
  toString(val) {
    return typeof val !== 'object' ? val : ''
  }

  render() {
    let _template = null;

    if (!this.state.isNewYear) {
      _template = `
      <div class="countdown">
        <h2>Time Remaining for 2021</h2>
        <div class="timer">
          <div class="tile">
            <span class="number" id="days">${this.toString(this.state.days)}</span>
            <br />
            <span>Days</span>
          </div>
          <div class="tile">
            <span class="number"> ${this.toString(this.state.hours)}</span>
            <br />
            <span>Hours</span>
          </div>
          <div class="tile">
            <span class="number">${this.toString(this.state.minutes)}</span>
            <br />
            <span>Minutes</span>
          </div>
          <div class="tile">
            <span class="number">${this.toString(this.state.seconds)}</span>
            <br />
            <span>Seconds</span>
          </div>
        </div>
      </div>
    `
    } else {
      _template = `
        <div class="new-year">
          <h1>${this.state.greet}</h1>
        </div>
      `
    }
    return (` 
      ${_template}
      <div class="footer">
        <small>Built by Garen Wang, Copy from Amol in CodePen</small>
      </div>
    `)
  }
}

const newYearCountDown = new NewYearCountDownApp(document.getElementById('app'));