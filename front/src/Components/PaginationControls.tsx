import { Link } from "react-router-dom";

type PaginationControlsProps = {
    route:string;
    currentPage: number;
    totalPages: number
}
function PaginationControls({ route, currentPage, totalPages }: PaginationControlsProps) {

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    // console.log('currentPage', currentPage)
    // console.log('totalPages', totalPages)
    if (!currentPage) {
        currentPage = 1;
    }
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    // console.log('${`/${route}/${prevPage}`}', `${`/${route}/${nextPage}`}`)
    return (
        <>

            {
                isFirstPage ? null : <Link className="float-left px-4 py-2 font-semibold bg-white border rounded shadow-md cursor-pointer text-slate-800 hover:bg-slate-100" to={`/${route}/${prevPage}`}>Previous</Link>
            }



            {
                isLastPage ? null : <Link className="float-right px-4 py-2 font-semibold bg-white border rounded shadow-md cursor-pointer text-slate-800 hover:bg-slate-100" to={`/${route}/${nextPage}`}>Next &gt;</Link>

            }        </>
    )
}

export default PaginationControls