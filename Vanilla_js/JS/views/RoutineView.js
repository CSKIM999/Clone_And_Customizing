import View from "./View.js";

const tag = '[RoutineView]'

const RoutineView = Object.create(View)

RoutineView.setup = function(el) {
  console.log(tag,'setup()',el)
  this.init(el)

  return this
}


export default RoutineView