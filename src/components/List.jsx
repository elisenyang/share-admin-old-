import React from 'react';
import Post from './Post'

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='container' style={styles.container} > 
                {this.props.posts.map((post)=> {
                    return <Post postInfo={post}/>
                })}
            </div>
        )
    }
}

export default List;

const styles = {
    container: {
        width: '70vw',
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid black',
        marginTop: '5vh',
        marginBottom: '5vh',
        padding: '5px'
    }
}