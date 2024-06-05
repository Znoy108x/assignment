"use client"
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ButtonLoading from '@/app/_components/ButtonLoading'
import Link from 'next/link'
import { useAxiosInstance } from '@/shared/context/AxiosInstance'
import toast from 'react-hot-toast'
import { AxiosError, AxiosResponse } from 'axios'
import { LoginFormSchema } from '@/shared/schema/LoginFromSchema'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

    const router = useRouter()
    const [isSubmitting , setIsSubmitting] = useState<boolean>(false)

    const { axiosInstance } = useAxiosInstance()

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        setIsSubmitting(true)
        toast.promise(
            axiosInstance.post("/login", values),
            {
                loading: "Please wait! checking user credentials...",
                success: (res: any) => {
                    setIsSubmitting(false)
                    router.push("/")
                    const message = res?.message || "Login successfull!"
                    return <span>{message}</span>
                },
                error: (err: any) => {
                    console.log(err)
                    setIsSubmitting(false)
                    const error = err.response?.data?.error || "Something went wrong!"
                    return <span>{error}</span>
                }
            }

        )
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-10 py-12 shadow-md px-7 rounded-lg">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Login to your Account</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your information to get started.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="example@email.com"
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                                            title="Please enter a valid email address"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="********"
                                            required
                                            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$"
                                            title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full' disabled={isSubmitting}>
                        <ButtonLoading text='Login' isLoading={isSubmitting} />
                    </Button>
                </form>
            </Form>
            <div className='text-center text-zinc-600 text-sm'>
                New user? <Link href="/register" className='text-blue-700 hover:text-blue-900 hover:underline'>Create Account</Link>
            </div>
        </div>
    )
}

export default LoginPage