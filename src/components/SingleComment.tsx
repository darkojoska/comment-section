import React, { useContext, useState } from "react";
import { Comment } from "semantic-ui-react";
import { UserContext } from "../context/contexts";
import CommentInput from "./CommentInput";

interface IComment {
    id: number,
    author: string,
    img: string,
    text: string,
    date: string,
    rating: number
}

interface IProps {
    author: string,
    img: string,
    text: string,
    date: string,
    rating: number,
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
        const year = now.getUTCFullYear();

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
                    <Comment.Actions style={{ userSelect: 'none' }}>
                        <a onClick={() => setReplyInputVisible(visible => !visible)}>Reply</a>
                        <span>
                            <a style={{ margin: 0 }} onClick={() => setRatingValue(val => val - 1)}>
                                <i aria-hidden="true" className="angle down icon large" style={{ margin: 0, opacity: .7 }} />
                            </a>
                            <span>{ratingValue}</span>
                            <a onClick={() => setRatingValue(val => val + 1)}>
                                <i aria-hidden="true" className="angle up icon large" style={{ margin: 0, opacity: .7 }} />
                            </a>
                        </span>
                    </Comment.Actions>
                </Comment.Content>

                {repliedComments.length > 0 &&
                    <Comment.Group>
                        {repliedComments?.map(reply => (
                            <SingleComment {...reply} />
                        ))}
                    </Comment.Group>
                }
            </Comment>
            {replyInputVisible && <CommentInput isReply={true} submitCallback={handleReply} />}
        </>
    )
}

export default SingleComment;
