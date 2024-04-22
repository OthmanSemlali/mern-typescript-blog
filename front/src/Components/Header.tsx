import { useState } from "react";
import { useThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

type Tlinks = { name: string, to: string }
type headerProps = {
    links: Tlinks[]
}
function Header({ links }: headerProps) {
    // console.log('links', links)
    const { showSearchInput, setShowSearchInput } = useThemeContext();

    const [menuHidden, setMenuHidden] = useState(true);
    const [searchBoxHidden, setSearchBoxHidden] = useState(true);

    const toggleMenu = () => {

        setMenuHidden(!menuHidden);
        setSearchBoxHidden(!searchBoxHidden);
    };



    const { theme, toggleTheme } = useThemeContext();
    return (
        <header id="header" className={`fixed top-0 z-50 w-full px-6 py-5 transition-all duration-500 ease-in-out transform ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
            <div className="flex flex-wrap items-center justify-between max-w-5xl mx-auto">
                <div className="sm:mr-8">
                    <a className="flex items-center" href="/">
                        <span className={`self-center text-xl font-semibold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>BookyReview</span>
                    </a>
                </div>
                <nav id="menu" className={`${menuHidden ? 'hidden' : ''}  items-center flex-grow order-last  w-full mt-2 md:order-none md:w-auto md:flex md:mt-0`} >


                    {
                        links.map(({ name, to }, i) => {
                            return (
                                <Link onClick={() => {setShowSearchInput(true); toggleMenu()}} key={i} to={to} className="block mt-4 mr-4 text-base font-medium md:inline-block md:mt-0 text-slate-700 hover:text-teal-600">{name}</Link>

                            )

                        })
                    }

                    {/* <a href="/tags" className="block mt-4 mr-4 text-base font-medium md:inline-block md:mt-0 text-slate-700 hover:text-teal-600">Tag List</a> */}

                    <a href="https://github.com/daflh/vredeburg" target="_blank" rel="noopener" className="block mt-4 mr-4 text-base font-medium md:inline-block md:mt-0 text-slate-700 hover:text-teal-600">GitHub</a>
                    <button onClick={toggleTheme} className="text-slate-700 hover:text-teal-600">{theme === 'dark' ? 'Light' : 'Dark'} Mode</button>

                    {/* <li onClick={toggleTheme}>{theme}</li> */}
                </nav>
                {
                    showSearchInput ? (
                        <form id="search" action="/search" className={`${searchBoxHidden ? 'hidden' : ''} items-center justify-end flex-grow order-last  mt-6 sm:order-none sm:block sm:mt-0`}>
                            {/* <label className="visually-hidden" >Search here ...</label> */}
                            <Link to={'/search'}><input onClick={() => {setShowSearchInput(true); toggleMenu()}} type="text" id="header-searchbox" name="q" placeholder="Search here ..." className="float-right w-full h-8 p-4 text-sm border border-transparent rounded cursor-pointer sm:max-w-xs bg-slate-200 focus:bg-white focus:border-slate-300 focus:outline-none placeholder-slate-500 text-slate-700" /></Link>
                        </form>
                    ) : null
                }

                <div onClick={toggleMenu} id="menu-toggle" className="flex items-center cursor-pointer md:hidden text-slate-700 hover:text-teal-600 sm:ml-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
            </div>
        </header>
    )
}

export default Header