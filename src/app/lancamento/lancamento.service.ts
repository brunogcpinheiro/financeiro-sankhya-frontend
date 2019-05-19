import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Lancamento } from "./lancamento";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
		responseType: "json",
	}),
};

const API_URL = environment.apiURL;
@Injectable()
export class LancamentoService {
	constructor (private http: HttpClient) {}

	listarLancamentos (): Observable<Lancamento[]> {
		return this.http
			.get<Lancamento[]>(`${API_URL}/lancamentos`, httpOptions)
			.pipe(catchError(this.handleError("listarLancamentos", [])));
	}

	adicionarLancamento (lancamento: Lancamento): Observable<Lancamento> {
		return this.http
			.post<Lancamento>(`${API_URL}/lancamento`, lancamento, httpOptions)
			.pipe(catchError(this.handleError<Lancamento>("adicionarLancamento")));
	}

	deletarLancamento (id: string) {
		return this.http
			.delete(`${API_URL}/lancamento/${id}`, httpOptions)
			.pipe(catchError(this.handleError<Lancamento>("deletarLancamento")));
	}

	private handleError<T> (operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);

			return of(result as T);
		};
	}
}
