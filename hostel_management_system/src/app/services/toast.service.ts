import { error } from 'jquery';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor() { }

fireError(message:any){
  this.toast.fire({
    icon: 'error',
    title: message
  })

}
firesuccess(message:any){
  this.toast.fire({
    icon: 'success',
    title: message
  })

}
fireinfo(message:any){
  this.toast.fire({
    icon: 'info',
    title: message
  })

}


}
