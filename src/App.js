import React from 'react';
import { Layout } from 'antd';
import Data from "./Data/cfg.json";
import "./App.css";
import HeaderInfo from "./Header";
import GoodBox from "./GoodBox";
const { Header, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    let key = 0;
    let money = 0;
    let name = "";
    let img = "";
    let totalCost = new Map();
    // console.log(Data.goods);
    let data = Data.persons.map(i => {
      if (money === 0) {
        money = i.money;
        name = i.name;
        img = i.img
      }
      return <option key={key++} value={i.money}>{i.name}</option>;
    });
    key = 0;
    let goodsData = Data.goods.map(i => {
      totalCost.set(i.name, { "count": 0, "unitPrice": i.price, "img": i.img });
      return <GoodBox img={i.img} name={i.name} price={i.price} count={0}
        max={i.maxCount} key={key++} calc={this.addGoods.bind(this)} />;
    });
    this.state = {
      data: { Data },
      selectData: data,
      money: money,
      name: name,
      img: img,
      selectGoods: [],//已选择商品
      goods: Data.goods,
      goodsData: goodsData,
      totalCost: totalCost
    };
  }

  changeSelect(params) {
    let name = params.target[params.target.selectedIndex].text;
    let data = this.state.data;
    let img = "";
    Data.persons.map(i => {
      if (i.name === name) {
        img = i.img;
      }
    });
    this.setState({
      money: params.target.value,
      name: name,
      img: img
    }, () => {
      let totalCost = this.state.totalCost;
      totalCost.forEach((v, k) => {
        // console.log(v);
        v.count = 0;
      });
      this.forceUpdate();
    })
  }
  addGoods(key, count) {
    // console.log(key)
    // console.log(count)
    let totalCost = this.state.totalCost;
    let data = totalCost.get(key)
    data.count = count
    // console.log(data)
    // console.log(this.state.totalCost)
    // this.render();
    this.forceUpdate();
  }
  calc() {
    let totalCost = this.state.totalCost;
    let calcTotalMoney = 0;
    totalCost.forEach((v, k) => {
      // console.log(v);
      calcTotalMoney = calcTotalMoney + v.count * v.unitPrice;
    });
    return calcTotalMoney;
  }

  render() {
    let totalMoney = this.calc();
    let result = [];
    let needResult = false;
    let totalCost = this.state.totalCost;
    totalCost.forEach((v, k) => {
      console.log(v);
      if (v.count !== 0) {
        if(needResult===false){
          needResult=true;
        }
        result.push(
          <div className="resultNode">
            <img src={v.img} alt={v.name} id={v.name} className="GoodsResult" /><span>{k} x {v.count}</span>
          </div>
        );
      }
    });
    let finalResult=[];
    if (needResult) {
      finalResult.push(
        <div id="resultTitle">购物车</div>
      );
      finalResult.push(
        <div id="result">
          {result}
        </div>
      );
    }
    return (
      <div id="AppLayout">
        <div id="AppContent">
          <div className="App">
            <div id="AppSelect">
              请选择要模拟的人：<select onChange={e => this.changeSelect(e)}>
                {
                  this.state.selectData
                }
              </select>
            </div>
            <HeaderInfo name={this.state.name} img={this.state.img} money={this.state.money - totalMoney}></HeaderInfo>
            <div id="GoodsDataContent">
              {this.state.goodsData}
            </div>
          </div>
          {finalResult}
        </div>
      </div>
    );
  }
}
export default App;
