import {init as dashboardInit  }from '../pages/dashboard/dashboard.js';
import {init as cashRegisterInit }from '../pages/cash-register/cash-register.js';
import {init as productsInit }from '../pages/products/products.js';
import {init as customersInit }from '../pages/customers/customers.js';
import {init as usersInit }from '../pages/users/users.js';
import {init as configurationsInit }from '../pages/configurations/configurations.js';



export function init (){
    console.log("Inicializando navigations.js");

    displayContent('dashboard');

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) toggleMenu(true);
        else toggleMenu(false);
    });

    let menuButton = document.getElementById('menuBtn');
    if(menuButton) menuButton.addEventListener('click', () => toggleMenu(true));

    let closeMenuButton = document.getElementById('closeMenuBtn');
    if(closeMenuButton) closeMenuButton.addEventListener('click', () => toggleMenu(false));

    setNavigation();
}

function toggleMenu(isOpen){
    let sideBar = document.getElementById('sideBar');
    if(sideBar) sideBar.style.display = isOpen ? 'flex' : 'none';
}

function setNavigation(){
    let dashboardButton = document.getElementById('dashboardBtn');
    if(dashboardButton) dashboardButton.addEventListener('click', () => displayContent('dashboard'));

    let cashRegisterButton = document.getElementById('cashRegisterBtn');
    if(cashRegisterButton) cashRegisterButton.addEventListener('click', () => displayContent('cash-register'));

    let productsButton = document.getElementById('productsBtn');
    if(productsButton) productsButton.addEventListener('click', () => displayContent('products'));

    let customersButton = document.getElementById('customersBtn');
    if(customersButton) customersButton.addEventListener('click', () => displayContent('customers'));

    let usersButton = document.getElementById('usersBtn');
    if(usersButton) usersButton.addEventListener('click', () => displayContent('users'));

    let configurationsButton = document.getElementById('configurationsBtn');
    if(configurationsButton) configurationsButton.addEventListener('click', () => displayContent('configurations'));
}

async function displayContent(page){
    let mainContent = document.getElementById('content');
    if(!mainContent) return;
    //obtener el contenido
    const response = await fetch(`pages/${page}/${page}.html`);
    console.log(response);
    const component = await response.text();
    console.log(component);
    //generamos un html teporal
    
    const temporal = document.createElement('div');
    temporal.innerHTML = component;
    //obtenemos el template
    const template = temporal.querySelector('template');

    //limpiamos el contenido actual
    mainContent.innerHTML = '';
    //insertamos y clonamos el nuevo template
     mainContent.appendChild(template.content.cloneNode(true));
    //inicializamos el respectivo init de cada pagina
    switch(page){
        case 'dashboard':
            dashboardInit();
            break;
        case 'cash-register':
            cashRegisterInit();
            break;
        case 'products':
            productsInit();
            break;
        case 'customers':
            customersInit();
            break;
        case 'users':
            usersInit();
            break;  
        case 'configurations':
            configurationsInit();
            break;  
    }   


}