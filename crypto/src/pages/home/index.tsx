import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

import { BiSearch } from "react-icons/bi";

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  sybol: string;
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
      fetch("https://sujeitoprogramador.com/api-cripto/?key=67f9141787211428")
        .then((res) => res.json())
        .then((data: DataProps) => {
          const coinsData = data.coins.slice(0, 15);

          let price = Intl.NumberFormat("pt-BR", {
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
          <tr className={styles.tr}>
            <td className={styles.td} data-label="Moeda">
              <Link to="/detail/btc" className={styles.link}>
                <span className={styles.link}>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="Mercado">
              <span className={styles.link}>$ 412213</span>
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              <span>$ 412213</span>
            </td>

            <td className={styles.tdProfit} data-label="Volume">
              <span>+ 50</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export { Home };
