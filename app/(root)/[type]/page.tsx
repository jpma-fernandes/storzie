
import Card from "@/app/components/Card";
import Sort from "@/app/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { convertFileSize } from "@/lib/utils";

const Page = async ({params}: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";
    const files = await getFiles();

    const totalSize = files.documents.reduce(
        (sum: number, file: Models.Document) => sum + file.size, 0
    );
    
    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">{type}</h1>

                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">{convertFileSize(totalSize)}</span>
                    </p>

                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-200">
                            Sort by
                        </p>
                        <Sort/>
                    </div>
                </div>
            </section>

            {files.total > 0 ? (
                <section className="file-list">
                    {files.documents.map((file: Models.Document) => (
                        <Card key={file.$id} file={file}/>
                    ))}
                </section>
            ) : (
                <section>
                    <p className="empty-list">No files uploaded</p>
                </section>
            )}
        </div>
    );
};

export default Page;
