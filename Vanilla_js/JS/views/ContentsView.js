import View from "./View.js";

const tag = '[ContentsView]'

const ContentsView = Object.create(View)

ContentsView.setup = function(el) {
  console.log(tag,'setup()')
  this.init(el)
  this.show()

  return this
}


export default ContentsView