"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

function SocialSignIn({ provider, children }: { provider: "google" | "github"; children: React.ReactNode }) {
  return (
    <Button
      onClick={async () => {
        await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
      }}
      variant={"outline"}
      type="button">
      {children}
    </Button>
  );
}

export default SocialSignIn;
