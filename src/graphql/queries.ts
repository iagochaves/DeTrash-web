import { gql } from '@apollo/client';

export type HomePageData = {
  ctaButton: string;
  ctaSubTitle: string;
  ctaTitle: string;
  ctaTitleEffect: string;
  emailPlaceholder: string;
  featuresBlockItem1Desc: string;
  featuresBlockItem1Title: string;
  featuresBlockItem2Desc: string;
  featuresBlockItem2Title: string;
  featuresBlockItem3Desc: string;
  featuresBlockItem3Title: string;
  featuresBlockSubTitle: string;
  featuresBlockTitle: string;
  featuresHomeItem1: string;
  featuresHomeItem2: string;
  featuresHomeItem3: string;
  featuresHomeSubTitle: string;
  featuresHomeTitle: string;
  formContactButton: string;
  formContactSubTitle: string;
  formContactTitle: string;
  homeButton: string;
  messagePlaceholder: string;
  namePlaceholder: string;
  pageSubTitle: string;
  pageTitle: string;
  pageTitleEffect: string;
  testimonialsButton1: string;
  testimonialsButton2: string;
  testimonialsSubTitle: string;
  testimonialsTitle: string;
};

export const getHomePageQuery = gql`
  query getHomePageQuery($locale: Locale!) {
    homePages(locales: [$locale]) {
      homePageJSON
    }
  }
`;
