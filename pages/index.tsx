import Head from 'next/head'
import Link from "next/link"
import styles from '../styles/index.module.scss'

import { client } from "../libs/client"

import Header from "../src/components/Header"

const Styles = require("../styles/index.module.scss")

const Index = ({blog, news}) => {
  return (
    <div>
      <Head>
        <title>NextJS microCMS Site</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Philosopher" />
      </Head>

      <div className={Styles.bigBg}>
        <Header />

        <div className={styles.hero}>
          <h2 className={Styles.pageTitle}>We'll Make You're Day</h2>
          <p>酒場で、指揮者が歯医者を無視する気がした。</p>
          <Link
            href="/"
          >
            <a className={Styles.button}>
              メニューを見る
            </a>
          </Link>
        </div>
      </div>

      <main className={styles.main}>

        {blog.map((article) => (
          <h2 key={article.id}>
            {article.title}
          </h2> 
        ))}

        {news.map((news) => (
          <h2 key={news.id}>
            {news.title}
          </h2> 
        ))}
      </main>
    </div>
  )
}

export default Index

export const getStaticProps = async () => {
  const blogData = await client.get<ResponseType>({
    endpoint: "blog",
  })

  const newsData = await client.get<ResponseType>({
    endpoint: "news",
    queries: {
      filters: "flag[equals]true",
    }
  })

  return {
    props: {
      blog: blogData.contents,
      news: newsData.contents
    }
  }
}