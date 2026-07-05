import { createLazyFileRoute } from "@tanstack/react-router";
import RechargePromotion from "@/sections/recharge-promotion";

export const Route = createLazyFileRoute("/dashboard/recharge-promotion/")({
  component: RechargePromotion,
});
