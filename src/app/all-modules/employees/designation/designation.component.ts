import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ApiClient } from "src/app/api-client"
declare const $: any;
@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  lstDesignation: any;
  departments:any;
  url: any = "designation";
  public tempId: any;
  public editId: any;
  private apiClient: ApiClient
  public rows = [];
  public srch = [];
  public addDesignationForm: FormGroup;
  public editDesignationForm: FormGroup;
  formas_pagamentos:any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadDesignation();

    this.addDesignationForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      department:["",[Validators.required]],
    });

    this.editDesignationForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      department:["",[Validators.required]],

    });
  }


  // Get designation list  Api Call
  async LoadDesignation() {
    let res = await this.apiClient.get("http://127.0.0.1:8000/designation-list/all")
    let res2 = await this.apiClient.get("http://127.0.0.1:8000/department-list/all")
    this.departments = res2;
    console.log(res)
    this.lstDesignation = res;
    this.dtTrigger.next();
    this.rows = this.lstDesignation;
    this.srch = [...this.rows];
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Add Designation  Modal Api Call
  async addDesignation() {
    if(this.addDesignationForm.invalid){
      this.markFormGroupTouched(this.addDesignationForm)
      return
    }

    if (this.addDesignationForm.valid) {
      let obj = {
        name: this.addDesignationForm.value.name,
        department: this.addDesignationForm.value.department,
        id: 0,
      };

      let res = await this.apiClient.put("http://127.0.0.1:8000/designation/"+obj.id,obj)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
      this.LoadDesignation();
      $("#add_name").modal("hide");
      this.addDesignationForm.reset();
      this.toastr.success("Desigantion added sucessfully...!", "Success");
    }
  }

  async editDesignation() {
    if (this.editDesignationForm.valid) {
      let obj = {
        name: this.editDesignationForm.value.name,
        department: this.editDesignationForm.value.department,
        id: this.editId,
      };
      let res = await this.apiClient.patch("http://127.0.0.1:8000/designation/"+obj.id,obj)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
      this.LoadDesignation();
      $("#edit_name").modal("hide");
      this.toastr.success("Department Updated sucessfully...!", "Success");
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstDesignation.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstDesignation[index];
    this.editDesignationForm.setValue({
      name: toSetValues.name,
      department: toSetValues.department,
    });
  }

  // Delete timedsheet Modal Api Call

  async deleteDesignation() {
    let res = await this.apiClient.delete("http://localhost:8000/designation/"+this.tempId)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();})
    this.LoadDesignation();
    $("#delete_name").modal("hide");
    this.toastr.success("Designation deleted sucessfully..!", "Success");
    
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
