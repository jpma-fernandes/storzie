"use client";

import Image from "next/image";
import { Input } from "@/app/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.actions";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = () => {

    const [query, setQuery] = useState("");
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query") || "";
    const [results, setResults] = useState<Models.Document[]>([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const [debouncedQuery] = useDebounce(query, 300);


    useEffect(() => {
        const fetchFiles = async () => {
            if (!debouncedQuery) {
                setResults([]);
                setOpen(false);
                return router.push(path.replace(searchParams.toString(), ""));
            }
            const files = await getFiles({ types: [], searchText: debouncedQuery });
            setResults(files.documents);
            setOpen(true);
        }

        fetchFiles();
    }, [debouncedQuery]);

    useEffect(() => {
        if (!searchQuery) {
            setQuery("");
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleClickItem = (file: Models.Document) => {
        setOpen(false);
        //setResults([]);

        router.push(`${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${file.name}`);
    }

    return (
        <div className="search" ref={searchContainerRef}>
            <div className="search-input-wrapper">
                <Image
                    src="/assets/icons/search.svg"
                    alt="search"
                    width={24}
                    height={24}
                />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setOpen(true)}
                    placeholder="Search..."
                    className="search-input"
                />

                {open && (
                    <ul className="search-result">
                        {results.length > 0 ? (
                            results.map((file: Models.Document) => (
                                <li key={file.$id} className="flex items-center justify-between cursor-pointer rounded-lg p-2 transition-colors hover:bg-light-400/50" onClick={() => handleClickItem(file)}>
                                    <div className="flex cursor-pointer items-center gap-4">
                                        <Thumbnail type={file.type} extension={file.extension} url={file.url} className="size-9 min-w-9" />
                                        <p className="subtitle-2 line-clamp-1 text-light-100">{file.name}</p>
                                    </div >
                                    <FormattedDateTime
                                        date={file.$createdAt}
                                        className="caption line-clamp-1 text-light-200"
                                    />
                                </li>
                            ))
                        ) : (
                            <p className="empty-result">No files found</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Search