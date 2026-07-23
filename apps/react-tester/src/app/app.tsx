import { CadButton, CadInput } from '@cad/react';

export function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Test App</h1>
      <CadButton variant="primary">Click Me</CadButton>
      <br /><br />
      <CadInput placeholder="Type something..." type="text" />
    </div>
  );
}

export default App;
