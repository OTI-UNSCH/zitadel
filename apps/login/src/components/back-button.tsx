"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Button, ButtonVariants } from "./button";
import { Translated } from "./translated";

export function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} type="button" variant={ButtonVariants.Secondary} className="cursor-pointer">
      <ArrowLeftIcon className="h-4 w-4 mr-2" />
      <Translated i18nKey="back" namespace="common" />
    </Button>
  );
}
