import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.postsContainer}>
        {posts.map((post, key) => {
          return (
            <Link href={`/articulo/${post.id}`}>
              <div className={styles.postContainer} key={key}>
                <h3 className={styles.title}>{post.title}</h3>
                <h4>{post.description}</h4>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
  const json = await data.json();

  return {
    props: {
      posts: json
    },
    revalidate: 3600
  };
}
