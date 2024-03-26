import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Track } from "../../Models/Spotify"
import { useSpofity } from "../../Provider/SpotifyProvider";
import "./Leaderboard.scss"
import TemplateLeaderboards from "./TemplateLeaderboard";

export default function TracksLeaderboard() {

	const timeRanges = [
		{ title: "Last 4 weeks", value: "short_term"},
		{ title: "Last 6 months", value: "medium_term"},
		{ title: "All time", value: "long_term"}
	]

	const SpotifyAPI = useSpofity();
	
	const [topTracks, setTopTracks] = useState<Track[]>([]);
	const [timeRange, setTimeRange] = useState("short_term");

	const switchTimeRange = () => {
		const index = timeRanges.findIndex(e => e.value == timeRange);
		const nextIndex = timeRanges[index + 1] ? index + 1 : 0;
		setTimeRange(timeRanges[nextIndex].value);
	}

	const getTopTracks = async () => {
		try {
			const tracks = await SpotifyAPI?.getMyTopTracks({ limit: 5, time_range: timeRange });
			if (tracks)
				setTopTracks(tracks.items);
			else throw new Error();
		} catch(e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getTopTracks();
	}, [timeRange])

	return (
		<>
		<div className="home-body-category-header">
			<div className="home-body-category-title">
				<h1>Top Tracks</h1>
				<button onClick={switchTimeRange}>{timeRanges.find(e => e.value == timeRange)?.title}</button>
			</div>
			<button>Display all</button>
		</div>
		<div className="home-body-leaderboard">
			{ topTracks.length == 0 && <TemplateLeaderboards />}
			{ topTracks.length > 0 && topTracks.map((track: Track, index: number) => (
				<Link to={`/track/${track.id}`} className="home-body-leaderboard-element" key={index}>
					<div className="home-body-leaderboard-rank">{index + 1}</div>
					<img src={track.album?.images[0].url} alt="" />
					<div className="home-body-leaderboard-label">
						<p className="home-body-leaderboard-label-title">{track.name}</p>
						<p className="home-body-leaderboard-label-subtitle">{track.artists[0].name}</p>
					</div>
				</Link>
			))}
		</div>
		</>
	)
}