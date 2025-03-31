// app/login/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignIn />
    </div>
  );
}
