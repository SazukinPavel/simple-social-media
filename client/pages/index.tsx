import type { NextPage } from 'next'
import Title from "../components/seo/Title";
import styles from '../styles/Home.module.scss'
import Link from "../components/ui/Link";

const Home: NextPage = () => {
  return (
      <div className={[styles.Home,'center-container'].join(' ')}>
        <Title title={'Home'}/>
        <div >
            <h1>Welcome to <br/>Simple Social Media</h1>
            <p>Please <Link href="/signin">sign in</Link> or <Link href="/index">login</Link></p>
        </div>
      </div>

  )
}

export default Home
