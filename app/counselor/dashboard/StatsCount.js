const StatsCount = ({ studentCount, teacherCount }) => {
	return (
		<div className="w-2/4 flex flex-row gap-4">
			<div className="w-1/2 px-10 border border-zinc-200 rounded-lg shadow-sm flex items-center justify-between">
				<div className="flex flex-col font-Merriweather gap-1">
					<div className="text-3xl">{studentCount}</div>
					<div className="text-zinc-400 text-sm">Students</div>
				</div>
				<div className="">
					<img
						src={"/images/dashboard/db_students.png"}
						alt="grad_cap"
						width={85}
						height={85}
					/>
				</div>
			</div>

			<div className="w-1/2 px-10 border border-zinc-200 rounded-lg shadow-sm flex items-center justify-between">
				<div className="flex flex-col font-Merriweather gap-1">
					<div className="text-3xl">{teacherCount}</div>
					<div className="text-zinc-400 text-sm">Teachers</div>
				</div>
				<div className="">
					<img
						src={"/images/dashboard/db_teachers.png"}
						alt="grad_cap"
						width={90}
						height={90}
					/>
				</div>
			</div>
		</div>
	);
};

export default StatsCount;
