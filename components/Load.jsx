const LoadingState = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col items-center gap-4 w-96 p-8 rounded-xl ">
				<span className="loading loading-dots loading-lg"></span>
			</div>
		</div>
	);
};
export default LoadingState;
