export interface CategoryContentSection {
  title: string;
  content?: string;
  items?: string[];
  subSections?: {
    title: string;
    content: string;
  }[];
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategoryContent {
  heroTitle: string;
  heroDescription: string;
  sections: CategoryContentSection[];
  faqs: CategoryFAQ[];
}

// Category-specific content data
const specificContent: Record<string, CategoryContent> = {
  "Automotive & Vehicles": {
    heroTitle: "Top Automotive Dealers in Salem",
    heroDescription: "Explore Salem's premier network of automotive dealers, mechanics, and vehicle service providers. Find car dealers, auto parts shops, and repair services with complete business information including addresses, phone numbers, and website links.",
    sections: [
      {
        title: "About Our Automotive Directory",
        content: "This directory features verified automotive businesses in Salem offering vehicles, parts, repairs, and maintenance services for all types of automobiles."
      }
    ],
    faqs: [
      {
        question: "How can I find the best car dealer in Salem?",
        answer: "Our directory lists verified car dealers with customer contact information. You can compare different dealers based on their specialty and reach out directly for quotes."
      },
      {
        question: "Are the automotive services listed here verified?",
        answer: "Yes, we prioritize verified businesses that have provided complete documentation and contact details to ensure trust and reliability for our users."
      }
    ]
  },
  "Air Conditioners": {
    heroTitle: "AC Dealers in Salem",
    heroDescription: "On this page you will find a comprehensive list of AC dealers in Salem with their complete business information including name, address, contact number, mobile number, email and website. Whether you are looking to purchase a new air conditioning unit, upgrade your existing system, or require professional installation services, the AC dealers listed here can assist you with all your cooling needs.",
    sections: [
      {
        title: "About Our AC Dealers Directory",
        content: "This directory showcases a wide selection of AC dealers operating in Salem. The AC dealers listed here represent businesses that offer various air conditioning solutions for residential and commercial purposes."
      },
      {
        title: "Types of Air Conditioning Units Available",
        items: [
          "Window AC Units: Traditional air conditioners that fit into windows or walls. Cost-effective, easy to install, and suitable for cooling single rooms.",
          "Split Air Conditioners: Consist of an indoor and outdoor unit. More efficient, quieter, and provide better aesthetics than window units.",
          "Portable Air Conditioners: Standalone units offering flexibility to move between rooms. Ideal for temporary cooling solutions."
        ]
      }
    ],
    faqs: [
      {
        question: "Who are the top AC dealers in Salem?",
        answer: "Salem hosts several reputable AC dealers offering brands like Voltas, Daikin, LG, and Blue Star. Our list includes verified dealers with direct contact information."
      },
      {
        question: "Do these dealers provide installation services?",
        answer: "Most AC dealers listed on our platform offer professional installation services. We recommend confirming this when you contact the dealer directly."
      },
      {
        question: "Can I find commercial AC solutions here?",
        answer: "Yes, many of the listed dealers specialize in both residential and commercial AC systems including central cooling and VRF systems."
      }
    ]
  }
};

export function getCategoryContent(categoryName: string): CategoryContent {
  // Check if we have specific content for this category
  if (specificContent[categoryName]) {
    return specificContent[categoryName];
  }

  // Generate dynamic content for other categories
  return generateDynamicContent(categoryName);
}

function generateDynamicContent(categoryName: string): CategoryContent {
  return {
    heroTitle: `${categoryName} in Salem`,
    heroDescription: `Browse our comprehensive directory of ${categoryName} service providers in Salem. Find verified businesses with complete contact information, addresses, and service details. Whether you're looking for professional services or quality products, our listings connect you with trusted ${categoryName} businesses in your area.`,
    sections: [
      {
        title: `About Our ${categoryName} Directory`,
        content: `This directory showcases a wide selection of ${categoryName} businesses operating in Salem. The listings here represent verified businesses offering various services and products to meet different requirements and budgets. You can find businesses specializing in different offerings to suit your specific needs.`
      },
      {
        title: "Why Choose Businesses from Our Directory",
        items: [
          "Verified business information with complete details",
          "Direct contact numbers and email addresses",
          "Detailed physical addresses in Salem",
          "Website links for additional information",
          "Professional service providers you can trust"
        ]
      },
      {
        title: "How to Find the Right Service Provider",
        content: `Browse the complete list of ${categoryName} businesses below. Each listing includes the business name, address, contact information, and website. You can directly reach out to any business for quotations, inquiries, or to schedule services. We recommend comparing multiple options to find the best fit for your needs and budget.`
      },
      {
        title: "Contact and Inquire",
        content: "Use the contact information provided in each listing to connect with businesses directly. Most service providers offer free consultations and are happy to discuss your requirements. Feel free to reach out to multiple businesses to compare services, pricing, and availability."
      }
    ],
    faqs: [
      {
        question: `How do I find the best ${categoryName} in Salem?`,
        answer: `You can browse our verified list of ${categoryName} providers, check their addresses, and call them directly to discuss your specific needs. We recommend checking multiple listings to compare services.`
      },
      {
        question: `Are these businesses verified?`,
        answer: `We strive to verify all businesses listed in our Salem directory. Look for the 'Verified' badge on listings for confirmed service providers.`
      },
      {
        question: `Is it free to use this directory?`,
        answer: `Yes, searching for and contacting businesses through Salem Business is completely free for all users.`
      }
    ]
  };
}
