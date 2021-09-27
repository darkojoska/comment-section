import { useState } from 'react';
import { Comment } from 'semantic-ui-react';
import { UserContext } from '../context/contexts';
import { initialComments } from '../fake-data/initialComments';
import { useRandomUser } from '../hooks/useRandomUser';
import CommentInput from './CommentInput';
import SingleComment from './SingleComment';

interface IComment {
    id: number,
    author: string,
    img: string,
    text: string,
    date: string,
    rating: number
}

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const user = useRandomUser();

    const handleCommentAdd = (commentText: string) => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getUTCFullYear();

        const newComment: IComment = {
            id: comments.length,
            author: user?.name || '',
            img: user?.img || '',
            text: commentText,
            date: `${day}-${month}-${year}, ${hours}:${minutes}`,
            rating: 0
        };
        setComments([newComment, ...comments]);
    };

    return (
        <UserContext.Provider value={user}>
            <Comment.Group threaded style={{ marginBottom: 100 }}>
                <CommentInput submitCallback={handleCommentAdd} />

                {comments.length > 0 ?
                    comments.map(comment => (
                        <SingleComment
                            author={comment.author}
                            img={comment.img}
                            text={comment.text}
                            date={comment.date}
                            rating={comment.rating}
                            key={comment.id}
                        />
                    ))
                    :
                    <div>No comments yet.</div>
                }
            </Comment.Group>
        </UserContext.Provider>
    )
}

export default CommentSection;
