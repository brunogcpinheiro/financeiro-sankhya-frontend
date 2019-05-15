import { Component, OnInit } from "@angular/core";
import { Lancamento } from "./lancamento";
import { LancamentoService } from "./lancamento.service";
import { Router } from "@angular/router";
@Component({
	selector: "app-lancamento",
	templateUrl: "./lancamento.component.html",
	styleUrls: [ "lancamento.component.css" ],
})
export class LancamentoComponent implements OnInit {
	ngOnInit (): void {
		this.listarLancamentos();
	}

	lancamentos: Lancamento[];

	constructor (
		private router: Router,
		private lancamentoService: LancamentoService,
	) {}

	listarLancamentos (): void {
		this.lancamentoService.listarLancamentos().subscribe(
			lancamentoData => {
				this.lancamentos = lancamentoData;
			},
			error => {
				console.log(error);
			},
		);
	}

	deletarLancamento (lancamento: Lancamento) {
		this.lancamentoService.deletarLancamento(lancamento.id).subscribe(data => {
			console.log(data);
			this.router.navigate([ "" ]);
			this.listarLancamentos();
		});
	}
}
