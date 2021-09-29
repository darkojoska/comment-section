import React, { useContext, useState } from "react";
import { Comment } from "semantic-ui-react";
import { UserContext } from "../context/contexts";
import CommentInput from "./CommentInput";


interface IProps extends IComment {
    replies?: IComment[]
}

const SingleComment: React.FC<IProps> = ({ author, img, text, date, rating, replies }: IProps) => {
    const [ratingValue, setRatingValue] = useState(rating);
    const [replyInputVisible, setReplyInputVisible] = useState(false);
    const [repliedComments, setRepliedComments] = useState(replies || []);

    const user = useContext(UserContext);

    const handleReply = (input: string) => {
        setReplyInputVisible(visible => !visible);

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const day = now.getDay();
        const month = now.getMonth();
        const year = now.getFullYear();

        const newReply: IComment = {
            id: repliedComments?.length || 0,
            author: user.name,
            img: user.img,
            text: input,
            date: `${day}-${month}-${year}, ${hours}:${minutes}`,
            rating: 0
        };
        setRepliedComments([...repliedComments, newReply]);
    };

    const handleRate = (rate: number) => {
        if (author === user.name) return alert('You can not rate your own comment =/');

        let value = rate;

        // user clicked downvote or upwote again
        if ((ratingValue > rating && rate > 0) || (ratingValue < rating && rate < 0)) {
            value = rate * (-1);
        }
        // user already voted but clicked on other option (upvote -> downvote || downvote -> upvote)
        else if ((ratingValue > rating && rate < 0) || (ratingValue < rating && rate > 0)) {
            value += rate;
        }
        setRatingValue(currValue => currValue + value);
    };

    return (
        <>
            <Comment>
                <Comment.Avatar as='span' src={img} />
                <Comment.Content>
                    <Comment.Author as='span'>{author}</Comment.Author>
                    <Comment.Metadata>
                        <span>{date}</span>
                    </Comment.Metadata>
                    <Comment.Text>{text}</Comment.Text>
                    <Comment.Actions style={styles.commentActions}>
                        <a onClick={() => setReplyInputVisible(visible => !visible)}>Reply</a>
                        <span>
                            <a style={styles.arrowDown} onClick={() => handleRate(-1)}>
                                <i aria-hidden="true" className={`angle down icon large ${ratingValue < rating && 'black'}`} style={styles.icon} />
                            </a>
                            <span>{ratingValue}</span>
                            <a onClick={() => handleRate(1)}>
                                <i aria-hidden="true" className={`angle up icon large ${ratingValue > rating && 'black'}`} style={styles.icon} />
                            </a>
                        </span>
                    </Comment.Actions>
                </Comment.Content>

                {repliedComments.length > 0 ?
                    <Comment.Group>
                        {repliedComments.map(reply => (
                            <SingleComment key={reply.id + ""} {...reply} />
                        ))}
                    </Comment.Group>
                    : null
                }
            </Comment>

            {replyInputVisible &&
                <CommentInput isReply={true} submitCallback={handleReply} />
            }
        </>
    )
}

const styles = {
    commentActions: {
        userSelect: 'none'
    },
    arrowDown: {
        margin: 0
    },
    icon: {
        margin: 0,
        opacity: .7
    }
}

export default SingleComment;
