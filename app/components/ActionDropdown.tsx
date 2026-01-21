"use client"

import { Models } from "node-appwrite"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useState } from "react"
import Image from "next/image"
import { actionsDropdownItems } from "@/constants"
import Link from "next/link"
import { constructDownloadUrl } from "@/lib/utils"
import { Input } from "./ui/input"

const ActionDropdown = ({ file }: { file: Models.Document }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [action, setAction] = useState<ActionType | null>(null)
    const [name, setName] = useState(file.name)
    const [isLoading, setIsLoading] = useState(false)

    const closeAllModals = () => {
        setIsModalOpen(false)
        setIsDropdownOpen(false)
        setAction(null)
        setName(file.name)
    }

    const handleAction = (action: ActionType) => {
        setAction(action)
        if (["rename", "share", "delete", "details"].includes(action.value)) {
            setIsModalOpen(true)
        }
    }

    const renderDialogContent = () => {
        if (!action) return null;

        const { value, label } = action;

        return (
            <DialogContent showCloseButton={false} className="shad-dialogue-button" >
                <DialogHeader className="flex flex-col gap-3">
                    <DialogTitle className="text-center text-light-100">{label}</DialogTitle>
                    {value === "rename" && (
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                {["delete", "rename", "share"].includes(value) && (
                    <DialogFooter className="flex flex-col gap-3 md:flex-row ">
                        <DialogClose asChild onClick={closeAllModals} className="modal-cance-button">
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => handleAction(action)} className="modal-submit-button">
                            <p className="capitalize">{value}</p>
                            {isLoading && (
                                <Image
                                    src="assets/icons/loader.svg"
                                    alt="loader"
                                    width={20}
                                    height={20}
                                    className="animate-spin"
                                />
                            )}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        )
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild className="shad-no-focus">
                    <Image
                        src="assets/icons/dots.svg"
                        alt="dots"
                        width={34}
                        height={34}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="max-2-[200px] truncate">{file.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {actionsDropdownItems.map((item) => (
                            <DropdownMenuItem key={item.value} className="shad-dropdown-item" onClick={() => {
                                setAction(item)
                                if (["rename", "share", "delete", "details"].includes(item.value)) {
                                    setIsModalOpen(true)
                                }
                            }}>
                                {item.value === "download" ? (
                                    <Link href={constructDownloadUrl(file.bucketFileId)} download={file.name} className="flex items-center gap-2">
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={30}
                                            height={30}
                                        />
                                        {item.label}
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={30}
                                            height={30}
                                        />
                                        {item.label}
                                    </div>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {renderDialogContent()}
        </Dialog>
    )
}

export default ActionDropdown
