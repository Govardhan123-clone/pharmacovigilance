"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include", // Include cookies if needed
        });

        // Clear client-side token and user data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login or home
        router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, [router]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}
