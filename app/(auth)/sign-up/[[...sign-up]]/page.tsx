// app/signup/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignUp />
    </div>
  );
}
