"use client"
import { createContext, useContext, useMemo } from "react"
// Type Imports
import axios, { AxiosInstance } from "axios"

type axiosContextType = {
    axiosInstance: AxiosInstance
}

function createAxiosInstance() {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        withCredentials: true
    })
    
    instance.interceptors.request.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    instance.interceptors.response.use((response) => {
        return response.data
    }, (error) => {
        return Promise.reject(error)
    })
    return instance
}

const AxiosContext = createContext<axiosContextType | undefined>(undefined)

export function AxiosProvider({ children }: { children: React.ReactNode }) {

    const axiosInstance: AxiosInstance = useMemo(() => createAxiosInstance(), [])

    const values: axiosContextType = {
        axiosInstance
    }

    return (
        <AxiosContext.Provider value={values}>
            {children}
        </AxiosContext.Provider>
    )
}

export const useAxiosInstance = (): axiosContextType => {
    const context = useContext(AxiosContext)
    if (!context) {
        throw new Error("useAxiosInstance must be used within a AxiosProvider")
    }
    return context;
}