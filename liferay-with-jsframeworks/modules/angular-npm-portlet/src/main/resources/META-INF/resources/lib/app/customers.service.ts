// customers.service.ts
import { Injectable } from '@angular/core';
// import Customer class so we can use it here 
import { Customer } from './customers.class'; 
import { 
    Http,
    Jsonp, 
    URLSearchParams,
    Response,
    RequestOptions,
    Headers,
    HttpModule
 } from '@angular/http';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/toPromise';  
import 'rxjs/add/operator/map';  
import {Observable}     from 'rxjs/Observable';
//import { Response } from '@angular/http/src/static_response';

@Injectable()
export class CustomersService {

    fetchURL = "/o/angular-npm-portlet/lib/data/customers.json";
    fetchURLNC = "http://devapp277.netcracker.com:6380/rest/scp/";
// declare rawCustomers array of type Customer to instantiate our mock customers    
rawCustomers : Customer[] = [
    {
      name : 'Reliance Jio',
      id : '1',
    } , 
    {
      name : 'Airtel', 
      id : '2',
    } , 
    {
        name : 'Idea', 
        id : '3',
      } ,     
    {
      name : 'Vodafone',
      id : '4',
    }
  ]

  results: Customer[];
  constructor(private http:Http,private jsonp:Jsonp) {

   }

   // define a getCustomers() method to get the default inventions  
   getCustomers() : Customer[] {
    return this.rawCustomers; 
  }

  fetchCustomersDataPromise(){
    let url = `${this.fetchURL}`;
    let mySearchQueryParams = new URLSearchParams();
    mySearchQueryParams.set('foo','bar');

      return this.http.get(url,{search:mySearchQueryParams})
      .toPromise()
      .then(res=>console.log(res.json()))
      .catch(msg=>console.error(`Error : ${msg.status} ${msg.statusText}`));
      //.subscribe(res=>console.log(res.json()));
  }

  fetchCustomersData(){
    let url = `${this.fetchURL}`;
    let mySearchQueryParams = new URLSearchParams();
    mySearchQueryParams.set('foo','bar');

      return this.http.get(url,{search:mySearchQueryParams})
      .subscribe((res)=>{console.log(res.json());});
  }

  /*fetchCustomersDataNew() {
    let url = `${this.fetchURL}`;
    let mySearchQueryParams = new URLSearchParams();
    mySearchQueryParams.set('foo','bar');
      return this.http.get(url,{search:mySearchQueryParams})
      .subscribe((res)=>{return res.json();});
  }
*/

  getCustomersUsingPromise() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.fetchURL}`;
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                this.results = res.json().map((item:any) => {
                  return new Customer(
                      item.name,
                      item.id
                  );
                })
                //this.results = res.json();
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }


  getNCCustomersUsingPromise() {
    
    let promise = new Promise((resolve, reject) => {
      //let apiURL = `${this.fetchURLNC}getCustomer?customer_id=9149012461613283220`;
      let apiURL = `${this.fetchURLNC}customers`;
      //let headers:Headers = new Headers();
      //headers.append('Authorization', btoa('sysadm:netcracker'));
      //headers.append('Authorization', 'Basic c3lzYWRtOm5ldGNyYWNrZXI=');
      let myParams = new URLSearchParams();
      myParams.append('foo', 'bar');	
     // let opts:RequestOptions = new RequestOptions();
    //  opts.headers = headers;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Basic c3lzYWRtOm5ldGNyYWNrZXI=');
      myHeaders.append('blah', 'hoo');
      let newOptions = new RequestOptions({ headers: myHeaders, params: myParams });
      
      this.http.get(apiURL,newOptions)
          .toPromise()
          .then(
              res => { // Success
                this.results = res.json().map((item:any) => {
                  return new Customer(
                      item.name,
                      item.id
                  );
                })
                //this.results = res.json();
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  
  getNCCustomersUsingJsonPPromise() {
    
    let promise = new Promise((resolve, reject) => {
      //let apiURL = `${this.fetchURLNC}getCustomer?customer_id=9149012461613283220`;
      let apiURL = `${this.fetchURLNC}customers`;
      //let headers:Headers = new Headers();
      //headers.append('Authorization', btoa('sysadm:netcracker'));
      //headers.append('Authorization', 'Basic c3lzYWRtOm5ldGNyYWNrZXI=');
      let myParams = new URLSearchParams();
      myParams.append('callback', 'JSONP_CALLBACK');	
     // let opts:RequestOptions = new RequestOptions();
    //  opts.headers = headers;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Basic c3lzYWRtOm5ldGNyYWNrZXI=');
      myHeaders.append('blah', 'hoo');
      let newOptions = new RequestOptions({ headers: myHeaders, params: myParams });
      
      this.jsonp.request(apiURL,newOptions)
          .toPromise()
          .then(
              res => { // Success
                this.results = res.json().map((item:any) => {
                  return new Customer(
                      item.name,
                      item.id
                  );
                })
                //this.results = res.json();
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }


  getNCCustomersUsingObservable() : Observable<Customer[]>{
    
      let apiURL = `${this.fetchURLNC}customers`;
      let myParams = new URLSearchParams();
      myParams.append('foo', 'bar');	
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Basic c3lzYWRtOm5ldGNyYWNrZXI=');
      myHeaders.append('blah', 'hoo');
      let newOptions = new RequestOptions({ headers: myHeaders, params: myParams });
      
      return this.http.get(apiURL,newOptions).map( //map is actually an observable operator 
        //because it is acting on the observable that we are getting from http get
          res=>{  //res is the response from http request
                // convert the entire response object into the array of serach iotems
                let results = res.json().map((item:any)=>{
                    return new Customer(
                        item.name,
                        item.id
                    );
                })// convert the results into an array of customers
                return results;
          });
  }

  getCustomersResults() : Customer[] {
    return this.results; 
  }

}
