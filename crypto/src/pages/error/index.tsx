import styles from './styles.module.css'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404 NÃO ENCONTRADA</h1>

      
      <Link to='/'>
      Voltar para Home
      </Link>
    </div>
  )
}

export default NotFound