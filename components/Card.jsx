import Image from "next/image";
export const Card = ({
  fullName = "Daniel Soto Jaimes",
  age = 18,
  location = "Barranquilla, Atlántico",
}) => {
  return (
    <div className="max-w-sm p-3 rounded overflow-hidden border-black border-[1px]">
      <Image
        className="w-full object-cover"
        src="https://images.unsplash.com/photo-1578961771886-97d51aee46bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80"
        width={200}
        height={200}
        alt="Afro guy playing the bongo"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{fullName}</div>
        <p className="text-md">{age}</p>
        <p className=" text-md mb-2 text-blue-500 italic">{location}</p>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil. :D
        </p>
      </div>
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
    </div>
  );
};
