import Sidebar from "@/re_usables/components/sidebar/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Nav_Bar from "@/re_usables/components/Nav_Bar/Nav_Bar";

const LayoutPage = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  console.log(`session fix /go/layoutpage : `, session);

  if (!session) {
    redirect(`/`);
  }

  if (!session?.businessDetails) {
    redirect(`/account/business_details/register`);
  }

  return (
    <div className="w-full h-screen flex relative p-1  flex-col ">
      <Nav_Bar />
      <div className={`w-full flex flex-row flex-1 overflow-hidden`}>
        <Sidebar />
        <main className="w-full h-full relative overflow-y-auto p-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;
