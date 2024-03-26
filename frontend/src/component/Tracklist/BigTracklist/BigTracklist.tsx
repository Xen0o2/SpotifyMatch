import "./BigTracklist.scss"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpofity } from "../../../Provider/SpotifyProvider";

import TemplateBigTracklist from "./TemplateBigTracklist";
import { Track } from "../../../Models/Spotify";
import { getTimeSince } from "../../../Utils/getTimeSince";

export default function BigTracklist() {

	const SpotifyAPI = useSpofity();
	
	const [recentlyPlayed, setRecentlyPlayed] = useState<{track: Track, played_at: string}[]>([]);
	
	const getRecentlyPlayed = async () => {
		try {
			const tracks = await SpotifyAPI?.getMyRecentlyPlayedTracks();
			if (tracks)
				setRecentlyPlayed(tracks.items);
			else throw new Error();
		} catch(e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getRecentlyPlayed();
	}, [])

	return (
		<div className="home-body-bigtracklist">
			{ recentlyPlayed.length == 0 && <TemplateBigTracklist />}
			{ recentlyPlayed.map((element: {track: Track, played_at: string}, index: number) => (
				<Link to={`/track/${element.track.id}`} className="home-body-bigtracklist-element" key={index}>
					<div className="home-body-bigtracklist-timesince">
						<span>{getTimeSince(element.played_at)}</span>
					</div>
					<img src={element.track.album?.images[0].url} alt="" />
					<div className="home-body-bigtracklist-label">
						<p className="home-body-bigtracklist-label-title">{element.track.name}</p>
						<p className="home-body-bigtracklist-label-subtitle">{element.track.artists[0].name}</p>
					</div>
				</Link>
			))}
		</div>
	)
}