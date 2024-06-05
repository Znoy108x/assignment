"use client"
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/shared/actions/logout.action";

export default function Home() {

  const handleLogoutButtonClick = () => {
    handleLogout()
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <Button onClick={handleLogoutButtonClick}>
        Log Out
      </Button>
    </div>
  );
}
