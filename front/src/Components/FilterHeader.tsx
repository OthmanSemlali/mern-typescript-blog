
function FilterHeader({ title, filterName }: { title: string, filterName: string }) {


    return (

        <div className="mb-8 text-center">
            <h3 className="my-0 text-xl font-medium text-slate-700">{title}</h3>
            <h1 className="mt-0 text-4xl font-medium leading-normal">{filterName}</h1>
        </div>
    )
}

export default FilterHeader