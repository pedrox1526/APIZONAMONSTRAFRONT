import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      ProductId: ['', Validators.required],
      title: '',
      description: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('ProductId').setValue(this.issue.ProductId);
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('description').setValue(this.issue.description);
      });
    });
  }

  UpdateIssue(ProductId, title, description) {
    this.issueService.UpdateIssue(this.id, ProductId, title, description).subscribe(() => {
      this.snackBar.open('Product updated successfully', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/list']);
    });
  }

}

