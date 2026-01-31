

export function init(){
    console.log("Inicializando customers.js");
    //configuramos el formulario
    let addcustomerButton = document.getElementById('addcustomerBtn');
    if(addcustomerButton) addcustomerButton.addEventListener('click', () =>displayModal(true));

    let closeModalBtn = document.getElementById('closecustomerModalBtn');
    if(closeModalBtn) closeModalBtn.addEventListener('click', () =>displayModal(false));

    let customerModal = document.getElementById('cancelcustomerModalBtn');
    if(customerModal) customerModal.addEventListener('click', () =>displayModal(false));

    let customerForm = document.getElementById('customerForm');
    if(customerForm) customerForm.addEventListener('submit', (event) => submitForm(event));

    setForm();
    
}

function displayModal(isOpen){
    let customerModal = document.getElementById('customerModal');
    if(!isOpen)return;

    window.scrollTo(0,0);

    if(isOpen) customerModal.showModal();
    else customerModal.close();
}

function setForm(){

    let customerImage = document.getElementById('customerImage');
    if(customerImage){
        customerImage.style.height = '400px';
        customerImage.style.objectFit = 'cover';
        customerImage.style.borderRadius = '8px';
        customerImage.style.background = '#e0e0e0';
    }

    let imageInput = document.getElementById('imageUrlText');
    if(imageInput){
        imageInput.addEventListener('input', (event) =>{
            let inputValue = imageInput.value;
            if( inputValue && imageInput.value.length > 0 && customerImage){
                customerImage.src = inputValue;
            }
        }); 
    }
}

function submitForm(event){
    event.preventDefault();
    //campos del formulario
    let nameField = document.getElementById('nameText');
    let descriptionField = document.getElementById('descriptionTxt');
    let categoriesField = document.getElementById('categorySlc');
    let barcodeField = document.getElementById('barcodeTxt');
    let priceField = document.getElementById('priceNum');
    let stockField = document.getElementById('stockNum');
    let minStockField = document.getElementById('minStockNum');
    let maxStockField = document.getElementById('maxStockNum');
    let imageUrlField = document.getElementById('imageUrlTxt');

    //obtenemos los valores
    const nameValue = nameField?.value || '';
    const descriptionValue = descriptionField?.value || '';
    const categoryValue = categoriesField?.value || '';
    const barcodeValue = barcodeField?.value || '';
    const priceValue = priceField?.value || '';
    const stockValue = stockField?.value || '';
    const minStockValue = minStockField?.value || '';
    const maxStockValue = maxStockField?.value || '';
    const imageUrlValue = imageUrlField?.value || '';

    //obtener la categoria seleccionada
    const categoryObjet = categories.find(e => e.id == categoryValue);

    //asignar un id al customero
    const idcustomer = customers.length + 1;

    //generar el diccionario de datos de el nuevo customero
    const form = {
        id: idcustomer,
        barcode: barcodeValue,
        name: nameValue,
        description: descriptionValue,
        category: categoryObjet,
        price: priceValue,
        img: imageUrlValue,
        minStock: minStockValue,
        maxStock: maxStockValue,
        currentStock: stockValue
    };
    ///Agregamos el customero al arreglo
    customers.push(form);


    /////reestablecemos el contenido de la lista
    //displayList();

    //cerramos el modal
    displayModal(false);
    //limpiamis el formulario
    nameField.value = '';
    descriptionField.value = '';
    categoriesField.value = '';
    barcodeField.value = '';
    priceField.value = '';
    stockField.value = '';
    minStockField.value = '';
    maxStockField.value = '';
    imageUrlField.value = '';
    document.getElementById('customerImage').src = '';   

}
