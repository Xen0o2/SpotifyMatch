import './App.css';

import Login from './component/Login/Login';

import AuthProvider from './Provider/AuthProvider';
import Routes from './Routes';

function App() {
  	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}

export default App;
