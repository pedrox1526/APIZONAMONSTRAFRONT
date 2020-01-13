import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3001';

  constructor(private  http: HttpClient) { }

  getIssue(){
    return this.http.get(`${this.uri}/products`);
  }
 getIssueById(id){
 return this.http.get(`${this.uri}/products/${id}`);
 }


 addIssue(ProductId,title,description){
   const issue = {
     ProductId: ProductId,
     title: title,
     description: description
   };
   return this.http.post(`${this.uri}/products/add`, issue)
 }

 UpdateIssue(id,ProductId,title,description){
  const issue = {
    ProductId: ProductId,
    title: title,
    description: description
  };
  return this.http.put(`${this.uri}/products/update/${id}`, issue)
}
DeleteIssue(id){
  return this.http.delete(`${this.uri}/products/delete/${id}`);
}

}
