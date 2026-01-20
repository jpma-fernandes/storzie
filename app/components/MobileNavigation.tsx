"use client";

import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({avatar, fullName, email}: {avatar: string, fullName: string, email: string}) => {

    const [open, setOpen] = useState(false);
    const pathName = usePathname();

    return (
        <header className="mobile-header">
            <Image
                src="assets/icons/logo-full-brand.svg"
                alt="logo"
                width={120}
                height={52}
                className="h-auto"
            />

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Image
                        src="assets/icons/menu.svg"
                        alt="search"
                        width={30}
                        height={30}
                    />
                </SheetTrigger>
                <SheetContent className="shad-sheet h-screen px-3">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="header-user">
                                <Image
                                    src={avatar}
                                    alt="avatar"
                                    width={44}
                                    height={44}
                                    className="header-user-avatar"
                                />
                                <div className="sm:hidden lg:block">
                                    <p className="subtitle-2 capitalize">{fullName}</p>
                                    <p className="caption">{email}</p>
                                </div>
                            </div> 
                            <Separator className="mb-4 bg-light-200/20"/>
                        </SheetTitle>
                        <nav>
                            <ul className="mobile-nav-list">
                                {navItems.map(({icon, name, url}) => (
                                    <li key={name}>
                                        <Link key={name} href={url} className="lg-w-full">
                                            <li className={cn("mobile-nav-item", pathName === url && "shad-active")}>
                                                <Image 
                                                    src={icon} 
                                                    alt={name} 
                                                    width={24} 
                                                    height={24}
                                                    className={cn("nav-icon", pathName === url && "nav-icon-active")}
                                                />
                                                <p>{name}</p>       
                                            </li>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <Separator className="mb-4 bg-light-200/20"/>
                        <div className="flex flex-col justify-between gap-5">
                            <FileUploader />
                            <Button type="submit" className="mobile-sign-out-button" onClick={async () => await signOutUser()}>
                                <Image 
                                    src="assets/icons/logout.svg" 
                                    alt="logout" 
                                    width={24} 
                                    height={24}
                                    className="w-6"
                                />
                                <p>Logout</p>
                            </Button>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </header>
    )
}

export default MobileNavigation 