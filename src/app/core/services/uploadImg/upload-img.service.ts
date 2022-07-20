import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase)
@Injectable({
  providedIn: 'root'
})
export class UploadImgService {
  storageRef = firebase.app().storage().ref()
  constructor() { }

    async uploadFoto(nome: string, imgBase64:any) {
    try{
      let resultado = await this.storageRef.child("imgFoto/" + nome).putString(imgBase64,'data_url')
      console.log("aqui" + resultado)
      return await resultado.ref.getDownloadURL()
    }catch(err){
      console.log(err)
      return null
    }
  }
}
