import View from './View.js'

const tag = '[Timerview]'

const TimerView = Object.create(View)

TimerView.setup = function(el) {
  console.log(tag,'setup()')
  this.init(el)
  this.timerEl = el.querySelector('.timer')
  return this
}

TimerView.showTimer = function( show = true) {
}

export default TimerView