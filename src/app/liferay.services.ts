import { Injectable } from '@angular/core';
import {from, map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
declare const document: any;

declare const Liferay: any;

export class Expense
{
  title: string | undefined;
  description: string | undefined;
  createDate:Date | undefined;
  userName:string | undefined

}
@Injectable({
  providedIn: 'root',
})
export class LiferayService {

  constructor(private http: HttpClient) { }
  public getDocuments(folderId:number)
  {
    var prom  =
    new Promise((resolve,reject)=>{
      this.http.get(`/o/headless-delivery/v1.0/document-folders/${folderId}/documents?filter=contains%28encodingFormat%2C%27image%27%29&p_auth=${this.AuthToken}`).subscribe(result=>{
        resolve(result);
      }, error=>{
        reject(error);
      })
    });
    return prom;
  }
  //private helper methods
  generateServicePromise(serviceURL:string,serviceObject:any):Promise<any>
  {
    const prom = new Promise((resolve,reject)=>{
      Liferay.Service(serviceURL,serviceObject,(result:any)=>{
        resolve(result);
      },(error:any)=>{
        reject(error);
      });
    });
    return  prom;
  }
  public getScopedGroupId()
  {
    return Liferay.ThemeDisplay.getScopeGroupId();
  }
  public getCurrentUserId()
  {
    return Liferay.ThemeDisplay.getUserId();
  }
  public get AuthToken()
  {
    return Liferay.authToken;
  }
}
