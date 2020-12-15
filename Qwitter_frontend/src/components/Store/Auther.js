import {makeAutoObservable} from "mobx";


class Auther{
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    checkAuth(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                credentials: 'include'
            }
        }
        fetch('/api/isauth', requestOptions)
            .then(res => res.ok ? this.isAuth = true : this.isAuth = false)
    }

    reset(){
        this.isAuth = false
    }
}


export default new Auther()