import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Categories,
    Product,
    Cart,
    NotFound,
} from 'containers';

export default (store) => {
    const requireLogin = (nextState, replace, cb) => {
        function checkAuth() {
            const {auth: {user}} = store.getState();
            if (!user) {
                // oops, not logged in, so can't be here!
                replace('/');
            }
            cb();
        }

        if (!isAuthLoaded(store.getState())) {
            store.dispatch(loadAuth()).then(checkAuth);
        } else {
            checkAuth();
        }
    };

    /**
     * Please keep routes in alphabetical order
     */
    return (
        <Route path="/" component={App}>
            { /* Home (main) route */ }
            <IndexRoute component={Categories}/>

            { /* Routes */ }
            <Route path="product/:productIndex" component={Product}/>
            <Route path="cart" component={Cart}/>

            { /* Catch all route */ }
            <Route path="*" component={NotFound} status={404}/>
        </Route>
    );
};
