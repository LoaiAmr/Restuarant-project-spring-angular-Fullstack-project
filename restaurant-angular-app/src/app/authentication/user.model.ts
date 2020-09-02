
export class Authority {
    
    constructor(public authority: string) {}
}

export class User {

    constructor(
        public id: number,
        public username: string,
        public email: string,
        public authorities: Authority[],
        private expirationDate: Date,  
        private token: string
    ) {}
    

    get userToken() {
        
        if(!this.expirationDate || new Date() > this.expirationDate) {
            return null;
        }
        return this.token;
    }


}