import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { categoryFilters } from '../../../assets/categories/categories';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ButtonComponent, NgIcon, FormsModule, CommonModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @ViewChild('containerCards')
  containerCards!: ElementRef;
  isFilterOpen = false;

  productList: Array<Product> = [];
  productListFiltered = [...this.productList];
  categoryFilters = [...categoryFilters];
  search: string = '';

  displayedProducts: Array<Product> = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private _ProvProductService: ProductService) {}

  ngOnInit() {
    this.productList = this._ProvProductService.getProducts();
    this.searchChange();
  }
  searchChange() {
    this.productListFiltered = this.productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(this.search.toLowerCase()) ||
        product.type.toLowerCase().includes(this.search.toLowerCase())
      );
    });
    this.resetPaginationAndDisplay();
  }
  resetAllFilters() {
    this.search = '';
    this.categoryFilters.forEach((filterGroup) => {
      filterGroup.selectedValue = '';
    });
    this.productListFiltered = [...this.productList];
    this.displayedProducts = [...this.productList];
    this.resetPaginationAndDisplay();
  }
  searchForCategory(id: string) {
    let filtered = [...this.productList];

    this.categoryFilters.forEach((filterGroup) => {
      if (filterGroup.id !== id) {
        filterGroup.selectedValue = '';
      }
      if (filterGroup.selectedValue && filterGroup.id === id) {
        const selectedValueLower = filterGroup.selectedValue.toLowerCase();
        filtered = filtered.filter((product) =>
          product.category.includes(selectedValueLower)
        );
      }
    });
    this.productListFiltered = filtered;
    this.resetPaginationAndDisplay();
    this.containerCards.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
  private resetPaginationAndDisplay(): void {
    this.currentPage = 1;
    this.updatePaginationDetails();
    this.updateDisplayedProducts();
  }
  private updatePaginationDetails(): void {
    this.totalPages = Math.ceil(
      this.productListFiltered.length / this.itemsPerPage
    );
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.productListFiltered.slice(
      startIndex,
      endIndex
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updateDisplayedProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }
  showFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
