import Image from "next/image";
export const Card = ({
  fullName = "Daniel Soto Jaimes",
  age = 18,
  location = "Barranquilla, Atlántico",
}) => {
  return (
    <div className="mx-auto max-w-sm p-3 rounded overflow-hidden shadow-md">
      <Image
        className="w-full object-cover"
        src="https://images.unsplash.com/photo-1578961771886-97d51aee46bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80"
        width={150}
        height={150}
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
    </div>
  );
};
