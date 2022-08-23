import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../utils/mongodb'

type Hotel = { 
  name: string,
  summary: string,
  room_type: string,
}

type Props = { isConnected: boolean, hotels: Hotel[] }

const Home: NextPage<Props> = ({isConnected, hotels}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AirHouse</title>
        <link rel="icon" type="image/png"  href="/airbnb.png" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
           Find the perfect hotel for your 
        </h1>

        <p className={styles.description}>
          {isConnected ? (
            <code>You are connected to</code>
          ) : (
            <code >
              You are NOT connected to
            </code>
          )}
          <code className={styles.mongo}> MongoDb</code>
        </p>

        <div className={styles.grid}>
          {
            hotels.map(hotel =>{
              return(
              <div key={hotel.name} className={styles.card}>
                <h2>{hotel.name} </h2>
                <p>{hotel.summary.slice(0, 180)}...</p>
                <strong className='description'>{hotel.room_type}</strong>
             </div>
            )} )
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
        Made with 🖤 by 
          <span className={styles.logo}>
            <Image src="/DH-Logo.png" alt="DH Logo" width={92} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async()=>{

  try{
    const { db } = await connectToDatabase()
    const data = await db
    .collection("listingsAndReviews")
    .find({})
    .limit(20)
    .toArray();

    const hotels: Hotel[] = JSON.parse(JSON.stringify(data))

    return {
      props: {
        isConnected: true,
        hotels
      }
    } 
  }
  catch(e){
    return {
      props: {
        isConnected: false,
        hotels: []
      }
    } 
  }

}
