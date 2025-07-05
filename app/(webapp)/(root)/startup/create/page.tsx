import { auth } from "@/app/auth";
import CreateStartupForm from "@/components/CreateStartupForm/CreateStartupForm";
import { redirect } from "next/navigation";

export default async function CreateStartup() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <h1 className="heading">Submit your Startup Pitch</h1>
      </section>

      <CreateStartupForm />
    </>
  );
}
