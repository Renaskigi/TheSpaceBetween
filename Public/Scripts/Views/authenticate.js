'use strict';

let username;
let userpass;
$('#account-form').submit(function(event) {
    alert('account submit button pressed');
    event.preventDefault();
    username = $('#account-username').val();
    userpass = $('#account-userpass').val();
});



