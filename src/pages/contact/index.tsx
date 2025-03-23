import Navbar from "../NavBar/index";// Importo Navbar nga rruga relative
import Footer from "../../components/Footer/index"; // Importo Footer nga rruga relative
import Head from "next/head";

const ContactUs = () => {
  return (
    <>
      {/* Përdorim Head për të vendosur titullin dhe përshkrimin */}
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Kontaktoni me ne." />
      </Head>

      {/* Shtoni Navbar */}
      <Navbar />

      <section style={styles.container}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.description}>
          Mirë se vini në aplikacionin tuaj Next.js! Na kontaktoni për çdo pyetje
          ose informacion shtesë.
        </p>
        <form style={styles.form}>
          <label>Email:</label>
          <input type="email" placeholder="Email" style={styles.input} />
          <label>Message:</label>
          <textarea placeholder="Your message" style={styles.input}></textarea>
          <button type="submit" style={styles.button}>Send</button>
        </form>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "500px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ContactUs;
