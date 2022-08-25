import {  GetServerSideProps, NextPage } from 'next'
import React from 'react'
import styles from '../styles/Home.module.css'


type Hotel = { 
    name: string,
    summary: string,
    room_type: string,
  }
  
type Props = { hotels: Hotel[]}

const Sale: NextPage<Props> = ({hotels}) => {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
           Discover the most popular options
        </h1>
        <br/>
       <div className={styles.grid}>
          {
            hotels.map(hotel =>{
              return(
              <div key={hotel.name} className={styles.trendCard}>
                <h2>{hotel.name} ⭐ </h2>
                <p>{hotel.summary.slice(0, 180)}...</p>
                <strong className='description'>{hotel.room_type}</strong>
             </div>
            )} )
          }
        </div>
      </main>
    </div>
    
  )
}

export const getServerSideProps: GetServerSideProps =async () => {
    const data = await fetch("http://localhost:3000/api/ranked")
    const res = await data.json()
    const hotels: Hotel[] = JSON.parse(JSON.stringify(res))
    return {
      props:{
        hotels
      }
    }
}


export default Sale