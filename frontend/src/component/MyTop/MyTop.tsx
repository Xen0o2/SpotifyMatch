import "./MyTop.scss"

import BigTracklist from "../Tracklist/BigTracklist/BigTracklist";
import TracksLeaderboard from "../Leaderboards/TracksLeaderboard";
import ArtistsLeaderboard from "../Leaderboards/ArtistsLeaderboard";

export default function MyTop() {

	return (
		<>
		<div className="home-body-content">
			<div className="home-body-category">
				<TracksLeaderboard />

				<ArtistsLeaderboard />

				<div className="home-body-category-header">
					<h1>Recently played</h1>
					<button>Display all</button>
				</div>
				
				<BigTracklist />
			</div>
		</div>
		</>
	)
}