/* eslint-disable react-hooks/rules-of-hooks */
import { toBlob } from 'html-to-image';
import {
  useCreateNftMutation,
  useSubmitFormImageMutation,
} from 'src/graphql/generated/graphql';
import { uploadToS3 } from 'src/utils/uploadToS3';

export const useGenerateNFT = (formId: string) => {
  const [useSubmitFormImage] = useSubmitFormImageMutation();

  const [useCreateNft] = useCreateNftMutation();

  const handleFormAudit = async () => {
    const { data } = await useSubmitFormImage({
      variables: {
        FORM_ID: formId,
      },
    });

    const element = document.getElementById('modal-panel')?.parentElement;
    if (element && data) {
      const dataUrl = await toBlob(element);

      if (dataUrl) {
        const imageFile = new File([dataUrl], `${formId}.png`, {
          type: 'image/png',
        });

        const [, { data: nftData }] = await Promise.all([
          uploadToS3(data.submitFormImage, imageFile),
          useCreateNft({
            variables: {
              FORMID: formId,
            },
          }),
        ]);

        if (nftData) {
          const bytes = new TextEncoder().encode(nftData.createNFT.body);

          const blob = new Blob([bytes], {
            type: 'application/json;charset=utf-8',
          });

          const metadataFile = new File([blob], 'testfile', {
            type: 'application/json',
          });

          uploadToS3(nftData.createNFT.createMetadataUrl, metadataFile);
        }
      }
    }
  };

  return { handleFormAudit };
};
