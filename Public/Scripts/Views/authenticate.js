'use strict';

let username;
let userpass;
$('#account-submit').on("click", function(event) {
    username = $('#account-username').val();
    userpass = $('#account-userpass').val();
    $.post('/account', {username: username, userpass: userpass})
    .then(function(data) {
        const login = {
            username : data[0].username,
            id : data[0].id
        }
    localStorage.setItem("login", JSON.stringify(login))
    window.location.href = "/";
    })
    .fail(console.error);
});


$('#newaccount-submit').on("click", function(event) {
    username = $('#newaccount-username').val();
    userpass = $('#newaccount-userpass').val();
    $.post('/new-account', {username: username, userpass: userpass})
    .then(function(data) {
        const login = {
            username : data[0].username,
            id : data[0].id
        }
    localStorage.setItem("login", JSON.stringify(login))
    window.location.href = "/";
    })
    .fail(console.error);
});
