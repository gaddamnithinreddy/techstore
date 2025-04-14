import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ChatAssistant from "./ChatAssistant";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background overflow-hidden">
      <Navigation />
      <main className="flex-grow w-full overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Layout;
