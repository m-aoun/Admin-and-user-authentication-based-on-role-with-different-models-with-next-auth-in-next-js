
import styles from './Loader.module.css'
const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
        <h1>Processing.......</h1>
    </div>
  )
}

export default Loader