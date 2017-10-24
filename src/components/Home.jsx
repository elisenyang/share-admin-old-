import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from './List'


class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }
 componentDidMount() {
  fetch('/home', {
    method: 'GET'
  }).then(  response => {
    return response.json()
  }).then(  responseJSON => {
    this.setState({posts: responseJSON.posts})
  }).catch( err => {
    console.log(err)
  })
 }

 render() {
   return (
    <div>
      <MuiThemeProvider>
        <AppBar style={styles.AppBar}/>
      </MuiThemeProvider>
      <div className='homeContainer' style={styles.homeContainer}> 
        <List posts={this.state.posts}/>
      </div>
    </div>
    
    )
  }
}

export default Home;


const styles = {
    AppBar: {
        backgroundColor: '#6152BD'
    },
    homeContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}


