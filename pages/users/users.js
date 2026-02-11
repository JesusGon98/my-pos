import {User} from "../../models/user.model.js";
import {userService} from "../../services/user.service.js";
import {Address} from "../../models/address.model.js";

let users = [];

export function init(){
    console.log("Inicializando users.js");
    getUsers();
}

function getUsers(){
    const service = new userService();

    service.getAll()
    .then(data => {
        users = data.map(usersParams => new User(usersParams));

        displayUsers();
    
        console.log(users);
    })
    .catch(error => {
        console.error('Error retrieving users:', error);
        alert('Failed to load users. Please try again later.');
    });

}

async function displayUsers() {
    // obterner el div para desplegar la lista
    let usersList = document.getElementById('userList');

    // limpiamos el contenido
    usersList.innerHTML = '';

    // obtener el html de la card
    const cardResponse = await fetch('components/user-card.html');
    const component = await cardResponse.text();

    // generar cada card en base al arreglo de usuarios
    users.forEach(user => {
        // genera un div temporal
        const temp = document.createElement('div');
        temp.innerHTML = component;

        // encuentra los elementos del componente y reasignalos
        const userId = document.getElementById('user-id');
        if (userId) userId.id += -'${user.id}';
        
        const userName = document.getElementById('user-name');
        if (userName) {
            userName.id += -'${user.id}';
            userName.innerText = user.name;
        }

        const userUsername = document.getElementById('user-username');
        if (userUsername) {
            userUsername.id += -'${user.id}';
            userUsername.innerText = user.username;
        }

        const userPhone = document.getElementById('user-phone');
        if (userPhone) {
            userPhone.id += -'${user.id}';
            userPhone.innerText = user.getFormattedPhone();
        }

        const userAddress = document.getElementById('user-address');
        if (userAddress) {
            userAddress.id += -'${user.id}';
            userAddress.innerText = user.address?.getFormattedAddress();
        }

        const userRole = document.getElementById('user-role');
        if (userRole) {
            userRole.id += -'${user.id}';
            userRole.innerText = user.getRole();
        }

        const userCompany = document.getElementById('user-company');
        if (userCompany) {
            userCompany.id += -'${user.id}';
            userCompany.innerText = user.company;
        }

        // obtener el template
        const template = temp.querySelector('template');

        // inserta el template
        usersList.appendChild(template.content.cloneNode(true));
    });
}


