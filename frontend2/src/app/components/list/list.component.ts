import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';
import { HttpInterceptorService } from '../../http-interceptor.service';
import {SessionService } from '../../session.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue [];
  displayedColumns = ['ProductId', 'title', 'description','actions'] 

  constructor(private issueService: IssueService, private router: Router,private http: HttpInterceptorService,private session: SessionService,private snackBar:MatSnackBar) { 
   }

  ngOnInit() {
    this.fetchIssues();
  }

    fetchIssues() {
      this.issueService.getIssue().subscribe((data: Issue []) => {
        this.issues = data;
        console.log('Data requested .....');
        console.log(this.issues);
      });
    }
    editIssue(id){
      this.router.navigate([`/edit/${id}`]);
    }

    deleteIssue(id){
      this.issueService.DeleteIssue(id).subscribe(() => {
        this.fetchIssues();
      });
    }

    login() {
      this.session.authenticate();
      this.snackBar.open('Authentication generated, you can navigate now', 'OK', {
        duration: 3000
      });
    }

  }
