import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../constants/url";

interface CoinsProps {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  hight_24h: string;
  total_volue_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHightPrice: string;
  error?: string;
}

function Detail() {
  const { crypto } = useParams();
  const navigate = useNavigate()
  const [detail, setDetail] = useState<CoinsProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getData() {
      fetch(`${BASE_URL}&pref=BRL&symbol=${crypto}`)
        .then((res) => res.json())
        .then((data: CoinsProps) => {

          if(data.error){
            navigate('/')
          }

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const resultData = {
            ...data,
            formatedPrice: price.format(Number(data.price)),
            formatedMarket: price.format(Number(data.market_cap)),
            formatedLowPrice: price.format(Number(data.low_24h)),
            formatedHightPrice: price.format(Number(data.hight_24h)),
          };
          console.log(resultData)
          setDetail(resultData);
          setLoading(false);
        
        });
    }
    getData();
  }, [crypto, navigate]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações...</h4>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>
      
      <section>
        <p>
          <strong>Preço:</strong> {detail?.formatedPrice}
        </p>
        <p>
          <strong>Maior preço 24h:</strong> {detail?.formatedHightPrice}
        </p>
        <p>
          <strong>Menor preço 24h:</strong> {detail?.formatedLowPrice}
        </p>
        <p>
          <strong>Delta 24h:</strong>
          <span className={Number(detail?.delta_24h) >= 0 ? styles.profit : styles.loss}> {detail?.delta_24h}</span>
        </p>
        <p>
          <strong>Valor omercado:</strong> {detail?.formatedMarket}
        </p>
      </section>
    </div>
  );
}

export default Detail;
