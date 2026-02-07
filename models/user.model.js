import {Address} from './address.model.js';

export class User{

    constructor(params){
        this.id = params?.id || '';
        this.name = params?.name || '';
        this.username = params?.username || '';
        this.email = params?.email || '';
        this.address = new Address(params?.address);
        this.phone = params?.phone || '';
        this.company = params?.company || '';
    }

    getFormattedPhone(){
        const phoneParts = this.phone.split(' x');
        const formattedPhone = phoneParts[0];
        return formattedPhone;
    }

    getRole(){
        const userRole = ['Admin', 'Supplier', 'Supervisor', 'Cashier'];
        const selectedRole = userRole[Math.floor(Math.random() * userRole.length)];
        return selectedRole;
    }
    

}