const CDN =
  "https://s3.amazonaws.com/webflow-prod-assets/6aba4b58f4d7d989a6e7985b/";

export type ProfileId = "fruit" | "berry" | "fresh" | "sweet";
export type IntensityId = "light" | "balanced" | "intense";

export interface Flavor {
  id: string;
  name: string;
  desc: string;
  color: string;
  image: string;
  slideIndex: number;
}

export interface Option<T extends string> {
  value: T;
  label: string;
  hint: string;
}

export interface Question<T extends string> {
  id: string;
  title: string;
  options: Option<T>[];
}

export const flavors: Record<string, Flavor> = {
  grape: {
    id: "grape",
    name: "Grape Juice",
    desc: "Deep, juicy grapes in every puff.",
    color: "#8a77d3",
    image: CDN + "6abc16a544eb530b06cd7a15_slide1.webp",
    slideIndex: 0,
  },
  apple: {
    id: "apple",
    name: "Apple Max",
    desc: "Crisp green apple with a bright, tart finish.",
    color: "#62c55d",
    image: CDN + "6abc16a53e8d3567584fd565_slide2.webp",
    slideIndex: 1,
  },
  watermelon: {
    id: "watermelon",
    name: "Watermelon",
    desc: "Light, juicy summer watermelon.",
    color: "#fa4d28",
    image: CDN + "6abc16a5377811549f0d643f_slide3.webp",
    slideIndex: 2,
  },
  mango: {
    id: "mango",
    name: "Mango Me",
    desc: "A tropical escape of ripe, sweet mango.",
    color: "#fcb32d",
    image: CDN + "6abc16a59b17ada27853d3e0_slide4.webp",
    slideIndex: 3,
  },
  blueberry: {
    id: "blueberry",
    name: "Ice Blueberry",
    desc: "Blueberries with an icy, cooling kick.",
    color: "#61b5e4",
    image: CDN + "6abc16a55a913fda0854b8f0_slide5.webp",
    slideIndex: 4,
  },
  strawberry: {
    id: "strawberry",
    name: "Fresh Strawberry",
    desc: "Sweet strawberries with a fresh summer note.",
    color: "#f37f88",
    image: CDN + "6abc16a5d0c8ff63179ae824_Group%203137.webp",
    slideIndex: 5,
  },
  lemonade: {
    id: "lemonade",
    name: "Sweet Lemonade",
    desc: "Sweet and sour homemade lemonade.",
    color: "#68c991",
    image: CDN + "6abc16a5e79bdbb5d530937c_slide7.webp",
    slideIndex: 6,
  },
  gum: {
    id: "gum",
    name: "Double Gum",
    desc: "The nostalgic taste of classic bubble gum.",
    color: "#ed95bf",
    image: CDN + "6abc16a586c267e438f53723_slide8.webp",
    slideIndex: 7,
  },
  banana: {
    id: "banana",
    name: "Banana Mama",
    desc: "Creamy banana with a soft, sweet finish.",
    color: "#ffc700",
    image: CDN + "6abc16a54f740b1e6e4f7ae1_slide9.webp",
    slideIndex: 8,
  },
  cherry: {
    id: "cherry",
    name: "Cherry Berry",
    desc: "Ripe cherries and wild berries in one puff.",
    color: "#f9465e",
    image: CDN + "6abc16a5b81e806584c163d6_slide10.webp",
    slideIndex: 9,
  },
};

export const profileQuestion: Question<ProfileId> = {
  id: "profile",
  title: "What do you crave?",
  options: [
    { value: "fruit", label: "Fruity", hint: "Mango, apple, banana" },
    { value: "berry", label: "Berry", hint: "Grape, strawberry, cherry" },
    {
      value: "fresh",
      label: "Fresh & icy",
      hint: "Blueberry, watermelon, lemonade",
    },
    { value: "sweet", label: "Sweet treat", hint: "Gum, banana, strawberry" },
  ],
};

export const intensityQuestion: Question<IntensityId> = {
  id: "intensity",
  title: "How bold should it be?",
  options: [
    { value: "light", label: "Light", hint: "Soft and easy" },
    { value: "balanced", label: "Balanced", hint: "Right in the middle" },
    { value: "intense", label: "Intense", hint: "Full flavor hit" },
  ],
};

export const matrix: Record<
  ProfileId,
  Record<IntensityId, keyof typeof flavors>
> = {
  fruit: { light: "apple", balanced: "mango", intense: "banana" },
  berry: { light: "strawberry", balanced: "grape", intense: "cherry" },
  fresh: { light: "lemonade", balanced: "watermelon", intense: "blueberry" },
  sweet: { light: "strawberry", balanced: "gum", intense: "banana" },
};

export function pickFlavor(
  profile: ProfileId,
  intensity: IntensityId = "balanced",
): Flavor {
  return flavors[matrix[profile][intensity]];
}
