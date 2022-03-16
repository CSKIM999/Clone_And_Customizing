export default {
  data: [
    {name:'R1' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
    {name:'R2' , detail:[{'e1':4, 'e2':4}]},
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
    if (!detail) return
    
  }
}