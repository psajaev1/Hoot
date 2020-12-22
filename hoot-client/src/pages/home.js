import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Posts from '../components/Posts'

export class home extends Component {
    state = {
        posts: null
    }

    componentDidMount() {
        axios.get('/Posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        let showPosts = this.state.posts ? (
            this.state.posts.map(posts => <Posts posts={posts}/>)
        ) : <p> loading</p>

        return (
            <Grid container spacing={16}>
                <Grid item sm={4 } xs={12}>
                    <p>profile</p>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {showPosts}
                </Grid>
            </Grid>
        )
    }
}

export default home
