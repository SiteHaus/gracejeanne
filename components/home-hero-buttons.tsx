"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function HomeHeroButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-3 mt-7">
      <Button
        onClick={() => router.push("/contact")}
        className="w-fit px-8 py-5 text-base rounded-xl"
      >
        Contact our Office (New Patient)
      </Button>
      <Button
        className="w-fit px-8 py-5 text-base rounded-xl"
        onClick={() =>
          window.open(
            "https://mycw18.eclinicalweb.com/portal1225/jsp/100mp/login_otp.jsp",
            "_blank",
          )
        }
      >
        Patient Portal (Existing Patients)
      </Button>
    </div>
  );
}
