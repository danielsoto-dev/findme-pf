import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "../components/Link";
import Image from "next/image";

const Profile = () => {
  const { user } = useUser();
  const [profiles, setProfiles] = useState([]);
  console.log(user?.sub);
  const router = useRouter();
  useEffect(() => {
    async function fetchProfiles() {
      if (!user) {
        return;
      }
      let profiles = await fetch(
        `/api/search-profiles/?${new URLSearchParams({
          sub: user.sub,
        })}&type=allFromUser`
      );
      setProfiles(await profiles.json());
    }
    fetchProfiles();
  }, [user]);

  return (
    <>
      <Header />
      <div id="wrapper" className="flex flex-col min-h-full ">
        <h1 className="text-center text-4xl mt-[50px]">Información</h1>
        <div className="p-8 mt-auto max-w-[800px] mx-auto grid grid-cols-2 gap-[80px]">
          <div className="">
            <h2 className="text-2xl mb-6">Su Cuenta</h2>
            {user?.picture && (
              <Image
                src={user.picture}
                alt="User picture"
                width={50}
                height={50}
              />
            )}
            <p className="text-blue-500 text-xl">
              {user?.nickname && user?.name}
            </p>
            <p>{user?.email}</p>
          </div>
          <div id="add-new-person">
            <h2 className="text-2xl mb-6">Sus perfiles de busqueda</h2>
            <div className="mt-4 max-h-[200px] overflow-x-auto">
              {profiles.length > 0 &&
                profiles.map((profile, idx) => {
                  return (
                    <a
                      key={idx}
                      href={`/find/${profile._id}`}
                      className="cursor-pointer text-gray-900 hover:bg-blue-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
                    >
                      {profile.nickname}
                    </a>
                  );
                })}
            </div>
            <Link
              href="/search-profile-register"
              animated={false}
              className="mt-8 max-w-[180px] mx-auto block text-center border-[1px] transition duration-150 ease-in border-black rounded-md px-3 py-[5px] focus:bg-black focus:text-white hover:bg-black hover:text-white"
            >
              Agregar nuevo perfil+
            </Link>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </>
  );
};
export default Profile;
