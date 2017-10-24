import React from 'react';

class Post extends React.Component {
    onDelete() {
        console.log('HI')
    }

    render() {
        let splitUsername = this.props.postInfo.user.animal.split(' ')
        return (
            <div className='container' style={styles.container}>
            <div className='user' style={styles.user}>
                <div className='usernameInfo' style={styles.usernameInfo}>
                    <img src={require('../assets/icons/'+splitUsername[0].toLowerCase()+'.png')} style={styles.icon} alt='icon'/>
                    <p style={styles.username}> Anonymous {this.props.postInfo.user.animal} <br/> asked...</p>
                </div>
                <button className='delete' style={styles.delete} onClick={()=> this.onDelete()}>
                    <p style={{marginTop: '0px', textAlign: 'right'}}>x</p>
                </button>
            </div>
                <p className='content' style={styles.content}>{this.props.postInfo.content}</p>
            </div>
        )
    }
}

export default Post;

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
    }
}