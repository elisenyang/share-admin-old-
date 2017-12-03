import React from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from './List'
import CommentList from './CommentList'
import Comment from './Comment'


class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayedPosts: [],
      allPosts: [],
      flaggedPosts: [],
      flagged: false,
      open: false,
      anchorEl: null,
      flaggedComments: [],
      comments: false
    }
  }
 componentDidMount() {
  fetch('/home', {
    method: 'GET'
  }).then(  response => {
    return response.json()
  }).then(  responseJSON => {
    this.setState({allPosts: responseJSON.posts, displayedPosts: responseJSON.posts})
    var flaggedComments = []
    this.state.allPosts.forEach(post=> {
      post.replies.forEach(comment => {
        if (comment.flagged) {
          var temp = Object.assign({}, comment)
          temp.postId = post._id
          flaggedComments.push(temp)
        }
      })
    })
    this.setState({flaggedComments: flaggedComments})
  }).catch( err => {
    console.log(err)
  })
 }

 onFlaggedPostsClick() {
   var flaggedArr =[];
  this.state.allPosts.forEach(post=> {
    if (post.flagged) {
      flaggedArr.push(post)
    }
  })
  this.setState({displayedPosts: flaggedArr, flagged: true, flaggedPosts: flaggedArr, comments: false})
 }

 onAllPostsClick() {
  this.setState({displayedPosts: this.state.allPosts, comments: false})
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

 onFlaggedCommentsClick() {
   this.setState({comments: true})
 }

 onDeleteClick(postId) {
  if (window.confirm("Are you sure you want to delete this post?") == true) {
    fetch('/deletePost', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({postId: postId})
    }).then((response)=> {
        return response.json()
    }).then(responseJSON => {
        var update = [];
        if (!this.state.flagged) {
          this.state.allPosts.forEach(post => {
            if (post._id !== postId ) {
              update.push(post)
            }
          })
          this.setState({allPosts: update, displayedPosts: update})
        } else {
          var update =[]
          this.state.allPosts.forEach(post => {
            if (post._id !== postId ) {
              update.push(post)
            }
          })
          var flaggedArr =[];
          update.forEach(post=> {
            if (post.flagged) {
              flaggedArr.push(post)
            }
          })
          this.setState({allPosts: update, flaggedPosts: flaggedArr, displayedPosts: flaggedArr})
        }      
    })
  } else {
  console.log("You pressed Cancel!");
  }
}

renderList() {
  if (!this.state.comments) {
    return (<List posts={this.state.displayedPosts} deletePost={this.onDeleteClick.bind(this)}/>)
  } else {
    return this.state.flaggedComments.map(comment => {
      return (<CommentList comments={this.state.flaggedComments} flagged={true} postId={comment.postId}/>)
    })
  }
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
            <MenuItem primaryText="Flagged Comments" onClick={() => this.onFlaggedCommentsClick()}/>
          </Menu>
        </Popover>
        </MuiThemeProvider>
      <div className='homeContainer' style={styles.homeContainer}>
      {this.renderList()}
      
        
      </div>
    </div>
    
    )
  }
}

export default Home;


const styles = {
    AppBar: {
        backgroundColor: '#6152BD',
        position: 'absolute'
    },
    homeContainer: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:'#EFF2F3',
        position:'absolute',
        width: '100vw',
        height: '100vh',
        overflow: 'scroll'
    }
}


