import styles from "./styles/page.module.css";
import Footer from "./components/Footer"
import CardsContainer from "./components/CardsContainer";
import Header from "./components/Header";

const Home = () => {
  // this page is not responsive, fix it
  return (
    <div className={styles.main}>
      <Header />
      <CardsContainer />
      <Footer />
    </div>
  );
}

export default Home