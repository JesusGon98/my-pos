import { customers } from "./test-data.js";

export function init() {
    console.log("Inicializando customers.js");
    //configuramos el formulario
    let addCustomerButton = document.getElementById('addcustomerBtn');
    if (addCustomerButton) addCustomerButton.addEventListener('click', () => displayModal(true));

    let closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => displayModal(false));

    let cancelModalBtn = document.getElementById('cancelModalBtn');
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => displayModal(false));

    let customerForm = document.getElementById('customerForm');
    if (customerForm) customerForm.addEventListener('submit', (event) => submitForm(event));

    setForm();
    displayListCostumers()
}

function displayModal(isOpen) {
    let customerModal = document.getElementById('customerModal');
    if (!customerModal) return;

    window.scrollTo(0, 0);

    if (isOpen) {
        customerModal.showModal();
    } else {
        customerModal.close();
    }
}

function setForm() {
    let customerImage = document.getElementById('customerImage');
    if (customerImage) {
        customerImage.style.height = '400px';
        customerImage.style.objectFit = 'cover';
        customerImage.style.borderRadius = '8px';
        customerImage.style.background = '#e0e0e0';
        customerImage.style.width = '100%';
        customerImage.style.display = 'none';
    }

    // Manejar URL de imagen
    let imageUrlInput = document.getElementById('fotografiaUrlTxt');
    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', (event) => {
            let inputValue = imageUrlInput.value.trim();
            if (inputValue && inputValue.length > 0 && customerImage) {
                customerImage.src = inputValue;
                customerImage.style.display = 'block';
            } else if (customerImage) {
                customerImage.style.display = 'none';
            }
        });
    }

    // Manejar archivo de imagen
    let imageFileInput = document.getElementById('fotografiaFile');
    if (imageFileInput) {
        imageFileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file && customerImage) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    customerImage.src = e.target.result;
                    customerImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Validar teléfono solo números
    let telefonoInput = document.getElementById('telefonoTxt');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        });
    }
}

function validateForm() {
    // Obtener todos los campos
    const nombre = document.getElementById('nombreTxt')?.value.trim() || '';
    const edad = document.getElementById('edadNum')?.value || '';
    const correo = document.getElementById('correoTxt')?.value.trim() || '';
    const telefono = document.getElementById('telefonoTxt')?.value.trim() || '';
    const direccion = document.getElementById('direccionTxt')?.value.trim() || '';
    const fotografiaUrl = document.getElementById('fotografiaUrlTxt')?.value.trim() || '';
    const fotografiaFile = document.getElementById('fotografiaFile')?.files[0];

    // Validar que todos los campos estén llenos
    if (!nombre) {
        alert('El campo Nombre es obligatorio');
        return false;
    }

    if (!edad) {
        alert('El campo Edad es obligatorio');
        return false;
    }

    // Validar edad mayor a 18 y no negativa
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum < 18) {
        alert('La edad debe ser mayor a 18 años y no puede ser negativa');
        return false;
    }

    if (!correo) {
        alert('El campo Correo Electrónico es obligatorio');
        return false;
    }

    // Validar formato de correo
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(correo)) {
        alert('Por favor ingrese un correo electrónico válido (ejemplo: usuario@dominio.com)');
        return false;
    }

    if (!telefono) {
        alert('El campo Número Telefónico es obligatorio');
        return false;
    }

    // Validar que el teléfono tenga exactamente 10 números
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(telefono)) {
        alert('El número telefónico debe contener exactamente 10 números');
        return false;
    }

    if (!direccion) {
        alert('El campo Dirección es obligatorio');
        return false;
    }

    // Validar que haya al menos una fotografía (URL o archivo)
    if (!fotografiaUrl && !fotografiaFile) {
        alert('Debe proporcionar una fotografía (URL o archivo)');
        return false;
    }

    return true;
}

function submitForm(event) {
    event.preventDefault();

    // Validar formulario
    if (!validateForm()) {
        return;
    }

    // Obtener campos del formulario
    let nombreField = document.getElementById('nombreTxt');
    let edadField = document.getElementById('edadNum');
    let correoField = document.getElementById('correoTxt');
    let telefonoField = document.getElementById('telefonoTxt');
    let direccionField = document.getElementById('direccionTxt');
    let fotografiaUrlField = document.getElementById('fotografiaUrlTxt');
    let fotografiaFileField = document.getElementById('fotografiaFile');
    let customerImage = document.getElementById('customerImage');

    // Obtener valores
    const nombreValue = nombreField?.value.trim() || '';
    const edadValue = parseInt(edadField?.value || '0');
    const correoValue = correoField?.value.trim() || '';
    const telefonoValue = telefonoField?.value.trim() || '';
    const direccionValue = direccionField?.value.trim() || '';
    const fotografiaUrlValue = fotografiaUrlField?.value.trim() || '';
    const fotografiaFileValue = fotografiaFileField?.files[0];

    // Determinar la fotografía (prioridad: URL si existe, sino el archivo)
    let fotografiaValue = '';
    if (fotografiaUrlValue) {
        fotografiaValue = fotografiaUrlValue;
    } else if (fotografiaFileValue) {
        // Si es un archivo, usar el src de la imagen (base64)
        fotografiaValue = customerImage?.src || '';
    }

    // Asignar un id al cliente
    const idCustomer = customers.length + 1;

    // Generar el objeto de datos del nuevo cliente
    const newCustomer = {
        id: idCustomer,
        nombre: nombreValue,
        edad: edadValue,
        correo: correoValue,
        telefono: telefonoValue,
        direccion: direccionValue,
        fotografia: fotografiaValue
    };

    // Agregar el cliente al arreglo
    customers.push(newCustomer);

    // Mostrar en consola
    console.log('Cliente agregado:', newCustomer);
    console.log('Lista completa de clientes:', customers);

    displayListCostumers(false);
    // Cerrar el modal
    displayModal(false);



    // Limpiar el formulario
    nombreField.value = '';
    edadField.value = '';
    correoField.value = '';
    telefonoField.value = '';
    direccionField.value = '';
    fotografiaUrlField.value = '';
    fotografiaFileField.value = '';
    if (customerImage) {
        customerImage.src = '';
        customerImage.style.display = 'none';
    }
}


function displayListCostumers() {
    let customersList = document.getElementById('customersList');
    if (!customersList) return;

    //limpiamos el contenido de la lista
    customersList.innerHTML = '';

    // Generams los cards en base a la lista de customeros
    customers.forEach(customer => {
        //elemento padre
        let cardDiv = document.createElement('div');
        cardDiv.className = 'product-card';

        //Contenido de imagen-------------------------------------------------------------------------------------------------
        let customerImageContainerDiv = document.createElement('div');
        customerImageContainerDiv.className = 'product-card-img';

        let customerImg = document.createElement('img');
        customerImg.src = customer.fotografia;


        //insertamos la imagen en el contenedor div de la imagen
        customerImageContainerDiv.appendChild(customerImg);

        
        //Generar el cuerpo de la card-------------------------------------------------------------------------------------------
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'product-card-body';

        //Nombre del customer
        let customerNameH3 = document.createElement('h3');
        customerNameH3.className = 'product-card-title';
        customerNameH3.innerText = customer.nombre;
        //Fin nombre del customero
/*
        // seccion de Plantilla-------------------------------------------------------------------------------------
                        let plantillaContainerDiv = document.createElement('div');
                        plantillaContainerDiv.className = 'product-card-details';
                        //icono de Plantilla
                        let plantillaIconI = document.createElement('i');
                        plantillaIconI.className = 'fas fa-id-card';
                        let plantillaiconSpan = document.createElement('span');
                        plantillaiconSpan.innerText = `Correo: ${customer.correo}`;
                        //insertamos el icono y el codigo de barras en el contenedor
                        plantillaContainerDiv.appendChild(plantillaIconI);
                        plantillaContainerDiv.appendChild(plantillaiconSpan);
        //Fin de seccion Plantilla
*/
        //Edad del cliente-------------------------------------------------------------------------------------
                        let edadContainerDiv = document.createElement('div');
                        edadContainerDiv.className = 'product-card-details';
                        //icono de edad
                        let edadIconI = document.createElement('i');
                        edadIconI.className = 'fas fa-id-card';

                        let edadiconSpan = document.createElement('span');
                        edadiconSpan.innerText = `Edad: ${customer.edad}`;
                        //insertamos el icono y el codigo de barras en el contenedor
                        edadContainerDiv.appendChild(edadIconI);
                        edadContainerDiv.appendChild(edadiconSpan);
        //Fin de seccion de edad

        // seccion de correo-------------------------------------------------------------------------------------
                        let correoContainerDiv = document.createElement('div');
                        correoContainerDiv.className = 'product-card-details';
                        //icono de correo
                        let correoIconI = document.createElement('i');
                        correoIconI.className = 'fas fa-mail-bulk';
                        let correoiconSpan = document.createElement('span');
                        correoiconSpan.innerText = `Correo: ${customer.correo}`;
                        //insertamos el icono y el codigo de barras en el contenedor
                        correoContainerDiv.appendChild(correoIconI);
                        correoContainerDiv.appendChild(correoiconSpan);
        //Fin de seccion correo

        // seccion de telefono-------------------------------------------------------------------------------------
                        let telefonoContainerDiv = document.createElement('div');
                        telefonoContainerDiv.className = 'product-card-details';
                        //icono de telefono
                        let telefonoIconI = document.createElement('i');
                        telefonoIconI.className = 'fas fa-phone-alt';
                        let telefonoiconSpan = document.createElement('span');
                        telefonoiconSpan.innerText = `Telefono: ${customer.telefono}`;
                        //insertamos el icono y el codigo de barras en el contenedor
                        telefonoContainerDiv.appendChild(telefonoIconI);
                        telefonoContainerDiv.appendChild(telefonoiconSpan);
        //Fin de seccion telefono

        // seccion de Direccion-------------------------------------------------------------------------------------
                        let DireccionContainerDiv = document.createElement('div');
                        DireccionContainerDiv.className = 'product-card-details';
                        //icono de Direccion
                        let DireccionIconI = document.createElement('i');
                        DireccionIconI.className = 'fas fa-map-marked-alt';
                        let DireccioniconSpan = document.createElement('span');
                        DireccioniconSpan.innerText = `Direccion: ${customer.direccion}`;
                        //insertamos el icono y el codigo de barras en el contenedor
                        DireccionContainerDiv.appendChild(DireccionIconI);
                        DireccionContainerDiv.appendChild(DireccioniconSpan);
        //Fin de seccion Direccion


        

        // Fin del cuerpo de la Card-------------------------------------------------------------------------------------------
        //Seccion de Botones------------------------------------------------------------------------------------------------
        //seccion de botones 
        let customerButtonsDiv = document.createElement('div');
        customerButtonsDiv.className = 'product-card-footer';
        //boton editar
        let editButton = document.createElement('button');
        editButton.className = 'product-primary-button';

        let editButtonIconI = document.createElement('i');
        editButtonIconI.className = 'fas fa-edit';
        editButton.appendChild(editButtonIconI);
        editButton.innerHTML += ' Editar';
        //boton eliminar
        let deleteButton = document.createElement('button');
        deleteButton.className = 'product-danger-button';

        let deleteButtonIconI = document.createElement('i');
        deleteButtonIconI.className = 'fas fa-trash';
        deleteButton.appendChild(deleteButtonIconI);
        deleteButton.innerHTML += ' Eliminar';

        //insertar los botones en el contenedor de botones
        customerButtonsDiv.appendChild(editButton);
        customerButtonsDiv.appendChild(deleteButton);

        //Fin Seccion de Botones------------------------------------------------------------------------------------------------

        //insertamos todos los elementos en la card body
        cardBodyDiv.appendChild(customerNameH3);
        cardBodyDiv.appendChild(edadContainerDiv);
        cardBodyDiv.appendChild(correoContainerDiv);
        cardBodyDiv.appendChild(telefonoContainerDiv);
        cardBodyDiv.appendChild(DireccionContainerDiv);
        
        

        //insertamos la imagen y el cuerpo en la card
        cardDiv.appendChild(customerImageContainerDiv);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(customerButtonsDiv);



        //Insertamos en el DOM
        customersList.appendChild(cardDiv);

    });
}
