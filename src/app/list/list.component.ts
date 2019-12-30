import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MockDataService } from 'services/mockdata.Service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  SampleData  = [];    // Main json data

  products    = [];    // selected brand products data
  ProModals   = [];    // Selected products Data

  chechData   = [];    // Products type Checkbox Data
  checkBox    = [];    // checked checkbox data

  parameters

  parameterBrand // = "LG";
  parameterProduct 
  parameterChecked

  constructor( private _sampleDataService: MockDataService,
               private _router:Router,
               private route: ActivatedRoute,) { }
         
  ngOnInit() {
    this.getSampleData()  // get main data
    this.checkBoxs();     // checkbox data
    this.route.queryParams.subscribe(params => {
         this.parameters=params
         this.parameterBrand = params['Selected_Brand']// || "LG";
         this.parameterProduct = params['Selected_Product'];
         this.parameterChecked = params['Checked_item'];
        // console.log(' =========== ', this.parameterBrand, this.parameterProduct);
      }); 

  setTimeout(() => {
    this.parameterBrand=this.parameterBrand.toUpperCase();
    this.dataform.setValue({Brand: this.parameterBrand, Product: ""});
    this.onSelectBrand(this.parameterBrand);
    this.dataform.setValue({Brand: this.parameterBrand, Product: this.parameterProduct  });
    this.onSelectproduct(this.parameterProduct);
  if($('#'+this.parameterChecked).is(":checked")){
     //alert($('#'+this.parameterChecked).is(":checked"));
  }
  else{
    $('#'+this.parameterChecked).prop("checked",true);
    this.onCheck( this.parameterChecked ,true);
    }
  }, 1);
  } 

  dataform: FormGroup = new FormGroup({
    'Brand': new FormControl(this.parameterBrand),
    'Product': new FormControl(this.parameterProduct),
    //'Checkbox': new FormControl(""),
  });

  getSampleData() {
    this._sampleDataService.getSampleData().subscribe(
      res => {
        this.SampleData = res;
      }
    );
    setInterval(() => {
      this.checkBoxs();
    }, 1);
  }

  onSelectBrand(sel) {
    for (var i = 0; i < this.SampleData.length; i++) {
      if (this.SampleData[i].BrandName ==sel) {
        this.products = this.SampleData[i].BrandProducts;
      } } 
  this._router.navigate(['list'],{ queryParams: { Selected_Brand:sel} ,queryParamsHandling:'merge' } );
  }
  
  onSelectproduct(pro) {
    this.ProModals = []
    var selbrand = this.dataform.value.Brand
    for (var i = 0; i < this.SampleData.length; i++) {
      if (this.SampleData[i].BrandName == selbrand) { 
        for (var j = 0; j < this.products.length; j++) {
          if (this.products[j].ProductType == pro) {
            this.ProModals.push(this.products[j])
          }
        }
      }
    }
    this._router.navigate(['list'],{ queryParams: { Selected_Product:pro} ,queryParamsHandling:'merge' } );                                           
  }

  checkBoxs() {
    this.chechData = [];
    for (var i = 0; i < this.SampleData.length; i++) {
      for (var j = 0; j < this.SampleData[i].BrandProducts.length; j++) {
        this.chechData.push(this.SampleData[i].BrandProducts[j].ProductType)
      }
    }
  }
  
onCheck(check,tru){
  for (var i = 0; i < this.SampleData.length; i++) {
    for (var j = 0; j < this.SampleData[i].BrandProducts.length; j++) {
      if(check==this.SampleData[i].BrandProducts[j].ProductType){
        if(tru){
          this.checkBox.push(this.SampleData[i].BrandProducts[j]);
        }
        else{
          this.checkBox.splice(this.checkBox.indexOf(this.SampleData[i].BrandProducts[j]),1);
        }
      }
    }
  }
   this._router.navigate(['list'],{ queryParams: { Checked_item :check } ,queryParamsHandling:'merge' });
}
}

