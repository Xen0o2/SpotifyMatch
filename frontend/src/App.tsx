import './App.css';

import AuthProvider from './Provider/AuthProvider';
import SpotifyProvider from './Provider/SpotifyProvider';
import Routes from './Routes';

function App() {
  	return (
		<SpotifyProvider>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</SpotifyProvider>
	);
}

export default App;
