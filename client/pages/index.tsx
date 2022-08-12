import type { NextPage } from 'next'
import Title from "../components/SEO/Title";
import styles from '../styles/Home.module.scss'
import Link from "../components/UI/Link";

const Home: NextPage = () => {
  return (
      <div className={styles.Home}>
        <Title title={'Home'}/>
        <div >
            <h1>Welcome to <br/>Simple Social Media</h1>
            <p>Please <Link href="/signin">sign in</Link> or <Link href="/login">login</Link></p>
        </div>
      </div>

  )
}

export default Home
