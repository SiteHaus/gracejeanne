"use client";

import { SignInForm } from "@/components/forms/SignInForm";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-black/40 to-black/20 py-12 md:py-0">
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0">
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
