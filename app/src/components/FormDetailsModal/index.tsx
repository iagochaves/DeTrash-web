import classNames from 'classnames';
import { DownloadSimple, X } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { ResidueType, useFormByIdQuery } from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { CompactResidueCard } from '../CompactResidueCard';

type FormActionButtonProps = {
  label: string;
  isDisabled?: boolean;
};

type Residues = {
  [residue: string]: {
    amount: number;
    videoFileName: string | null | undefined;
    invoiceFileName: string | null | undefined;
  };
};

const FormActionButton: React.FC<FormActionButtonProps> = ({
  label,
  isDisabled,
}) => {
  return (
    <button
      className={classNames(
        'btn btn-sm btn-primary text-white flex items-center gap-1',
        {
          'btn-disabled': isDisabled,
        }
      )}
    >
      <DownloadSimple className="w-6 h-6" />
      <p>Download {label}</p>
    </button>
  );
};

export const FormDetailsModal: React.FC<{ formId: string }> = ({ formId }) => {
  const [selectedResidueCard, setSelectedResidueCard] = useState('');

  const { data, error, loading } = useFormByIdQuery({
    variables: {
      FORM_ID: formId,
    },
  });

  // const [useFormVideoUrlQuery, { loading: isDownloadingFile }] =
  //   useFormVideoUrlLazyQuery();

  // const loadVideoAndOpen = async (formId: string, residueType: ResidueType) => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const { data } = await useFormVideoUrlQuery({
  //     variables: { formId, residueType },
  //   });

  //   if (data) {
  //     window.open(data.formVideoUrlByResidue, '_blank');
  //   }
  // };

  const formattedResidues: Residues = useMemo(() => {
    if (data) {
      return {
        [ResidueType.Glass]: {
          amount: data.form.glassKgs,
          videoFileName: data.form.glassVideoFileName,
          invoiceFileName: data.form.glassInvoiceFileName,
        },
        [ResidueType.Metal]: {
          amount: data.form.metalKgs,
          videoFileName: data.form.metalVideoFileName,
          invoiceFileName: data.form.metalInvoiceFileName,
        },
        [ResidueType.Organic]: {
          amount: data.form.organicKgs,
          videoFileName: data.form.organicVideoFileName,
          invoiceFileName: data.form.organicInvoiceFileName,
        },
        [ResidueType.Paper]: {
          amount: data.form.paperKgs,
          videoFileName: data.form.paperVideoFileName,
          invoiceFileName: data.form.paperInvoiceFileName,
        },
        [ResidueType.Plastic]: {
          amount: data.form.plasticKgs,
          videoFileName: data.form.plasticVideoFileName,
          invoiceFileName: data.form.plasticInvoiceFileName,
        },
      };
    }
    return {} as Residues;
  }, [data]);

  if (!data || loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <p className="mb-1">
        Wallet Address:{' '}
        <span className="font-bold">
          {data.form.walletAddress || 'No wallet submitted'}
        </span>
      </p>

      <h2 className="mb-5">
        Select the residue type below in order to download Video and Invoices if
        available
      </h2>

      <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-end gap-2 mb-2">
        <FormActionButton
          label="Video"
          isDisabled={
            !(
              selectedResidueCard &&
              formattedResidues[selectedResidueCard]?.videoFileName
            )
          }
        />
        <FormActionButton
          label="Invoice"
          isDisabled={
            !(
              selectedResidueCard &&
              formattedResidues[selectedResidueCard]?.invoiceFileName
            )
          }
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {formattedResidues &&
          USER_WASTE_TYPES.map((wasteType) => (
            <CompactResidueCard
              key={wasteType.key}
              isActive={selectedResidueCard === wasteType.key}
              setValue={setSelectedResidueCard}
              residueType={formattedResidues[wasteType.key]}
              wasteInfo={wasteType}
            />
          ))}
      </div>
    </div>
  );
};
