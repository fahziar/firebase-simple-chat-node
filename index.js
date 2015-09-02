/**
 * Created by fahziar on 02/09/2015.
 */
var readline = require('readline');
var firebase = require('firebase');

var username = "";

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var cobaChat = new firebase('https://coba-js.firebaseio.com/messages');


rl.question("Enter your name\n", function (answer) {
    username = answer;
    console.log("Hello, " + answer);
    startChat();
});

function startChat(){
    cobaChat.limitToLast(5).on("child_added", function(snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log(newPost.username + ': ' + newPost.message);
    });

    console.log("You can start chat now");
    rl.on('line', function (line) {
        cobaChat.push({
            username: username,
            message: line
        });
    });
}