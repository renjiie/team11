import React, { Suspense, lazy } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
	<LoadingOutlined
		style={{ fontSize: '4rem', color: '#c51d23', margin: '20% 0' }}
		spin
	/>
);
const Login = lazy(() => import('./login'));
const Leaderboard = lazy(() => import('./leaderboard'));
const App = () => {
	return (
		<div className='App'>
			<Suspense fallback={antIcon}>
				<Router basename='/team11'>
					<Switch>
						<Route exact path='/'>
							<Redirect to='/leaderboard' />
						</Route>
						<Route exact path='/leaderboard' component={Leaderboard} />
						<Route exact path='/admin' component={Login} />
					</Switch>
				</Router>
			</Suspense>
		</div>
	);
};

export default App;
