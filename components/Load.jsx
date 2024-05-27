import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoadingState = ({ route }) => {
  const router = useRouter();

  useEffect(() => {
    if (route) {
      const timer = setTimeout(() => {
        router.push(`/${route}`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [route]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4 w-96 p-8 rounded-xl ">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};
export default LoadingState;
