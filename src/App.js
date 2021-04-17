import React, { useState } from 'react';
import Login from './login';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Leaderboard from './leaderboard';

const App = () => {
	return (
		<div className='App'>
			<Router basename='/team11'>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/leaderboard' />
					</Route>
					<Route exact path='/leaderboard' component={Leaderboard} />
					<Route exact path='/admin' component={Login} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
