import { toPng } from 'html-to-image';
import { useFormByIdQuery } from 'src/graphql/generated/graphql';
import Modal from '../Modal';
import { FormDetailsModalBody } from './FormDetailsModalBody';
import { FormDetailsModalFooter } from './FormDetailsModalFooter';

type FormDetailsModalProps = {
  formId: string;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const FormDetailsModal: React.FC<FormDetailsModalProps> = ({
  formId,
  isModalOpen,
  setModalOpen,
}) => {
  const { data, loading } = useFormByIdQuery({
    variables: {
      FORM_ID: formId,
    },
  });

  const form = data?.form;

  const handleFormAudit = async () => {
    console.log('a');
    const element = document.getElementById('modal-panel')?.parentElement;
    console.log(element);
    if (element) {
      toPng(element)
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.download = 'my-image-name';
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onCloseModal={() => setModalOpen(false)}
      title={`Form #${formId}`}
      content={<FormDetailsModalBody formData={data} isLoading={loading} />}
      footer={
        <FormDetailsModalFooter
          onFormAudit={handleFormAudit}
          formId={formId}
          isFormAuthorizedByAdmin={form?.isFormAuthorizedByAdmin!}
          isLoading={loading}
        />
      }
    />
  );
};
