import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("fileUploader", { static: false }) fileUploader: ElementRef;
  @ViewChild("labelImport", { static: false }) labelImport: ElementRef;
  fileToUploadOnSelect: File = null;
  myuseridstring = "1";
  uploadForm: FormGroup;
  beforePost: boolean = true;
  onPost: boolean = false;
  fileadded: any;

  SERVER_URL = "http://localhost:3000/upload";
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [""],
    });
  }
  onFileChange(files: FileList) {
    if (files.length > 0) {
      this.labelImport.nativeElement.innerText = Array.from(files)
        .map((f) => f.name)
        .join(", ");
      this.fileToUploadOnSelect = files.item(0);
    }
  }

  resetFileUploader() {
    this.labelImport.nativeElement.innerText = "Choose file";
    this.fileUploader.nativeElement.value = "";
    this.fileToUploadOnSelect = null;
  }
  onSubmit() {
    if (this.fileToUploadOnSelect != null) {
      this.beforePost = false;
      this.onPost = true;
      const formData = new FormData();
      formData.append(
        "file",
        this.fileToUploadOnSelect,
        this.fileToUploadOnSelect.name
      );
      //any id should be converted to form data
      formData.append("userId", this.myuseridstring);

      this.httpClient.post<any>("this.SERVER_URL", formData).subscribe(
        (data) => {
          if (data.success == true) {
            //return api data
          }
        },
        (error) => {}
      );
    } else {
      alert("please add file before you post");
    }
  }
}
