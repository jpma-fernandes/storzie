"use client"

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import Image from 'next/image'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import Thumbnail from './Thumbnail'
import { MAX_FILE_SIZE } from '@/constants'
import { uploadFile } from '@/lib/actions/file.actions'
import { toast } from "sonner"
import { usePathname } from 'next/navigation'

const FileUploader = ({ ownerId, accountId, className }: { ownerId: string, accountId: string, className?: string }) => {

    const [files, setFiles] = useState<File[]>([]);
    const path = usePathname();
    
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);

        const uploadPromises = acceptedFiles.map(async (file) => {
            if (file.size > MAX_FILE_SIZE) {
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== file.name));

                return toast.error("File size exceeds the limit.", {
                    classNames: {
                        toast: "!bg-brand",
                        description: "body-2 text-white",
                        title: "font-semibold !text-white",
                        icon: "!text-white",
                    },
                    description: (
                        <>
                            <span className="font-semibold">{file.name}</span> is too large.
                            Max file size is {MAX_FILE_SIZE / 1024 / 1024} MB.
                        </>
                    )
                })
            }

            return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
                if (uploadedFile) {
                    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
                }
            });
        });

        const uploadedFiles = await Promise.all(uploadPromises);

    }, [ownerId, accountId, path])
    const { getRootProps, getInputProps} = useDropzone({ onDrop })

    const handleRemoveFile = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, fileName: string) => {
        e.stopPropagation();
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div className="cursor-pointer" {...getRootProps()}>
            <input {...getInputProps()} />
            <Button type="button" className={cn("uploader-button", className)}>
                <Image
                    src="/assets/icons/upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                />
                <p>Upload</p>
            </Button>
            {files.length > 0 && <ul className="uploader-preview-list">
                <h4 className="h4 text-light-100">
                    Uploading
                </h4>
                {files.map((file, index) => {
                    const { type, extension } = getFileType(file.name);
                    return (
                        <li key={`${file.name}-${index}`} className='uploader-preview-item'>
                            <div className='flex items-center gap-3'>
                                <Thumbnail
                                    type={type}
                                    extension={extension}
                                    url={convertFileToUrl(file)}
                                />
                                <div className="flex flex-col">
                                    <p className="preview-item-name">
                                        {file.name}
                                    </p>
                                    <Image
                                        src="/assets/icons/file-loader.gif"
                                        alt="loader"
                                        width={80}
                                        height={26}
                                    />
                                </div>
                            </div>
                            <Image
                                src="/assets/icons/remove.svg"
                                alt="remove"
                                width={24}
                                height={24}
                                onClick={(e) => handleRemoveFile(e, file.name)}
                            />
                        </li>
                    )
                })}
            </ul>}
        </div>
    )
}

export default FileUploader