import React from 'react';
import Quote from "../../Quote/Quote";


export default function Browse(){

    let quote = Quote({
        quote: "Все хотят, чтобы что-нибудь произошло, и все боятся, как бы чего не случилось.",
        author: "Булат Окуджава",
        image: "https://life4health.ru/wp-content/uploads/2018/09/Vidy-minimalizma_002.jpg",
        username: "Admin"
    })

    return (
        <>
            {quote}
        </>
    )
}
