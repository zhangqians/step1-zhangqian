/**
 * Created by zhagnian on 16-8-5.
 */
let firstMapping=require('./commands/main-page.js');
let mapping=firstMapping;
function route(input){
    let respond= mapping(input);
    return respond;
}
module.exports=route;