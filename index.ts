#! /usr/bin/env node 
import inquirer from "inquirer";



//make interface bank acoount;
//make customer class;
// make bankacoount class ;

class customer {
    Firstname :string;
    Lastname :string ;
    Age : number ;
    Gender : string ;
    mobile:number;
    account : BankAcnt;

    constructor(firstn:string,lastn : string , age:number, gender:string , mobile:number, account :BankAcnt){
        this.Firstname = firstn;
        this.Lastname = lastn;
        this.Age = age;
        this.Gender = gender;
        this.mobile = mobile;
        this.account = account;

    }
}

interface bankaccount {
    AccountNumber : number;
    AccountBalance : number,
};

class BankAcnt implements bankaccount{
    AccountNumber : number;
    AccountBalance : number;
   
    constructor( accountnumber : number , accountbalance: number, ){
        this.AccountNumber = accountnumber;
        this.AccountBalance =accountbalance ;
        
    }
    //taken out money 
    Debit(amount:number){
        if(this.AccountBalance >= amount){
            this.AccountBalance -= amount;
            
            if (amount> 100){
                amount -= 1;
            }    

            console.log(`withdrawl of ${amount} has successfully done . Your remaining amount is ${this.AccountBalance}` );
        }
    }
    // Deposited in the account
    Credit (amount:number){
        if (amount> 0){
            this.AccountBalance += amount ;
        }
        console.log(`your deposit of amount ${amount} has successfully done . your current balance is is ${this.AccountBalance}`)
    }    
    // checking the account balance 
    checkBalance (){
        console.log(`Your current balance is ${this.AccountBalance}`);
    }
}




const accounts: BankAcnt[] = [
    new BankAcnt(1001, 500),
    new BankAcnt(1002, 1000),
    new BankAcnt(1003, 2000),
];

const customerslist: customer[] = [
    new customer("Sidra", "Jabin", 31, "Female", 23434, accounts[0]),
    new customer("Syed", "Balaj", 24, "Female", 23434, accounts[1]),
    new customer("Rabia", "Begum", 70, "Female", 23434, accounts[2]),
];


async function service (){
    do{
        const takeaccnum= await inquirer.prompt([{
            name :"accountNumber",
            type : "number",
            message : "Enter your Account Number",
            
        }])
            const customer = customerslist.find (customer=>customer.account.AccountNumber === takeaccnum.accountNumber);
            if (customer){
                console.log(`Welcome to the Alfala Bank Limited , May I help you ${customer.Firstname} ${customer.Lastname}  `);
                
                const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Choose the operation",
                    choices: ["Credit", "Debit", "Account Balance", "Exit"]
                }]);

                    if(ans.select == "Credit"){
                        const depositamount = await inquirer.prompt ({
                            name : "amount",
                            type : "number",
                            message : "Enter Your amount to deposit please"
                        });
                        customer.account.Credit(depositamount.amount);
                        break;
                    }
                    else if(ans.select == "Debit"){
                        const withdrawlamount =await inquirer.prompt({
                            name : "amount",
                            type : "number" ,
                            message :"Enter your amount to withdrawl "
                    });
                    customer.account.Debit(withdrawlamount.amount);
                    break;
                    }
                    else if(ans.select == "Account Balance"){
                        customer.account.checkBalance();
                        break;
                    }else {
                        console.log("Existing Bank Process");
                        console.log("\n Thankyou for using our bank services" );
                        process.exit();
                    }
                   
                

            }
            else{
                console.log("Invalid account Number");
            }
    }while(true)
}
service()











    







