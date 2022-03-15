import View from "./View.js";

const tag = '[RoutineView]'

const RoutineView = Object.create(View)

RoutineView.setup = function(el) {
  console.log(tag,'setup()')
  this.init(el)
  this.show()

  return this
}


export default RoutineView