export const getTimeSince = (date: string) => {
	const minutes = Math.round((Date.now() - new Date(date).getTime()) / 60000);
	if (!minutes)
		return Math.round((Date.now() - new Date(date).getTime()) / 1000) + " seconds ago";
	else if (minutes > 60)
		return Math.round((Date.now() - new Date(date).getTime()) / 3600000) + " hours ago";
	else
		return minutes + " minutes ago"
}