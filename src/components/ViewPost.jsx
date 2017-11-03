import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CommentList from './CommentList'

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      comments: [],
      postId: this.props.location.query.postId,
      post: this.props.location.state.post
    }
  }

  componentWillMount() {
    fetch('/comments/' + this.props.location.query.postId, {
      method: 'GET'
    }).then(response =>{
      return response.json()
    }).then(responseJSON => {
        this.setState({comments: responseJSON.comments})
    })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar style={styles.AppBar}/>
        </MuiThemeProvider>
        <div className='homeContainer' style={styles.postContainer}> 
          <CommentList comments={this.state.comments} postId={this.state.postId} post={this.state.post}/>
        </div>
      </div>
    );
  }
}

const styles = {
  AppBar: {
      backgroundColor: '#6152BD',
      position: 'absolute'
  },
  postContainer: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor:'#EFF2F3',
      position:'fixed',
      width: '100vw',
      height: '100vh',
      overflow: 'scroll'
  }
}