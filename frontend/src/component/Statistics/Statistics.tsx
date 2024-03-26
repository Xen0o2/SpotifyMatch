import { Link } from "react-router-dom";

export default function Statistics() {
	return (
		<>
		<div className="home-body-header">
			<nav className="home-body-nav">
				<li><Link to="/top" className="home-body-nav-element">My Top</Link></li>
				<li><Link to="/friends" className="home-body-nav-element">Friends</Link></li>
				<li><Link to="/statistics" className="home-body-nav-element selected">Statistics</Link></li>
			</nav>
			<div className="home-body-user">
				<span>Alex</span>
				<img src="https://c.wallhere.com/photos/2f/af/fire-145392.jpg!d" alt="" />
			</div>
		</div>
		<div className="home-body-content">
			<div className="home-body-category">
				<div className="home-body-category-header">
					<div className="home-body-category-title">
						<h1>Top Tracks</h1>
						<button>All time</button>
					</div>
					<button>Display all</button>
				</div>
				<div className="home-body-leaderboard">
					<div className="home-body-leaderboard-element">
						<div className="home-body-leaderboard-rank">1</div>
						<img src="https://i.scdn.co/image/ab67616d0000b2737a1bbe4ec7066c9db1d0f398" alt="" />
						<div className="home-body-leaderboard-label">
							<p className="home-body-leaderboard-label-title">Chlorine</p>
							<p className="home-body-leaderboard-label-subtitle">Twenty One Pilots</p>
						</div>
					</div>
					<div className="home-body-leaderboard-element">
						<div className="home-body-leaderboard-rank">2</div>
						<img src="https://i.scdn.co/image/ab67616d00001e029c0a340fc12d60625858ffde" alt="" />
						<div className="home-body-leaderboard-label">
							<p className="home-body-leaderboard-label-title">LOVE SUX</p>
							<p className="home-body-leaderboard-label-subtitle">Marisa Maino</p>
						</div>
					</div>
					<div className="home-body-leaderboard-element">
						<div className="home-body-leaderboard-rank">3</div>
						<img src="https://i.scdn.co/image/ab67616d00001e02352e5ec301a02278ffe53d14" alt="" />
						<div className="home-body-leaderboard-label">
							<p className="home-body-leaderboard-label-title">Hometown</p>
							<p className="home-body-leaderboard-label-subtitle">Twenty One Pilots</p>
						</div>
					</div>
					<div className="home-body-leaderboard-element">
						<div className="home-body-leaderboard-rank">4</div>
						<img src="https://i.scdn.co/image/ab67616d0000b273de5245e06fb45ca378d0238b" alt="" />
						<div className="home-body-leaderboard-label">
							<p className="home-body-leaderboard-label-title">BLAKE & MORTIMER</p>
							<p className="home-body-leaderboard-label-subtitle">Luther</p>
						</div>
					</div>
					<div className="home-body-leaderboard-element">
						<div className="home-body-leaderboard-rank">5</div>
						<img src="https://i.scdn.co/image/ab67616d0000b273f0a85efcd38babe36e4b0a49" alt="" />
						<div className="home-body-leaderboard-label">
							<p className="home-body-leaderboard-label-title">La vraie vie</p>
							<p className="home-body-leaderboard-label-subtitle">BigFlo & Oli</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}