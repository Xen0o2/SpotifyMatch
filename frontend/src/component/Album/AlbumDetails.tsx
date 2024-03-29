import "./AlbumDetails.scss"

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Album, Artist, Track } from "../../Models/Spotify";
import { useSpofity } from "../../Provider/SpotifyProvider";
import { LargeAlbumElement, SmallArtistElement, SmallTrackElement } from "../SpotifyElements/SpotifyElements";


export default function AlbumDetails() {
	
	let { trackId, albumId } = useParams();
	const spotifyAPI = useSpofity();
	const location = useLocation();

	const [album, setAlbum] = useState<Album | null>(null);
	const [albums, setAlbums] = useState<Album[]>([]);

	const getAlbum = async () => {
		try {
			let albumRequest = await spotifyAPI?.getAlbum(albumId!);
			if (albumRequest) {
				const artistsRequest = await spotifyAPI?.getArtists(albumRequest.artists.map(artist => artist.id))
				if (artistsRequest)
					albumRequest.artists = artistsRequest.artists;
				setAlbum(albumRequest);
			}
			else throw new Error();
			const albumsRequest = await spotifyAPI?.getArtistAlbums(albumRequest.artists[0].id);
			if (albumsRequest)
				setAlbums(albumsRequest.items);
		} catch(e) {
			console.log(e);
		}
	}

	const getAlbumWithTrack = async () => {
		try {
			const trackRequest = await spotifyAPI?.getTrack(trackId!);
			if (!trackRequest)
				throw new Error();
			albumId = trackRequest.album.id;
			getAlbum();
		} catch(e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (albumId)
			getAlbum();
		else
			getAlbumWithTrack();
	}, [location])

	return (
		<>
		{ album && 
			<>
			<div className="album-details-body">
				<div className="album-details-header">
					<img className="album-details-cover" src={album.images && album.images[0]?.url} alt="" />
					<div className="album-details-header-section">
						<span className="album-details-header-subtitle">{album.album_type && album.album_type[0].toUpperCase() + album.album_type.slice(1).toLowerCase()}</span>
						<span className="album-details-header-title">{album.name}</span>
						<span className="album-details-header-subtitle">{album.release_date?.match(/\d{4}/g)} · {album.total_tracks} tracks</span>
					</div>
				</div>
				<div className="album-details-section">
					<div className="album-details-artists">
						<div className="album-details-artists-header">
							<h1>Artists</h1>
						</div>
						<div className="album-details-artists-content">
							{ album.artists && album.artists.map((artist, index) => (
								<SmallArtistElement artist={artist} key={index}/>
							))}
						</div>
					</div>
					<div className="album-details-tracks">
						<div className="album-details-tracks-header">
							<h1>Tracks</h1>
						</div>
						<div className="album-details-tracks-content">
							{album.tracks && album.tracks.items.map((track, index) => (
								<SmallTrackElement track={track} referenceTrackId={trackId} index={index} key={index} />
							))}
						</div>
					</div>
				</div>
				<div className="album-details-albums">
					<div className="album-details-albums-header">
						<h1>Other albums</h1>
					</div>
					<div className="album-details-albums-content">
						{albums.map((album, index) => (
							<LargeAlbumElement album={album} key={index} />
						))}
					</div>
				</div>
			</div>
			
			</>
		}
		</>
	)
}