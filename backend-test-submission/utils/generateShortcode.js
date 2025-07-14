const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateShortcode(length = 6) {
let code ='';
for(let i=0 ;i<length ;i++){
    code += characters[Math.floor(Math.random() * characters.length)];
}
return code;
}

module.exports = generateShortcode;