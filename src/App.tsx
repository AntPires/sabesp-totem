import { useState } from 'react';
import Home from './screens/Home';
import PagamentoCPF from './screens/PagamentoCPF';
import Pagamento from './screens/Pagamento';
import SegundaVia from './screens/SegundaVia';
import Titularidade from './screens/Titularidade';

type Screen = 'home' | 'pagamento-cpf' | 'pagamento' | 'segunda-via' | 'titularidade';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const goHome = () => setScreen('home');

  return (
    <>
      {screen === 'home' && <Home onNavigate={(s) => setScreen(s === 'pagamento' ? 'pagamento-cpf' : s)} />}
      {screen === 'pagamento-cpf' && (
        <PagamentoCPF onBack={goHome} onContinue={() => setScreen('pagamento')} />
      )}
      {screen === 'pagamento' && <Pagamento onBack={() => setScreen('pagamento-cpf')} />}
      {screen === 'segunda-via' && <SegundaVia onBack={goHome} />}
      {screen === 'titularidade' && <Titularidade onBack={goHome} />}
    </>
  );
}
