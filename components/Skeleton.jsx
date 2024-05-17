const Loading = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4 w-96 p-8">
          <div className="skeleton h-64 w-full mb-4"></div>
          <div className="skeleton h-6 w-56 mb-2"></div>
          <div className="skeleton h-6 w-full mb-2"></div>
          <div className="skeleton h-6 w-full"></div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  