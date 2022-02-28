import Head from "next/head";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import styles from "../styles/Home.module.css";
import { PeopleMissing } from "../components/PeopleMissing";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FindMe</title>
        <meta
          name="description"
          lang="es"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <PeopleMissing />
      <Footer />
    </div>
  );
}
