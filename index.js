import React from 'react';
import { WebView, Modal } from 'react-native';
class InstagramLogin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      opacity: 0,
      curUrl: "",
      isOpen: false
    }
    this.i=0;
    this.onNavigationStateChange=this.onNavigationStateChange.bind(this);
    this.close=this.close.bind(this);
  }
  close(){
      this.setState({
          isOpen: false
      })
      this.props.onClose();
  }
  onNavigationStateChange(webViewState){
    var curUrl=webViewState.url;
    var {clientId, scopes, redirectUrl}=this.props;
    var scopesStr=scopes.join("+");
    if(curUrl=="https://www.instagram.com/"){
      this.webView.injectJavaScript("location.href='https://api.instagram.com/oauth/authorize/?client_id=" + clientId + "&redirect_uri=" + redirectUrl + "&scope=" + scopesStr + "&response_type=token'");
    }else if(/access_token=(.*?)(?:&|$)/.test(curUrl)){
      var accessToken=curUrl.match("access_token=(.*?)(?:&|$)")[1];
      this.setState({opacity: 0})
      this.props.onSuccess(accessToken);
      this.close();
    }
    this.setState({curUrl});
  }
  componentWillReceiveProps(props){
      if(props.isOpen!=this.state.isOpen)
        this.setState({
            isOpen: props.isOpen
        })
  }
  render() {
    var isOpen=this.state.isOpen;
    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={this.close}>
          {(isOpen)?<WebView
            ref={(ref)=>{this.webView=ref}}
            source={{uri: 'https://www.instagram.com/accounts/emailsignup/?hl=en'}}
            style={[{width: "100%", flex: 1, opacity: this.state.opacity}, this.props.style||{}]}
            onNavigationStateChange={this.onNavigationStateChange}
            onLoadEnd={()=>{
              if(this.i==0){
                this.i+=1;
                this.webView.injectJavaScript("location.href='/accounts/login/'");
              }
              if(this.state.curUrl=="https://www.instagram.com/accounts/login/")
                this.setState({
                  opacity: 1
                })
            }}
            onError={(err)=>{console.log(err)}}
          />:null}
    </Modal>
    );
  }
}

module.exports=InstagramLogin;
