import ContactForm from '@modules/home/components/ContactForm';
import {
  getPrivacyPolicyPageQuery,
  PrivacyPolicyData,
} from '@modules/home/graphql/queries';
import {
  ContactFormSchema,
  contactFormSchema,
  INITIAL_FORM_VALUES,
} from '@modules/home/utils/YupSchema';
import { homeApolloClient } from '@shared/lib/apollo';
import { Formik } from 'formik';
import { GetStaticProps } from 'next';

type PrivacyPolicyPageProps = {
  messages: PrivacyPolicyData;
};

const PrivacyPolicy: React.FC<PrivacyPolicyPageProps> = ({ messages }) => {
  const handleSubmitContactForm = (formData: ContactFormSchema) => {
    console.log(formData);
  };
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">{messages.privacyPolicyTitle}</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div
                className="gap-y-4 flex flex-col"
                dangerouslySetInnerHTML={{
                  __html: messages.privacyPolicyText.html,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmitContactForm}
      >
        {(formikProps) => <ContactForm {...formikProps} />}
      </Formik>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await homeApolloClient.query({
    query: getPrivacyPolicyPageQuery,
    variables: {
      locale,
    },
  });

  if (data) {
    return {
      props: {
        messages: {
          ...data.privacyPolicyPages[0],
          ...(await import(`@modules/home/i18n/${locale}.json`)).default,
        },
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  }

  return {
    props: {},
  };
};

export default PrivacyPolicy;
