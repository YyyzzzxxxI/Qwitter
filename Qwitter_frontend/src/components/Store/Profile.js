import {makeAutoObservable} from "mobx";

class Profile{
    username = ""
    likedQuotes = []

    quotePreview = {
        quote: "Ваша цитата отобразится здесь",
        author: "Автор",
        previewImage: " ",
        liked: true,
        username: this.username
    }

    constructor() {
        makeAutoObservable(this)
    }

    reset(){
        this.username = ""
        this.likedQuotes = []
        this.resetQuotePreview()
    }

    getUser(){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                credentials: 'include'
            }
        }
        fetch('/api/user', requestOptions)
            .then(res => res.json())
            .then(data => {
                this.username = data.username
                return data.username
            })
    }

    getLikedQuotes(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({username: this.username})
        }

        fetch('/api/getLikedQwitts', requestOptions)
            .then(res => res.json())
            .then(data => {
                this.likedQuotes = data
            })
    }

    setQuotePreview(data){
        this.quotePreview = {
            quote: data.quote,
            author: data.author,
            username: data.username,
            previewImage: data.previewImage
        }
    }

    resetQuotePreview(){
        this.quotePreview = {
            quote: "Ваша цитата отобразится здесь",
            author: "Автор",
            previewImage: " ",
            liked: true,
            username: this.username
        }
    }

}

export default new Profile()