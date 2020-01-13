import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from "axios";
import renderHTML from "react-render-html";
import Moment from "react-moment";
import Loader from "../loader.gif";

class SinglePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            post: {},
            error: ''
        }
    }

    componentDidMount() {
        const wordpressSiteUrl = 'http://localhost:3000';
        this.setState( { loading: true }, () => {
            axios.get( `${wordpressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}` )
                .then( res => {
                    this.setState({ loading: false, post: res.data })
                } )
                .catch( error => this.setState( { loading: false, error: error.response.data.message } ) )
        } );
    }

    render() {

        const { post, loading, error } = this.state

        return (
            <div>
                <Navbar />
                { error && <div className="alert alert-danger">{ error }</div> }
                { Object.keys( post ).length ? (
                    <div className="mt-5 post-container">
                        <div key={ post.id } className="card corder-dark mb-3" style={{ width: '50rem' }}>
                            {/* Title */}
                            <div className="card-header">
                                    {post.title.rendered}
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
                    </div>
                ) : '' }
                { loading && <img className="loader" src={Loader} alt="loader" /> }
            </div>
        );
    }
}

export default SinglePost;