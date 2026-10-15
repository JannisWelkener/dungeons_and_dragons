import { Component, Input} from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


@Component({
  selector: 'app-dice-render',
  templateUrl: './dice-render.component.html',
  styleUrls: ['./dice-render.component.scss'],
})
export class DiceRenderComponent{

  ngAfterViewInit(){
    this.ionViewDidLoad();
  }

  @Input() dice_type: string = "w20";
  @Input() max_number: number = 1;

  @ViewChild('d_number') d_number?: ElementRef;

  private color:THREE.Color = new THREE.Color(0xffffff);
  public dice_number: string="";

  private start_rotationX=-0.14;
  private start_rotationY=0.95;
  private start_rotationZ=0.0;

  private startTime:any;

  constructor() {}

  @ViewChild('canvas')canvasEl?: ElementRef;

  public static MAX_SIZE = 400;

  private _ELEMENT: any;
  private _SCENE = new THREE.Scene();
  private _CAMERA = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
  public _RENDERER = new THREE.WebGLRenderer({ alpha: true,antialias: true });
  private _LIGHT = new THREE.DirectionalLight(this.color, 1);


  private calcSize(): number{
    return Math.min(window.innerWidth/3, window.innerHeight/3, DiceRenderComponent.MAX_SIZE)
  }

  ionViewDidLoad(){
    this.initialiseWebGLObjectAndEnvironment();
    var fsize = this.calcSize()/8;
    (this.d_number!.nativeElement).style.fontSize = fsize+'px';
    switch(this.dice_type) {
      case "w20": {
         this.max_number=20;
         break;
      }
      case "d4": {
        this.max_number=4;
         break;
      }
      case "w6": {
         this.max_number=6;
         break;
      }
      case "w12": {
         this.max_number=12;
         break;
      }
      case "w8": {
         this.max_number=8;
         break;
      }
      case "w10": {
         this.max_number=10;
         break;
      }
      default: {
        this._LIGHT.color = new THREE.Color(0xffffff);
         break;
      }
    }
    this.renderAnimation();
  }


  initialiseWebGLObjectAndEnvironment(): void {
    this._ELEMENT = this.canvasEl?.nativeElement;

    let size = this.calcSize()
    this._RENDERER.setSize(size, size);
    this._ELEMENT.appendChild(this._RENDERER.domElement);
    this._LIGHT.position.set(0, 0, 1);
    this.setColor();
    this._SCENE.add(this._LIGHT);
    this._CAMERA.position.z = 5;
    if(this.dice_type == "w20")
      this._CAMERA.position.z = 4;
    if(this.dice_type == "w12")
      this._CAMERA.position.z = 7;
    if(this.dice_type == "w6")
      this._CAMERA.position.z = 6;
    var scene = this._SCENE
    var loader = new OBJLoader();

    var object_url = '/assets/'+this.dice_type+'.obj'
    loader.load( object_url, function ( obj ) {
      obj.name = 'DICE';
      scene.add( obj );

  }, undefined, function ( error ) {
	console.error( error );
  });

    this._RENDERER.setClearColor( 0x000000, 0 );
    this._SCENE.background = null;
  }

  setColor() {
    switch(this.dice_type) {
      case "w20": {
        this._LIGHT.color = new THREE.Color(0x0000ff);
         break;
      }
      case "d4": {
        this._LIGHT.color = new THREE.Color(0x005522);
        this.start_rotationX=1.2;
        this.start_rotationY=4.71;
        this.start_rotationZ=0;
         break;
      }
      case "w6": {
        this._LIGHT.color = new THREE.Color(0x01a7a7);
        this.start_rotationX=0;
        this.start_rotationY=0;
        this.start_rotationZ=0;
         break;
      }
      case "w12": {
        this._LIGHT.color = new THREE.Color(0xfc2803);
        this.start_rotationX=0.42;
        this.start_rotationY=0.25;
        this.start_rotationZ=0.58;
         break;
      }
      case "w8": {
        this._LIGHT.color = new THREE.Color(0x9403fc);
        this.start_rotationX=-0.35;
        this.start_rotationY=0.5;
        this.start_rotationZ=1.25;
         break;
      }
      case "w10": {
        this._LIGHT.color = new THREE.Color(0xfca103);
        this.start_rotationX=0.35;
        this.start_rotationY=0;
        this.start_rotationZ=0;
         break;
      }
      default: {
        this._LIGHT.color = new THREE.Color(0xffffff);
         break;
      }
    }
  }

  renderAnimation(): void {
    this.startTime = new Date().getMilliseconds();
    this._animate();
  }

  private reset=true;

  private _animate(): void {
    requestAnimationFrame(() => {
      this._animate();
    });

    var deltaTime = new Date().getMilliseconds() - this.startTime;
    this.startTime = new Date().getMilliseconds();

    if(deltaTime<0)deltaTime=1;

    if(this._SCENE.getObjectByName('DICE')){

      if(this._SCENE.getObjectByName('DICE')!.rotation.x < 4*3.14159265358979 + this.start_rotationX)
      this._SCENE.getObjectByName('DICE')!.rotation.x += 0.05 * deltaTime/100 * 15;
      if(this._SCENE.getObjectByName('DICE')!.rotation.y < 4*3.14159265358979 + this.start_rotationY)
      this._SCENE.getObjectByName('DICE')!.rotation.y += 0.05 * deltaTime/100 * 15;
      if(this._SCENE.getObjectByName('DICE')!.rotation.z < 4*3.14159265358979 + this.start_rotationZ)
      this._SCENE.getObjectByName('DICE')!.rotation.z += 0.05 * deltaTime/100 * 15;

      if(this.reset==true &&
        this._SCENE.getObjectByName('DICE')!.rotation.x >= 4*3.14159265358979 + this.start_rotationX &&
        this._SCENE.getObjectByName('DICE')!.rotation.y >= 4*3.14159265358979 + this.start_rotationY &&
        this._SCENE.getObjectByName('DICE')!.rotation.z >= 4*3.14159265358979 + this.start_rotationZ){

        this.reset=false;
        var random = Math.floor(Math.random() * (this.max_number - 1 + 1) + 1);
        this.dice_number=random.toString();

        this._SCENE.getObjectByName('DICE')!.rotation.x = 4*3.14159265358979 + this.start_rotationX
        this._SCENE.getObjectByName('DICE')!.rotation.y = 4*3.14159265358979 + this.start_rotationY
        this._SCENE.getObjectByName('DICE')!.rotation.z = 4*3.14159265358979 + this.start_rotationZ
      }



      this._RENDERER?.render(this._SCENE, this._CAMERA);

    }
  };

  reroll(){
    this.reset=true;
    this.dice_number="";
    this._SCENE.getObjectByName('DICE')!.rotation.x = this.start_rotationX;
    this._SCENE.getObjectByName('DICE')!.rotation.y = this.start_rotationY;
    this._SCENE.getObjectByName('DICE')!.rotation.z = this.start_rotationZ;
  }
}


