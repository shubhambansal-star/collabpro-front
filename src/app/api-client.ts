import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";


export interface Params {
	[ key: string ]: any;
}

export interface GetOptions {
	url: string;
	params?: Params;
}
export interface Data{
    email: string;
    password: string;
}
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}

@Injectable({
	providedIn: "root"
})
export class ApiClient {

	private axiosClient: AxiosInstance;
	private errorHandler: ErrorHandler;

	// I initialize the ApiClient.
	constructor( errorHandler: ErrorHandler ) {

		this.errorHandler = errorHandler;

		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
		});

	}
    public async post (url: string,data: Data){
		let res  = await this.axiosClient.post(url,data)
        return res
    }
	public async postE<T>(url: string,data: Data ) : Promise<T> {

		try {
			var axiosResponse = await this.axiosClient.request<T>({
				method: "post",
				url: url,
				data:data,
			});
			return( axiosResponse.data );
		} catch ( error ) {
			return( Promise.reject( this.normalizeError( error ) ) );
		}
		
	}
	public async patch<T>(url: string,data: any ) : Promise<T> {

		try {
			var axiosResponse = await this.axiosClient.request<T>({
				method: "patch",
				url: url,
				data:data,
			});
			return( axiosResponse.data );
		} catch ( error ) {
			return( Promise.reject( this.normalizeError( error ) ) );
		}
		
	}
	public async put<T>(url: string,data: any ) : Promise<T> {

		try {
			var axiosResponse = await this.axiosClient.request<T>({
				method: "put",
				url: url,
				data:data,
			});
			return( axiosResponse.data );
		} catch ( error ) {
			return( Promise.reject( this.normalizeError( error ) ) );
		}
		
	}
	public async get<T>(url: string) : Promise<T> {

		try {

			var axiosResponse = await this.axiosClient.request<T>({
				method: "get",
				url: url,
			});

			return( axiosResponse.data );
			
		} catch ( error ) {

			return( Promise.reject( this.normalizeError( error ) ) );
			
		}
		
	}
	public async delete<T>(url: string) : Promise<T> {

		try {

			var axiosResponse = await this.axiosClient.request<T>({
				method: "delete",
				url: url,
			});

			return( axiosResponse.data );
			
		} catch ( error ) {

			return( Promise.reject( this.normalizeError( error ) ) );
			
		}
		
	}
	private normalizeError( error: any ) : ErrorResponse {

		this.errorHandler.handleError( error );
		return({
			id: "-1",
			code: "UnknownError",
			message: "An unexpected error occurred."
		});

	}

}