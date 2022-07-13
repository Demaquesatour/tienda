import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from '../../../services/GLOBAL';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto : any = {};
  public config : any = {};
  public imgSelect : any | ArrayBuffer;
  public load_btn = false;
  public id : any;
  public token : any;
  public file : any = undefined;
  public url;

  constructor(
    private _route : ActivatedRoute,
    private _productoService:ProductoService,
    private _router : Router
  ) {
    this.config = {
      height: 500
    }
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
              this.imgSelect = this.url+'obtener_portada/'+this.producto.portada;
            }
          },
          error=>{
            console.log(error);
          }
        );
      }
    );
  }

  actualizar(actualizarForm:any){
    if (actualizarForm.valid) {

      var data : any = {};

      if (this.file != undefined) {
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;

      this.load_btn = true;
      this._productoService.actualizar_producto_admin(data,this.id,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente el nuevo producto.',
          });

          this.load_btn = false;

          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
          this.load_btn = false;
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe subir una portada para registrar.',
      });
      this.load_btn = false;
    }
  }

  fileChangeEvent(event:any):void{
    var file:any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imágen de envío.',
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    if (file.size <= 4000000) {

      if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);
        reader.readAsDataURL(file);


        $('#input-portada').text(file.name);
        this.file = file;

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen.',
        });

      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB.',
      });

      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file);
  }

}
