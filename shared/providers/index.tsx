"use client"
import { Toaster } from "react-hot-toast"
import { AxiosProvider } from "../context/AxiosInstance"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AxiosProvider>
        {children}
      </AxiosProvider>
      <Toaster />
    </>
  )
}

export default Providers