import { Link } from "react-router-dom"
import { useThemeContext } from "../Context/ThemeContext"
import { useEffect } from "react"

function Search() {

    const {setShowSearchInput} = useThemeContext()

    useEffect(()=>{
        setShowSearchInput(false);
    },[])
    return (
        <>
            {/* <main className="flex-grow mt-32 mx-7 lg:mx-6">
            <Link to={'/'} onClick={() => setShowSearchInput(true)}>X</Link> */}

                <div className="max-w-5xl mx-auto">
                    <div
                        className="flex items-center w-full px-4 py-3 mb-8 border-t rounded shadow border-slate-100 md:mx-auto md:w-2/3 text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            className="feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        {/* <label className="visually-hidden" >Search here ...</label> */}
                        <input type="search" id="searchbox" className="w-full ml-3 focus:outline-none"
                            placeholder="Search here ..." />
                    </div>
                    <div id="info" className="mx-auto mb-5 text-lg text-center text-slate-600">Enter keywords in the search box above</div>
                    <div id="wrapper" className="flex flex-wrap -mx-2"></div>

                </div>
                {/* </main> */}
        </>
    )
}

export default Search