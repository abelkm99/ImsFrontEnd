var axios = require('axios');


const getItems = ()=>{
    var config = {
        method: 'get',
        url: '/api/item/get_items',
        headers: { "Access-Control-Allow-Origin":"*"}
      };
return axios(config);
}
const addItem = (data)=>{
 
console.log(data)
var config = {
  method: 'post',
  url: '/api/item/add_new_item',
  headers: { 
       'Content-Type': 'application/json',
       "Access-Control-Allow-Origin":"*"
      },
  data : data

};

return axios(config)
}
export default{  
  getItems,
  addItem

};

