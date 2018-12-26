import React, { Component } from 'react'
// import axios from 'axios'
import axiosinstance from '../../axios'

import Post from '../../components/Post/Post'
import FullPost from '../../components/FullPost/FullPost'
import NewPost from '../../components/NewPost/NewPost'
import './Blog.css'

class Blog extends Component {
    state = {
        posts: [],
        selectedPost: null,
        error: false,
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
                this.setState({ error: true })
            })
    }

    postSelectedHandler = id => {
        this.setState({ selectedPost: id })
    }

    render() {
        // const { posts } = this.state
        let posts = <h2 style={{ textAlign: 'center' }}>Something went wrong</h2>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        title={post.title}
                        author={post.author}
                        key={post.id}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                )
            })
        }

        return (
            <div>
                <section className="Posts">{posts}</section>
                <section>
                    <FullPost id={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        )
    }
}

export default Blog
