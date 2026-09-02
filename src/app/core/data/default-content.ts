import { LandingContent } from '../models/landing-content.model';

// Contenido de respaldo. Se muestra inmediatamente mientras Supabase responde y
// permanece visible si no hay credenciales o si la consulta falla.
export const DEFAULT_CONTENT: LandingContent = {
  brandName: 'estateo',
  brandTagline: 'From property search\nto portfolio growth.',
  heroPrefix: 'Invest Today in',
  heroAccent: 'a Dream',
  heroSuffix: 'House',
  heroImageUrl: '/assets/hero-house.webp',
  sectionBadge: 'PORTFOLIO TOOLS',
  sectionTitle: 'Omni-channel, any task,',
  sectionAccent: 'multi-language',
  sectionDescription:
    'Assistant offers a human-like service that effortlessly blends in your process, completing nearly any tasks and collaborating with your team within the platform.',
  investmentTitle: 'From single assets\nto a rental empire',
  investmentDescription:
    'Our coordinated tools handle the complexities of property management, leaving you with a clear view of your portfolio and its growth.',
  investmentButton: 'Start investing',
  sustainableBadge: 'SUSTAINABLE',
  sustainableTitle: 'Smart homes.\nSmarter investments',
  sustainableDescription:
    'Data-driven insights to help you secure the best eco-homes for the short-term rental market. High demand. High returns.',
  sustainableImageUrl: '/assets/sustainable-community.webp',
  communityPrices: ['$920,000', '$832,500', '$959,000'],
  copyrightText: '© 2026 Estateo. All Rights Reserved',
  services: [
    {
      id: 1,
      title: 'Smart Property',
      description:
        'AI-powered analysis identifies properties with the highest capital growth potential based on market trends and long-term value drivers.',
      cta: 'Find more',
      position: 1,
    },
    {
      id: 2,
      title: 'Growth Forecasting',
      description:
        'Predict future property value appreciation using data-driven forecasts, historical performance, and real-time market indicators.',
      cta: 'Find more',
      position: 2,
    },
    {
      id: 3,
      title: 'Portfolio Optimization',
      description:
        'Build and balance a real estate portfolio designed to maximize long-term asset growth while managing risk across locations.',
      cta: 'Find more',
      position: 3,
    },
  ],
  features: [
    {
      id: 1,
      title: 'Unified dashboard',
      description:
        'Track all your properties, income, and growth metrics in one intuitive interface.',
      eyebrow: 'Market Trends',
      variant: 'dashboard',
      position: 1,
    },
    {
      id: 2,
      title: 'Collaborative',
      description: 'Specialized agents work together seamlessly to handle complex scenarios.',
      eyebrow: 'Live collaboration',
      variant: 'collaboration',
      position: 2,
    },
  ],
  footerGroups: [
    {
      name: 'Products',
      links: [
        { id: 1, groupName: 'Products', label: 'Investment Finder', url: '#', position: 1 },
        { id: 2, groupName: 'Products', label: 'Rental Yield Calculator', url: '#', position: 2 },
        { id: 3, groupName: 'Products', label: 'Portfolio Manager', url: '#', position: 3 },
        { id: 4, groupName: 'Products', label: 'Market Heatmaps', url: '#', position: 4 },
        { id: 5, groupName: 'Products', label: 'Tax Optimization', url: '#', position: 5 },
      ],
    },
    {
      name: 'Customers',
      links: [
        { id: 6, groupName: 'Customers', label: 'Investor Success Stories', url: '#', position: 1 },
        {
          id: 7,
          groupName: 'Customers',
          label: 'Property Management Guide',
          url: '#',
          position: 2,
        },
        { id: 8, groupName: 'Customers', label: 'Market Reports', url: '#', position: 3 },
        { id: 9, groupName: 'Customers', label: 'Webinars', url: '#', position: 4 },
      ],
    },
    {
      name: 'Company',
      links: [
        { id: 10, groupName: 'Company', label: 'About Us', url: '#', position: 1 },
        { id: 11, groupName: 'Company', label: 'Partnership Program', url: '#', position: 2 },
        { id: 12, groupName: 'Company', label: 'Legal Compliance', url: '#', position: 3 },
        { id: 13, groupName: 'Company', label: 'Careers', url: '#', position: 4 },
        { id: 14, groupName: 'Company', label: 'Contact Us', url: '#', position: 5 },
      ],
    },
  ],
};
