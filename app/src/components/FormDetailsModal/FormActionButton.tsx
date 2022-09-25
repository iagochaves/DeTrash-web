import classNames from 'classnames';
import { DownloadSimple } from 'phosphor-react';
import { useState } from 'react';
import {
  DocumentType,
  ResidueType,
  useFormDocumentsUrlByResidueLazyQuery,
} from 'src/graphql/generated/graphql';

type FormActionButtonProps = {
  formId: string;
  isDisabled: boolean;
  documentType: DocumentType;
  residueType: ResidueType;
};

export const FormActionButton: React.FC<FormActionButtonProps> = ({
  formId,
  isDisabled,
  documentType,
  residueType,
}) => {
  const [isDownloadingFile, setIsDownloadFile] = useState(false);
  const [useFormDocumentsUrlByResidueQuery] =
    useFormDocumentsUrlByResidueLazyQuery();

  const loadVideoAndOpen = async () => {
    setIsDownloadFile(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await useFormDocumentsUrlByResidueQuery({
      variables: { formId, residueType, documentType },
    });

    if (data) {
      const link = document.createElement('a');
      link.href = data.formDocumentsUrlByResidue;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // window.open(data.formDocumentsUrlByResidue, '_blank');
    }
    setIsDownloadFile(false);
  };

  return (
    <a
      className={classNames(
        'btn btn-sm btn-primary text-white flex items-center gap-1',
        {
          'btn-disabled': isDisabled,
          'loading btn-disabled': isDownloadingFile,
        }
      )}
      onClick={loadVideoAndOpen}
    >
      <DownloadSimple className="w-6 h-6" />
      <p>Download {documentType}</p>
    </a>
  );
};
