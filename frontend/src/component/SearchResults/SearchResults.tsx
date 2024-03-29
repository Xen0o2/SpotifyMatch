import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../Models/Database";
import { Track, Artist, Album } from "../../Models/Spotify";
import FriendElement from "../Friends/FriendElement/FriendElement";
import { inputSearchResultsProps } from "../HomePage/Homepage";
import { LargeTrackElement, LargeArtistElement, LargeAlbumElement } from "../SpotifyElements/SpotifyElements";
import TemplateBigTracklist from "../Tracklist/BigTracklist/TemplateBigTracklist";

interface searchResultsProps {
	inputSearchResults: inputSearchResultsProps,
	loadingSearch: boolean,
	setUpdate: Dispatch<SetStateAction<boolean>>
}

export default function SearchResults({ inputSearchResults, loadingSearch, setUpdate }: searchResultsProps) {
	
	return (
		<>
		{ inputSearchResults.tracks && inputSearchResults.artists && inputSearchResults.albums &&
			<div className="home-body-content">
				<div className="home-body-category">
					<div className="home-body-category-header">
						<h1>Tracks</h1>
						{/* <button>Show more</button> */}
					</div>
					<div className="home-body-bigtracklist">
					{ inputSearchResults.tracks.length == 0 && !loadingSearch && <span className="no-result">No result found</span>}
					{ inputSearchResults.tracks.length == 0 && loadingSearch && <TemplateBigTracklist />}
					{ inputSearchResults.tracks.map((track: Track, index) => (
						<LargeTrackElement track={track} key={index} />	
					))}
					</div>
					<div className="home-body-category-header">
						<h1>Artists</h1>
						{/* <button>Show more</button> */}
					</div>
					<div className="home-body-bigtracklist">
					{ inputSearchResults.artists.length == 0 && !loadingSearch && <span className="no-result">No result found</span>}
					{ inputSearchResults.artists.length == 0 && loadingSearch && <TemplateBigTracklist />}
					{ inputSearchResults.artists.map((artist: Artist, index) => (
						<LargeArtistElement artist={artist} key={index} />	
					))}
					</div>
					<div className="home-body-category-header">
						<h1>Albums</h1>
						{/* <button>Show more</button> */}
					</div>
					<div className="home-body-bigtracklist">
					{ inputSearchResults.albums.length == 0 && !loadingSearch && <span className="no-result">No result found</span>}
					{ inputSearchResults.albums.length == 0 && loadingSearch && <TemplateBigTracklist />}
					{ inputSearchResults.albums.map((album: Album, index) => (
						<LargeAlbumElement album={album} key={index} />	
					))}
					</div>
				</div>
			</div>
		}

		{ inputSearchResults.users &&
			<div className="home-body-content">
				<div className="friend-content">
					<div className="friend-header">
						<h1>Users found {loadingSearch ? "" : `( ${inputSearchResults.users.length} )`}</h1>
					</div>
					<div className="friend-list recent">
						{ inputSearchResults.users.length == 0 && !loadingSearch && <span className="no-result">No user found</span>}
						{ inputSearchResults.users.length == 0 && loadingSearch && <TemplateBigTracklist />}
						{ inputSearchResults.users.map((friend, index) => (
						// { inputSearchResults.users.filter(user => user.id !== Cookies.get("id")).map((friend, index) => (
							<FriendElement user={friend} key={index} setUpdate={setUpdate} />
						))}
					</div>
				</div>
			</div>
		}
		</>
	)
}