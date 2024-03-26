export default function TemplateLeaderboards() {

	const indexes = [1, 2, 3, 4, 5];
	return (
		<>
		{indexes.map(index => (
			<div className="home-body-leaderboard-element" key={index}>
				<div className="home-body-leaderboard-rank">{index}</div>
				<div className="leaderboard-template-cover"></div>
				<div className="home-body-leaderboard-label">
					<p className="leaderboard-template-label-title"></p>
					<p className="leaderboard-template-label-subtitle"></p>
				</div>
			</div>
		))}
		</>
	)
}