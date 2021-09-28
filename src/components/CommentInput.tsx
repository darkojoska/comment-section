import { useContext, useState } from "react"
import { Button, Form } from "semantic-ui-react"
import { UserContext } from "../context/contexts";

interface IProps {
    submitCallback: (input: string) => void,
    isReply?: boolean
}

const CommentInput: React.FC<IProps> = ({ isReply = false, submitCallback }: IProps) => {
    const [inputValue, setInputValue] = useState('');

    const user = useContext(UserContext);

    const handleCommentAdd = () => {
        submitCallback(inputValue);
        setInputValue('');
    };

    return (
        <Form reply style={{ marginBottom: 40, minWidth: 414 }}>
            {!isReply && user?.name &&
                <div style={{ marginBottom: 5 }}>
                    <span style={{ fontSize: 13 }}>
                        Comment as {' '}
                        <b>{user.name}</b>
                    </span>
                </div>
            }
            <Form.TextArea
                autoFocus={isReply}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <Button
                primary
                content={isReply ? 'Add Reply' : 'Add Comment'}
                disabled={!inputValue}
                onClick={handleCommentAdd}
            />
        </Form>
    )
}

export default CommentInput;
