import { useState } from 'react';
import { Comment } from 'semantic-ui-react';
import { UserContext } from '../context/contexts';
import initialComments from '../fake-data/initialComments';
import { useRandomUser } from '../hooks/useRandomUser';
import CommentInput from './CommentInput';
import SingleComment from './SingleComment';


const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<IComment[]>(initialComments.data);
    const [commentsCount, setCommentsCount] = useState<number>(initialComments.commentsCount);
    const user = useRandomUser();

    const handleCommentAdd = (commentText: string) => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getUTCFullYear();

        const newComment: IComment = {
            id: commentsCount,
            author: user?.name || '',
            img: user?.img || '',
            text: commentText,
            date: `${day}-${month}-${year}, ${hours}:${minutes}`,
            rating: 0
        };
        setComments([newComment, ...comments]);
        setCommentsCount(currValue => currValue + 1);
    };

    return (
        <UserContext.Provider value={user}>
            <Comment.Group threaded style={{ marginBottom: 100 }}>
                <CommentInput submitCallback={handleCommentAdd} />

                {comments.length > 0 ?
                    comments.map(comment =>
                        <SingleComment key={comment.id} {...comment} />
                    )
                    :
                    <div>No comments yet.</div>
                }

            </Comment.Group>
        </UserContext.Provider>
    )
}

export default CommentSection;
