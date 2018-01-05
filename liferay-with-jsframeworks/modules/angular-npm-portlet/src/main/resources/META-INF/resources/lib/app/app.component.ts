import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms'; 
import { Customer } from './customers.class';
// import the service class 
import { CustomersService } from './customers.service'; 

export class Hero {
	id: number;
	name: string;
}

@Component({
  //selector: 'app-customers',
  styleUrls: ['/o/angular-npm-portlet/lib/app/app.component.css'] ,
  providers: [ CustomersService ],
  //templateUrl:'./app.component.html',
  //templateUrl: '/o/angular-npm-portlet/lib/app/customers.component.html',
  templateUrl:'/o/angular-npm-portlet/lib/app/app.component.html'
})
export class AppComponent  implements OnInit {
	title = 'My Customers';
	hero: Hero = {
		id: 1,
		name: 'Customer',
	};
	nameModel : String; 
	idModel : String;   
	customers : Customer[]; 
	
	createCustomer(){
		let newCustomer : Customer = {
		name: this.nameModel , 
		id : this.idModel 
		};

		this.customers.push( newCustomer ); 
		this.nameModel = this.idModel = ''; 
	}
	
	constructor( private customersService : CustomersService ) { 
		this.nameModel = '';
		this.idModel = '';
		this.title = 'My Customers';
		// consuming the service method getInventions() to fetch default inventions 
		////////////this.customers = customersService.getCustomers(); 
		//customersService.fetchCustomersData();
		//this.customers = customersService.fetchCustomersData(); 
		//customersService.fetchCustomersData(); 
		////////////customersService.fetchCustomersDataPromise();; 
		//console.log(customersService.fetchCustomersDataNew());
		/*
		customersService.getCustomersUsingPromise().then(()=>
			this.customers = customersService.getCustomersResults()
		);
		*/


		customersService.getNCCustomersUsingPromise().then(()=>
			this.customers = customersService.getCustomersResults()
		);

		/*
		customersService.getNCCustomersUsingObservable().subscribe(
			(data)=>{
				this.customers=data;
			}
		);
		*/

		/*
		customersService.getNCCustomersUsingJsonPPromise().then(()=>
			this.customers = customersService.getCustomersResults()
		);
		*/
	}

	ngOnInit() {
	}
	
	
}