import { useState } from 'react';
import { Comment } from 'semantic-ui-react';
import { UserContext } from '../context/contexts';
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

const initialComments = [
    {
        id: 0,
        author: 'Matt',
        img: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
        text: 'How artistic!',
        date: 'Today at 5:42PM',
        rating: 3
    },
    {
        id: 1,
        author: 'Elliot Fu',
        img: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
        text: 'This has been very useful for my research. Thanks as well!',
        date: 'Yesterday at 12:30AM',
        rating: 1
    },
    {
        id: 2,
        author: 'Jenny Hess',
        img: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
        text: 'Elliot you are always so right :)',
        date: 'Just now',
        rating: 0
    },
    {
        id: 3,
        author: 'Joe Henderson',
        img: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
        text: 'Dude, this is awesome. Thanks so much',
        date: '5 days ago',
        rating: 2
    },
]

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

                {comments.map(comment => (
                    <SingleComment
                        author={comment.author}
                        img={comment.img}
                        text={comment.text}
                        date={comment.date}
                        rating={comment.rating}
                        key={comment.id}
                    />
                ))}
            </Comment.Group>
        </UserContext.Provider>
    )
}

export default CommentSection;
