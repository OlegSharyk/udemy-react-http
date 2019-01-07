import React, { Component } from 'react'
// import axios from 'axios'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css'
import Posts from './Posts/Posts'
// import NewPost from './NewPost/NewPost'
import asyncComponent from '../../HOC/asyncComponent'

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
})

class Blog extends Component {
    state = {
        auth: true
    }

    render() {

        return (
            <div className="Blog">
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                exact 
                                to="/posts" 
                                activeClassName="myActiveClass">Posts</NavLink>
                        </li>
                        <li>
                            <NavLink    
                                to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                    </ul>
                </nav>
                {/*<Route path='/' exact render={() => <h1>Home</h1>} />*/}
                <Switch>
                    <Route path='/posts' component={Posts} />
                    {/*<Route path='/' component={Posts} /> */}               
                    {/*<Redirect from="/" exact to="/posts" />*/}
                     
                    {this.state.auth ? <Route path='/new-post'  component={AsyncNewPost} /> : null }
                    {/*<Route path='/posts/:id' exact component={FullPost} />*/}
                    <Route render={() => <h1>Not found </h1>} />
                </Switch>                 
            </div>
        )
    }
}

export default Blog
