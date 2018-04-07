const EventListener = function (obj) {
    let Register = {};

    obj.on = function (type , method) {
      if(Register.hasOwnProperty(type)){
          Register[type].push(method);
      }else {
          Register[type]=[method];
      }
    };

    obj.fire= function (type) {
      if (Register.hasOwnProperty(type)){
          let handerList = Register[type];
          for (let i = 0 ;i<handerList.size;i++){
              let hander = handerList[i];
              let args = [];
              for ( let j =1;j<arguments.length;j++){
                  args.push(arguments[j]);
              }
              hander.apply(this, args);
          }
      }
    };

    return obj;
};

export default EventListener;