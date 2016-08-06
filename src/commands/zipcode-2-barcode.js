/**
 * Created by zhagnian on 16-8-6.
 */
//let gotozipcode2barcode=require('./goto-zipcode-2-barcode');
module.exports=function (){
  return {
      text:'please input zipcode:',
      newItem:{'#':require('./goto-zipcode-2-barcode')}
  }
};
