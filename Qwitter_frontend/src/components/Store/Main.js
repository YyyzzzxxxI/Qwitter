import {makeAutoObservable} from "mobx";

class Profile{
    quotes = []

    constructor() {
        makeAutoObservable(this)
    }

    reset(){
        this.quotes = []
    }

    getAdminQuotes(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({username: "admin"})
        }

        fetch('/api/getUserQwitts', requestOptions)
            .then(res => res.json())
            .then(data => {
                this.quotes = data
            })
    }
}

export default new Profile()