import "./Homepage.scss"

import { Link, useLocation } from "react-router-dom";
import Rooms from "../Rooms/Rooms";
import React, { useEffect, useState } from "react";
import { Track, Artist, Album, SpotifyUser } from "../../Models/Spotify";
import UserPopup from "../Popup/UserPopup";
import { User } from "../../Models/Database";
import { useSpofity } from "../../Provider/SpotifyProvider";
import SearchResults from "../SearchResults/SearchResults";
import Cookies from "js-cookie";
import { useApi } from "../../Provider/ApiProvider";

export interface inputSearchResultsProps {
	users?: User[]
	tracks?: Track[],
	artists?: Artist[],
	albums?: Album[]
}

export default function Homepage({ children }: { children: React.ReactNode}) {
	const location = useLocation();
	const SpotifyApi = useSpofity();
	const api = useApi();

	const [me, setMe] = useState<SpotifyUser | null>();
	const [showUserPopup, setShowUserPopup] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [inputSearchResults, setInputSearchResults] = useState<inputSearchResultsProps>({});
	const [loadingSearch, setLoadingSearch] = useState(false);
	const [update, setUpdate] = useState(false);

	const path = window.location.href;
	const arg = path.split("/")[path.split("/").length - 1];

	const searchForUsers = async () => {
		const response = await api?.get(`/user/findByUsername`, { params: { username: searchInput } });
		if (!response)
			throw new Error("FindByUsername request failed");
		setInputSearchResults({ users: response.data })
		setLoadingSearch(false);
	}

	const searchTrackArtistAlbum = async () => {
		const results = await SpotifyApi?.search(searchInput, [ "track", "artist", "album" ]);
		setInputSearchResults({ tracks: results?.tracks?.items || [], artists: results?.artists?.items || [], albums: results?.albums?.items || []})
		setLoadingSearch(false);
	}

	const search = async () => {
		try {
			switch (arg) {
				case "friends":
					await searchForUsers();
					break;
				default:
					await searchTrackArtistAlbum();
					break;
			}
		} catch(e) {
			setLoadingSearch(false);
			console.log(e)
		}
	}

	useEffect(() => {
		setLoadingSearch(true);
		if (searchInput.length == 0)
			setInputSearchResults({});
		else {
			if (arg == "friends")
				setInputSearchResults({users: []});
			else
				setInputSearchResults({tracks: [], artists: [], albums: []});
			let timeout: ReturnType<typeof setTimeout>;
			timeout = setTimeout(async () => {
				search()
			}, 800);
			return () => clearTimeout(timeout)
		}
	}, [searchInput, update])

	const getMe = async () => {
		try {
			const meRequest = await SpotifyApi?.getMe();
			if (meRequest) {
				setMe(meRequest);
				if (!Cookies.get("id") || Cookies.get("id") != meRequest.id)
					Cookies.set("id", meRequest.id)
			} else throw new Error();
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getMe();
	}, [])

	useEffect(() => {
		setSearchInput("");
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
					<input className="home-body-search-input" type="text" placeholder={`Looking for ${arg == `friends` ? `someone` : `something`} ?`} onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
					<div className="home-body-user" onClick={() => { setShowUserPopup(old => !old) }} onMouseLeave={() => { setShowUserPopup(false) }}>
						<div>
							{me && me.display_name && <span className="home-body-user-name">{me.display_name}</span>}
							{me && me.images && <img src={me.images[me.images.length - 1]?.url} alt="" />}
						</div>
						{showUserPopup && <UserPopup />}
					</div>
				</div>
				{searchInput.length > 0 ? 
					<SearchResults inputSearchResults={inputSearchResults} loadingSearch={loadingSearch} setUpdate={setUpdate}/> :
					children
				}
			</div>
		</div>
	);
}