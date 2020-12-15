import React, {useEffect, useState} from "react";
import Quote from "../../Quote/Quote";
import styles from "./qwitt.module.css"

import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import userProfile from "../../Store/Profile";
import {observer} from "mobx-react-lite";
import Alert from "@material-ui/lab/Alert";

let quote, author

function createAlert(status, text){
    if(status === "") return (<></>)
    return (<Alert severity={status}>{text}</Alert>)
}

const QuotePreview = observer(() => {
    return (
        <Quote
            quote={userProfile.quotePreview.quote}
            author={userProfile.quotePreview.author}
            previewImage={userProfile.quotePreview.previewImage}
            username={userProfile.quotePreview.username}
            liked={true}
            likesCount={userProfile.quotePreview.likesCount}
        />
    )
})

function resetForm(){
    userProfile.resetQuotePreview()
    quote = ""
    author = ""
}

function Qwitt(){
    function updatePreview(){
        userProfile.setQuotePreview({
            quote: quote,
            author: author,
            username: userProfile.username,
            previewImage: preview
        })
    }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [alert, setAlert] = useState(createAlert("", ""))

    useEffect(()=>{
        resetForm()
    }, [])

    useEffect(() => {
        if(!selectedFile){
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        updatePreview()

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if(!e.target.files || e.target.files.length === 0){
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    function handlerQuote(e){
        quote = e.target.value
        updatePreview()
    }

    function handlerAuthor(e){
        author = e.target.value
        updatePreview()
    }

    function handlerOnClick(){
        let data = new FormData()
        data.append('image', selectedFile)
        data.append('quote', quote)
        data.append('author', author)
        data.append('username', userProfile.username)

        const requestOptions = {
            method: 'POST',
            body: data
        }

        fetch('/api/createQwitt', requestOptions)
            .then(res => res.json())
            .then(data => {
                if(!data.message) setAlert(createAlert("error", data.error))
                else{
                    setAlert(createAlert("success", data.message))
                    resetForm()
                }
            })
    }

    return (
        <div className={styles.container}>
            <Typography variant={"h4"}>Create new qwitt!</Typography>

            <div className={styles.content}>
                <div className={styles.post}>

                    <Typography variant="overline">
                        Фото для цитаты (опционально)
                    </Typography>
                    <input type='file' name={"file"} accept={"image/*"} onChange={onSelectFile}/>

                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={4}
                        label="Введите цитату"
                        onInput={handlerQuote}
                    />
                    <TextField
                        label="Автор"
                        id="standard-basic"
                        onInput={handlerAuthor}
                    />
                </div>

                <div className={styles.container}>
                    <Button onClick={handlerOnClick}>
                        Опубликовать
                    </Button>
                    {alert}
                </div>

                <div className={styles.preview}>
                    <QuotePreview/>
                </div>

            </div>
        </div>
    )
}

export default observer(Qwitt)