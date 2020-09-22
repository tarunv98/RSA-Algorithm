function str2buff(str){
    return Buffer.from(str);
}

// function hex2ascii(hexx) {
//     var hex = hexx.toString();//force conversion
//     var str = '';
//     for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
//         // str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
//         str += parseInt(hex.substr(i, 2), 16);
//     return str;
// }

function hex2ascii(hexx) {
    let hex = hexx.toString();//force conversion
    let str = parseInt(hex.substr(0, 2), 16);
    return str;
}

function hex2str(hexx){
    let hex = hexx.toString();//force conversion
    let str = '';
    str += String.fromCharCode(parseInt(hex.substr(0, 2), 16));
    return str;
}

module.exports = {"hex2str": hex2str, "str2buff": str2buff, "hex2ascii": hex2ascii}