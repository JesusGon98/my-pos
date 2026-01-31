export const categories = [
    {
        id: 1,
        name: 'Soda',
    },
    {
        id: 2,
        name: 'Food'
    },
    {
        id: 3,
        name: 'Candy'
    },
    {
        id: 4,
        name: 'Clothes'
    }
];

export const products = [
    {
        id: 1,
        barcode: 1800565682,
        name: 'Coca-cola 600ml',
        description: 'Bottle of soda',
        category: {
            id: 1,
            name: 'Soda',
        },
        price: 1.15,
        img: 'https://cdnx.jumpseller.com/bepensa-bebidas/image/53604847/thumb/540/540?1726860400',
        minStock: 10,
        maxStock: 120,
        currentStock: 25,
    }
];