import weddingCakeImg from '../assets/images/wd 1.jpg'
import crystalWeddingImg from '../assets/images/wd 2.jpg'
import ivoryFloralWeddingImg from '../assets/images/wd 3.jpg'
import mochaBirthdayImg from '../assets/images/bd 1.jpg'
import luxeMacaronBirthdayImg from '../assets/images/bd 2.jpg'
import pastelJubileeBirthdayImg from '../assets/images/bd 3.jpg'
import emeraldGraduationImg from '../assets/images/gd 1.jpg'
import blackGoldDripImg from '../assets/images/gd 2.jpg'
import goldRibbonChocolateImg from '../assets/images/gd 3.jpg'
import goldenLaurelImg from '../assets/images/gd 4.jpg'
import chocolateDripImg from '../assets/images/3.jpg'
import gildedRoseWeddingImg from '../assets/images/8.jpg'

export const collectionsConfig = {
  birthday: {
    key: 'birthday',
    route: '/creations/birthday',
    title: 'Birthday',
    italicTitle: 'Cakes',
    romanNumeral: 'Chapter I',
    overline: 'The Birthday Collection — Chapter I',
    tagline: 'Artisanal confections sculpted for landmark milestones and joyful personal celebrations.',
    heroImage: mochaBirthdayImg,
    heroAlt: 'Three-tiered architectural mocha buttercream birthday celebration cake on an exhibition pedestal',
    featuredCakeId: 'creation-4',
    categoryFilter: (cake) => cake.category === 'birthdays',
    defaultPageSize: 8,
    occasions: [
      {
        id: 'childrens-birthdays',
        slug: 'childrens-birthdays',
        title: "Children's Birthdays",
        description: 'Whimsical, playful confections tailored to children’s beloved themes and imaginations.',
        image: pastelJubileeBirthdayImg,
        alt: "Delicate pastel celebration cake for children's birthdays",
        matchPredicate: () => false, // No catalogue pieces yet; leads to bespoke custom commission
      },
      {
        id: 'adult-birthdays',
        slug: 'adult-birthdays',
        title: 'Adult Birthdays',
        description: 'Sophisticated aesthetics featuring modern textures, drip accents, and refined palettes.',
        image: blackGoldDripImg,
        alt: 'Sophisticated matte black and gold drip adult celebration cake',
        matchPredicate: (cake) =>
          cake.slug === 'mocha-cascade-bronze-spheres' ||
          cake.slug === 'pastel-botanical-jubilee-cake',
      },
      {
        id: 'milestone-birthdays',
        slug: 'milestone-birthdays',
        title: 'Milestone Birthdays',
        description: 'Monumental statement tiers celebrating 30th, 40th, 50th, and lifetime jubilees.',
        image: mochaBirthdayImg,
        alt: 'Milestone birthday celebration cake with gold spheres and chocolate sails',
        matchPredicate: (cake) =>
          cake.slug === 'mocha-cascade-bronze-spheres' ||
          cake.categoryLabel?.toLowerCase().includes('milestone'),
      },
      {
        id: 'first-birthdays',
        slug: 'first-birthdays',
        title: 'First Birthdays',
        description: 'Gentle, tender centerpieces marking your child’s inaugural milestone celebration.',
        image: luxeMacaronBirthdayImg,
        alt: 'Tender first birthday celebration cake with macarons and gentle pastel tones',
        matchPredicate: () => false, // Bespoke custom commission
      },
      {
        id: 'surprise-celebrations',
        slug: 'surprise-celebrations',
        title: 'Surprise Celebrations',
        description: 'Vibrant celebratory pieces designed to stun guests and crown unforgettable moments.',
        image: chocolateDripImg,
        alt: 'Decadent chocolate drip surprise celebration cake',
        matchPredicate: (cake) => cake.slug === 'luxe-celebration-drip-macaron-crown',
      },
    ],
  },

  wedding: {
    key: 'wedding',
    route: '/creations/wedding',
    title: 'Wedding',
    italicTitle: 'Cakes',
    romanNumeral: 'Chapter II',
    overline: 'The Wedding Collection — Chapter II',
    tagline: 'Timeless architectural centerpieces crafted for lifetime vows and grand receptions.',
    heroImage: weddingCakeImg,
    heroAlt: 'Towering ivory and champagne royal wedding cake with cascading deep-red sugar roses',
    featuredCakeId: 'creation-1',
    categoryFilter: (cake) => cake.category === 'weddings',
    defaultPageSize: 8,
    occasions: [
      {
        id: 'engagements',
        slug: 'engagements',
        title: 'Engagements',
        description: 'Intimate, romantic centerpieces to toast your proposal and marital promise.',
        image: gildedRoseWeddingImg,
        alt: 'Romantic engagement cake with midnight cocoa and metallic rose details',
        matchPredicate: (cake) => cake.slug === 'gilded-rose-midnight-cocoa-wedding-tier',
      },
      {
        id: 'traditional-weddings',
        slug: 'traditional-weddings',
        title: 'Traditional Weddings',
        description: 'Culturally attuned matrimonial tiers celebrating Ugandan heritage with regal prestige.',
        image: ivoryFloralWeddingImg,
        alt: 'Traditional matrimonial wedding tier with handcrafted sugar lace',
        matchPredicate: () => false, // Links to custom commission or Kwanjula collection
      },
      {
        id: 'wedding-receptions',
        slug: 'wedding-receptions',
        title: 'Wedding Receptions',
        description: 'Towering multi-tier ballroom showstoppers designed for majestic grand entrances.',
        image: weddingCakeImg,
        alt: 'Grand wedding reception cake with champagne drapery and sugar florals',
        matchPredicate: (cake) =>
          cake.slug === 'champagne-crimson-royal-wedding-cake' ||
          cake.slug === 'magnolia-blossom-crystal-grand-tier',
      },
      {
        id: 'anniversaries',
        slug: 'anniversaries',
        title: 'Anniversaries',
        description: 'Classic commemorative tiers honouring years of steadfast love and devotion.',
        image: crystalWeddingImg,
        alt: 'Anniversary celebration cake with crystal accents and white magnolias',
        matchPredicate: () => false, // Bespoke custom commission
      },
    ],
  },

  graduation: {
    key: 'graduation',
    route: '/creations/graduation',
    title: 'Graduation',
    italicTitle: 'Cakes',
    romanNumeral: 'Chapter III',
    overline: 'The Graduation Collection — Chapter III',
    tagline: 'Stately tiers commemorating scholarly triumph, honorary degrees, and lifetime achievement.',
    heroImage: emeraldGraduationImg,
    heroAlt: 'Three-tier royal emerald marble graduation cake with gold crest medallion',
    featuredCakeId: 'creation-9',
    categoryFilter: (cake) => cake.category === 'graduation',
    defaultPageSize: 8,
    occasions: [
      {
        id: 'school-graduations',
        slug: 'school-graduations',
        title: 'School Graduations',
        description: 'Celebratory centerpieces honoring primary, secondary, and academy completions.',
        image: goldRibbonChocolateImg,
        alt: 'Formal graduation cake with gold ribbon bow and chocolate details',
        matchPredicate: () => false, // Bespoke custom commission
      },
      {
        id: 'university-graduations',
        slug: 'university-graduations',
        title: 'University Graduations',
        description: 'Distinguished formal tiers celebrating undergraduate, master’s, and doctorate milestones.',
        image: goldRibbonChocolateImg,
        alt: 'Satin ribbon and Belgian chocolate university graduation cake',
        matchPredicate: (cake) => cake.slug === 'satin-ribbon-belgian-chocolate-crown',
      },
      {
        id: 'professional-achievements',
        slug: 'professional-achievements',
        title: 'Professional Achievements',
        description: 'Prestigious designs marking board appointments, bar admissions, and career triumphs.',
        image: emeraldGraduationImg,
        alt: 'Emerald and gold crest tier for professional achievement',
        matchPredicate: (cake) => cake.slug === 'emerald-gold-crest-achievement-tier',
      },
    ],
  },

  kwanjula: {
    key: 'kwanjula',
    route: '/creations/kwanjula',
    title: 'Kwanjula',
    italicTitle: 'Cakes',
    romanNumeral: 'Chapter IV',
    overline: 'The Kwanjula Collection — Chapter IV',
    tagline: 'Regal ceremonial tiers honoring Ugandan traditional matrimonial customs and ancestral dignity.',
    heroImage: ivoryFloralWeddingImg,
    heroAlt: 'Ivory heritage Kwanjula traditional ceremony cake with golden rope braids',
    featuredCakeId: 'creation-3',
    categoryFilter: (cake) => cake.category === 'traditional',
    defaultPageSize: 8,
    occasions: [
      {
        id: 'introduction-ceremonies',
        slug: 'introduction-ceremonies',
        title: 'Introduction Ceremonies',
        description: 'Authentic matrimonial tiers featuring dense spiced fruitcake, ivory fondant, and gold braids.',
        image: ivoryFloralWeddingImg,
        alt: 'Ceremonial tier composed for Ugandan introduction celebrations',
        matchPredicate: (cake) => cake.slug === 'ivory-heritage-kwanjula-tier',
      },
      {
        id: 'traditional-celebrations',
        slug: 'traditional-celebrations',
        title: 'Traditional Celebrations',
        description: 'Commemorative customary cakes celebrating Kukyala rites, jubilees, and family unions.',
        image: goldenLaurelImg,
        alt: 'Golden laurel ceremonial anniversary and traditional celebration cake',
        matchPredicate: (cake) => cake.slug === 'golden-laurel-anniversary-grand-tier',
      },
    ],
  },
}
