import { Component, OnInit } from "@angular/core";
import { Lancamento } from "./lancamento";
import { LancamentoService } from "./lancamento.service";
import { Chart } from "chart.js";
@Component({
	selector: "app-lancamento",
	templateUrl: "./lancamento.component.html",
	styleUrls: [ "lancamento.component.css" ],
})
export class LancamentoComponent implements OnInit {
	ngOnInit (): void {
		this.listarLancamentos();
	}

	chart: Chart;
	lancamentos: Lancamento[] = [];
	receitasTotais: any;
	despesasTotais: any;

	constructor (private lancamentoService: LancamentoService) {}

	listarLancamentos (): void {
		this.lancamentoService.listarLancamentos().subscribe(
			lancamentoData => {
				this.lancamentos = lancamentoData;
				this.grafico(lancamentoData);
			},
			error => {
				console.log(error);
			},
		);
	}

	deletarLancamento (lancamento: Lancamento) {
		this.lancamentoService.deletarLancamento(lancamento.id).subscribe(data => {
			this.listarLancamentos();
		});
	}

	grafico (data: any): void {
		this.receitasTotais = data
			.filter(f => f.tipo === "RECEITA")
			.map(m => m.valor)
			.reduce((prev, acc) => {
				return (prev += acc);
			}, 0);
		this.despesasTotais = data
			.filter(f => f.tipo === "DESPESA")
			.map(m => m.valor)
			.reduce((prev, acc) => {
				return (prev += acc);
			}, 0);

		this.chart = new Chart("canvas", {
			type: "pie",
			data: {
				labels: [ "Receitas", "Despesas" ],
				datasets: [
					{
						label: "My Bar Chart",
						data: [ this.receitasTotais, this.despesasTotais ],
						backgroundColor: [ "#78e08f", "#e55039" ],
					},
				],
			},
			options: {
				title: {
					display: true,
					fontSize: 16,
					text: "Total de Receitas x Total de Despesas",
				},
				responsive: true,
				layout: {
					padding: {
						left: 10,
						right: 0,
						top: -10,
						bottom: 0,
					},
				},
				tooltips: {
					callbacks: {
						label: function (tooltipItem, data) {
							let valor =
								data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							return valor.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							});
						},
					},
				},
			},
		});
	}
}
