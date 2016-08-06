/**
 * Created by zhagnian on 16-8-5.
 */
let route=require('./route');
function connectToRoute(line){
    let response=route(line);
    console.log(response.text);
}

connectToRoute();
module.exports=function(){
    connectToRoute();

};