import { Component, OnInit } from "@angular/core";
import { LancamentoService } from "../lancamento/lancamento.service";
import { Chart } from "chart.js";

@Component({
	selector: "app-chart",
	templateUrl: "./chart.component.html",
	styleUrls: [ "./chart.component.css" ],
})
export class ChartComponent implements OnInit {
	chart: Chart;
	receitasTotais: any;
	despesasTotais: any;

	constructor (private lancamentoService: LancamentoService) {}

	ngOnInit () {
		this.lancamentoService.listarLancamentos().subscribe(data => {
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
			            label: function(tooltipItem, data) {
			            	let valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
			            	return valor.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})
			            },
			          }
			        },
				},
			});
		});
	}
}
