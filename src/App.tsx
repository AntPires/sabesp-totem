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
import TitularidadeIntro from './screens/TitularidadeIntro';
import TitularidadeCPF from './screens/TitularidadeCPF';
import TitularidadeCPFNovo from './screens/TitularidadeCPFNovo';
import TitularidadeDados from './screens/TitularidadeDados';
import TitularidadeConfirmacao from './screens/TitularidadeConfirmacao';
import TitularidadeVerificacao from './screens/TitularidadeVerificacao';
import TitularidadeLoading from './screens/TitularidadeLoading';
import TitularidadeEndereco from './screens/TitularidadeEndereco';
import TitularidadeCEP, { type CepData } from './screens/TitularidadeCEP';
import TitularidadeEnderecoComplemento from './screens/TitularidadeEnderecoComplemento';
import TitularidadeVencimento from './screens/TitularidadeVencimento';
import TitularidadeResumo from './screens/TitularidadeResumo';
import TitularidadeSucesso from './screens/TitularidadeSucesso';
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
  | 'titularidade-intro'
  | 'titularidade-cpf'
  | 'titularidade'
  | 'titularidade-cpf-novo'
  | 'titularidade-dados'
  | 'titularidade-confirmacao'
  | 'titularidade-verificacao'
  | 'titularidade-loading'
  | 'titularidade-endereco'
  | 'titularidade-cep'
  | 'titularidade-endereco-complemento'
  | 'titularidade-vencimento'
  | 'titularidade-resumo'
  | 'titularidade-sucesso';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedSupply, setSelectedSupply] = useState<{ address: string; supply: string } | null>(null);
  const [novoTitular, setNovoTitular] = useState<{ cpf: string; nome: string; data: string } | null>(null);
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [prevEnderecoScreen, setPrevEnderecoScreen] = useState<Screen>('titularidade-endereco');
  const [correspondenciaFinal, setCorrespondenciaFinal] = useState<{ linha1: string; linha2: string } | null>(null);
  const [diaVencimento, setDiaVencimento] = useState<number | null>(null);

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
    else if (s === 'titularidade') setScreen('titularidade-intro');
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

      {screen === 'titularidade-intro' && (
        <TitularidadeIntro
          onBack={goHome}
          onHome={goHome}
          onContinue={() => setScreen('titularidade-cpf')}
        />
      )}
      {screen === 'titularidade-cpf' && (
        <TitularidadeCPF
          onBack={() => setScreen('titularidade-intro')}
          onContinue={() => setScreen('titularidade')}
        />
      )}
      {screen === 'titularidade' && (
        <Titularidade
          onBack={() => setScreen('titularidade-cpf')}
          onClose={goHome}
          onSelectSupply={(address, supply) => {
            setSelectedSupply({ address, supply });
            setScreen('titularidade-cpf-novo');
          }}
        />
      )}
      {screen === 'titularidade-cpf-novo' && (
        <TitularidadeCPFNovo
          onBack={() => setScreen('titularidade')}
          onContinue={(cpf) => {
            setNovoTitular(prev => ({ cpf, nome: prev?.nome ?? '', data: prev?.data ?? '' }));
            setScreen('titularidade-dados');
          }}
        />
      )}
      {screen === 'titularidade-dados' && (
        <TitularidadeDados
          onBack={() => setScreen('titularidade-cpf-novo')}
          onHome={goHome}
          onContinue={(nome, data) => {
            setNovoTitular(prev => ({ cpf: prev?.cpf ?? '', nome, data }));
            setScreen('titularidade-confirmacao');
          }}
        />
      )}
      {screen === 'titularidade-confirmacao' && novoTitular && (
        <TitularidadeConfirmacao
          nome={novoTitular.nome}
          cpf={novoTitular.cpf}
          dataNascimento={novoTitular.data}
          onBack={() => setScreen('titularidade-dados')}
          onHome={goHome}
          onConfirmar={() => setScreen('titularidade-verificacao')}
        />
      )}
      {screen === 'titularidade-verificacao' && (
        <TitularidadeVerificacao
          onBack={() => setScreen('titularidade-confirmacao')}
          onHome={goHome}
          onContinue={() => setScreen('titularidade-loading')}
        />
      )}
      {screen === 'titularidade-loading' && (
        <TitularidadeLoading
          onHome={goHome}
          onContinue={() => setScreen('titularidade-endereco')}
        />
      )}
      {screen === 'titularidade-endereco' && selectedSupply && (
        <TitularidadeEndereco
          address={selectedSupply.address}
          onBack={() => setScreen('titularidade-loading')}
          onHome={goHome}
          onSelect={(opt) => {
            if (opt === 'outro') {
              setScreen('titularidade-cep');
            } else {
              setCorrespondenciaFinal({
                linha1: selectedSupply?.address ?? '',
                linha2: '',
              });
              setPrevEnderecoScreen('titularidade-endereco');
              setScreen('titularidade-vencimento');
            }
          }}
        />
      )}
      {screen === 'titularidade-cep' && (
        <TitularidadeCEP
          onBack={() => setScreen('titularidade-endereco')}
          onHome={goHome}
          onContinue={(data) => {
            setCepData(data);
            setScreen('titularidade-endereco-complemento');
          }}
        />
      )}
      {screen === 'titularidade-endereco-complemento' && cepData && (
        <TitularidadeEnderecoComplemento
          cepData={cepData}
          onBack={() => setScreen('titularidade-cep')}
          onHome={goHome}
          onContinue={(linha1, linha2) => {
            setCorrespondenciaFinal({ linha1, linha2 });
            setPrevEnderecoScreen('titularidade-endereco-complemento');
            setScreen('titularidade-vencimento');
          }}
        />
      )}
      {screen === 'titularidade-vencimento' && (
        <TitularidadeVencimento
          onBack={() => setScreen(prevEnderecoScreen)}
          onHome={goHome}
          onSelect={(dia) => {
            setDiaVencimento(dia);
            setScreen('titularidade-resumo');
          }}
        />
      )}
      {screen === 'titularidade-resumo' && novoTitular && correspondenciaFinal && diaVencimento && selectedSupply && (
        <TitularidadeResumo
          supply={selectedSupply.supply}
          novoTitular={novoTitular}
          correspondencia={correspondenciaFinal}
          diaVencimento={diaVencimento}
          onBack={() => setScreen('titularidade-vencimento')}
          onHome={goHome}
          onConfirmar={() => setScreen('titularidade-sucesso')}
        />
      )}
      {screen === 'titularidade-sucesso' && novoTitular && (
        <TitularidadeSucesso
          novoTitular={novoTitular}
          onHome={goHome}
        />
      )}
    </>
  );
}
