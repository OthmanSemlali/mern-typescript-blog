import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MyComponent from "./Markdown";

// SharedLayout.js
// type SharedLayoutProps = {
//     children: React.ReactNode
// }
const links = [
    { name: "Home", to: "/blog" },
    { name: "About", to: "/about" }
]
const SharedLayout = () => {
    

    return (

        <div className="flex flex-col h-screen break-words bg-white text-slate-800">

            <Header links={links} />

            <main className="flex-grow mt-32 mx-7 lg:mx-6">

                <div className="max-w-5xl mx-auto">
     
                {/* <MyComponent /> */}

                    {<Outlet />}


                </div>

            </main>

            <Footer />
        </div >

    );
};

export default SharedLayout;