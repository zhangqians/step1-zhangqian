/**
 * Created by zhagnian on 16-8-5.
 */
let firstItem = require('./commands/main-page.js');
let originItem = {
    '#': firstItem
};
let item = originItem;
function route(input) {
    let order = item[input] || item['#'];
    //console.log(order);
    let respond = order(input);
    //console.log(respond);
    if (respond.newItem) {
        item = respond.newItem;
        return {text: respond.text};
    }
    if (respond.err) {
        return {text: respond.err}
    }

    return {text: respond.text};

}
module.exports = route;