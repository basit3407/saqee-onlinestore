import axios from "axios";

export default function insertMongodb() {
  const products = [
    {
      title: "3 Piece Lawn",
      price: "2999",
      image: "90",
      brand: "CHARIZMA",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["91", "92"],
    },
    {
      title: "3 pieceLawn",
      price: "2999",
      image: "93",
      brand: "BAROQUE",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["94", "95"],
    },
    {
      title: "3 piece PLawn",
      price: "2999",
      image: "97",
      brand: "BAROQUE",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["96", "98"],
    },
    {
      title: "FABRIC LAWN Trouser Dyed Color",
      price: "2799",
      image: "88",
      auxillaryImages: ["85", "89"],
      category: "garments",
      countInStock: "10",
      description:
        "EMBROIDERY DETAILS Neck Embroidered On Fabric\nTrouser Lace Embroidered\nDaman Bunch Embroidered For Purple Dress",
    },
    {
      title: "FABRIC LAWN",
      price: "2799",
      image: "77",
      brand: "CHARIZMA",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["86"],
    },
    {
      title: "Luxury Lawn ",
      price: "5200",
      image: "67",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["62", "63", "64", "65", "66"],
    },
    {
      title: "Luxury Lawn",
      price: "5999",
      image: "78",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["79", "80", "81", "82", "83", "84"],
    },
    {
      title: "Luxury Lawn",
      price: "6200",
      image: "76",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["68", "76"],
    },
    {
      title: "Luxury Lawn",
      price: "6200",
      image: "75",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["69", "70", "71", "72", "73", "74"],
    },
    {
      title: "3 piece Lawn",
      price: "3550",
      image: "6",
      brand: "Indian Designer",
      category: "garments",
      countInStock: "10",
      auxillaryImages: ["7"],
      description:
        "• Heavy Sequins Embroidered Chiffon Front Body\n• Complete 3 Ghaz (108 Inch) Fabric For Gheer\n• Sequins Embroidered Collar Pati\n• Sequins N Thread Embroidered Chiffon Sleeves\n• Pearls Attached on Complete Sleeves Fabric \n• Sequins Embroidered Bunch For Back Body\n• Zari N Sequins Embriodered Chiffon Dupatta\n• Plain malai trouser",
    },
    {
      title: "2 piece Shirt & Trouser",
      price: "2250",
      brand: "Aiman Zaman",
      image: "2",
      category: "garments",
      countInStock: "10",
      description:
        "• Dyed Organza Shirt\n • Sheesha work On Front Neck\n • Dyed Plain Organza Back\n • Heavy Sheesha Work On Sleeves\n • Soft Silk Fabric For Trouser With Sheesha work\n",
    },
    {
      title: "3 piece lawn",
      price: "1850",
      image: "5",
      category: "garments",
      countInStock: "10",
    },
    {
      title: "3 piece Party wear",
      brand: "Aisha Imran",
      price: "3450",
      image: "5",
      category: "garments",
      description:
        "FABRIC\n(SHIRT)…..NET\n(DUPATTA)….NET\n(LEHNGA)….NET\n\nWORK…ZARI…SEQUINS…HANDWORK\nFront Fully Embroidered On Net Fabric With Sequins And Handwork, Heavy Embroidered Neck With Handwork On Fabric And Daman Embroidered On Fabric With Pearls Lace\nSleeves Fully Embroidered With Handwork , And Hanging Pearls Lace On Cuff\nBack Embroidered With Daman Embroidered On Fabric\nDupatta On Net Fully Embroidered With 4 Sided Applique\nLehnga Fully Embroidered On Net With Sequence And Handwork",
      countInStock: "10",
    },
    {
      title: "3 piece unstitched",
      brand: "Gul Warin",
      price: "3550",
      image: "4",
      category: "garments",
      auxillaryImages: ["3"],
      description:
        "FABRIC\n(SHIRT).....CHIFFON\n(DUPATTA)....CHIFFON\n(TROUSER)....MALAI\n\n\n\n\nWORK...ZARI...DORI...HANDWORK\n\n\n\n\n\n\nFront Fully And Heavy Embroidered Dori Work And  Neck And Daman Embroidered Patch With Dori Work Neck Including Hanging Tussels\nBack Embroidered With Heavy Back Embroidered And Daman Embroidered Patch With Dori Work Daman Including Tussels Lace\nSleeves Embroidered With Embroidered Dori Work & Sleeves Including Tussels Lace\nDupatta On Chiffon With 2 Side Embroidered Dori Work\nTrouser Plain Malai With Embroidered Bunch",
      countInStock: "10",
    },
    {
      title: "Luxurious Seesha Wear",
      price: "3450",
      image: "12",
      category: "garments",
      countInStock: "10",
      description:
        "Fabric: Chiffon\nDetails:\n\n\n• Heavy Sheesha work On Neck\n• Zari Embroidered Work On Neck\n•Sheesha Work On Dress With 2 different Types Of Sheesha\n• Sheesha n Zari Work On Chiffon Sleeves\nPremium Quality Dupatta (Ready To Wear):\n• Chiffon Dupatta with Quality Finishing Work\n• Chiffon Dupatta With Attached Gota Phool\n• 2 Gold Pearls Lace Attached On Each Pallu\n• Four Sided Gotta Lace Appliqued\n• Tussels For Dupatta Also Included In Pack\n• Printed Trouser\nWhite Chiffon Shirt With Black Chiffon Dupatta",
    },
    {
      title: "NOOR BY SADIA ASAD NET COLLECTION",
      price: "4599",
      image: "15",
      category: "garments",
      countInStock: "10",
      description:
        "FINE QUALITY FABRIC N EMBROIDERY WORK BY EASTERN FASHION\n\n\nFABRIC DETAILS\n SHIRT NET\nDUPATTA NET\nTROUSER JAMAWAR\nINNER MALAI CRAPE\n\n\nEMBROIDERY DETAILS\nFront Full Heavy Embroidered\nFront Daman Embroidered\nSleeves Heavy Embroiderdd ( Alternate Head )\nBack Plain\nDupatta Heavy Embroidered\nTrouser Lace Embroidered",
      auxillaryImages: ["14", "16", "17", "18", "19"],
    },
    {
      title: "Luxury Party Wear",
      price: "4599",
      image: "23",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\n SHIRT NET\nDUPATTA Organza\nTROUSER Malai\nINNER Malai\n\n\nEMBROIDERY DETAILS\nFront Embroidered With Handwork N Cutwork\nBack Emboridered\nFront and Back Daman Lace Embroidered With Cutwork\nSleeves Sleeves Embroidered\nNeck Embroidered with HandworkDupatta Heavy Pallu Embroidered With Four Side embroidered Applic Border\nHeavy Embroidered Trouser Lehnga",
      auxillaryImages: ["20", "21", "22"],
    },
    {
      title: "Luxury Party Wear ",
      price: "6299",
      image: "26",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\nNET MEXY WITH MALAI CRAPE INNER N TROUSER\n\n\n\nEMBROIDERY DETAILS\nFRONT BODY HEAVY EMBROIDERD\nBACK BODY HEAVY EMBROIDERED\nFRONT GHAIR 5 KALI WITH HEAVY EMBROIDEREY N MIROR WORK\nBACK GHAIR 5 KALI WITH HEAVY EMBROIDERED\nSLEEVES HEAVY EMBROIDERED\nDUPATTA EMBROIDERED WITH READY TO WEAR",
      auxillaryImages: ["24", "25", "27", "28", "29", "30"],
    },
    {
      title: "3 piece Emroiderd ",
      price: "4699",
      image: "31",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\nShirt chiffon\nDuppatta chiffon\nTrouser Malai\n\n\n\nEMBROIDERY DETAILS\nFront Heavy Embroidered With Sequins Work\nBack Embroidered\nSleeves Heavy Embroidered With Altnernate Head Embroidery\nDupatta Heavy Embroidery With Four Side Border N Hanging Tassels",
      auxillaryImages: ["32", "33", "34", "35", "36", "37", "38"],
    },
    {
      title: " Party Wear ",
      price: "4599",
      image: "39",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\nShirt chiffon\nDuppatta net\nTrouser Malai,flapper-net\n\n\n\nEMBROIDERY DETAILS\nFront Heavy Embroidered with handwork\nfront daman lace embroidered\ngala embroidered with handwork\nBack Embroidered\ndupatta heavy embroidered\ntrouser flaper embroidered",
      auxillaryImages: ["40", "41", "42", "43", "44", "45", "46", "47", "48"],
    },
    {
      title: " SUPER FINE QUALITY EMBROIDERY WORK AND FABRIC ",
      braind: "Eastern Fashion",
      price: "4399",
      image: "49",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\nShirt chiffon\nDuppatta chiffon\nTrouser Silk\n\n\n\nEMBROIDERY DETAILS\nFront Heavy Embroidered with handwork\nfront daman embroidered with handwork and cut work\nBack Embroidered\nSleeves Embroidered with Cutwork Lace\ndupatta heavy embroidered with Hanging Tassels\nTrouser Heavy Embroidered",
    },
    {
      title: "FINE QUALITY EMBROIDERY WORK AND FABRIC",
      price: "4999",
      image: "52",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\nShirt Chiffon\nDuppatta Chiffon \nPlazo net\nTrouser Malai\n\n\nEMBROIDERY DETAILS\nFront Full Heavy Embroidered With Gliter Sequins Work\nBack Embroidered\nSleeves Embroidered\nNeck Pcs Embroidered With Cutwork\nDupatta Embroidered With Four Side Embroidered Borders\nTrouser Plaza Embroidered",
      auxillaryImages: ["50", "51"],
    },
    {
      title: "Fine Quality Embroidery and Fabric ",
      brand: "Eastern Fashion",
      price: "5999",
      image: "53",
      category: "garments",
      countInStock: "10",
      description:
        "FABRIC DETAILS\nShirt Chiffon\nDuppatta Net\nTrouser Malai\n\n\n\nEMBROIDERY DETAILS\nFront Heavy Embroidered With Punched Beats\nFront Daman Embroidered\nBack Embroidered With Daman\nTrouser Lace Embroidered\nSleeves Heavy Embroidered ( Alternate Head ) and Punched Beatd\nDupatta Heavy Embroidery With Hanging Tassels",
      auxillaryImages: ["54", "55", "56", "57", "58", "59"],
    },
    {
      title: "1 piece Embroidered Shirt ",
      price: "2200",
      image: "60",
      category: "garments",
      countInStock: "10",
      description:
        "EMBROIDERY DETAILS\nFront Embroidered\nGala EmbroideredDaman Lace Embroidered\nSleeves Embroidered",
      auxillaryImages: ["61"],
    },
  ];

  return (
    <button
      onClick={() => {
        axios.post("http://localhost:3000/api/products/Garments", products);
      }}
    ></button>
  );
}
