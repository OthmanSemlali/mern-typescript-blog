import { Link } from "react-router-dom"

function ErrorPage({ status, type }: { status: number | null, type: string }) {
  return (
    <div className="dark">
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 lg:py-16">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-blue-600 dark:text-primary-500 text-7xl lg:text-9xl">{status}</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">{type}</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{status == 500 ? 'Something Went Wrong!' : null}</p>
          {status !== 500 ? <Link className="underline" to={'/blog'}>Home</Link> : null}
        </div>
      </div>
    </section>
    </div>

  )
}

export default ErrorPage