import View from './View.js'

const tag = '[Timerview]'

const TimerView = Object.create(View)

TimerView.setup = function(el) {
  console.log(tag,'setup()')
  this.init(el)
  this.show()
  this.setTimer(el)

  // this.timerEl = el.querySelector('.timer') setup 에서 받아오는 개체가 .timer 이므로 따로
  // qS 를 통해 timerEl 을 만들 필요가 없는듯?

  return this // 이후 on 체이닝을 위해 return 반환 필수
}

TimerView.setTimer = function(el) {
  var time = 0
  var timer
  console.log(tag,'startTimer' )
  const tictok = () => {
    time += 1
    el.innerHTML = time
  }
  function start(){
    timer = setInterval(tictok, 1000)
  }
  function stop(){
    clearInterval(timer)
    time = 0
    el.innerHTML = '타이머자리입니다'
  }
}



export default TimerView