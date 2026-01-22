const Loading = () => {
    return (
        <div className="dashboard-container">
            {/* Left section: Chart + Summary Cards */}
            <section>
                {/* Chart skeleton */}
                <div className="flex items-center rounded-[20px] bg-brand/20 p-2 md:flex-col xl:flex-row">
                    {/* Radial chart placeholder */}
                    <div className="mx-auto flex size-[180px] items-center justify-center xl:size-[200px]">
                        <div className="relative flex size-[140px] items-center justify-center rounded-full border-[12px] border-light-300/30 bg-transparent">
                            <div className="flex flex-col items-center">
                                <div className="h-8 w-12 animate-pulse rounded bg-light-300/50" />
                                <div className="mt-2 h-4 w-16 animate-pulse rounded bg-light-300/30" />
                            </div>
                        </div>
                    </div>
                    {/* Chart details */}
                    <div className="flex-1 px-3 py-0 sm:px-5 lg:p-3 xl:pr-5">
                        <div className="h-6 w-36 animate-pulse rounded bg-light-300/30" />
                        <div className="mt-2 h-5 w-24 animate-pulse rounded bg-light-300/20" />
                    </div>
                </div>

                {/* Summary cards skeleton */}
                <ul className="dashboard-summary-list">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <li
                            key={index}
                            className="relative mt-6 rounded-[20px] bg-white p-5"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <div className="h-5 w-16 animate-pulse rounded bg-light-300" />
                                </div>
                                <div className="mx-auto h-5 w-24 animate-pulse rounded bg-light-300" />
                                <div className="h-px w-full bg-light-300" />
                                <div className="mx-auto h-4 w-32 animate-pulse rounded bg-light-300" />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Right section: Recent files */}
            <section className="dashboard-recent-files">
                <div className="h-7 w-48 animate-pulse rounded bg-light-300" />

                <ul className="mt-5 flex flex-col gap-5">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <li key={index} className="flex items-center gap-3">
                            {/* Thumbnail */}
                            <div className="size-[50px] min-w-[50px] animate-pulse rounded-full bg-light-300" />

                            {/* File details */}
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="h-4 w-40 animate-pulse rounded bg-light-300" />
                                    <div className="h-3 w-24 animate-pulse rounded bg-light-300" />
                                </div>
                                <div className="size-8 animate-pulse rounded-lg bg-light-300" />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Loading;
