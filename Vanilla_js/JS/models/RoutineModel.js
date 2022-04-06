export default {
  data: [
    // {name:'R1' , detail:[{name:'FLANK',routine:[['W,C','SAME ALL'],[[5,10],[10,10],[15,10],[15,20]]]}, {name:'e2',routine:[['W,C','SAME ALL'],[[5,10],[10,10],[15,10],[15,20]]]}, {name:'e3',routine:[['W,C','SAME ALL'],[[5,10],[10,10],[15,10],[15,20]]]}, {name:'e4',routine:[['W,C','SAME ALL'],[[5,10],[10,10],[15,10],[15,20]]]}]},
    
    {name:'R1' , detail:[{name:'FLANK',routine:{selectedToggleTop:'W,C',selectedToggleBottom:'EACH',item:[[5,10],[10,10],[15,10],[15,20]]}}, {name:'e2',routine:{selectedToggleTop:'W,C',selectedToggleBottom:'SAME ALL',item:[[5,10],[10,10],[15,10],[15,20]]}}, {name:'e3',routine:{selectedToggleTop:'W,C',selectedToggleBottom:'SAME ALL',item:[[5,10],[10,10],[15,10],[15,20]]}}, {name:'e4',routine:{selectedToggleTop:'W,C',selectedToggleBottom:'SAME ALL',item:[[5,10],[10,10],[15,10],[15,20]]}}]},

    // {name:'R2' , detail:{'e1':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]], 'e2':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e3':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e4':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]]}},
    // {name:'R3' , detail:{'e1':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]], 'e2':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e3':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e4':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]]}},
    // {name:'R4' , detail:{'e1':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]], 'e2':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e3':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e4':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]]}},
    // {name:'R5' , detail:{'e1':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]], 'e2':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e3':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]],'e4':[[4,5,10],[4,10,10],[4,15,10],[4,15,20]]}},
    // {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    // {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    // {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    // {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    // {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    // {name:'R2' , detail:[{'e1':4, 'e2':4}]},
  ],

  list() {
    return Promise.resolve(this.data)
  },

  add(name='',detail=[]){
    console.log('[RoutineModel.add]',name,detail)
    name = name.trim()
    if (!name) return
    if (this.data.some(item => item.name ===name)){
      return console.error("해당 이름의 Routine이 이미 존재합니다");
    }
    this.data.push({name,detail})
  },

  clip(keyword,clipData){
    this.data[keyword].detail.push(clipData)
  },

  update(keyword,index,updateData){
    this.data[keyword].detail[index] = updateData
  }
}