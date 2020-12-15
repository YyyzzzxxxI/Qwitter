import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import Quote from "../../Quote/Quote";
import styles from "./profile.module.css"

import {Typography} from "@material-ui/core";

import userProfile from "../../Store/Profile";
import quotes_style from "../../Quote/quotes.module.css";

const LikedQuotes = observer(() => {
    if(userProfile.likedQuotes){
        return (
            <div className={quotes_style.quotes}>
                {userProfile.likedQuotes.map((data, index) => (
                    <div className={quotes_style.quote} key={index}>
                        <Quote
                            quote={data.quote}
                            author={data.author}
                            image={data.image}
                            username={data.username}
                            liked={true}
                            likesCount={data.likesCount}
                            id={data.id}
                        />
                    </div>
                ))}
            </div>
        )
    }
    else return (<></>)
})

function Profile(){
    useEffect(() => {
        if(userProfile.username){
            userProfile.getLikedQuotes()
        }
    },)

    return (
        <div className={styles.container}>
            <Typography variant={"h4"}>Welcome, {userProfile.username}!</Typography>
            <div className={styles.content}>
                <LikedQuotes/>
            </div>
        </div>

    )
}

export default observer(Profile)