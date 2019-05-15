import { Component, OnInit } from "@angular/core";
import { LancamentoService } from "./lancamento.service";
import { Lancamento } from "./lancamento";
import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-novo-lancamento",
	templateUrl: "./novo-lancamento.component.html",
	styleUrls: [ "./novo-lancamento.component.css" ],
})
export class NovoLancamentoComponent implements OnInit {
	ngOnInit () {
		this.addForm = this.formBuilder.group({
			descricao: [ "", Validators.required ],
			tipo: [ "", Validators.required ],
			vencimento: [ "", Validators.required ],
			valor: [ "", Validators.required ],
		});
	}

	addForm: FormGroup;
	submitted = false;
	lancamento = new Lancamento();

	constructor (
		private formBuilder: FormBuilder,
		private router: Router,
		private lancamentoService: LancamentoService,
	) {}

	onSubmit () {
		this.submitted = true;

		if (this.addForm.valid) {
			this.lancamentoService
				.adicionarLancamento(this.addForm.value)
				.subscribe(data => {
					console.log(data);
					this.router.navigate([ "" ]);
				});
		}
	}

	adicionarLancamento (): void {
		this.lancamentoService.adicionarLancamento(this.lancamento).subscribe(
			res => {
				console.log(res);
			},
			error => {
				console.log(error);
			},
		);
	}

	get f () {
		return this.addForm.controls;
	}
}
