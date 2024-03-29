import "./ArtistDetails.scss"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Album, Artist, Track } from "../../Models/Spotify";
import { useSpofity } from "../../Provider/SpotifyProvider";
import { LargeAlbumElement, SmallTrackElement } from "../SpotifyElements/SpotifyElements";
import { formatFollowers } from "../../Utils/format";

export default function ArtistDetails() {

	const spotifyAPI = useSpofity();
	const { artistId } = useParams();

	const [artist, setArtist] = useState<Artist | null>();
	const [topTracks, setTopTracks] = useState<Track[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);

	const getArtist = async () => {
		try {
			const artistRequest = await spotifyAPI?.getArtist(artistId!);
			if (artistRequest)
				setArtist(artistRequest);
			else throw new Error();
		} catch(e) {
			console.log(e);
		}
	}

	const getArtistTopTracks = async () => {
		try {
			const artistTopTrackRequest = await spotifyAPI?.getArtistTopTracks(artistId!, "FR");
			if (artistTopTrackRequest)
				setTopTracks(artistTopTrackRequest.tracks);
			else throw new Error();
		} catch(e) {
			console.log(e);
		}
	}
	
	const getArtistAlbums = async () => {
		try {
			const artistAlbumsRequest = await spotifyAPI?.getArtistAlbums(artistId!);
			if (artistAlbumsRequest)
				setAlbums(artistAlbumsRequest.items);
			else throw new Error();
		} catch(e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (!artistId)
			return;
		getArtist();
		getArtistTopTracks();
		getArtistAlbums();
	}, [])

	return (
		<>
		{ artist && 
			<div className="artist-details-body">
				<div className="artist-details-header">
					<img className="artist-details-cover" src={artist.images && artist.images[0]?.url} alt="" />
					<div className="artist-details-header-section">
						{/* <span className="artist-details-header-subtitle">{album.album_type && album.album_type[0].toUpperCase() + album.album_type.slice(1).toLowerCase()}</span> */}
						<span className="artist-details-header-title">{artist.name}</span>
						<span className="artist-details-header-subtitle">{formatFollowers(artist.followers?.total) || "Unknown count"} followers</span>
					</div>
				</div>
				<div className="artist-details-toptracks">
					<div className="artist-details-toptracks-header">
						<h1>Popular tracks</h1>
					</div>
					<div className="artist-details-toptracks-content">
						{ topTracks.map((track, index) => (
							<SmallTrackElement track={track} index={index} key={index}/>
						))}
					</div>
				</div>
				<div className="artist-details-albums">
					<div className="artist-details-albums-header">
						<h1>Albums</h1>
					</div>
					<div className="artist-details-albums-content">
						{albums.map((album, index) => (
							<LargeAlbumElement album={album} key={index} />
						))}
					</div>
				</div>
			</div>
		}
		</>
	);
}