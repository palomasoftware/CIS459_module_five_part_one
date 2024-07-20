import React,{ Component } from 'react'
import Web3 from 'web3'
import './App.css';
import {ethers} from 'ethers'
import GamingAbi from './contractsData/Gaming.json'
import GamingAddress from './contractsData/Gaming-address.json'


class Form extends Component{


    constructor(props){
	super(props)
	this.state = { selectedOption: ' ', wager: 0, account: '', player1: '' ,
            playerNumber: '',
            highLow: 'lower',
            wager: '',
            historyData: [],
            snackbar: false,
            message: '',
        }
	this.handleChange = this.handleChange.bind(this)
        this.onValueChange = this.onValueChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentWillMount(){
		this.loadBlockchainData()
    }


    async loadBlockchainData(){

    console.log('GamingAddress.address', GamingAddress.address)
    console.log('GamingAbi.abi', GamingAbi.abi)
    let NewHelloAbi = require('./contractsData/Gaming.json');
	console.log('just before the connect')
	const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-54-201-246-129.us-west-2.compute.amazonaws.com:8545"))
// const signers = await ethers.getSigners()



	    this.setState({ web3 : web3 })
	const accounts = await web3.eth.getAccounts()
	console.log("account", accounts[0])
	console.log("account1", accounts[1])
	this.setState({ account: accounts[0] })
	const owner = accounts[0]
	const player1 = accounts[1]
	//this.setState({ player1: accounts[1] })
	this.setState({ player1 })
//	var config  = require('./Gaming.json');   // put a copy in /src directory.....
	// then reference as ....    -> config.abi 
	const contract = new web3.eth.Contract(GamingAbi.abi);
	this.setState({ contract }) 
	this.setState({ data: contract })
	this.setState({ contract: contract })

	// deployed via the web3 console interface...
	// more
        console.log("GamingAddress.address", GamingAddress.address);

	contract.options.address = GamingAddress.address; 
	//contract.methods.fundGame({value: ethers.parseEther("100.0")})
//	contract.methods.fundGame({from: accounts[0],  value: web3.utils.toWei('3', 'ether')}   )
const fd = await    contract.methods.fundGame().send({from: accounts[0],  value: web3.utils.toWei('100', 'ether')}  ) 



	    //const res = await contract.methods.winOrLose(10, true, {from: accounts[0] ,value: ethers.parseEther("21.0") })
const res = await contract.methods.winOrLose(10, true).send( {from: accounts[0] ,value: web3.utils.toWei('73','ether') })



	    console.log("res", res);


	//    contract.methods.fundGame().send({from: owner, value: web3.utils.toWei('10', 'ether')}).then((f) => console.log(f))	



	// true:  mystery number > player
	// false: mystery number < player

       	// FIX !   I need to put in a second to get this to run! a 'call' will only perform a read and not update the blockchain
 	// put in the user account address  ------ the short one , not the private key!!!!
//	let gameRound =   await contract.methods.winOrLose(10, true).send({from: player1 ,value: web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))
//	gameRound =   await contract.methods.winOrLose(10, false).call(console.log)
//	gameRound =   await contract.methods.winOrLose(10, false).call(console.log)

}




// Form submitting logic, prevent default page refresh
async handleSubmit(event){
	const { selectedOption, wager } = this.state
	event.preventDefault()
	console.log(this.state.selectedOption)
	alert("this.state.selectedOption")
	alert( this.state.selectedOption)
	let  HigherThanMysteryNumber = "true"
	if (this.state.selectedOption == "High") {
		HigherThanMysteryNumber = true
	}
	else{
		HigherThanMysteryNumber = false
	}
 	alert("HigherThanMysteryNumber")
 	alert(HigherThanMysteryNumber)
	if (HigherThanMysteryNumber) { 
		alert ("yessss")
	}
	console.log("HigherThanMysteryNumber",HigherThanMysteryNumber)
	console.log("this.state.wager",this.state.wager)	
	// 
	//this.state.contract. <method> !!!!!
	// do I need await for this method? 
	// works!!!!!   
  //this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei(this.state.wager, 'ether')}).then((f) => console.log(f))
	//this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei(this.state.wager, 'ether')}).then((result) => console.log(result.logs(0)))
	//this.state.contract.methods.winOrLose(10, false).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))
	//this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))

	console.log("player1, account1", this.state.player1)



    	const initialBalance = await this.state.web3.eth.getBalance(this.state.player1)
	alert("initialBalance     " + String(initialBalance));
	alert(initialBalance)
	console.log("initialBalance",initialBalance)
	const currentBalanceInEther = Number(this.state.web3.utils.fromWei(initialBalance, 'ether'))
	alert("currentBalanceInEther   " + String(currentBalanceInEther));
	console.log("currentBalanceInEther",currentBalanceInEther)


	this.state.contract.getPastEvents(
	'AllEvents',
	{
		fromBlock: 0,
		toBlock: 'latest'
	},
	(err, events) => { console.log(events.length)
//console.log("events.returnedValues['0']", events.returnValues[0])
//console.log("events.returnedValues['0']", events.returnValues["guess"])



      if (!err){
        var obj=JSON.parse(JSON.stringify(events));
        var array = Object.keys(obj)
	this.setState({ history:  JSON.stringify(obj[array[1]].returnValues) })
        console.log("returned values (last one) ",obj[array[1]].returnValues);
	const newHistory = this.state.historyData
	newHistory.push({ historyData: JSON.stringify(obj[array[1]].returnValues) } )
	this.setState({ historyData :  newHistory })
	console.log("historyData   ===>" , this.state.historyData )

      }
      else {
        console.log(err)
      }


 } 


)


}



async handleSubmitWithHistory(event){
	const { selectedOption, wager } = this.state
	event.preventDefault()
	console.log(this.state.selectedOption)
	alert("this.state.selectedOption")
	alert( this.state.selectedOption)
	let  HigherThanMysteryNumber = "true"
	if (this.state.selectedOption == "High") {
		HigherThanMysteryNumber = true
	}
	else{
		HigherThanMysteryNumber = false
	}
 	alert("HigherThanMysteryNumber")
 	alert(HigherThanMysteryNumber)
	if (HigherThanMysteryNumber) { 
		alert ("yessss")
	}
	console.log("HigherThanMysteryNumber",HigherThanMysteryNumber)
	console.log("this.state.wager",this.state.wager)	
	// 
	//this.state.contract. <method> !!!!!
	// do I need await for this method? 
	// works!!!!!   
  this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei(this.state.wager, 'ether')}).then((f) => console.log(f))
	//this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei(this.state.wager, 'ether')}).then((result) => console.log(result.logs(0)))
	//this.state.contract.methods.winOrLose(10, false).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))
	//this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))

	console.log("player1, account1", this.state.player1)



    	const initialBalance = await this.state.web3.eth.getBalance(this.state.player1)
	alert("initialBalance     " + String(initialBalance));
	alert(initialBalance)
	console.log("initialBalance",initialBalance)
	const currentBalanceInEther = Number(this.state.web3.utils.fromWei(initialBalance, 'ether'))
	alert("currentBalanceInEther   " + String(currentBalanceInEther));
	console.log("currentBalanceInEther",currentBalanceInEther)




	this.state.contract.getPastEvents(
	'AllEvents',
	{
		fromBlock: 0,
		toBlock: 'latest'
	},
	(err, events) => { console.log(events.length) } 
)

}

// input changes of all the input field using ES6
// javascript feature computed property names
handleChange(event){
    this.setState({
      wager: event.target.value
    });
}

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }
// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
render(){
	return(
	<form onSubmit={this.handleSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="High"
              checked={this.state.selectedOption === "High"}
              onChange={this.onValueChange}
            />
            Mystery number is higher
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Low"
              checked={this.state.selectedOption === "Low"}
              onChange={this.onValueChange}
            />
            Mystery Number is lower
          </label>
        </div>      
 <div>
          Selected option is : {this.state.selectedOption}
	  Current History is: {  JSON.stringify(this.state.historyData) }
        </div>
		<div>
		<label htmlFor='wager'>wager</label>
		<input
			name='wager'
			placeholder='0'
			value = {this.state.wager}
			onChange={this.handleChange}
		/>
		</div>
				<div>
		<button>Play Round!</button>
		</div>
	</form>
	)
}
}

export default Form
