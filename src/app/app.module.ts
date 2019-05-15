import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LancamentoComponent } from "./lancamento/lancamento.component";
import { NovoLancamentoComponent } from "./lancamento/novo-lancamento.component";
import { LancamentoService } from "./lancamento/lancamento.service";

@NgModule({
	declarations: [ AppComponent, LancamentoComponent, NovoLancamentoComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [ LancamentoService ],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
