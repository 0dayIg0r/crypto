import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

import { BiSearch } from "react-icons/bi";

//67f9141787211428 || 8a7b8740a0632df4

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  coins: CoinProps[];
}

function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    function getData() {
      fetch("https://sujeitoprogramador.com/api-cripto/?key=8a7b8740a0632df4")
        .then((res) => res.json())
        .then((data: DataProps) => {
          const coinsData = data.coins.slice(0, 15);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };
            return formated;
          });

          setCoins(formatResult);
        });
    }

    getData();
  }, []);
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder="Digite o símbolo da moeda: BTC..." />
        <button type="submit">
          <BiSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((coin) => (
            <tr className={styles.tr} key={coin.name}>
              <td className={styles.td} data-label="Moeda">
                <Link to={`/detail/${coin.symbol}`} className={styles.link}>
                  <span className={styles.link}>{coin.name}</span> | {coin.symbol }
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                <span className={styles.link}>{coin.formatedMarket}</span>
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                <span>{coin.formatedPrice}</span>
              </td>

              <td className={Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export { Home };
