import React from 'react';

class Login extends React.Component {
    constructor() {
        super()
         this.state = {
            email: '',
            password: ''
        }
    }

    handleEmailInput(e) {
      this.setState({
          email: e.target.value
      })
    }

    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.state.email,
              password: this.state.password
            })
          }).then(response => {
              console.log(response)
            return response.json()
          }).then(responseJSON => {
            if (responseJSON.success) {
                this.props.history.push("/")
            }
          }).catch(err => {
            // Alert('Login Error', 'Email or Password incorrect. Please try again')
            return;
          })
    }


    render() {
        return(
            <form onSubmit={(e)=> this.handleSubmit(e)}>
                <input type='text' placeholder='Email' value={this.state.email} onChange={(e)=> this.handleEmailInput(e)}/>
                <input type='text' placeholder='Password' value={this.state.password} onChange={(e)=> this.handlePasswordInput(e)}/>
                <input type='submit' value='Login'/>
            </form>
        )
    }
}

export default Login;