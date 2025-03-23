import Navbar from "../NavBar/index"; // Importo Navbar nga rruga relative 
import Header from "../../components/Header/index"; // Importo Header nga rruga relative
import Footer from "../../components/Footer/index"; // Importo Footer nga rruga relative
import Head from "next/head";

const About = () => {
  return (
    <>
      {/* Përdorim Head për të vendosur titullin dhe përshkrimin */}
      <Head>
        <title>About Us</title>
        <meta name="description" content="Mësoni më shumë rreth nesh." />
      </Head>

      {/* Shtoni Navbar dhe Header */}
      <Navbar />
      <Header />

      <section style={styles.container}>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>About Us</h1>
          <p style={styles.description}>
            Ne jemi një ekip i përkushtuar për të sjellë eksperiencën më të mirë
            për përdoruesit tanë. Qëllimi ynë është të ndërtojmë produkte cilësore
            duke përdorur teknologjitë më të fundit.
          </p>
        </div>

        <div style={styles.imageContainer}>
          {/* Mund të shtosh përmbajtje tjetër këtu */}
        </div>
      </section>

      {/* Shtoni Footer */}
      <Footer />
    </>
  );
};

// **Stilizimi i komponentit**
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  textContainer: {
    flex: 1,
    paddingRight: "20px",
  },
  imageContainer: {
    flex: 1,
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#555",
  },
};

export default About;
