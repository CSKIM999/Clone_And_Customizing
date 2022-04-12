export default {
  data : {
  2022:
      { 
      4 : 
          {
          10:
            [
              {
              name:'R1' ,
              detail:
                [
                  {name:'FLANK',routine:[[5,10],[10,10],[15,10],[15,20]]},
                  {name:'e2'   ,routine:[[5,10],[10,10],[15,10],[15,20]]},
                  {name:'e3'   ,routine:[[5,10],[10,10],[15,10],[15,20]]},
                  {name:'e4'   ,routine:[[5,10],[10,10],[15,10],[15,20]]}
                ]
              }
            ],
          1:
            [
              {
              name:'R1' ,
              detail:
                [
                  {name:'FLANK',routine:[[5,10],[10,10],[15,10],[15,20]]},
                  {name:'e2'   ,routine:[[5,10],[10,10],[15,10],[15,20]]},
                  {name:'e3'   ,routine:[[5,10],[10,10],[15,10],[15,20]]},
                  {name:'e4'   ,routine:[[5,10],[10,10],[15,10],[15,20]]}
                ]
              }
            ] 
          }
      },
  },

  list() {
    return Promise.resolve(this.data)
  },

  add() {

  },

  remove(year,month,day,name){
    // todo...
  }
}