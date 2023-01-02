import Header from "./Head";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <aside
        className="min-h-[75vh] w-full"
      >
        {children}
      </aside>
      {/* <Footer/> */}
    </>
  );
}
