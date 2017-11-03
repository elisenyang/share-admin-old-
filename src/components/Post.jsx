import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            post: this.props.postInfo
        }

        
    }


    render() {
        let splitUsername = this.props.postInfo.user.animal.split(' ')
        let commenters = [];
        this.props.postInfo.replies.forEach((reply) => {
            commenters.push(reply.user.animal)
        })
        let containerStyle
        if (this.props.view) {
            containerStyle = styles.container2
        } else {
            containerStyle = styles.container1
        }
        return (
            <div className='container' style={containerStyle}>
            <div className='user' style={styles.user}>
                <div className='usernameInfo' style={styles.usernameInfo}>
                    <img src={require('../assets/icons/'+splitUsername[0].toLowerCase()+'.png')} style={styles.icon} alt='icon'/>
                    <p style={styles.username}> Anonymous {this.props.postInfo.user.animal} <br/> asked...</p>
                </div>
                <div className='delete' style={styles.delete} onClick={()=> this.props.deletePost(this.state.post._id)}>x</div>
            </div>
                <p className='content' style={styles.content}>{this.props.postInfo.content}</p>
                <Link to={{pathname: '/post', query: {postId: this.props.postInfo._id}, state: this.state}}><p className='commentsInfo' style={styles.commentsInfo}>
                    Anonymous {commenters[0]} and {commenters.length < 1 ? 0 : commenters.length-1} others commented
                </p></Link>
            </div>
        )
    }
}

export default Post;

const styles = {
    container1: {
        position: 'relative',
        borderBottom: '1px solid black',
        padding: '5px'
    },
    container2: {
        position: 'relative',
        borderBottom: '1px solid black',
        padding: '5px',
        backgroundColor: '#fdf8f2'
    },
    user: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    usernameInfo: {
        position: 'relative',
        width: "50%",
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '8px'
    },
    icon: {
        height: '40px',
        width: 'auto'
    },
    username: {
        paddingLeft: '8px',
        paddingTop: '2px',
        marginTop: '0px'
    },
    content: {
        paddingLeft: '8px',
        margin: '8px'
    },
    commentsInfo: {
        paddingLeft: '8px',
        margin: '8px',
        color: 'gray'
    }
}