import { useState } from 'react';
import Home from './screens/Home';
import PagamentoCPF from './screens/PagamentoCPF';
import Pagamento from './screens/Pagamento';
import PagamentoFaturas from './screens/PagamentoFaturas';
import SegundaViaCPF from './screens/SegundaViaCPF';
import SegundaVia from './screens/SegundaVia';
import SegundaViaFaturas from './screens/SegundaViaFaturas';
import SegundaViaFinalidade from './screens/SegundaViaFinalidade';
import PagamentoCheckout from './screens/PagamentoCheckout';
import SegundaViaNomeMae from './screens/SegundaViaNomeMae';
import SegundaViaImpressao from './screens/SegundaViaImpressao';
import Titularidade from './screens/Titularidade';

type Screen =
  | 'home'
  | 'pagamento-cpf'
  | 'pagamento'
  | 'pagamento-faturas'
  | 'pagamento-checkout'
  | 'segunda-via-cpf'
  | 'segunda-via'
  | 'segunda-via-faturas'
  | 'segunda-via-finalidade'
  | 'segunda-via-nome-mae'
  | 'segunda-via-impressao'
  | 'titularidade';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedSupply, setSelectedSupply] = useState<{ address: string; supply: string } | null>(null);

  const goHome = () => setScreen('home');

  function handleSelectSupply(address: string, supply: string) {
    setSelectedSupply({ address, supply });
    setScreen('pagamento-faturas');
  }

  function handleSelectSupplySegundaVia(address: string, supply: string) {
    setSelectedSupply({ address, supply });
    setScreen('segunda-via-faturas');
  }

  function handleNavigate(s: string) {
    if (s === 'pagamento') setScreen('pagamento-cpf');
    else if (s === 'segunda-via') setScreen('segunda-via-cpf');
    else setScreen(s as Screen);
  }

  return (
    <>
      {screen === 'home' && <Home onNavigate={handleNavigate} />}

      {screen === 'pagamento-cpf' && (
        <PagamentoCPF onBack={goHome} onContinue={() => setScreen('pagamento')} />
      )}
      {screen === 'pagamento' && (
        <Pagamento onBack={() => setScreen('pagamento-cpf')} onSelectSupply={handleSelectSupply} />
      )}
      {screen === 'pagamento-faturas' && selectedSupply && (
        <PagamentoFaturas
          address={selectedSupply.address}
          supply={selectedSupply.supply}
          onBack={() => setScreen('pagamento')}
          onHome={goHome}
          onContinue={() => setScreen('pagamento-checkout')}
        />
      )}
      {screen === 'pagamento-checkout' && (
        <PagamentoCheckout
          onBack={() => setScreen('pagamento-faturas')}
          onHome={goHome}
        />
      )}

      {screen === 'segunda-via-cpf' && (
        <SegundaViaCPF onBack={goHome} onContinue={() => setScreen('segunda-via')} />
      )}
      {screen === 'segunda-via' && (
        <SegundaVia
          onBack={() => setScreen('segunda-via-cpf')}
          onClose={goHome}
          onSelectSupply={handleSelectSupplySegundaVia}
        />
      )}
      {screen === 'segunda-via-faturas' && selectedSupply && (
        <SegundaViaFaturas
          address={selectedSupply.address}
          supply={selectedSupply.supply}
          onBack={() => setScreen('segunda-via')}
          onHome={goHome}
          onContinue={() => setScreen('segunda-via-finalidade')}
        />
      )}
      {screen === 'segunda-via-finalidade' && (
        <SegundaViaFinalidade
          onBack={() => setScreen('segunda-via-faturas')}
          onHome={goHome}
          onSelect={(finalidade) => {
            if (finalidade === 'comprovante') setScreen('segunda-via-nome-mae');
            else setScreen('segunda-via-impressao');
          }}
        />
      )}
      {screen === 'segunda-via-nome-mae' && (
        <SegundaViaNomeMae
          onBack={() => setScreen('segunda-via-finalidade')}
          onHome={goHome}
          onContinue={() => setScreen('segunda-via-impressao')}
        />
      )}
      {screen === 'segunda-via-impressao' && (
        <SegundaViaImpressao onHome={goHome} />
      )}

      {screen === 'titularidade' && <Titularidade onBack={goHome} />}
    </>
  );
}
