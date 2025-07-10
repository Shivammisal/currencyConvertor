import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, isLoading } = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    const rate = currencyInfo[to];
    if (rate) {
      const result = amount * rate;
      setConvertedAmount(Number(result.toFixed(2)));
    } else {
      setConvertedAmount(0);
    }
  };

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage:
          "url('https://www.instarem.com/wp-content/uploads/2023/10/Strong-Currency-20231214-111626.jpg')",
      }}
    >
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            {isLoading ? (
              <p className="text-center text-white">Loading currency data...</p>
            ) : (
              <>
                <div className='w-full mb-1'>
                  <InputBox
                    label='From'
                    amount={amount}
                    currencyOptions={options}
                    onAmountChange={(value) => setAmount(value)}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    selectCurrency={from}
                  />
                </div>

                <div className='relative w-full h-0.5'>
                  <button
                    type='button'
                    className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                    onClick={swap}
                  >
                    Swap
                  </button>
                </div>

                <div className='w-full mt-1 mb-4'>
                  <InputBox
                    label='To'
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
                >
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
