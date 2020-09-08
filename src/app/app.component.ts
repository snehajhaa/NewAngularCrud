import {Component, OnInit} from '@angular/core';
import {CommonService } from './common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularCrud';
  registerForm: FormGroup;
  submitted = false;
  allUser: any;
  isEdit = false;
  isSuccess = true;
  message = '';

constructor(private commonService: CommonService, private formBuilder: FormBuilder){}
  ngOnInit(): any {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      id: ['', Validators.required],
      admissionNo: ['', Validators.required],
     mobile:  ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.getLatestUser();
  }

  get f(): any { return this.registerForm.controls; }

  addUser(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.isEdit) {
      this.commonService.updateUser(this.registerForm.value).subscribe(() => {
        this.message = 'Student information edited successfully';
        this.getLatestUser();
      });
    } else {
      this.commonService.createUser(this.registerForm.value).subscribe(
        (response) => {
          this.message = 'Student added successfully';
          this.getLatestUser();
        },
        (error) => {
          this.message = 'Student already exist with the given student id';
          console.log('Duplicate Id is not allowed \n\n' + +JSON.stringify(error, null, 4));
        }
      );
    }
  }
  onReset(): any {
    this.isEdit = false;
    this.message = '';
    this.submitted = false;
    this.registerForm.reset();
  }
  getLatestUser(): any {
    this.commonService.getAllUser().subscribe((response) => {
      this.allUser = response;
    });
  }
  editUser(user: any): any{
    this.isEdit = true;
    this.registerForm.setValue(user);
  }
  deleteUser(user: any): any{
    this.commonService.deleteUser(user).subscribe(() =>
    {
      this.getLatestUser();
    });
  }

}
