export interface CategoryFilter {
  id: string;
  placeholder: string;
  selectedValue: string;
  options: { value: string; label: string }[];
}
