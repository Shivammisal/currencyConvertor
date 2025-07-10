import { useEffect, useState } from 'react';

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!baseCurrency) return;

    setIsLoading(true);
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency.toUpperCase()}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.result === "success") {
          setData(res.rates); // ✅ your key is 'rates'
        } else {
          console.error("API error:", res);
          setData({});
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Currency API Error:", err);
        setData({});
        setIsLoading(false);
      });
  }, [baseCurrency]);

  return { data, isLoading };
}

export default useCurrencyInfo;

