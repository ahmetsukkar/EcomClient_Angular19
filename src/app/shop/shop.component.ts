import { Component, ElementRef, ViewChild } from '@angular/core';
import { IProduct } from '../shared/Model/Product';
import { ShopService } from './shop.service';
import { CommonModule, NgFor } from '@angular/common';
import { ShopItemComponent } from "./shop-item/shop-item.component";
import { Icategory } from '../shared/Model/category';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ShopParams } from '../shared/Model/shopParams';
import { PaginHeaderComponent } from '../shared/components/pagin-header/pagin-header.component';
import { PagerComponent } from "../shared/components/pager/pager.component";

@Component({
  selector: 'app-shop',
  imports: [ShopItemComponent, CommonModule, PaginationModule, PaginHeaderComponent, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  @ViewChild('searchInput') searchInput: ElementRef;
  products: IProduct[];
  categories: Icategory[];

  shopParams = new ShopParams();
  totalCount: number = 0;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'PriceAsce' },
    { name: 'Price: High to Low', value: 'PriceDesc' }
  ];

  constructor(private shopService: ShopService) {
    this.products = [];

  }

  ngOnInit() {
    this.getProdcuts();
    this.getCategories();
  }

  getProdcuts() {
    this.shopService.getProduct(this.shopParams).subscribe(response => {
      console.log(response);
      this.products = response.data;
      this.totalCount = response.count;
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe(response => {
      this.categories = [{ id: null, name: 'All', description: 'All' }, ...response];
      //this.categories.unshift({ id: null, name: 'All', description: 'All' });
      console.log(this.categories);
    });
  }

  OnCategorySelect(selectedCategoryId) {
    this.shopParams.CategoryId = selectedCategoryId;
    this.shopParams.PageNumber = 1;
    this.getProdcuts();
  }

  OnSortChange(sort: Event) {
    let sortValue = sort.target as HTMLSelectElement;
    let selectedSortValue = sortValue.value;
    this.shopParams.Sort = selectedSortValue;
    this.getProdcuts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.PageNumber !== event) {
      this.shopParams.PageNumber = event;
      this.getProdcuts();
    }
  }

  onProductSearch() {
    if (this.searchInput.nativeElement.value) {
      this.shopParams.SearchTerm = this.searchInput.nativeElement.value;
      this.getProdcuts();
    }
  }

  onReset() {
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProdcuts();
  }

}
