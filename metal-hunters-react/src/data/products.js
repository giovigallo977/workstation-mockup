export const PRODUCTS = [
  { id:1,  name:"Xerox Riot Tee",          price:34.90, category:"tshirt",   type:"tee",    fit:"black",  badge:"New",     tag:"RIOT",     photo:"assets/product-europeloves-tee.jpg", desc:"Heavyweight 220gsm cotton tee with a photocopied print burned straight onto the back. Inspired by writers' black books, straight cut, raw hem." },
  { id:2,  name:"Halftone Bomber Tee",     price:36.90, category:"tshirt",   type:"tee",    fit:"white",  badge:"Limited", tag:"BOMBER",   desc:"High-contrast halftone screen print on a dirty white base. Limited drop, numbered on the inner collar." },
  { id:3,  name:"Freight Line Tee",        price:32.90, category:"tshirt",   type:"tee",    fit:"white",  badge:"",        tag:"FREIGHT",  photo:"assets/product-freight-tee.jpg", desc:"Dedicated to bombed freight trains. Organic cotton, oversized fit, matte screen print." },
  { id:4,  name:"Blackbook Tee",           price:34.90, category:"tshirt",   type:"tee",    fit:"white",  badge:"New",     tag:"BLACKBOOK",desc:"Graphic inspired by black book pages, paper and ink texture. 100% combed cotton." },
  { id:5,  name:"Toy vs King Tee",         price:33.90, category:"tshirt",   type:"tee",    fit:"grey",   badge:"",        tag:"TOY/KING", desc:"Double front/back print, cement grey. For those who know: from toy to king." },
  { id:6,  name:"All City Tee",            price:35.90, category:"tshirt",   type:"tee",    fit:"black",  badge:"Limited", tag:"ALL CITY", photo:"assets/product-allcity-tee.jpg", desc:"Two-color screen print, subway tag inspiration. Limited edition of 200 pieces." },
  { id:7,  name:"Yard Runner Hoodie",      price:64.90, category:"hoodie",   type:"hoodie", fit:"black",  badge:"New",     tag:"YARD",     desc:"Heavyweight 320gsm hoodie with lined hood, rubberized print on the chest. Night-time freight yard backdrop." },
  { id:8,  name:"Fat Cap Hoodie",          price:69.90, category:"hoodie",   type:"hoodie", fit:"grey",   badge:"Limited", tag:"FAT CAP",  desc:"Unisex hoodie, kangaroo pocket, halftone screen print on the back in photocopied poster style." },
  { id:9,  name:"Ghost Train Hoodie",      price:66.90, category:"hoodie",   type:"hoodie", fit:"black",  badge:"",        tag:"GHOST",    desc:"Oversized silhouette, flat drawstrings, ghost train graphic in negative." },
  { id:10, name:"Ill Style Hoodie",        price:67.90, category:"hoodie",   type:"hoodie", fit:"white",  badge:"New",     tag:"ILL STYLE",desc:"Dirty white base, blackletter print on the hood. Flagship piece of the drop." },
  { id:11, name:"Vandal Cap",              price:24.90, category:"accessori",type:"cap",    fit:"black",  badge:"",        tag:"VANDAL",   desc:"6-panel cap, front embroidery, curved adjustable brim with metal buckle." },
  { id:12, name:"Piece Book Sticker Pack", price:9.90,  category:"accessori",type:"sticker", fit:"black", badge:"New",     tag:"PIECE BOOK",desc:"Pack of 12 weatherproof vinyl stickers featuring the brand's classic graphics." }
];

export const SIZES = ["S","M","L","XL","XXL"];
export const COLORS = ["Black","White","Cement Grey"];

export function getProductById(id){
  const numId = parseInt(id, 10);
  return PRODUCTS.find(p => p.id === numId) || null;
}

export function categoryLabel(cat){
  if (cat === "tshirt") return "T-Shirt";
  if (cat === "hoodie") return "Hoodie";
  if (cat === "accessori") return "Accessories";
  return cat;
}
