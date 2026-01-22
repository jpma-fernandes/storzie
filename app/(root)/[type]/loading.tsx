const Loading = () => {
    return (
        <div className="page-container">
            <section className="w-full">
                {/* Title skeleton */}
                <div className="h-10 w-48 animate-pulse rounded-lg bg-light-300" />

                <div className="total-size-section">
                    {/* Total size skeleton */}
                    <div className="h-6 w-32 animate-pulse rounded-lg bg-light-300" />

                    {/* Sort skeleton */}
                    <div className="sort-container">
                        <div className="h-11 w-[210px] animate-pulse rounded-lg bg-light-300" />
                    </div>
                </div>
            </section>

            {/* File cards skeleton grid */}
            <section className="file-list">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm"
                    >
                        {/* Card header */}
                        <div className="flex justify-between">
                            <div className="size-[50px] animate-pulse rounded-full bg-light-300" />
                            <div className="h-8 w-8 animate-pulse rounded-lg bg-light-300" />
                        </div>

                        {/* Card content */}
                        <div className="flex flex-col gap-2">
                            <div className="h-5 w-3/4 animate-pulse rounded bg-light-300" />
                            <div className="h-4 w-1/2 animate-pulse rounded bg-light-300" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-light-300" />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Loading;
