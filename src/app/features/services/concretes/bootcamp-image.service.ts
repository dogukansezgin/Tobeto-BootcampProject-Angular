import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BootcampImageBaseService } from '../abstracts/bootcamp-image-base.service';
import { Observable } from 'rxjs';
import { CreateBootcampImageResponse } from '../../models/responses/bootcamp-images/create-bootcamp-image-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BootcampImageService extends BootcampImageBaseService {

  private readonly apiUrl_AddBootcampImage = environment.apiUrl + environment.endpoints.bootcampImages.addBootcampImage;
  constructor(private httpClient: HttpClient) { super() }

  override addBootcampImage(formData: FormData): Observable<CreateBootcampImageResponse> {
    return this.httpClient.post<CreateBootcampImageResponse>(this.apiUrl_AddBootcampImage, formData);
  }

}
