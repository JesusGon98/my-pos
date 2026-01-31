import { categories, products } from "./test-data.js";

export function init() {
    console.log("Inicializando products.js");
    //configuramos el formulario
    let addProductButton = document.getElementById('addProductBtn');
    if (addProductButton) addProductButton.addEventListener('click', () => displayModal(true));

    let closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => displayModal(false));

    let productModal = document.getElementById('cancelModalBtn');
    if (productModal) productModal.addEventListener('click', () => displayModal(false));

    let productForm = document.getElementById('productForm');
    if (productForm) productForm.addEventListener('submit', (event) => submitForm(event));

    setForm();
    displayList();

}

function displayModal(isOpen) {
    let productModal = document.getElementById('productModal');
    if (!productModal) return;

    window.scrollTo(0, 0);

    if (isOpen) productModal.showModal();
    else productModal.close();
}

function setForm() {
    let categoriesSelect = document.getElementById('categorySlc');
    if (categoriesSelect) {
        categories.forEach(category => {
            let categoryOption = document.createElement('option');
            categoryOption.value = category.id;
            categoryOption.text = category.name;

            //insertamos esta opcion en el selector
            categoriesSelect.appendChild(categoryOption);
        });
    }

    let productImage = document.getElementById('productImage');
    if (productImage) {
        productImage.style.height = '400px';
        productImage.style.objectFit = 'cover';
        productImage.style.borderRadius = '8px';
        productImage.style.background = '#e0e0e0';
    }

    let imageInput = document.getElementById('imageUrlText');
    if (imageInput) {
        imageInput.addEventListener('input', (event) => {
            let inputValue = imageInput.value;
            if (inputValue && imageInput.value.length > 0 && productImage) {
                productImage.src = inputValue;
            }
        });
    }
}

function submitForm(event) {
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
    displayList(false);

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
function displayList() {
        let productsList = document.getElementById('productsList');
        if (!productsList) return;

        //limpiamos el contenido de la lista
        productsList.innerHTML = '';

        // Generams los cards en base a la lista de productos
        products.forEach(product => {
            //elemento padre
            let cardDiv = document.createElement('div');
            cardDiv.className = 'product-card';

            //Contenido de imagen-------------------------------------------------------------------------------------------------
            let productImageContainerDiv = document.createElement('div');
            productImageContainerDiv.className = 'product-card-img';

            let productImg = document.createElement('img');
            productImg.src = product.img;

            let productCategoriesDiv = document.createElement('div');
            productCategoriesDiv.className = 'product-card-badges';

            let productCategorySpan = document.createElement('span');
            productCategorySpan.textContent = product.category.name;

            //Insertar la categoria dentro de el div de categorias
            productCategoriesDiv.appendChild(productCategorySpan);

            //insertamos la imagen en el contenedor div de la imagen
            productImageContainerDiv.appendChild(productImg);

            //Insertamos el div de categorias en el contenedor div de la imagen
            productImageContainerDiv.appendChild(productCategoriesDiv);
            //Fin del contenido de la imagen---------------------------------------------------------------------------------------------

            //Generar el cuerpo de la card-------------------------------------------------------------------------------------------
                    let cardBodyDiv = document.createElement('div');
                    cardBodyDiv.className = 'product-card-body';

                    //Nombre del producto
                        let productNameH3 = document.createElement('h3');
                        productNameH3.className = 'product-card-title';
                        productNameH3.innerText = product.name;
                    //Fin nombre del producto
                    //Descripcion del producto
                        let productDescriptionSpan = document.createElement('span');
                        productDescriptionSpan.className = 'product-card-description';
                        productDescriptionSpan.innerText = product.description;
                    //Fin descripcion del producto
                    //Codigo de barras del producto-------------------------------------------------------------------------------------
                        let productBarcodeContainerDiv = document.createElement('div');
                        productBarcodeContainerDiv.className = 'product-card-details';
                        //icono delproducto
                        let productBarcodeIconI = document.createElement('i');
                        productBarcodeIconI.className = 'fas fa-barcode';

                        let productBarcodesSpan = document.createElement('span');
                        productBarcodesSpan.innerText = product.barcode;

                        //insertamos el icono y el codigo de barras en el contenedor
                        productBarcodeContainerDiv.appendChild(productBarcodeIconI);
                        productBarcodeContainerDiv.appendChild(productBarcodesSpan);
                    //Fin del codigo de barras------------------------------------------------------------------------------------------
                    //Min Stock-----------------------------------------------------------------------------------------------
                        let productMinStockContainerDiv = document.createElement('div');
                        productMinStockContainerDiv.className = 'product-card-details';
                        //icono del producto
                        let productMinStockIconI = document.createElement('i');
                        productMinStockIconI.className = 'fas fa-less-than';

                        let productMinStockSpan = document.createElement('span');
                        productMinStockSpan.innerText = `Min: ${product.minStock}`;

                        //insertamos el icono y el min stock en el contenedor
                        productMinStockContainerDiv.appendChild(productMinStockIconI);
                        productMinStockContainerDiv.appendChild(productMinStockSpan);
                    //Fin del min stock------------------------------------------------------------------------------------------
                    //Max Stock-----------------------------------------------------------------------------------------------
                        let productMaxStockContainerDiv = document.createElement('div');
                        productMaxStockContainerDiv.className = 'product-card-details';
                        //icono del producto
                        let productMaxStockIconI = document.createElement('i');
                        productMaxStockIconI.className = 'fas fa-greater-than';

                        let productMaxStockSpan = document.createElement('span');
                        productMaxStockSpan.innerText = `Max: ${product.maxStock}`;
                        //insertamos el icono y el max stock en el contenedor
                        productMaxStockContainerDiv.appendChild(productMaxStockIconI);
                        productMaxStockContainerDiv.appendChild(productMaxStockSpan);
                    //fin max stock
                    //Stock Actual-----------------------------------------------------------------------------------------------
                        let productCurrentStockContainerDiv = document.createElement('div');
                        productCurrentStockContainerDiv.className = 'product-card-details';
                        //icono del producto
                        let productCurrentStockIconI = document.createElement('i');
                        productCurrentStockIconI.className = 'fas fa-box';
                        let productCurrentStockSpan = document.createElement('span');
                        productCurrentStockSpan.innerText = `Actual: ${product.currentStock}`;
                        //insertamos el icono y el stock actual en el contenedor
                        productCurrentStockContainerDiv.appendChild(productCurrentStockIconI);
                        productCurrentStockContainerDiv.appendChild(productCurrentStockSpan);
                    //fin stock actual
                    //Precio del producto-------------------------------------------------------------------------------------
                        let productPriceH2 = document.createElement('h2');
                        productPriceH2.className = 'product-card-price';
                        productPriceH2.innerText = `$${product.price} USD`;
                    //Fin precio del producto-------------------------------------------------------------------------------------

            // Fin del cuerpo de la Card-------------------------------------------------------------------------------------------
            //Seccion de Botones------------------------------------------------------------------------------------------------
                    //seccion de botones 
                    let productButtonsDiv = document.createElement('div');
                    productButtonsDiv.className = 'product-card-footer';
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
                    productButtonsDiv.appendChild(editButton);
                    productButtonsDiv.appendChild(deleteButton);

            //Fin Seccion de Botones------------------------------------------------------------------------------------------------

            //insertamos todos los elementos en la card body
            cardBodyDiv.appendChild(productNameH3);
            cardBodyDiv.appendChild(productDescriptionSpan);
            cardBodyDiv.appendChild(productBarcodeContainerDiv);
            cardBodyDiv.appendChild(productMinStockContainerDiv);
            cardBodyDiv.appendChild(productMaxStockContainerDiv);
            cardBodyDiv.appendChild(productCurrentStockContainerDiv);
            cardBodyDiv.appendChild(productPriceH2);
            //insertamos la imagen y el cuerpo en la card
            cardDiv.appendChild(productImageContainerDiv);
            cardDiv.appendChild(cardBodyDiv);
            cardDiv.appendChild(productButtonsDiv);


            //Insertamos en el DOM
            productsList.appendChild(cardDiv);

        });
}
