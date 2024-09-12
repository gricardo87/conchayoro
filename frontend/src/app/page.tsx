import { blackFridayFlag } from '@/app/flags';

export default async function Page() {
  // Aguarda a verificação do flag
  const black_friday = await blackFridayFlag();

  return (
    <div>
      <h1>Welcome to the ConchaYOro App - deploy v3</h1>
      {/* Mostra o botão de acordo com o valor da flag */}
      {black_friday ? <button>Promo</button> : <button>Normal</button>}
    </div>
  );
}
