import './App.css';
import ApiProvider from './Provider/ApiProvider';

import AuthProvider from './Provider/AuthProvider';
import SpotifyProvider from './Provider/SpotifyProvider';
import Routes from './Routes';

function App() {
  	return (
		<ApiProvider>
			<SpotifyProvider>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</SpotifyProvider>
		</ApiProvider>
	);
}

export default App;
