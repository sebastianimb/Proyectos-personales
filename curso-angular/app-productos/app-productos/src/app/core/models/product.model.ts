export class Producto{
  constructor(
    public id:                   number,
    public title:                string,
    public description:          string,
    public category:             string,
    public price:                number,
    public discountPercentage:   number,
    public rating:               number,
    public stock:                number,
    public tags:                 string[],
    public brand:                string,
    public sku:                  string,
    public weight:               number,
    public dimensions:           Dimensions,
    public warrantyInformation:  string,
    public shippingInformation:  string,
    public availabilityStatus:   string,
    public reviews:              Review[],
    public returnPolicy:         string,
    public minimumOrderQuantity: number,
    public meta:                 Meta,
    public thumbnail:            string,
    public images:               string[],
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
