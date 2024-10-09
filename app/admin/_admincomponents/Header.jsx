import { getUserSession } from "@/lib/helperFunctions";

const Header = ({ title }) => {
  const userSession = getUserSession();

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center md:mt-0 xs:mt-10">
      <h1 className="text-2xl text-white font-medium">{title}</h1>
      <div className="flex items-center">
        <img
          src={userSession?.image}
          alt="Profile"
          className="rounded-full h-10 w-10"
        />
        <span className="ml-4 text-white">
          {userSession?.firstName} {userSession?.lastName}
        </span>
      </div>
    </header>
  );
};

export default Header;
