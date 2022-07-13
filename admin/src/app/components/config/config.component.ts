import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var iziToast: any;
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public token: any;
  public config : any = {};
  public titulo_cat = '';
  public icono_cat = '';
  public file: any = undefined; 

  constructor
  (private _adminService: AdminService
    ) {
      this.token = localStorage.getItem('token');
      this._adminService.obtener_config_admin(this.token).subscribe(
        response=>{
          this.config = response.data;
          console.log(this.config);
        },
        error=>{
          console.log(error);
        }
      )
     }

  ngOnInit(): void {
  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      console.log(uuidv4());
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id:uuidv4()
      });

      this.titulo_cat = '';
      this.icono_cat = '';
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: "Debe ingresar un título e ícono para la categoría.",
      });
    }
  }

  actualizar(confForm:any){
    if (confForm.valid) {
      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }
      console.log(data);
      this._adminService.actualiza_config_admin("62ccba6d64f14881b244fb6b",data,this.token).subscribe(
        response=>{
          console.log(response);
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: "Complete correctamente el formulario.",
        logo: this.file
      });
    }
  }

}
