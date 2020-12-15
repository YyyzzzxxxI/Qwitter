import React, {useState} from 'react';
import cx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import {useLabelIconStyles} from '@mui-treasury/styles/icon/label';
import {useSoftRiseShadowStyles} from '@mui-treasury/styles/shadow/softRise';
import {useSlopeCardMediaStyles} from '@mui-treasury/styles/cardMedia/slope';
import {useN04TextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/n04';
import TextInfoContent from '@mui-treasury/components/content/textInfo';

import styles from "./quote.module.css"

import userProfile from "../Store/Profile";

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 290,
        maxWidth: 304,
        margin: 'auto',
    },
    content: {
        padding: 24,
    },
}));

function setLiked(username, qwitt_id, bool){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            credentials: 'include'
        },
        body: JSON.stringify({username: userProfile.username, qwitt_id: qwitt_id})
    }
    bool ? fetch('/api/likeQwitt', requestOptions) : fetch('/api/unLikeQwitt', requestOptions)
}

export default function Quote(props){
    const [liked, inverseLiked] = useState(props.liked)

    function handleOnLike(){
        if(liked){
            inverseLiked(false)
            setLiked(props.username, props.id, false)
        }
        else{
            inverseLiked(true)
            setLiked(props.username, props.id, true)
        }
    }

    const cardStyles = useStyles();
    const mediaStyles = useSlopeCardMediaStyles();
    const shadowStyles = useSoftRiseShadowStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const iconLabelStyles = useLabelIconStyles();
    return (
        <Card className={cx(cardStyles.root, shadowStyles.root)}>
            {props.image &&
            <CardMedia
                classes={mediaStyles}
                image={"/images/" + props.image}
                title={props.author}
            />
            }
            {props.previewImage &&
            <CardMedia
                classes={mediaStyles}
                image={props.previewImage}
                title={props.author}
            />
            }

            <CardContent className={cardStyles.content}>
                <div className={styles.center}>
                    <TextInfoContent
                        classes={textCardContentStyles}
                        body={props.quote}
                    />
                    <TextInfoContent
                        classes={textCardContentStyles}
                        body={props.author}
                    />
                </div>

            </CardContent>

            {props.username &&
            <TextInfoContent
                classes={textCardContentStyles}
                overline={"Posted by " + props.username}
            />
            }

            <Box px={2} pb={2} mt={-1}>
                <div className={styles.right}>
                    <button type={'button'} tabIndex={0} className={iconLabelStyles.link} onClick={handleOnLike}>
                        {liked ?
                            <Favorite className={iconLabelStyles.icon}/> :
                            <FavoriteBorder className={iconLabelStyles.icon}/>}
                        {props.likesCount}
                    </button>
                </div>
            </Box>

        </Card>
    );
}
