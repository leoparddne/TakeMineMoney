import React from 'react';
import "./Header.css"
class Header extends React.Component{
    constructor(props){
        super();
        this.state={
            name:props.name,
            img:props.img,
            money:props.money
        };
    }
    componentWillReceiveProps(props){
        // console.log(props);
        this.setState({
            name:props.name,
            img:props.img,
            money:props.money
        });
    }
    componentDidMount() {
        // 挂载滚动监听
        window.addEventListener('scroll', this.bindScroll)
      }
      componentWillUnmount() {
          // 移除滚动监听
          window.removeEventListener('scroll', this.bindScroll);
      }
      bindScroll(event){
        let portrait=document.getElementById("portrait");
        let leftDiv=document.getElementById("leftData");
        let margin=portrait.offsetTop-document.documentElement.scrollTop;
        if(margin<=0){
            leftDiv.className =" HeaderTitleFixed";
        }
        else{
            leftDiv.className =" HeaderMoney";
        }
        // console.log(margin)
      }
    render(props){
        return(
            <div id="HeaderContent">
                <div><img src={this.state.img} alt={this.state.name} className="HeaderImg"/></div>
                <div id="portrait" className="HeaderTitle">花光{this.state.name}的钱</div>
                <div id="leftData" className="HeaderMoney">剩余${this.state.money}</div>
            </div>
        );
    }
}
export default Header;