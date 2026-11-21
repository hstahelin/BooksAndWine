export type Pairing = {
  slug: string;
  number: string;
  title: string;
  author: string;
  wine: string;
  paragraphs: string[];
  closing: string[];
};

export const pairings: Pairing[] = [
  {
    slug: "the-golden-compass",
    number: "01",
    title: "The Golden Compass",
    author: "Philip Pullman",
    wine: "Langhe Nebbiolo from Piedmont",
    paragraphs: [
      "The Golden Compass follows Lyra Belacqua, a fierce, curious girl growing up among Oxford’s scholars. Her dæmon, Pantalaimon, is her soul in animal form and can change shape as quickly as she changes her mind. When her friend Roger disappears, Lyra’s adventures eventually lead her to the frozen North in search of him. Along the way, she learns to read a golden instrument called an alethiometer (hence the book name The Golden Compass) and begins to uncover the secrets of a mysterious substance called Dust.",
      "What drew me to this Nebbiolo was Lyra herself. I wanted a red with a little mischief in it for the girl who scrambles over the rooftops of Oxford with Pantalaimon.",
      "You know the saying about judging a book by its cover? I’d say the same about judging Nebbiolo by its colour. Hold it up to the light, and you can see right through that pale ruby. Give it a swirl and look for rose petals and red cherries. There’s a lovely tartness to the fruit, like biting into a cherry just before it’s fully ripe. For such a pale wine, it has a surprising fullness in the mouth, and once the fruit fades, a little spice lingers.",
      "That’s where I find Lyra in the glass. On those Oxford rooftops, you might take her for a girl with a talent for getting into trouble. It’s when Roger needs her that you see how much courage there is in her, too.",
    ],
    closing: [
      "I hope you enjoy this pairing and come back for more!",
      "It's my pleasure to share my 2 passions.",
    ],
  },
  {
    slug: "the-book-thief",
    number: "02",
    title: "The Book Thief",
    author: "Markus Zusak",
    wine: "Pinot Noir from Burgundy",
    paragraphs: [
      "The Book Thief is narrated by Death, who watches human cruelty and beauty during World War II.",
      "The story follows Liesel through her life with a bittersweet, hopeful aftertaste, highlighting the resilience of the human spirit and the power of love, friendship, and words.",
      "This book pairs with Pinot Noir from Burgundy. Although…. Almost anything pairs with Pinot Noir from Burgundy; it's one of my favorites!",
      "This wine looks delicate but has underlying structure. This is an elegant wine with red fruit notes like cherry, raspberry, or strawberry.",
      "This wine shows the balance of darkness and light found in The Book Thief. This wine has a vibrant high acidity that brings out hope. And it brings out the shadow/darkness with its tastes of forest floor, mushrooms, or wet leaves. It's built for long conversation with its medium body and moderate alcohol.",
      "The Pinot Noir grape is notoriously difficult to grow, mirroring the fragility of life and the complexities of humans as described by Death.",
    ],
    closing: [
      "I hope you enjoy this pairing and come back for more!",
      "It's my pleasure to share my 2 passions.",
    ],
  },
  {
    slug: "mrs-dalloway",
    number: "03",
    title: "Mrs. Dalloway",
    author: "Virgina Woolf",
    wine: "Pinot Grigio from Lombardy or Veneto",
    paragraphs: [
      "Mrs. Dalloway portrays a single day in June 1923 following Clarissa Dalloway as she goes over the preparations for a party at her house that evening. The book entwines Clarissa’s thoughts and those of World War I veteran Septimus.",
      "So many things seem to happen, that as I was reading the book, I was first inclined to pair it with a New Zealand Sauvignon Blanc to showcase its intense aromas and explosion of tropical fruits. But then I met Lucrezia (Rezia), Septimus' Italian wife.",
      "In parallel scenes, shell-shocked WWI veteran Septimus Warren Smith spends the day haunted by grief and hallucinations alongside his Italian wife, Lucrezia (Rezia), as unsympathetic doctors push to institutionalize him. Unlike Clarissa’s wealthy, emotionally guarded circle, expressive and working-class Rezia stays grounded in simple joys like sewing and family, revealing how lonely post-war London can be for an outsider. To honor her and the sunlit Milan she left behind, pair this story with a chilled, light-bodied Italian Pinot Grigio, which feels right at home on the bright, breezy June day the novel unfolds. Crisp and refreshing with bright aromas of white blossom, zesty lemon, and green apple, its unpretentious warmth offers a breath of Italian life against the stiff formality of 1920s London.",
    ],
    closing: [
      "I hope you enjoy this pairing and come back for more!",
      "It's my pleasure to share my 2 passions.",
    ],
  },
];

export const featuredPairing = pairings[0];

export function getPairing(slug: string) {
  return pairings.find((pairing) => pairing.slug === slug);
}
