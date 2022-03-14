import TimerView from "../views/TimerView.js"

const tag = '[MainController]'
export default {
  init() {
    console.log(tag,'init()')
    TimerView.setup()
  }
}