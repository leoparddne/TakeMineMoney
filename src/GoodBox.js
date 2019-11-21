import React from 'react';
import "./GoodBox.css";

class GoodBox extends React.Component {
    constructor(props) {
        super();
        this.state = {
            img: props.img,
            name: props.name,
            price: props.price,
            count: props.count,
            max: props.max,
            calc:props.calc,
            style:"GoodBoxSellNormal"
        }
    }
    Buy() {
        let count = this.state.count;
        let max = this.state.max;
        // console.log(max)
        if (max !== -1 && count === max) {
            return;
        }
        this.setState({
            count: count + 1
        })
        if(count===0){
            this.setState({
                style:"GoodBoxSell"
            })
        }
        this.state.calc(this.state.name,count+1)
    }
    Sell() {
        let count = this.state.count;
        if (count === 0) {
            return;
        }
        this.setState({
            count: count - 1
        })
        if(count===1){
            this.setState({
                style:"GoodBoxSellNormal"
            })
        }
        this.state.calc(this.state.name,count-1)
    }
    render(props) {
        return (
            <div className="GoodBox">
                <div><img src={this.state.img} alt={this.state.name} /></div>
                <div>{this.state.name}</div>
                <div className="GoodBoxPrice">${this.state.price}</div>
                <div>
                    <input type="button" value="卖" className={this.state.style} onClick={e => this.Sell(e)} />
                    <input type="text" readOnly={true} value={this.state.count} className="GoodBoxText" />
                    <input type="button" value="买" className="GoodBoxBtn" onClick={e => this.Buy(e)} />
                </div>
            </div>
        )
    }
}

export default GoodBox;