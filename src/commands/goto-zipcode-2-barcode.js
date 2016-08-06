/**
 * Created by zhagnian on 16-8-6.
 */
module.exports=function (zipcode){
    if(zipcode.length>4) {
        return {
            err: 'please input right zipcode'
        }

    }else{
        return {
            text:'good job!'
        }
    }

};
