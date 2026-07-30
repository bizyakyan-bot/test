import { ShopOrder } from './types';

export interface Apartment {
  id: string;
  name: string;
  size: string;
  beds: string;
  description: string;
  amenities: string[];
  price: string;
  images: string[];
  isAvailable: boolean;
  bookingUrl?: string;
  bookingScript?: string;
  calendarScript?: string;
  location: string;
}

export const apartments: Apartment[] = [
  {
    id: "alpine-suite",
    name: "Apartment pr Fejtne",
    size: "64 m²",
    beds: "2 Double beds, 1 Sofa bed",
    description: `### Listing Description
Relax with the whole family at "Apartma Pr Fejtne" – your peaceful retreat in Čezsoča.

Our spacious 64 m² apartment is located in the heart of the serene village of Čezsoča, just a short, 5-minute walk (approx. 250m) from the emerald banks of the Soča River. Whether you are here for adrenaline sports or a quiet nature escape, "Pr Fejtne" offers the perfect base.

The apartment features two bright bedrooms with comfortable king-size beds and an additional sofa bed in the living area, comfortably accommodating up to 6 guests. The kitchen is fully equipped for long stays, and the two outdoor areas (an enclosed balcony and an open veranda) offer stunning views of the surrounding Julian Alps.

### Your Accommodation
Comfort and convenience in a prime alpine location:

*   **Two Bedrooms:** Both equipped with large king-size beds for a restful night's sleep.
*   **Living Area:** Features a flat-screen TV, board games, books, and a comfortable sofa bed.
*   **Fully Equipped Kitchen:** Includes a dishwasher, coffee maker, toaster, and all necessary cookware.
*   **Modern Amenities:** Free high-speed Wi-Fi, washing machine, and air conditioning/heating.
*   **Outdoor Spaces:** An enclosed balcony (perfect for morning coffee) and an open veranda to soak in the mountain air.
*   **Storage:** Secure storage space available for your bicycles or sports equipment.

### Guest Access
Guests have exclusive access to the entire upper floor of the house. The ground floor is used by the owner for storage (garden tools, etc.) and is not occupied by other guests, ensuring your complete privacy.

**Check-in:** We love to meet our guests in person when possible. However, we also provide a lockbox located at the entrance for a seamless, contactless check-in at your convenience.

### Interaction with Guests
We value your privacy and want you to feel at home. We are always available via phone or messaging for any questions, local tips, or assistance. Depending on our availability, we may stop by to say hello and ensure everything is perfect, but if you prefer a completely quiet stay, we will respect your space.

### Other Notable Details
*   **Location:** Located in Čezsoča 21. The beach at the Soča River is just a 5-minute walk away.
*   **Activities:** The area is a hub for hiking, cycling, and water sports. Countless mountain trails start right from the doorstep.
*   **Dining:** While Čezsoča is a peaceful village, "Gostišče Vančar" is nearby for local Slovenian dishes. Bovec, with its shops and various restaurants, is only a 5-minute drive away.
*   **House Rules:** No pets allowed. No smoking inside the apartment.
*   **Parking:** Free private parking is available directly in front of the house.

### Checkout Instructions
To help us prepare for our next guests, please follow these simple steps before you leave:

1.  **Dishes:** Please load the dishwasher and start it, or wash and put away any used dishes.
2.  **Trash:** Please take your trash to the outdoor bins located next to the house.
3.  **Energy:** Turn off all lights, close the windows, and switch off the AC/heating.
4.  **Keys:** Return the keys to the lockbox and scramble the code.
5.  **Security:** Ensure the main entrance door is securely locked.`,
    amenities: ["Free WiFi", "Free parking", "Fully equipped kitchen", "Private balcony", "Washing machine", "Central heating", "Private entrance", "Dishwasher", "Stove & Oven", "Refrigerator", "Microwave", "Coffee maker", "Toaster", "TV", "Iron", "Hairdryer", "Essentials", "Safe", "Fire extinguisher", "First aid kit", "Board games", "Luggage drop-off"],
    price: "€140 - €200 / night",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_175531_ac1e7d07-e05a-4eab-a1c8-caa5924743de.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_192421_fa85b98d-ca42-48e2-93ad-2cfb601f6461.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_210521_5d432287-c21c-4a4e-926d-665ebface51b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_210112_9da26eaf-becb-4e37-886f-9390330e80b2.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_181926_66a7ecc7-fc13-446c-89ab-8c83f8435be0.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_191423_d4105d20-2b27-485e-af05-4b6438969e11.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_175229_ad067ad0-10c6-42ff-8cba-fb7fc5925ba0.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_175845_eab37481-412e-41d3-a534-895c013fbe47.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_175904_3eb7c633-0af6-4e9c-a1cc-993043caf987.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_210132_7bf08f3e-2d97-4e3c-ae80-ee8c8b324f1a.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_183100_274f26be-341b-4c79-a45d-7da9e9d51172.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_183612_a9d4dad8-cf54-48ab-94c3-eb572972a764.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_184741_79d62fea-bfda-4ad6-820a-8263750ab80d.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_192656_f69541cb-d157-4651-8bd2-1767ac29f358.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_184153_4f7c5230-4505-47a6-baa5-74211bf91fd3.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_185353_4dcde4a4-0eea-4b71-af22-ad861edb0865.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260331_192421_36fdc7bc-f122-4127-9d35-3a7ca86951c0.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_104637_59556b9e-d635-4c16-b0c7-826bcdbf8e0d.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_104026_5d3f287f-b9a4-4825-973f-394427fbefd4.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_103906_c8c38939-afd9-4812-9c98-dab462765274.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_103752_f5bbbbd9-0908-40e5-b675-879d928b46fa.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_103458_d363307a-dbc4-4d77-9810-3612714e83b3.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_103725_cb305833-d636-43c6-bda8-da1090e8bafd.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260504_103437_9705e0ff-f2fe-420e-915b-5c51f475e5c3.png&w=1280&q=85"
    ],
    isAvailable: true,
    bookingScript: "//www.bentral.com/service/embed/booking.js?id=5f6a6b354d415f4e&width=full&lang=sl&key=fb4a7c9efc59543ece7e621a731be536",
    calendarScript: "https://www.bentral.com/service/embed/calendar.js?uid=5f5459304d6a494d&months=6&cols=1&last=true&lang=sl&key=fb4a7c9efc59543ece7e621a731be536",
    location: "Čezsoča"
  },

  {
    id: "valley-view-studio",
    name: "Apartment Flajs",
    size: "30 m²",
    beds: "1 Double bed, 1 Single bed, 1 Sofa bed",
    description: "Our Apartment Flajs is the perfect retreat in the heart of the Soca Valley. This airy studio offers direct access to our lush garden and stunning mountain views. It features a modern kitchenette, a comfortable double bed, a single bed, a sofa bed, and a sleek bathroom. Everything you need for a relaxing stay in Bovec.",
    amenities: ["Kitchenette", "Free WiFi", "Garden Access", "Mountain View", "TV", "Kettle", "Shower"],
    price: "€130 - €175 / night",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1700063330069407698/original/6329e2c1-7096-495b-961c-c223020b9fb3.jpeg?im_w=1200",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_164320_55f6c8e1-6470-44ba-ab44-564103d5c716.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_164253_a6f851fc-8d5a-4d4a-ba18-dffedf0cab8b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_164754_697a1c3a-d00f-4787-836d-b38e3cf039da.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_183044_1eb1b2db-4644-49f7-ba9b-0214ef8e8a93.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_183617_73632b00-23f5-447f-9a78-0088d11162fe.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_174231_8cd82e53-d8e2-4e7c-bdd5-301d0564b968.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_181346_8a92b83a-f017-47d4-8582-98bc28c6a92f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_183312_f6925ea1-78af-4299-9c69-fc45f3e590ef.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_164310_3e3d9acc-7288-433a-9619-ae9cca9c21df.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_163921_99a7daa3-b926-4fff-bafb-955b07db239a.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_164245_361154c5-60df-4c6d-a9fc-de37a708f328.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_164237_5aefe77e-9c81-48a0-a165-721ba57a0889.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260601_181346_138ebbe1-b0c2-40d3-afae-0ca4703d3623.png&w=1280&q=85"
    ],
    isAvailable: true,
    bookingScript: "//www.bentral.com/service/embed/booking.js?id=5f7a49774d775f4e&unit=5f5459344f544d4d&width=full&poweredby=0&lang=sl&key=0df768f0860b515090fa4499955a159e",
    calendarScript: "//www.bentral.com/service/embed/calendar.js?uid=5f5459344f544d4d&unit=5f5459344f544d4d&months=1&cols=6&last=true&width=full&poweredby=0&lang=sl&key=0df768f0860b515090fa4499955a159e",
    location: "Soča"
  },
  {
    id: "apartment-kuhala",
    name: "Apartment Kuhala",
    size: "75 m²",
    beds: "1 Double bed, 2 Bunk beds",
    description: "Experience a spacious alpine retreat in Apartment Kuhala. This comfortable and beautifully furnished apartment offers a relaxing atmosphere with modern amenities and traditional mountain charm. Enjoy peaceful surroundings, mountain views, and a fully equipped kitchen, making it perfect for families or groups seeking comfort and convenience in Bovec.",
    amenities: ["Kitchen", "Balcony", "Free WiFi", "Free private parking", "Mountain view", "Private bathroom", "Family rooms", "Terrace"],
    price: "€140 – €180 / night",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804589.jpg?k=5b18a18124f99c7405998022fb41a88e15bdd5db71c2d1adc411ac3d6dd3959f&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799999.jpg?k=7053170f57fa9c68f891dc976ec4168e3b2961db2d1daca9d25f1e5af159a705&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799981.jpg?k=9a5eb1ff122d11d623b2f7a0ba6177ba6c64b3a7050d52c3ff4d4b011ccda836&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/193745942.jpg?k=004eeec39bab2dee5dba90b77357530ce2a2b44cfce1332baa9beede52335c1d&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/259024826.jpg?k=49f2562a06775a8e687fc6e608b333534201d85dc075d5aea2b457d0ac06be84&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/197009867.jpg?k=148aa6b06ada3267b8703997706d1aa3f7a9e4c3636faa6712d7724813680a98&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561795566.jpg?k=52604b28ff37debe29a2c61e74ab4e85ca352d39a97f9014a93c42344bb35d72&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561794948.jpg?k=3af989e328bd1f418c50a25fdca9013882ec14e55a045cc7bde576c5fdfe29cd&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804572.jpg?k=5fcdc7dbd2d893d600dab37525453b6a011d9cf4e3d344cf1d4e5526b48444ae&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799572.jpg?k=2e92fce8494fc2256a1b535531ee0c37b20870ff3cd925a10f33b8cf8ca81dc4&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799584.jpg?k=332c98e75b22e1eb10a3b66bfc18210f19c9f70be8a43d0e919f07f594e3439a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799583.jpg?k=0d7e504ea9d2809e2e21126eaf773f40758fd064aedfc7243abb48d80fa593c5&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804546.jpg?k=91125ba8eedd75b0b38bddcd8c0a2b4b7a8be03f656e55cd78208fb122ce6c60&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804541.jpg?k=c23adcb1d68e31b93130041cf75f4da857d5b3d2da0f7308b134e29ebf75eb82&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804552.jpg?k=b44035e9e28b76754419909d0cd8b451869dc32170537671aadff0296659d2d2&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799997.jpg?k=df7873602026a71858302d4f4892de29d574bc4b46865778886e5f0917a0cc15&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561805908.jpg?k=0ba6cd3e94c59bd58b6501553f9452f18198d0926412d9530dadc54643090e5a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/197009874.jpg?k=56661ae07941da6800ebb5829703d8fb31bb63bf15fb3523f82049f1b29bfe0c&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/204957781.jpg?k=1f8ccfe0f8fa0e77e358f3ec0022a54e1f4bb8e726d0ee5dd83dd1cfb9620760&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/204957707.jpg?k=1739ee59582e56985b3b59dedc40f7d50509e9c85a2ac0df7b38d198a020cebf&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/273686352.jpg?k=d499ae6df9619916ae5beb1c4f11c911e66b030541b254e9c16cfc0d37ba5d13&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/203408423.jpg?k=0774db4dba4295630d1b2386bf607206cf3bf08085227141708e6fd2a943db31&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/273686840.jpg?k=cef332fe53313a02a4f0dbf7d9d5fe695e72553a201995dc07709f50187c8b57&o="
    ],
    isAvailable: true,
    bookingUrl: "https://www.booking.com/hotel/si/trnovo-ob-soci-kuhala.sl.html",
    location: "Trnovo ob Soči"
  }
];

export interface HikingActivity {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  highlights: string[];
  image: string;
}

export const hikingActivities: HikingActivity[] = [
  {
    id: "soca-trail",
    title: "Soca Trail (Soška pot)",
    description: "Easy riverside walk along the turquoise Soca River.",
    difficulty: "Easy",
    duration: "2–4 hours",
    highlights: ["Wooden bridges", "Emerald water", "Family-friendly trail"],
    image: "https://picsum.photos/seed/soca-trail/800/600"
  },
  {
    id: "virje-waterfall",
    title: "Virje Waterfall",
    description: "Short scenic hike to one of Slovenia’s most photogenic waterfalls.",
    difficulty: "Easy",
    duration: "30 minutes",
    highlights: ["Natural pool", "Great photo spot"],
    image: "https://picsum.photos/seed/virje/800/600"
  },
  {
    id: "boka-waterfall",
    title: "Boka Waterfall",
    description: "One of Slovenia’s highest waterfalls with dramatic views.",
    difficulty: "Easy to Moderate",
    duration: "1–2 hours",
    highlights: ["Powerful waterfall", "Viewing platform"],
    image: "https://picsum.photos/seed/boka/800/600"
  },
  {
    id: "slemenova-spica",
    title: "Slemenova Špica",
    description: "Panoramic alpine viewpoint with breathtaking scenery.",
    difficulty: "Moderate",
    duration: "3–4 hours",
    highlights: ["Views of Jalovec", "Alpine meadows"],
    image: "https://picsum.photos/seed/slemenova/800/600"
  },
  {
    id: "mount-krn",
    title: "Mount Krn",
    description: "Iconic summit with incredible 360° views.",
    difficulty: "Challenging",
    duration: "6–8 hours",
    highlights: ["WWI remains", "Panoramic summit views"],
    image: "https://picsum.photos/seed/krn-summit/800/600"
  },
  {
    id: "krn-lakes",
    title: "Krn Lakes",
    description: "Beautiful alpine lake surrounded by mountain peaks.",
    difficulty: "Moderate to Challenging",
    duration: "5–7 hours",
    highlights: ["Crystal-clear lake", "Alpine scenery"],
    image: "https://picsum.photos/seed/krn-lakes/800/600"
  },
  {
    id: "mangart-saddle-hike",
    title: "Mangart Saddle",
    description: "One of the most scenic alpine routes in Slovenia.",
    difficulty: "Moderate",
    duration: "3–5 hours",
    highlights: ["Dramatic mountain views"],
    image: "https://picsum.photos/seed/mangart/800/600"
  },
  {
    id: "svinjak",
    title: "Svinjak",
    description: "The \"Matterhorn of Bovec\" with rewarding summit views.",
    difficulty: "Moderate",
    duration: "3–5 hours",
    highlights: ["360° valley views"],
    image: "https://picsum.photos/seed/svinjak/800/600"
  },
  {
    id: "lepena-valley",
    title: "Lepena Valley",
    description: "Peaceful valley walk through untouched alpine nature.",
    difficulty: "Easy to Moderate",
    duration: "Flexible",
    highlights: ["Forest trails", "Alpine streams"],
    image: "https://picsum.photos/seed/lepena/800/600"
  },
  {
    id: "tolmin-gorges",
    title: "Tolmin Gorges",
    description: "Unique canyon trail with wooden bridges and emerald water.",
    difficulty: "Easy",
    duration: "1.5–2 hours",
    highlights: ["Turquoise river", "Rock formations"],
    image: "https://picsum.photos/seed/tolmin/800/600"
  }
];

export interface RaftingPartner {
  name: string;
  description: string;
  website?: string;
}

export const raftingPartners: RaftingPartner[] = [
  {
    name: "Soca Rafting",
    description: "One of the oldest and most experienced providers in the valley.",
    website: "https://www.socarafting.si"
  },
  {
    name: "Soca Adventure",
    description: "Professional team offering a wide range of water sports.",
    website: "https://www.soca-adventure.com"
  },
  {
    name: "Everything Bovec",
    description: "Your one-stop shop for all Bovec adventures and activities.",
    website: "https://everythingbovec.com/"
  },
  {
    name: "Alpin Action",
    description: "Specialized in high-quality rafting and kayaking experiences.",
    website: "https://www.alpinaction.it"
  },
  {
    name: "Sport Mix",
    description: "Friendly local guides with deep knowledge of the Soca River.",
    website: "https://www.sportmix.si"
  }
];

export interface CyclingRoute {
  id: string;
  title: string;
  elevation?: string;
  difficulty: string;
  highlights: string[];
  image: string;
  description?: string;
}

export const roadCyclingRoutes: CyclingRoute[] = [
  {
    id: "mangart-saddle",
    title: "Mangart Saddle",
    elevation: "2,055 m",
    difficulty: "Challenging",
    highlights: ["Dramatic switchbacks", "Panoramic views"],
    image: "https://picsum.photos/seed/mangart-cycle/800/600"
  },
  {
    id: "predil-pass",
    title: "Predil Pass",
    difficulty: "Moderate",
    highlights: ["Cross-border route", "Scenic alpine landscape"],
    image: "https://picsum.photos/seed/predil-cycle/800/600"
  },
  {
    id: "trenta-valley",
    title: "Trenta Valley",
    difficulty: "Easy to moderate",
    highlights: ["Turquoise river views", "Peaceful valley ride"],
    image: "https://picsum.photos/seed/trenta-cycle/800/600"
  },
  {
    id: "vrsic-pass",
    title: "Vršič Pass",
    difficulty: "Technical and rewarding",
    highlights: ["50+ hairpin turns", "Iconic Slovenian climb"],
    image: "https://picsum.photos/seed/vrsic-cycle/800/600"
  }
];

export const mtbRoutes: CyclingRoute[] = [
  {
    id: "lepena-valley-trails",
    title: "Lepena Valley Trails",
    difficulty: "Moderate",
    highlights: ["Forest and gravel paths"],
    image: "https://picsum.photos/seed/lepena-mtb/800/600",
    description: "Forest and gravel paths"
  },
  {
    id: "kanin-mountain-area",
    title: "Kanin Mountain Area",
    difficulty: "Technical alpine terrain",
    highlights: ["High-altitude views"],
    image: "https://picsum.photos/seed/kanin-mtb/800/600",
    description: "Technical alpine terrain"
  },
  {
    id: "soca-riverside-gravel",
    title: "Soca Riverside Gravel Routes",
    difficulty: "Easy scenic ride",
    highlights: ["Suitable for beginners"],
    image: "https://picsum.photos/seed/soca-mtb/800/600",
    description: "Easy scenic ride"
  }
];

export interface ShopProduct {
  id: string;
  name: string;
  category: 't-shirts' | 'caps';
  price: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const shopProducts: ShopProduct[] = [
  {
    id: "dreams-arrive-tshirt",
    name: "Dreams Arrive, Adventures Begin! T-Shirt",
    category: "t-shirts",
    price: 25.00,
    description: "Premium organic cotton t-shirt featuring the iconic slogan 'Dreams Arrive, Adventures Begin!' with the signature J.Bizjak mountain & river emblem. Soft, breathable, and crafted for mountain adventures or casual valley relaxation.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
    ],
    colors: [
      { name: "Alpine Black", hex: "#121212" },
      { name: "Forest Emerald", hex: "#0f523f" },
      { name: "Heather Grey", hex: "#5a6268" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "100% Organic Combed Cotton (180 gsm)",
      "Screen-printed 'Dreams Arrive, Adventures Begin!' emblem",
      "Reinforced collar and shoulder seams",
      "Pre-shrunk fabric"
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "soca-valley-cap-1st-ed",
    name: "Soca Valley Hub Logo Cap 1st edition",
    category: "caps",
    price: 22.00,
    description: "Classic structured 6-panel trucker cap with a 3D embroidered Soca Valley Hub logo (1st Edition). High-density mesh back keeps you cool during summer heat.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80"
    ],
    colors: [
      { name: "Emerald & Black", hex: "#064e3b" },
      { name: "Matte Black", hex: "#0f172a" },
      { name: "Charcoal & Mesh", hex: "#475569" }
    ],
    sizes: ["One Size (Adjustable Snap)"],
    features: [
      "3D Embroidered Soca Valley Hub logo patch (1st Gen)",
      "Breathable polyester mesh back",
      "Adjustable snapback closure",
      "Pre-curved visor"
    ],
    inStock: true,
    isBestseller: true
  },
  {
    id: "soca-valley-cap-2nd-ed",
    name: "Soca Valley Hub Logo Cap 2nd edition",
    category: "caps",
    price: 24.00,
    description: "Modern flat-brim snapback cap crafted with premium twill. High-density stitched Soca Valley Hub 2nd Edition emblem representing the peaks and emerald river.",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260728_114017_385e7663-0f21-4efe-aefd-0ae01b5e7368.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260728_114338_1423ae86-8540-4c4f-af89-5bbb71231881.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260728_114318_9b1b6007-44c5-449a-9321-e3d7b8853bea.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260728_114328_b6252f4c-791f-4955-9ee3-5f6490746723.png&w=1280&q=85"
    ],
    colors: [
      { name: "Forest Green", hex: "#14532d" },
      { name: "Slate Grey", hex: "#334155" },
      { name: "Deep Black", hex: "#020617" }
    ],
    sizes: ["One Size (Adjustable)"],
    features: [
      "Premium wool-blend fabric",
      "Flat visor with green underbill",
      "Sturdy 6-panel construction",
      "Embroidered 2nd edition side logo detail"
    ],
    inStock: true,
    isNew: true
  }
];

export const ebikeModels = [
  {
    id: "headeer-bk20",
    name: "Headeer BK20 All-Terrain Fat-Tire E-Bike",
    category: "e-cruiser" as const,
    tag: "Exclusive 2-Bike Private Fleet",
    motor: "750W High-Torque Brushless Hub Motor",
    battery: "48V 15Ah High-Capacity Lithium Battery",
    range: "Up to 70 km per single charge",
    shortCruisePrice: 15.00,
    halfDayPrice: 25.00,
    fullDayPrice: 35.00,
    multiDayPricePerDay: 30.00,
    sizes: ["One Size"] as ("S" | "M" | "L" | "XL" | "One Size")[],
    totalStockPerSize: { "One Size": 2 },
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260730_121504_8ddc24e2-8e83-416a-80b8-66af2dbfed94.png&w=1280&q=85",
    description: "The official signature custom fat-tire e-bike of Apartma Pr Fejtne & J.Bizjak Bovec. Featuring 20x4.0'' puncture-resistant fat tires, dual rear coil suspension, vintage round LED headlight, and leather dual-bench saddle. Perfect for cruising Soča riverbanks, Boka Waterfall trails, and Čezsoča village.",
    specs: ["20x4.0'' All-Terrain Fat Tires", "Dual Rear Hydraulic Coil Suspension", "Retro Motorcycle LED Headlight", "Shimano 7-Speed & Twist Throttle/Pedal Assist", "Strict 2-Bike Fleet Inventory"]
  }
];

export const SAMPLE_INITIAL_SHOP_ORDERS: ShopOrder[] = [
  {
    id: 'shop-order-1',
    orderRef: 'SO-9182',
    customerName: 'Elena Rossi',
    customerEmail: 'elena.rossi@gmail.com',
    customerPhone: '+39 347 1234567',
    deliveryMethod: 'postal-delivery',
    shippingAddress: 'Via Dante 14, 20121 Milano, Italy',
    notes: 'Please wrap carefully as a gift.',
    items: [
      {
        productId: 'tshirt-soca-legend',
        productName: 'J.Bizjak Soča Valley Legend T-Shirt',
        selectedColor: 'Emerald Green',
        selectedSize: 'M',
        quantity: 1,
        unitPrice: 29.00,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80'
      },
      {
        productId: 'cap-bovec-peaks',
        productName: 'Bovec Peaks Curved Snapback Cap',
        selectedColor: 'Alpine Olive',
        selectedSize: 'One Size',
        quantity: 1,
        unitPrice: 26.00,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'
      }
    ],
    totalAmount: 58.90,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'shop-order-2',
    orderRef: 'SO-4019',
    customerName: 'Jan Novak',
    customerEmail: 'jan.novak@triera.si',
    customerPhone: '+386 40 555 987',
    deliveryMethod: 'bovec-pickup',
    notes: 'Will pick up at Apartma Pr Fejtne hub tomorrow morning.',
    items: [
      {
        productId: 'tshirt-emerald-river',
        productName: 'Soča Emerald River Classic Tee',
        selectedColor: 'Charcoal Gray',
        selectedSize: 'L',
        quantity: 1,
        unitPrice: 29.00,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'
      }
    ],
    totalAmount: 29.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];


