import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SequenceForm } from './components/SequenceForm';

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Amino Acid Sequence Alignment Visualizer
      </Typography>
      <SequenceForm />
    </Container>
  );
}

export default App;
