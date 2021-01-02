import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public isLoading: boolean = false
  public isFileLoading: boolean = false
  public isLoadingComplete: boolean = false
  public fileLoadingProgress = 0
  public file: File = new File([""], "", undefined)
  public errorMessage: string | undefined

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {
  }

  uploadFile(){
    if(this.file.name === undefined || this.file.name === ""){
      return
    }
    this.isLoading = true
    this.isLoadingComplete = false
    this.isFileLoading = true
    const fd = new FormData()
    fd.append('file', this.file, this.file.name)
    this.fileService.uploadFile(fd)
      .subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.fileLoadingProgress = Math.round(event.loaded / event.total!*100)
          }else if(event.type === HttpEventType.Response){
            this.isFileLoading = false
            this.isLoadingComplete = true
            this.isLoading = false
            this.file = new File([""], "", undefined)
          }
        },
        err => {
          this.isLoading = false
          if(err instanceof HttpErrorResponse){
            if(err.status == 401)
              this.errorMessage = "Login to view your data"
            if(err.status == 403)
              this.errorMessage = "Your account has not been activated. Please contact administrator."
          }
        }
        
      )
  }

  onFileSelected(event: any){
    this.file = <File> event.target.files[0]
  }

}
