import {AfterViewInit, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {LiferayService} from './liferay.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  simpleImage : Array<any> = [];
  rawImages : Array<any> | undefined;

  _folderId: number | undefined;
  @Input('folderId')
  set folderId(folderId:number)
  {
    this._folderId = folderId;
  }
  get folderId():number
  {
    return <number>this._folderId;
  }
  public constructor(public liferay:LiferayService) {
  }
  public async loadData()
  {
    var data = await this.liferay.getDocuments(<number> this._folderId);
    // @ts-ignore
    this.rawImages = data.items;
    console.log(this.rawImages);
    this.populateImages();
  }

  public populateImages()
  {

    this.rawImages?.forEach(item=>{
      // @ts-ignore
      this.simpleImage.push({
        originUrl: item.contentUrl,
        // @ts-ignore
        thumbnailUrl: item.contentUrl
      })
    });
    console.log(this.simpleImage);
  }

  ngAfterViewInit() {
    this.loadData();
  }
}
