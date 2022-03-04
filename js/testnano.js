const { nanoid } = require('nanoid');
const key_length = 10;
//console.log(nanoid(key_length)); //=> "O7cDEFg7r3PfHZBlMmW-M"

async function createFeedKeys () {

        var public_key = await (nanoid(key_length));
        console.log("public_key:",public_key);
        var private_key = await (nanoid(key_length));
        console.log("private_key:",private_key);

        //var keys = 
        return [public_key,private_key];
        //{"pubkey":public_key,"privkey":private_key};
}

createFeedKeys();

var feedKeys = createFeedKeys();
console.log(feedKeys);


