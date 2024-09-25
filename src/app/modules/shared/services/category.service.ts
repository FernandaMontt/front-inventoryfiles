import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  /**
   * get all categorias
   */
  getCategories(){

    const endpoint = `${base_url}/archivo`;
    return this.http.get(endpoint);

  }
  getComparacion(){

    const endpoint = `${base_url}/comparacion`;
    return this.http.get(endpoint);

  }
  getFilesById(id:any){
    const endpoint = `${base_url}/archivo/${id}`;
    return this.http.get(endpoint);
  }
  getExecuteById(id:any){
    const endpoint = `${base_url}/comparacion/${id}`;
    return this.http.get(endpoint);
  }
  /**
   * save categorias
   */
  saveCategorie(body : any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }
  /**
   * update categorias
   */
  updateCategorie(body:any, id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.put(endpoint,body);
  }
  /**
   * delete categorias
   */
  deleteCategorie(id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.delete(endpoint);
  }
  /**
   * search categorias
   */
  getCategorieById(id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.get(endpoint);
  }


}
