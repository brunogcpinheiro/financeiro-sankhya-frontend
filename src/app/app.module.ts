import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { LancamentoComponent } from "./lancamento/lancamento.component";
import { NovoLancamentoComponent } from "./lancamento/novo-lancamento.component";
import { LancamentoService } from "./lancamento/lancamento.service";
import { ChartComponent } from './chart/chart.component';

@NgModule({
	declarations: [ AppComponent, LancamentoComponent, NovoLancamentoComponent, ChartComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		ChartsModule,
	],
	providers: [ LancamentoService ],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
