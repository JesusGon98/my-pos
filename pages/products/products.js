import { categories, products } from "./test-data.js";

export function init(){
    console.log("Inicializando products.js");
    //configuramos el formulario
    let addProductButton = document.getElementById('addProductBtn');
    if(addProductButton) addProductButton.addEventListener('click', () =>displayModal(true));

    let closeModalBtn = document.getElementById('closeProductModalBtn');
    if(closeModalBtn) closeModalBtn.addEventListener('click', () =>displayModal(false));

    let productModal = document.getElementById('cancelProductModalBtn');
    if(productModal) productModal.addEventListener('click', () =>displayModal(false));

    let productForm = document.getElementById('productForm');
    if(productForm) productForm.addEventListener('submit', (event) => submitForm(event));

    setForm();
    
}

function displayModal(isOpen){
    let productModal = document.getElementById('productModal');
    if(!isOpen)return;

    window.scrollTo(0,0);

    if(isOpen) productModal.showModal();
    else productModal.close();
}

function setForm(){
    let categoriesSelect = document.getElementById('categorySlc');
    if(categoriesSelect){
        categories.forEach(category =>{
            let categoryOption = document.createElement('option');
            categoryOption.value = category.id;
            categoryOption.text = category.name;

            //insertamos esta opcion en el selector
            categoriesSelect.appendChild(categoryOption);
        });
    }

    let productImage = document.getElementById('productImage');
    if(productImage){
        productImage.style.height = '400px';
        productImage.style.objectFit = 'cover';
        productImage.style.borderRadius = '8px';
        productImage.style.background = '#e0e0e0';
    }

    let imageInput = document.getElementById('imageUrlText');
    if(imageInput){
        imageInput.addEventListener('input', (event) =>{
            let inputValue = imageInput.value;
            if( inputValue && imageInput.value.length > 0 && productImage){
                productImage.src = inputValue;
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

    //asignar un id al producto
    const idProduct = products.length + 1;

    //generar el diccionario de datos de el nuevo producto
    const form = {
        id: idProduct,
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
    ///Agregamos el producto al arreglo
    products.push(form);


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
    document.getElementById('productImage').src = '';   

}
