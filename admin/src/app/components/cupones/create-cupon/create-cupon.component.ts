import { Component, OnInit } from '@angular/core';
import { CuponService } from '../../../services/cupon.service';
import { Router } from '@angular/router';
declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public token : any;
  public cupon : any = {
    tipo: ''
  };
  public load_btn = false;

  constructor(
    private _cuponService: CuponService,
    private _router : Router,
  ) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if (registroForm.valid) {
      this.load_btn = true;
      this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registró correctamente el nuevo cupón.',
          });
          this.load_btn = false;
          this._router.navigate(['/panel/cupones']);
        },
        error=>{
          console.log(error);
          this.load_btn = false;
        }
      );
      
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos.',
      });
    }
  }
}
