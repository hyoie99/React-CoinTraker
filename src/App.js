import { useEffect, useState } from "react";
import "./css/App.css";

function App() {
  // const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [krw, setKRW] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [list, setList] = useState(false);
  const [convert, setConvert] = useState(false);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        // setLoading(false);
      });
  }, []);
  const clickList = () => {
    setList((current) => !current);
  };
  const clickConvert = () => {
    setConvert((current) => !current);
  };
  const onChange = (event) => {
    setKRW(event.target.value);
    // console.log(krw);
  };
  const onChangeSelect = (event) => {
    setCoinPrice(coins[event.target.selectedIndex].quotes.USD.price);
    setCoinSymbol(coins[event.target.selectedIndex].name);
  };
  return (
    <div className="App">
      <h1 className="title">COINS</h1>
      <div className="buttons">
        <button onClick={clickList}>Show List</button>
        <button onClick={clickConvert}>Coin Converter</button>
      </div>
      {/* {loading ? <strong>Loading...</strong> : null} */}
      {list ? (
        <ul className="coin-list">
          {coins.map((coin) => (
            <li>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price}USD
            </li>
          ))}
        </ul>
      ) : null}
      {convert ? (
        <div className="coin-convert">
          <select onChange={onChangeSelect} value={coinSymbol}>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name}({coin.symbol}): ${coin.quotes.USD.price}USD
              </option>
            ))}
          </select>
          <div>
            <input
              value={krw}
              onChange={onChange}
              placeholder="How much?"
            ></input>
            <span>krw</span>
            <h3>
              You can buy{" "}
              <span>
                {Math.round(krw / 1316 / coinPrice, 5)} {coinSymbol}
              </span>
            </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
