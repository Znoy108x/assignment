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
import { RegisterFormSchema } from '@/shared/schema/RegisterFormSchema'
import { useAxiosInstance } from '@/shared/context/AxiosInstance'
import toast from 'react-hot-toast'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { axiosInstance } = useAxiosInstance()
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        setIsSubmitting(true)
        toast.promise(
            axiosInstance.post("/register", values),
            {
                loading: "Please wait! Registering user...",
                success: (res: any) => {
                    const message = res?.message || "Register successfull!"
                    setIsSubmitting(false)
                    router.push("/login")
                    return <span>{message}</span>
                },
                error: (err: any) => {
                    const error = err.response?.data?.error || "Something went wrong!"
                    return <span>{error}</span>
                }
            }

        )
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-10 py-12 shadow-md px-7 rounded-lg">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create an Account</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your information to get started.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <Label htmlFor="first-name">First Name</Label>
                                            <Input
                                                {...field}
                                                id="first-name"
                                                placeholder="Abhay"
                                                required
                                                pattern="[a-zA-Z]*"
                                                title="Please enter a valid first name"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <Label htmlFor="last-name">Last Name</Label>
                                            <Input
                                                {...field}
                                                id="last-name"
                                                placeholder="Bisht"
                                                required
                                                pattern="[a-zA-Z]*"
                                                title="Please enter a valid last name"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                                            placeholder="abhay@sde.in"
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
                        <ButtonLoading text='Create Account' isLoading={isSubmitting} />
                    </Button>
                </form>
            </Form>
            <div className='text-center text-zinc-600 text-sm'>
                Already have a account? <Link href="/login" className='text-blue-700 hover:text-blue-900 hover:underline'>Login</Link>
            </div>
        </div>
    )
}

export default RegisterPage