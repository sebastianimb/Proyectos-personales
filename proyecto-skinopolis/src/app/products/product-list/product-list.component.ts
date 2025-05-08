import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ButtonComponent, NgIcon, FormsModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  titulo = 'Iventario disponible';
  productList: Array<Product> = [];
  productListFiltered = [...this.productList];
  confirm: number | undefined = undefined;
  search: string = '';
  selectedCategory1 = '';
  selectedCategory2 = '';
  selectedCategory3 = '';
  selectedCategory4 = '';
  selectedCategory5 = '';

  constructor(private _ProvProductService: ProductService) {}

  ngOnInit() {
    this.productList = this._ProvProductService.getProducts();
    this.searchChange();
  }
  getProductList() {
    this.productListFiltered = [...this.productList];
  }
  searchChange() {
    this.productListFiltered = this.productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(this.search.toLowerCase()) ||
        product.gun.toLowerCase().includes(this.search.toLowerCase())
      );
    });
  }
  searchForCategory(search: string) {
    this.productListFiltered = this.productList.filter((product) =>
      product.category?.includes(search)
    );
    this.selectedCategory1 = this.selectedCategory1 === search ? search : '';
    this.selectedCategory2 = this.selectedCategory2 === search ? search : '';
    this.selectedCategory3 = this.selectedCategory3 === search ? search : '';
    this.selectedCategory4 = this.selectedCategory4 === search ? search : '';
    this.selectedCategory5 = this.selectedCategory5 === search ? search : '';
  }
}
