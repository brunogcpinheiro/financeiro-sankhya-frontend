import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Lancamento } from "./lancamento";

@Component({
	selector: "app-lancamento",
	templateUrl: "./lancamento.component.html",
	styleUrls: [ "./lancamento.component.css" ],
})
export class LancamentoComponent implements OnInit {
	response: any;
	readonly API_URL = "http://localhost:8080/financeiro/api";
	constructor (private _http: HttpClient) {}

	ngOnInit (): void {
		this.listarLancamentos();
	}

	listarLancamentos () {
		return this._http.get(`${this.API_URL}/lancamentos`).subscribe(
			data => {
				this.response = data;
			},
			error => {
				console.log("Aconteceu um erro: ", error);
			},
		);
	}

	novoLancamento (lancamento: Lancamento) {
		let body = JSON.stringify(lancamento);
		return this._http.post(`${this.API_URL}/lancamento`, body).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log("Aconteceu algum erro: ", error);
			},
		);
	}
}
