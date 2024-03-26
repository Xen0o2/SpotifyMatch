export const formatFollowers = (count?: number) => {
	return count?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const formatDuration = (duration_ms: number, long: boolean = false) => {
	const minutes = Math.ceil(duration_ms / 60000);
	const seconds = Math.ceil(duration_ms % 60000 / 1000);

	return (
		long ?
			(minutes > 0 ? `${minutes} min` : ``) + (seconds > 0 ? `${seconds} s` : ``) :
			`${minutes}:${seconds < 10 ? `0` : ``}${seconds}`
	)
}