import "./Homepage.scss"

import { useSpofity } from "../../Provider/SpotifyProvider";

import HomepageFriends from "../Friends/Friends";
import MyTop from "../MyTop/MyTop";
import HomepageStatistics from "../Statistics/Statistics";
import { Link, useLocation } from "react-router-dom";
import Rooms from "../Rooms/Rooms";
import React, { useEffect, useState } from "react";
import { Track, Artist, Album } from "../../Models/Spotify";
import { LargeTrackElement, LargeArtistElement, LargeAlbumElement } from "../SpotifyElements/SpotifyElements";
import TemplateBigTracklist from "../Tracklist/BigTracklist/TemplateBigTracklist";

interface searchResultsProps {
	tracks: Track[],
	artists: Artist[],
	albums: Album[]
}

export default function Homepage({ children }: { children: React.ReactNode}) {

	const defaultResults: searchResultsProps = { tracks: [], artists: [], albums: [] };
	
	const location = useLocation();
	const SpotifyApi = useSpofity();

	const [searchInput, setSearchInput] = useState("");
	const [searchResults, setSearchResults] = useState(defaultResults);
	const [loadingSearch, setLoadingSearch] = useState(false);

	const path = window.location.href;
	const arg = path.split("/")[path.split("/").length - 1] as keyof typeof components;

	const components = {
		"": <MyTop />,
		top: <MyTop />,
		friends: <HomepageFriends />,
		statistics: <HomepageStatistics />
	}

	const search = async () => {
		try {
			const results = await SpotifyApi?.search(searchInput, [ "track", "artist", "album" ]);
			setSearchResults({ tracks: results?.tracks?.items || [], artists: results?.artists?.items || [], albums: results?.albums?.items || []})
			setLoadingSearch(false);
		} catch(e) {
			setLoadingSearch(false);
			console.log(e)
		}
	}

	useEffect(() => {
		setLoadingSearch(true);
		if (searchInput.length == 0)
			setSearchResults(defaultResults);
		else {
			let timeout: ReturnType<typeof setTimeout>;
			timeout = setTimeout(async () => {
				search()
			}, 800);
			return () => clearTimeout(timeout)
		}
	}, [searchInput])

	useEffect(() => {
		setSearchInput("");
		console.log(location)
	}, [location])
	
	return (
		<div className="home-page">
			<div className="home-sidebar">
				<header className="home-header">
					<h1>Spotify Match</h1>
				</header>
				<Rooms />
			</div>

			<div className="home-body">
				<div className="home-body-header">
					<nav className="home-body-nav">
						<li><Link to="/top" className={`home-body-nav-element ${arg == "top" || arg == "" ? "selected" : ""}`}>My Top</Link></li>
						<li><Link to="/friends" className={`home-body-nav-element ${arg == "friends" ? "selected" : ""}`}>Friends</Link></li>
						<li><Link to="/statistics" className={`home-body-nav-element ${arg == "statistics" ? "selected" : ""}`}>Statistics</Link></li>
					</nav>
					<input className="home-body-search-input" type="text" placeholder="Looking for something ?" onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
					<div className="home-body-user">
						<span>Alex</span>
						<img src="https://c.wallhere.com/photos/2f/af/fire-145392.jpg!d" alt="" />
					</div>
				</div>
				{searchInput.length > 0 ?
					<div className="home-body-content">
						<div className="home-body-category">
							<div className="home-body-category-header">
								<h1>Tracks</h1>
								<button>Show more</button>
							</div>
							<div className="home-body-bigtracklist">
							{ searchResults.tracks.length == 0 && !loadingSearch && <span>No result found</span>}
							{ searchResults.tracks.length == 0 && loadingSearch && <TemplateBigTracklist />}
							{ searchResults.tracks.map((track: Track, index) => (
								<LargeTrackElement track={track} key={index} />	
							))}
							</div>
							<div className="home-body-category-header">
								<h1>Artists</h1>
								<button>Show more</button>
							</div>
							<div className="home-body-bigtracklist">
							{ searchResults.artists.length == 0 && !loadingSearch && <span>No result found</span>}
							{ searchResults.artists.length == 0 && loadingSearch && <TemplateBigTracklist />}
							{ searchResults.artists.map((artist: Artist, index) => (
								<LargeArtistElement artist={artist} key={index} />	
							))}
							</div>
							<div className="home-body-category-header">
								<h1>Albums</h1>
								<button>Show more</button>
							</div>
							<div className="home-body-bigtracklist">
							{ searchResults.albums.length == 0 && !loadingSearch && <span>No result found</span>}
							{ searchResults.albums.length == 0 && loadingSearch && <TemplateBigTracklist />}
							{ searchResults.albums.map((album: Album, index) => (
								<LargeAlbumElement album={album} key={index} />	
							))}
							</div>
						</div>
					</div> : children
				}
			</div>
		</div>
	);
}