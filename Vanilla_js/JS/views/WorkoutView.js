import View from "./View.js";

const tag = '[WorkoutView]'


const WorkoutView = Object.create(View)


WorkoutView.template = {
  Basic : `<div class = "contents"><div class = 'detail' id = "startButton">start</div>
  <div class='none' id = 'stopBtns' >
  <span id = "tempStop">STOP</span>
  <span id = "endWorkout">END</span></div>
  <div id = "workoutContents"></div></div>
  `
}

WorkoutView.setup = function(el) {
  // console.log(tag,'setup()')
  this.init(el)
  this.el.innerHTML = WorkoutView.template.Basic
  this.show()
  return this
}
WorkoutView.render = function(data = {}) {
  debugger
  this.handleData = data
  this.el.querySelector('#workoutContents').innerHTML = this.getWorkoutHtml(data)
  this.bindClickEvent()
  this.show()
  return this
}
WorkoutView.getWorkoutHtml = function(data ={}) {
  debugger
  data
}

export default WorkoutView