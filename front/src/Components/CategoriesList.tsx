import { Link } from "react-router-dom";
import { useCategoryContext } from "../Context/CategoryContext"

function CategoriesList({selectedCategory}:{selectedCategory:string | undefined}) {

    const { categoriesWithCounts } = useCategoryContext().state;

    return (
        <div>

            <h1 className="mt-0 mb-5 text-3xl font-bold leading-normal text-center">Categories</h1>
            <div className="flex flex-wrap justify-center">

                {
                    categoriesWithCounts.map(({ category, count }) => {
                        return (
                            <Link to={`/category/${category}`}
                                className={`inline-block px-4 py-2 mx-1 mb-3 font-medium rounded-full bg-slate-200 text-slate-700 ${category === selectedCategory ? 'border-solid border-2 border-slate-300' : null}`}>
                                {category}
                                <span className="px-2 py-1 ml-1 text-xs font-semibold text-teal-800 bg-teal-300 rounded-full">{count}</span>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default CategoriesList