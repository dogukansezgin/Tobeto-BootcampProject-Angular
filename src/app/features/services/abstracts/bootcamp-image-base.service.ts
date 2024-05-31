import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBootcampImageResponse } from '../../models/responses/bootcamp-images/create-bootcamp-image-response';

@Injectable({
  providedIn: 'root'
})
export abstract class BootcampImageBaseService {

  abstract addBootcampImage(formData:FormData):Observable<CreateBootcampImageResponse>
}
