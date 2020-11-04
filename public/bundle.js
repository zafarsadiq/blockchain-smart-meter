const smartMeterABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "bill",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "int256",
          "name": "kwh",
          "type": "int256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
const smartMeterAddress = '0xfE9A61ac5b97f134863010A354DF38a75189a046';
const web3 = new Web3('http://localhost:9545');
const smartMeter = new web3.eth.Contract(smartMeterABI, smartMeterAddress);

async function sendUsageData(kwh){
	let accounts = await web3.eth.getAccounts();
	smartMeter.methods
      .set(kwh)
      .send({from: accounts[0]})
      .then(console.log);
	
}
function getBill(){
	smartMeter.methods
      .get()
	  .call()
      .then((bill)=>{
		  $("#bill").html(bill);
		  $("#usage").html(bill/10);
	  })
	  
}
var current_reading = 0;
function initMeter(){
	smartMeter.methods
      .get()
	  .call()
      .then((bill)=>{
		  $("#meter").html(bill/10);
		  current_reading = bill/10;
	  })
	  
}
var $ = jQuery;
$("document").ready(function(){
	const bulb = {
		status: 'off',
		counter: 0,
		timer: null,
		on: function(){
			$("#on").show();
			$("#off").hide();
			this.timer = setInterval(()=>{
				this.counter++;
				if(this.counter % 5 == 0 ){
					sendUsageData(this.counter / 5 + current_reading);
					$("#meter").html(this.counter / 5 + current_reading);
				}
				$("#timer").html(this.counter);
			},1000);
		},
		off: function(){
			$("#on").hide();
			$("#off").show();
			clearInterval(this.timer);
		},
		switch: function(){
			if(this.status == 'off'){
				this.on();
				this.status = 'on';
			}else{
				this.off();
				this.status = 'off';
			}
		},
		count: function(){
			
		},
		init: function(){
			$("#switch").on('click',this.switch.bind(this));
			initMeter();
		}
	};
	bulb.init();
});

