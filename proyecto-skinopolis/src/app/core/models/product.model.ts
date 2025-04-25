export class Product{
  constructor(
    public title:                string,
    public description:          string,
    public category:             string,
    public price:                number,
    public stock:                number,
    public brand:                string,
    public id?:                   number,
    public weight?:               number,
    public sku?:                  string,
    public images?:               string[],
    public discountPercentage?:   number,
    public rating?:               number,
    public tags?:                 string[],
    public dimensions?:           Dimensions,
    public warrantyInformation?:  string,
    public shippingInformation?:  string,
    public availabilityStatus?:   string,
    public reviews?:              Review[],
    public returnPolicy?:         string,
    public minimumOrderQuantity?: number,
    public meta?:                 Meta,
    public thumbnail?:            string,
  ){}
}
interface Dimensions {
  width:  number;
  height: number;
  depth:  number;
}
interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode:   string;
  qrCode:    string;
}
interface Review {
  rating:        number;
  comment:       string;
  date:          Date;
  reviewerName:  string;
  reviewerEmail: string;
}
