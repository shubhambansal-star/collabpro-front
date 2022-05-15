import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ApiClient } from 'src/app/api-client';

declare const $: any;
@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"],
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstDepartment: any;
  public url: any = "departments";
  public tempId: any;
  public editId: any;
  public rows = [];
  private apiClient: ApiClient;
  public srch = [];
  public addDepartmentForm: FormGroup;
  public editDepartmentForm: FormGroup;
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
    this.LoadDepartment();

    this.addDepartmentForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    });

    this.editDepartmentForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  async LoadDepartment() {
    let res = await this.apiClient.get("http://127.0.0.1:8000/department-list/all")
    console.log(res)
    this.lstDepartment = res;
    this.dtTrigger.next();
    this.rows = this.lstDepartment;
    this.srch = [...this.rows];
  }

  async addDepartment() {
    if (this.addDepartmentForm.valid) {
      let obj = {
        name: this.addDepartmentForm.value.name,
        id: 0,
      };
      let res = await this.apiClient.put("http://127.0.0.1:8000/department/"+obj.id,obj)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
      this.LoadDepartment();
      $("#add_department").modal("hide");
      this.addDepartmentForm.reset();
      this.toastr.success("Department added sucessfully...!", "Success");
    }
  }

  async editDepartment() {
    if (this.editDepartmentForm.valid) {
      let obj = {
        name: this.editDepartmentForm.value.name,
        id: this.editId,
      };
      let res = await this.apiClient.patch("http://127.0.0.1:8000/department/"+obj.id,obj)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
      this.LoadDepartment();
      $("#edit_department").modal("hide");
      this.toastr.success("Department Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstDepartment.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstDepartment[index];
    this.editDepartmentForm.setValue({
      name: toSetValues.name,
    });
  }


  async deleteDepartment() {
    let res = await this.apiClient.delete("http://localhost:8000/department/"+this.tempId)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
    this.LoadDepartment();
    $("#delete_department").modal("hide");
    this.toastr.success("Department deleted sucessfully..!", "Success");
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
