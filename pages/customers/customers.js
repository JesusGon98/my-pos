import { customers } from "./test-data.js";

export function init(){
    console.log("Inicializando customers.js");
    //configuramos el formulario
    let addCustomerButton = document.getElementById('addcustomerBtn');
    if(addCustomerButton) addCustomerButton.addEventListener('click', () => displayModal(true));

    let closeModalBtn = document.getElementById('closeModalBtn');
    if(closeModalBtn) closeModalBtn.addEventListener('click', () => displayModal(false));

    let cancelModalBtn = document.getElementById('cancelModalBtn');
    if(cancelModalBtn) cancelModalBtn.addEventListener('click', () => displayModal(false));

    let customerForm = document.getElementById('customerForm');
    if(customerForm) customerForm.addEventListener('submit', (event) => submitForm(event));

    setForm();
}

function displayModal(isOpen){
    let customerModal = document.getElementById('customerModal');
    if(!customerModal) return;

    window.scrollTo(0, 0);

    if(isOpen) {
        customerModal.showModal();
    } else {
        customerModal.close();
    }
}

function setForm(){
    let customerImage = document.getElementById('customerImage');
    if(customerImage){
        customerImage.style.height = '400px';
        customerImage.style.objectFit = 'cover';
        customerImage.style.borderRadius = '8px';
        customerImage.style.background = '#e0e0e0';
        customerImage.style.width = '100%';
        customerImage.style.display = 'none';
    }

    // Manejar URL de imagen
    let imageUrlInput = document.getElementById('fotografiaUrlTxt');
    if(imageUrlInput){
        imageUrlInput.addEventListener('input', (event) => {
            let inputValue = imageUrlInput.value.trim();
            if(inputValue && inputValue.length > 0 && customerImage){
                customerImage.src = inputValue;
                customerImage.style.display = 'block';
            } else if(customerImage) {
                customerImage.style.display = 'none';
            }
        }); 
    }

    // Manejar archivo de imagen
    let imageFileInput = document.getElementById('fotografiaFile');
    if(imageFileInput){
        imageFileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if(file && customerImage){
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
    if(telefonoInput){
        telefonoInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        });
    }
}

function validateForm(){
    // Obtener todos los campos
    const nombre = document.getElementById('nombreTxt')?.value.trim() || '';
    const edad = document.getElementById('edadNum')?.value || '';
    const correo = document.getElementById('correoTxt')?.value.trim() || '';
    const telefono = document.getElementById('telefonoTxt')?.value.trim() || '';
    const direccion = document.getElementById('direccionTxt')?.value.trim() || '';
    const fotografiaUrl = document.getElementById('fotografiaUrlTxt')?.value.trim() || '';
    const fotografiaFile = document.getElementById('fotografiaFile')?.files[0];

    // Validar que todos los campos estén llenos
    if(!nombre){
        alert('El campo Nombre es obligatorio');
        return false;
    }

    if(!edad){
        alert('El campo Edad es obligatorio');
        return false;
    }

    // Validar edad mayor a 18 y no negativa
    const edadNum = parseInt(edad);
    if(isNaN(edadNum) || edadNum < 18){
        alert('La edad debe ser mayor a 18 años y no puede ser negativa');
        return false;
    }

    if(!correo){
        alert('El campo Correo Electrónico es obligatorio');
        return false;
    }

    // Validar formato de correo
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(correo)){
        alert('Por favor ingrese un correo electrónico válido (ejemplo: usuario@dominio.com)');
        return false;
    }

    if(!telefono){
        alert('El campo Número Telefónico es obligatorio');
        return false;
    }

    // Validar que el teléfono tenga exactamente 10 números
    const phonePattern = /^[0-9]{10}$/;
    if(!phonePattern.test(telefono)){
        alert('El número telefónico debe contener exactamente 10 números');
        return false;
    }

    if(!direccion){
        alert('El campo Dirección es obligatorio');
        return false;
    }

    // Validar que haya al menos una fotografía (URL o archivo)
    if(!fotografiaUrl && !fotografiaFile){
        alert('Debe proporcionar una fotografía (URL o archivo)');
        return false;
    }

    return true;
}

function submitForm(event){
    event.preventDefault();
    
    // Validar formulario
    if(!validateForm()){
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
    if(fotografiaUrlValue){
        fotografiaValue = fotografiaUrlValue;
    } else if(fotografiaFileValue){
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
    if(customerImage){
        customerImage.src = '';
        customerImage.style.display = 'none';
    }
}
