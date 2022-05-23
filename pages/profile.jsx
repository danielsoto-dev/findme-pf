import { useUser } from "@auth0/nextjs-auth0";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "../components/Link";
import Image from "next/image";

const Profile = () => {
  const { user } = useUser();
  console.log("Loged user -> :", user);
  return (
    <>
      <Header />
      <div id="wrapper" className="flex flex-col min-h-full ">
        <h1 className="text-center text-4xl mt-[50px]">Your information</h1>
        <div className="p-8 mt-auto max-w-[800px] mx-auto grid grid-cols-2 gap-[80px]">
          <div className="">
            <h2 className="text-2xl mb-6">Acount Data</h2>
            {user?.picture && (
              <Image src={user.picture} width={50} height={50} />
            )}
            <p className="text-blue-500 text-xl">
              {user?.nickname && user?.name}
            </p>
            <p>{user?.email}</p>
          </div>
          <div id="add-new-person">
            <h2 className="text-2xl mb-6">Your search profiles...</h2>
            <div className="mt-4 max-h-[200px] overflow-x-auto">
              {
                //  Display data from missing profiles for this user
              }
            </div>
            <Link
              href="/missing-register"
              animated={false}
              className="mt-8 max-w-[180px] mx-auto block text-center border-[1px] transition duration-150 ease-in border-black rounded-md px-3 py-[5px] focus:bg-black focus:text-white hover:bg-black hover:text-white"
            >
              Add new person +
            </Link>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </>
  );
};
export default Profile;
