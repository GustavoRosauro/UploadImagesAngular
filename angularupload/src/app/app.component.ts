import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData = new FormData();
  constructor(private http: HttpClient) { }

  onFileSelect(event) { 
    this.formData.append('uploadedImage', event.target.files[0],event.target.files[0].name);    
  }
  sendFile() {
      this.http.post<String>("api/uploadFile",this.formData).subscribe(result=>{
      alert(result);
      this.formData = new FormData();
    });
  }
}
