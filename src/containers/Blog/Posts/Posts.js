import React, { Component } from 'react'
import axiosinstance from '../../../axios'
import { Route  } from 'react-router-dom'
import Post from '../../../components/Post/Post'

import './Posts.css'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    state = {
        posts: [],
        selectedPost: null,
    }

    componentDidMount() {

        axiosinstance
            .get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return { ...post, author: 'Oleg' }
                })
                this.setState({ posts: updatedPosts })
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
                // this.setState({ error: true })
            })
    }

    postSelectedHandler = id => {
        // this.setState({ selectedPost: id })
        this.props.history.push({ pathname: '/posts/' + id });
        // this.props.history.push('/posts/' + id);
    }

    render() {
        // const { posts } = this.state
        let posts = <h2 style={{ textAlign: 'center' }}>Something went wrong</h2>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link key={post.id} to={'/posts/' + post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            key={post.id}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    // </Link>
                )
            })
        }

        return(
            <div>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
                <section className="Posts">{posts}</section>
            </div>
        ) 
    }
}

export default Posts