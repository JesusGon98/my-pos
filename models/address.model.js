export class Address{
    constructor(params){
        this.street = params?.street || '';
        this.suite = params?.suite || '';
        this.city = params?.city || '';
        this.zipcode = params?.zipcode || '';
    }

    getFormattedAddress(){
        return `${this.street}, ${this.suite}, ${this.city} - ${this.zipcode}`;
    }


}