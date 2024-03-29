import React from 'react';
import { Link } from 'react-router-dom';

class Comment extends React.Component {
    onDeleteClick() {
        if (window.confirm("Are you sure you want to delete this comment?") == true) {
        return this.onDelete();
        } else {
        console.log("You pressed Cancel!");
        }
    }

    onDelete() {
        fetch('/deleteComment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postId:this.props.postId, commentIndex: this.props.index})
        }).then((response)=> {
            return response.json()
        }).then(responseJSON => {
            console.log(responseJSON)
        })
    }

    renderPostLink() {
        if (this.props.flagged) {
            return (
                <Link to={{pathname: '/post', query: {postId: this.props.postId, post: this.props.post}}}><p>View Post</p></Link>
            )
        }
    }

    onSuspendClick() {
        if (window.confirm("Are you sure you want to suspend this user?")===true) {
            fetch('/suspend', {
                method: 'POST',
                headers: {
                 "Content-Type": "application/json"
                },
                body: JSON.stringify({userId: this.props.commentInfo.user.id})
            })
        }
     }

     onWarningClick() {
        if (window.confirm("Are you sure you want to send this user a warning?")===true) {
            fetch('/warning', {
                method: 'POST',
                headers: {
                 "Content-Type": "application/json"
                },
                body: JSON.stringify({userId: this.props.commentInfo.user.id, content: this.props.commentInfo.content})
            }).then(response => {
                console.log(response)
            })
        }
    }


    render() {
        let splitUsername = this.props.commentInfo.user.animal.split(' ')
        return (
            <div className='container' style={styles.container}>
            <div className='user' style={styles.user}>
                <div className='usernameInfo' style={styles.usernameInfo}>
                    <img src={require('../assets/icons/'+splitUsername[0].toLowerCase()+'.png')} style={styles.icon} alt='icon'/>
                    <p style={styles.username}> Anonymous {this.props.commentInfo.user.animal} <br/> answered...</p>
                </div>
                <div className='delete' style={styles.delete} onClick={()=> this.onDeleteClick()}>x</div>
            </div>
                <p className='content' style={styles.content}>{this.props.commentInfo.content}</p>
                {this.renderPostLink()}
                <a onClick={() => this.onSuspendClick()} style={styles.commentsInfo}>Suspend User</a>
                <a onClick={() => this.onWarningClick()} style={styles.commentsInfo}>Warning</a>
            </div>
        )
    }
}

export default Comment;

const styles = {
    container: {
        position: 'relative',
        borderBottom: '1px solid black',
        padding: '5px'
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