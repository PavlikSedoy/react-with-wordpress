import React, {Component} from 'react'
import Navbar from "./Navbar"
import axios from 'axios'
import { Link } from '@reach/router'
import renderHTML from 'react-render-html'
import '../style.css'
import Moment from 'react-moment'

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            posts: [],
            error: ''
        }
    }

    componentDidMount() {
        const wordpressSiteUrl = 'http://localhost:3000';
        this.setState( { loading: true }, () => {
            axios.get( `${wordpressSiteUrl}/wp-json/wp/v2/posts` )
                .then( res => {
                    this.setState({ loading: false, posts: res.data })
                } )
                .catch( error => this.setState( { loading: false, error: error.response.data } ) )
        } );
    }

    render() {

        const { posts } = this.state

        return (
            <div>
                <Navbar />
                { posts.length ? (
                    <div className="mt-5 post-container">
                        { posts.map( post => (
                            <div key={ post.id } className="card corder-dark mb-3" style={{ width: '50rem' }}>
                                {/* Title */}
                                <div className="card-header">
                                    <Link to={`/post/${post.id}`}>
                                        {post.title.rendered}
                                    </Link>
                                </div>
                                {/*  Body  */}
                                <div className="card-body">
                                    <div className="card-text post-content">
                                        { renderHTML(post.content.rendered) }
                                    </div>
                                </div>
                                {/*  Footer  */}
                                <div className="card-footer">
                                    <Moment fromNow >{post.date}</Moment>
                                </div>
                            </div>
                        ) ) }
                    </div>
                ) : '' }
            </div>
        );
    }
}

export default Home;