import { useUser } from "@auth0/nextjs-auth0";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "../components/Link";
import Image from "next/image";
const lookingFOR = [
  {
    id: 1,
    name: "Daniel Soto",
  },
  {
    id: 2,
    name: "Melyssa Soto",
  },
  {
    id: 3,
    name: "Sebastian Soto",
  },
  {
    id: 4,
    name: "Claudia Soto",
  },
  {
    id: 5,
    name: "Alvaro Soto",
  },
  {
    id: 6,
    name: "Alvaro Soto",
  },
  {
    id: 7,
    name: "Alvaro Soto",
  },
];
const Profile = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);
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
            <h2 className="text-2xl mb-6">Your current looking for...</h2>
            <div className="mt-4 max-h-[200px] overflow-x-auto">
              {lookingFOR.map((item) => {
                return (
                  <a
                    key={item.id}
                    className="cursor-pointer text-gray-900 hover:bg-blue-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
            <Link
              href="/register"
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
