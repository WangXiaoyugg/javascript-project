const container = document.getElementById('container')
const text = document.getElementById('text')

const totalTime = 7500
const breathTime = totalTime / 5 * 2;
const holdTime = totalTime / 5;

class RelaxerApp {
  constructor() {
    this.currentState = "In"
    this.changeState = this.changeState.bind(this)
  }
  init() {
    this.changeState();
    setInterval(() => this.changeState(), totalTime)
  }
  sleep(fn, time) {
    setTimeout(() => {
      fn();
    }, time)
  }
  changeState() {
    switch (this.currentState) {
      case "In":
        this.currentState = "Hold"
        this.sleep(this.changeState, breathTime)
        container.classList.remove('shrink')
        container.classList.add('grow')
        text.innerText = "Breath In!"
        break
      case "Hold":
        this.currentState = "Out"
        text.innerText = "Hold"
        this.sleep(this.changeState, holdTime)
        break
      case "Out":
        this.currentState = "In"
        container.classList.remove('grow')
        container.classList.add('shrink')
        text.innerText = "Breath Out!"
        break
    }
  }

}

const relaxerApp = new RelaxerApp();
relaxerApp.init();


// 1. 链式的函数调用
// function breathAnimation() {
//   sleep(0).then(() => {
//     container.classList.remove('shrink')
//     container.classList.add('grow')
//     text.innerText = "Breath In!"
//     return sleep(breathTime)
//   }).then(() => {
//     text.textContent = "Hold"
//     return sleep(holdTime)
//   })
//     .then(() => {
//       container.classList.remove('grow')
//       container.classList.add('shrink')
//       text.innerText = "Breath Out!"
//     })
// }
// breathAnimation();
// setInterval(breathAnimation, totalTime);