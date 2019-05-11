import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LancamentoComponent } from "./lancamento/lancamento.component";

@NgModule({
	declarations: [ AppComponent, LancamentoComponent ],
	imports: [ BrowserModule ],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
