import styles from "./page.module.css";
import Footer from "./components/Footer"
import CardsContainer from "./components/CardsContainer";
import Header from "./components/Header";

const Home = () => {
  return (
    <div className={styles.page}>
      <Header />
      <CardsContainer />
      <Footer />
    </div>
  );
}

export default Home