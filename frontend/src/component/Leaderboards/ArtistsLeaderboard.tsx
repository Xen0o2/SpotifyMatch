import "./Leaderboard.scss"

import { useEffect, useState } from "react";

import { Artist } from "../../Models/Spotify"
import { useSpofity } from "../../Provider/SpotifyProvider";
import { formatFollowers } from "../../Utils/format";
import TemplateLeaderboards from "./TemplateLeaderboard";
import { Link } from "react-router-dom";

export default function ArtistsLeaderboard() {
	
	const timeRanges = [
		{ title: "Last 4 weeks", value: "short_term"},
		{ title: "Last 6 months", value: "medium_term"},
		{ title: "All time", value: "long_term"}
	]

	const SpotifyAPI = useSpofity();
	
	const [topArtists, setTopArtists] = useState<Artist[]>([]);
	const [timeRange, setTimeRange] = useState("short_term");

	const switchTimeRange = () => {
		const index = timeRanges.findIndex(e => e.value == timeRange);
		const nextIndex = timeRanges[index + 1] ? index + 1 : 0;
		setTimeRange(timeRanges[nextIndex].value);
	}
	
	const getTopArtists = async () => {
		try {
			const artists = await SpotifyAPI?.getMyTopArtists({ limit: 5, time_range: timeRange });
			if (artists)
				setTopArtists(artists.items);
			else throw new Error();
		} catch(e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getTopArtists();
	}, [timeRange])

	return (
		<>
		<div className="home-body-category-header">
			<div className="home-body-category-title">
				<h1>Top Artists</h1>
				<button onClick={switchTimeRange}>{timeRanges.find(e => e.value == timeRange)?.title}</button>
			</div>
			<button>Display all</button>
		</div>
		<div className="home-body-leaderboard">
			{ topArtists.length == 0 && <TemplateLeaderboards />}
			{ topArtists.map((artist: Artist, index: number) => (
				<Link to={`/artist/${artist.id}`} className="home-body-leaderboard-element" key={index}>
					<div className="home-body-leaderboard-rank">{index + 1}</div>
					{artist.images && <img src={artist.images[0].url} alt="" />}
					<div className="home-body-leaderboard-label">
						<p className="home-body-leaderboard-label-title">{artist.name}</p>
						<p className="home-body-leaderboard-label-subtitle">{formatFollowers(artist.followers?.total) || "Not found"} followers</p>
					</div>
				</Link>
			))}
		</div>
		</>
	)
}