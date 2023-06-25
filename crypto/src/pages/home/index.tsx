import { Link } from "react-router-dom";
import styles from "./home.module.css";

import { BiSearch } from "react-icons/bi";

function Home() {
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
            <td className={styles.td} data-label='Moeda'>
              <Link to="/detail/btc" className={styles.link}>
                <span className={styles.link}>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label='Mercado'>
              <span className={styles.link}>$ 412213</span>
            </td>
            <td className={styles.tdLabel} data-label='Preço'>
              <span>$ 412213</span>
            </td>

            <td className={styles.tdProfit} data-label='Volume'>
              <span>+ 50</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export { Home };
