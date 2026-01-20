"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createAccount } from "@/lib/actions/user.actions"
import OTPModal from "./OTPModal"


type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState("");

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const user = await createAccount(
                {
                    email: values.email,
                    fullName: values.fullName || "" ,
                }
            );

            setAccountId(user.accountId);

        } catch (error) {
            setErrorMessage("Failed to create account");
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">

                    <h1 className="form-title">{type === "sign-in" ? "Sign in" : "Sign up"}</h1>
                    {type === "sign-up" && <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label" >Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage className="shad-form-message" />
                                </div>
                            </FormItem>
                        )}
                    />}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label" >Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage className="shad-form-message" />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="form-submit-button" disabled={isLoading}>
                        {type === "sign-in" ? "Sign in" : "Sign up"}

                        {isLoading && (
                            <Image
                                src="/assets/icons/loader.svg"
                                alt="Loader"
                                width={20}
                                height={20}
                                className="ml-2 animate-spin"
                            />
                        )}
                    </Button>
                    {errorMessage && (
                        <p className="error-message">*{errorMessage}</p>
                    )}

                    <div className="body-2 flex justify-center">
                        <p className="body-2">{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="ml-1 font-medium text-brand">
                            {type === "sign-in" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </form>
            </Form>
            {!accountId && console.log("No accountId")}
            {accountId && <OTPModal email={form.getValues("email")} accountId={accountId} />}
        </>
    );
};

export default AuthForm;