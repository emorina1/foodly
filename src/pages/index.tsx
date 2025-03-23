import Navbar from "../pages/NavBar/index"; 
import Header from "../components/Header"; // Importo Header nga rruga relative
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h2>Home Page</h2>
        <p>Mirë se vini në aplikacionin tuaj Next.js!</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
