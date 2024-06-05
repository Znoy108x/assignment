"use client"
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/shared/actions/logout.action";
import { useState } from "react";
import ButtonLoading from "../_components/ButtonLoading";

export default function Home() {

  const [isLogout, setIsLogout] = useState<boolean>(false)

  const handleLogoutButtonClick = () => {
    setIsLogout(true)
    handleLogout()
    setIsLogout(false)
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <Button onClick={handleLogoutButtonClick} disabled={isLogout}>
        <ButtonLoading text="Log Out" isLoading={isLogout} />
      </Button>
    </div>
  );
}
