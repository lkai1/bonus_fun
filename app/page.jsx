import styles from "./styles/page.module.css";
import Footer from "./components/Footer"
import CardsContainer from "./components/CardsContainer";
import Header from "./components/Header";

const Home = () => {
  return (
    <div className={styles.main}>
      <Header />
      <CardsContainer />
      <Footer />
    </div>
  );
}

export default Home