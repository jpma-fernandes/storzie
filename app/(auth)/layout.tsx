import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <section className="bg-brand p-10 hidden w-1/2 items-center justify-center justify-center lg:flex xl:w-2/5">
                <div className="flex max-h-[800px] max-w-[430px] flex-col space-y-12 justify-center">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="Logo"
                        width={224}
                        height={82}
                        className="h-auto"
                    />

                    <div className="space-y-5 text-white">
                        <h1 className="h1">Storage Management</h1>
                        <p className="body-1">
                            This is where you can store your documents.
                        </p>
                    </div>
                    <Image
                        src="/assets/images/files-2.png"
                        alt="Files"
                        width={342}
                        height={342}
                        className="transition-all hover:rotate-2 hover:scale-105"
                    />
                </div>
            </section>
            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:px-10 lg:py-0">
                 <Image
                     src="/assets/icons/logo-full-brand.svg"
                     alt="Logo"
                     width={224}
                     height={82}
                     className="h-auto w-[200px] lg:w-[250px]"
                 />
                {children}
            </section>
        </div>
    );
};

export default Layout;