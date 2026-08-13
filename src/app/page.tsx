import { redirect } from "next/navigation";

const HOME_PATH = "/home/renewable-energy-the-core";

export default function HomePage() {
  redirect(HOME_PATH);
}
