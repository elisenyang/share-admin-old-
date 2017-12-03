import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CommentList from './CommentList'

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      comments: [],
      postId: this.props.location.query.postId,
      post: this.props.location.query.post
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

  onFlaggedPostsClick() {
    var flaggedArr =[];
   this.state.allPosts.forEach(post=> {
     if (post.flagged) {
       flaggedArr.push(post)
     }
   })
   this.setState({displayedPosts: flaggedArr, flagged: true, flaggedPosts: flaggedArr})
  }
 
  onAllPostsClick() {
   this.setState({displayedPosts: this.state.allPosts})
  }
 
  handleMenuClick(event) {
   event.preventDefault()
   this.setState({
     open: true,
     anchorEl: event.currentTarget,
   });
  }
 
  handleRequestClose() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar style={styles.AppBar} onLeftIconButtonTouchTap={(event) => this.handleMenuClick(event)}/>
      </MuiThemeProvider>
      <MuiThemeProvider>
      <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.handleRequestClose()}
        >
        <Menu>
            <MenuItem primaryText="All Posts" onClick={() => this.onAllPostsClick()}/>
            <MenuItem primaryText="Flagged Posts" onClick={() => this.onFlaggedPostsClick()}/>
          </Menu>
        </Popover>
        </MuiThemeProvider>
        <div className='homeContainer' style={styles.postContainer}> 
          <CommentList comments={this.state.comments} postId={this.state.postId} post={this.state.post} flagged={false}/>
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