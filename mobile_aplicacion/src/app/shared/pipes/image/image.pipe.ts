import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@enviroment/environment';



@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(url:string,optional?:string): string {
    if(!url){
      return '../../../../assets/no-img.png'
    }
    if(optional){
      return `${environment.backend}/${optional}`;
    }
    return `${environment.backend}/${url}`;
  }

}
