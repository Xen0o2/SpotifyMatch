import "./SpotifyElements.scss"

import { Album, Artist, Track } from "../../Models/Spotify"
import { formatDuration, formatFollowers } from "../../Utils/format"
import { Link } from "react-router-dom";

interface TrackElementProps {
	track: Track;
	referenceTrackId?: string;
	index?: number;
}

interface ArtistElementProps {
	artist: Artist
}

interface AlbumElementProps {
	album: Album
}

export function LargeTrackElement({ track }: TrackElementProps) {
	return (
		<Link to={`/track/${track.id}`} className="spotify-element-container">
			{track?.album?.images && track.album.images[0]?.url ?
				<img className="spotify-element-big-cover" src={track.album.images[0].url} alt="" /> :
				<div className="spotify-element-template-big-cover"></div>}
			<div className="spotify-element-label">
				<p className="spotify-element-label-title">{track.name}</p>
				<p className="spotify-element-label-subtitle">{track.artists[0].name}</p>
			</div>
		</Link>
	)
}

export function SmallTrackElement({ track, referenceTrackId, index }: TrackElementProps) {
	return (
		<Link to={`/track/${track.id}`} className={`spotify-small-track-container${referenceTrackId == track.id ? ` selected` : ``}`}>
			<div className="spotify-small-track-section">
				{index != undefined && <span className="spotify-small-track-subtitle">{index + 1}</span>}
				<span className="spotify-small-track-title">{track.name}</span>
			</div>
			<code className="spotify-small-track-subtitle">{formatDuration(track.duration_ms)}</code>
		</Link>
	)
}

export function LargeArtistElement({ artist }: ArtistElementProps) {
	return (
		<Link to={`/artist/${artist.id}`} className="spotify-element-container">
			{artist.images && artist.images[0]?.url ?
				<img className="spotify-element-big-cover" src={artist.images[0].url} alt="" /> :
				<div className="spotify-element-template-big-cover"></div>}
			<div className="spotify-element-label">
				<p className="spotify-element-label-title">{artist.name}</p>
				<p className="spotify-element-label-subtitle">{formatFollowers(artist.followers?.total) || "Not found"} followers</p>
			</div>
		</Link>
	)
}

export function SmallArtistElement({ artist }: ArtistElementProps) {
	return (
		<Link to={`/artist/${artist.id}`} className="spotify-small-element-container">
			{artist.images && artist.images[0]?.url ?
				<img className="spotify-element-small-cover" src={artist.images[0].url} alt="" /> :
				<div className="spotify-element-template-small-cover"></div>}
			<span>{artist.name}</span>
		</Link>
	)
}

export function LargeAlbumElement({ album }: AlbumElementProps) {
	return (
		<Link to={`/album/${album.id}`} className="spotify-element-container">
			<div className="spotify-element-hover">
				<span>{album.total_tracks} tracks</span>
			</div>
			{album?.images && album.images[0]?.url ?
				<img className="spotify-element-big-cover opacity-on-hover" src={album.images[0]?.url} alt="" /> :
				<div className="spotify-element-template-big-cover"></div>}
			<div className="spotify-element-label">
				<p className="spotify-element-label-title">{album.name}</p>
				{album.artists && <p className="spotify-element-label-subtitle">{album.artists[0].name}</p>}
			</div>
		</Link>
	)
}