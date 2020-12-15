import React, {useEffect} from 'react'
import Quote from "../../Quote/Quote"

import styles from "./main.module.css"
import quotes_style from "../../Quote/quotes.module.css"
import {observer} from "mobx-react-lite";
import qMain from "../../Store/Main"

const Quotes = observer(() => {
    return (
        <div className={quotes_style.quotes}>
            {qMain.quotes.map((data, index) => (
                <div className={quotes_style.quote} key={index}>
                    <Quote
                        quote={data.quote}
                        author={data.author}
                        image={data.image}
                        username={data.username}
                        likesCount={data.likesCount}
                        id={data.id}
                    />
                </div>
            ))}
        </div>
    )
})

export default function Main(){
    useEffect(()=>{
        qMain.getAdminQuotes()
    },[])

    return (
        <div className={styles.container}>
            Топ цитат за всё время
            <Quotes/>
        </div>
    )

}
