export default function TemplateBigTracklist() {
	const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div className="home-body-bigtracklist">
			{ indexes.map(index => (
				<div className="home-body-bigtracklist-element" key={index}>
					<div className="bigtracklist-template-cover"></div>
					<div className="home-body-bigtracklist-label">
						<p className="bigtracklist-template-label-title"></p>
						<p className="bigtracklist-template-label-subtitle"></p>
					</div>
				</div>
			))}
		</div>
	)
}