import React from "react";
import { Icons } from "./Icons";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const LogOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };
  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={handleSignOut}>
      <Icons.logout />
      Logout
    </div>
  );
};

export default LogOutButton;
