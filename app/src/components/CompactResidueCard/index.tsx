import classNames from 'classnames';
import { Check, X } from 'phosphor-react';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { ResidueDocument } from '../FormDetailsModal/FormDetailsModalBody';

type CompactResidueCardProps = {
  isActive: boolean;
  setValue: (value: any) => void;
  residueData: ResidueDocument;
};

type FileStatusProps = {
  isActive: boolean;
  hasFileAssociated: boolean;
  label: string;
};

const FileStatus: React.FC<FileStatusProps> = ({
  hasFileAssociated,
  isActive,
  label,
}) => {
  return (
    <div
      className={classNames('flex items-center justify-center gap-1', {
        'text-lime-600': isActive && hasFileAssociated,
        'text-red-700': isActive && !hasFileAssociated,
        'text-gray-400': !isActive,
      })}
    >
      {hasFileAssociated ? (
        <Check className="h-6 w-6" aria-hidden="true" />
      ) : (
        <X className="h-6 w-6" aria-hidden="true" />
      )}
      <p className="text-sm sm:text-base">{label}</p>
    </div>
  );
};

export const CompactResidueCard: React.FC<CompactResidueCardProps> = ({
  isActive,
  setValue,
  residueData,
}) => {
  const wasteInfo = USER_WASTE_TYPES.find(
    (wasteType) => wasteType.key === residueData.residueType
  )!;

  return (
    <button
      className={classNames(
        'px-4 py-2 border-2 rounded-md transition-all duration-150',
        {
          'border-primary': isActive,
        }
      )}
      onClick={() => setValue(residueData)}
    >
      <section className="flex items-center justify-between">
        <wasteInfo.Icon
          className={classNames('w-8 h-8', {
            'text-primary': isActive,
            'text-gray-400': !isActive,
          })}
        />
        <div className="flex flex-col items-start">
          <FileStatus
            isActive={isActive}
            hasFileAssociated={!!residueData.videoFileName}
            label="Video"
          />
          <FileStatus
            isActive={isActive}
            hasFileAssociated={!!residueData?.invoicesFileName?.length}
            label="Invoice"
          />
        </div>
      </section>
      <section className="flex items-center justify-between">
        <div className="font-bold text-gray-900">
          <p className="text-sm sm:text-base text-left">{wasteInfo.value}</p>
          <h1 className="text-lg sm:text-2xl text-left">{`${residueData.amount} Kgs`}</h1>
        </div>
      </section>
    </button>
  );
};
