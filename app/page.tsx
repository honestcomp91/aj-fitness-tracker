import Footer from "./components/Footer";
import Header from "./components/Header";
import WorkoutForm from "./components/WorkoutForm";


export default function Home() {
  return (
    <main className="max-w-3xl mx-auto font-sans bg-[#222e2f]">
      <Header />
      <WorkoutForm />
      <Footer />
    </main>
  );
}
