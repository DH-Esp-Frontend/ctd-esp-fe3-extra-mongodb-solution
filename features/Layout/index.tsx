import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {children: React.ReactNode}

const Layout: FC<Props> = ({children}) => {
  return (
    <div>
        <Head>
          <title>AirHouse</title>
          <link rel="icon" type="image/png"  href="/airbnb.png" />
       </Head>
      <nav>
        <Link href={"http://localhost:3000/"}>
          <Image src="/airbnb.png" alt="Airbnb Logo" width={56} height={56} />
        </Link>
        <Link href={"http://localhost:3000/trend"}>Trend 📍</Link>
      </nav>

      {children}
    </div>
  )
}

export default Layout