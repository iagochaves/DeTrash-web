import Footer from '@src/components/Footer';
import Header from '@src/components/Header';
import { NAV_PAGES } from '@src/utils/constants';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();
  console.log(router);
  const translate = useTranslations();

  const getCurrentPage = () => {
    return (
      NAV_PAGES.find((navPage) => `/${navPage.path}` === router.asPath)?.name ||
      'home'
    );
  };

  const title = translate(`navItems.${getCurrentPage()}`);
  const url = `${
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://detrashtoken.com'
  }${router.asPath}`;
  return (
    <>
      <NextSeo
        titleTemplate="DeTrash | %s"
        title={title}
        description={translate('description')}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
        languageAlternates={[
          {
            hrefLang: 'pt-BR',
            href: 'https://www.detrashtoken.com/pt',
          },
        ]}
        additionalMetaTags={[
          {
            property: 'dc:creator',
            content: 'Philipp Teles von Hauenschild',
          },
          {
            name: 'application-name',
            content: 'DeTrash',
          },
        ]}
      />

      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />

        {children}

        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
