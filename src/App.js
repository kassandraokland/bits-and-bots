import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import MyRoutes from "./utils/PageRoutes";
import './scss/App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
 
const queryClient = new QueryClient();

function App({ pageProps }) {
	return (
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<MyRoutes {...pageProps} />
				</AuthProvider>
			</QueryClientProvider>
	);
}

export default App;
