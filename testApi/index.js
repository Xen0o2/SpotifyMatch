import SpotifyWebApi from "spotify-web-api-node"
import fs from "fs"

const spotifyApi = new SpotifyWebApi({
	clientId: '0ccbf589615d40e587c07f28cfcfb940',
	clientSecret: '62018fced897473182c2cc38ce167374'
});

// const response = await spotifyApi.clientCredentialsGrant();
// spotifyApi.setAccessToken(response.body.access_token);
spotifyApi.setAccessToken("BQCgci2UlAvEmSDg1StFmepHW2uLrgFcfUir_uOnc9BuPb2s9WABAcd513E0chE1AeZAHVGTTNlmBeP_M9Q04MrCgnJpgzKbG5pW3rM2nrPMmFFKDKrUHLM_Xu_kIiT7iL1sY0NuMkE-xEzo3WXPMDuZuxiKHAW4vTCe2dHnbf3FGFZ8W3a8NY9tmNADHVOsb5mexaftEyUrNn2u8M2g8gS6UJbIE6aMePibF5ysO9ytC5NeG3uqRI7onNanUfS5cVEiT4mNbfwCkJS1zZR2pF3Ta2Q6L8WG9g0dGUkinpU");


const { body } = await spotifyApi.getArtistAlbums("4MgxKih2gf4BgMkPVOfvrn");

fs.writeFileSync("result.json", JSON.stringify(body, null, 4));