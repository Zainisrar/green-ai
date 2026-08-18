import { redirect } from "next/navigation";

/** The primary Energy entry point is the restored Engineering/EPCM service page. */
export default function EnergyPage() {
  redirect("/engineering/solar-epcm-services");
}
