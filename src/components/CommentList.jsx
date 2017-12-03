import React from 'react';
import Comment from './Comment';
import Post from './Post';

class CommentList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPost() {
        if (!this.props.flagged) {
            return (<Post postInfo={this.props.post} view={true}/>)
        }
    }
    render() {
        return (
            <div className='container' style={styles.container} > 
              {this.renderPost()}
                {this.props.comments.map((comment, index)=> {
                    return <Comment commentInfo={comment} index={index} postId={this.props.postId} post={this.props.post} flagged={this.props.flagged}/>
                })}
            </div>
        )
    }
}

export default CommentList;

const styles = {
    container: {
        width: '70vw',
        position: 'absolute',
        backgroundColor: 'white',
        marginTop: '100px',
        marginBottom: '5vh',
        padding: '5px'
    }
}