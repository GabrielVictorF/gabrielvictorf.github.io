import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { Medicoes } from '../../models/medicoes';

/**
 * Generated class for the MedicoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicoes',
  templateUrl: 'medicoes.html',
})
export class MedicoesPage {
	private data: Medicoes;
  private tipo: number;
  private media: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    public functions: FunctionsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicoesPage');
  }

  getMedicoes() {
  	this.api.getMedicoes().subscribe(res => {
  		this.data = res;
  		console.log(this.data);
  	});
  }

  getItems(ev: any) {
    let val = ev.target.value;
     this.api.getPesquisa(val).subscribe(res => {
       this.data = res;
      // if (val == '' || this.data.length > 0)
      //   this.noResults = false;
      // if (this.data.length == 0 && val != '')
      //   this.noResults = true;
    });
     console.log(this.data);
  }

  public mostraMedicoes(termo) {
    if (termo == 1) {
      let pesquisa = this.functions.horaAgora();
      console.log(pesquisa);
      this.api.getPesquisa(pesquisa).subscribe(res => {
          console.log(res);

        this.data = res;
        this.tipo = 1;
        let soma = 0;
        let length: number = this.data.length;

        for (let i = 0; i < length; i++) {
          soma += this.data[i].resultado;
        } 
        this.media = soma / 2;
            });
    }
  }
}