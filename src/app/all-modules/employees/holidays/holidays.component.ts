import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import {ApiClient} from "src/app/api-client"
declare const $: any;
@Component({
  selector: "app-holidays",
  templateUrl: "./holidays.component.html",
  styleUrls: ["./holidays.component.css"],
})
export class HolidaysComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  lstHolidays: any;
  url: any = "holidays";
  role = "employee";
  public tempId: any;
  public editId: any;
  private apiClient: ApiClient
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addHolidayForm: FormGroup;
  public editHolidayForm: FormGroup;
  public editHolidayDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    apiClient: ApiClient,
  ) {this.apiClient = apiClient}

  ngOnInit() {
    this.loadholidays();

    this.addHolidayForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      date: ["", [Validators.required]]
    });

    // Edit Contact Form Validation And Getting Values

    this.editHolidayForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      date: ["", [Validators.required]]
    });
  }

  // Get Employee  Api Call
  async loadholidays() {
    let res = await this.apiClient.get("http://127.0.0.1:8000/holiday-list/all")
    this.lstHolidays = res;
    this.dtTrigger.next();
    this.rows = this.lstHolidays;
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

  // Add holidays Modal Api Call

  async addholidays() {
    if(this.addHolidayForm.invalid){
      this.markFormGroupTouched(this.addHolidayForm)
      return
    }
    if (this.addHolidayForm.valid) {
      let holiday = this.pipe.transform(
        this.addHolidayForm.value.date,
        "yyyy-MM-dd"
      );
      let obj = {
        name: this.addHolidayForm.value.name,
        date: holiday,
      };
      let res = await this.apiClient.put("http://localhost:8000/holiday/0",obj)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
      this.loadholidays();
      $("#add_holiday").modal("hide");
      this.addHolidayForm.reset();
      this.toastr.success("Holidays added", "Success");
    }
  }

  from(data) {
    this.editHolidayDate = this.pipe.transform(data, "yyyy-MM-dd");
  }

  // Edit holidays Modal Api Call

  async editHolidays() {
    if (this.editHolidayForm.valid) {
      let obj = {
        name: this.editHolidayForm.value.name,
        date: this.editHolidayDate,
        id: this.editId,
      };
      let res = await this.apiClient.patch("http://127.0.0.1:8000/holiday/"+obj.id,obj)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
      this.loadholidays();
      $("#edit_holiday").modal("hide");
      this.toastr.success("Holidays Updated succesfully", "Success");
    }
  }

  // Delete holidays Modal Api Call

  async deleteHolidays() {
    let res = await this.apiClient.delete("http://localhost:8000/holiday/"+this.tempId)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();})
    this.loadholidays();
    $("#delete_holiday").modal("hide");
    this.toastr.success("Holidays Deleted", "Success");
  }

  public toCheckAdmin(role){
    if(role==="admin"){
      return true
    }else{
      return false
    }
  }
  public toCheckEmployee(role){
    if(role==="employee"){
      return true
    }else{
      return false
    }
  }
  // To Get The holidays Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstHolidays.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstHolidays[index];
    this.editHolidayForm.setValue({
      name: toSetValues.name,
      date: this.pipe.transform(toSetValues.date, "dd-MM-yyyy")
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
