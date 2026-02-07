import { environment } from "../enviroment.js";

export class userService {
    baseUrl = `${environment.apiUrl}/users`;

    async getAll() {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                //body: JSON.stringify({username: 'Jesus'}) // No body needed for GET request
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Error fetching users: ${error}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error(`Internal Error: ${error}`);
        }
    }
}