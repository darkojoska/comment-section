import { Container } from 'semantic-ui-react';
import CommentSection from './components/CommentSection';

const App: React.FC = () => {
  return (
    <Container style={{ margin: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Comment section</h2>
      <CommentSection />
    </Container>
  );
}

export default App;
