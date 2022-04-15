import View from './View.js'

const tag = '[Timerview]'

const TimerView = Object.create(View)

TimerView.setup = function (el) {
  this.init(el)
  this.show()
  this.time = 0
  return this
}

TimerView.run = function (temp = false) {
  const tictok = () => {
    this.time += 1
    this.render()
  }
  const blink = () => {
    this.el.textContent === '' ? this.render() : this.el.textContent = ''
  }
  if (temp) {
    this.timer = setInterval(blink, 500)
  } else {
    this.timer = setInterval(tictok, 1000)
  }

}

TimerView.stop = function () {
  clearInterval(this.timer)
}

TimerView.render = function (flag = false) {
  if (flag) {
    this.stop()
    this.time = 0
    this.el.textContent = '00 : 00 : 00'
    return
  }
  const HOUR = Math.floor(this.time / 3600)
  const MINUTE = Math.floor(this.time / 60)
  const SECOND = Math.floor(this.time % 60)
  this.el.textContent = `${HOUR < 10 ? '0' + HOUR : HOUR} : ${MINUTE < 10 ? '0' + MINUTE : MINUTE} : ${SECOND < 10 ? '0' + SECOND : SECOND}`

}


export default TimerView