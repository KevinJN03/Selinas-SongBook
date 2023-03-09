const { faker } = require('@faker-js/faker');
const fetch = require("node-fetch");
const axios = require("axios")

let usernamePassword = []


function generateUsers(users){
    let usernamePassword = []
    for (let i = 0; i < users; i++){
        const name = faker.name.fullName(); 
        const username = faker.internet.email();
        const password = faker.internet.password();
        const isStaff = i % 2 === 0 ? true : false;
        const isSelena = false


        usernamePassword.push({name, username, password, isStaff, isSelena})
        }
    return usernamePassword
    }

module.exports = generateUsers