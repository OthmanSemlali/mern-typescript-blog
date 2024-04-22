
function LoadingSkeleton() {
    return (
        <div className="self-stretch w-full p-2 mb-2 sm:w-1/2 md:w-1/3">
            <div className="h-full bg-gray-200 rounded shadow-md">
                <div className="animate-pulse">

                    <div className="w-full bg-gray-300 rounded-t h-44" ></div>

                    <div className="px-6 py-5">
                        <div className="h-6 mb-2 bg-gray-300"></div>
                        <p className="h-20 bg-gray-300"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingSkeleton;
