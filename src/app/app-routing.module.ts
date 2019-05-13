import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LancamentoComponent } from "./lancamento/lancamento.component";
import { NovoLancamentoComponent } from "./lancamento/novo-lancamento.component";

const routes: Routes = [
	{ path: "", component: LancamentoComponent },
	{ path: "novo", component: NovoLancamentoComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
