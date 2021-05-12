import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';

import Spinner from '../utils/Spinner';

const ImageCrop = ({ img, openModal, updateModal, onCropped }) => {
   const [spinner, setSpinner] = useState(false);
   const [openCropper, setOpenCropper] = useState(false);
   const [cropper, setCropper] = useState(null);
   const [cropStatus, setCropStatus] = useState('notCropped');
   const ic = useRef(null);

   const createNewCropperInstance = () => {
      setCropper(
         new Cropper(ic.current, {
            aspectRatio: 1 / 1,
            viewMode: 2,
            dragMode: 'move',
            guides: false,
            highlight: false,
            center: true,
            autoCropArea: 1,
            movable: false,
            rotatable: false,
            scalable: false,
            zoomable: false,
            fillColor: '#000000',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
         }),
      );
   };

   const closeCropper = () => {
      setOpenCropper(false);
      updateModal(false);
      setTimeout(() => {
         cropper.destroy();
      }, 500);
   };

   const blobToFile = (blob, fileName) => {
      const lastModifiedDate = new Date();
      const file = new File([blob], fileName, { lastModified: lastModifiedDate });
      return file;
   };

   const cropImage = () => {
      setCropStatus('cropping');
      const base64 = cropper
         .getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 })
         .toDataURL();
      cropper.getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 }).toBlob(
         (blob) => {
            const photo = blobToFile(blob, 'testing.jpeg');
            onCropped({ base64, photo });
            setTimeout(() => {
               setCropStatus('cropped');
               setTimeout(() => {
                  closeCropper();
               }, 200);
            }, 500);
         },
         'image/jpeg',
         1,
      );
   };

   useEffect(() => {
      if (openModal === true) {
         setSpinner(true);
         setTimeout(() => {
            setSpinner(false);
            setOpenCropper(true);
            setCropStatus('notCropped');
            createNewCropperInstance();
         }, 800);
      }
   }, [openModal]);

   let cropText;
   if (cropStatus === 'notCropped') {
      cropText = <span>crop</span>;
   } else if (cropStatus === 'cropping') {
      cropText = <span>cropping</span>;
   } else if (cropStatus === 'cropped') {
      cropText = <span>&#10003;</span>;
   }

   return (
      <>
         {spinner && <Spinner color="blue" />}
         <div
            className="ic__container"
            style={{ display: openCropper ? 'block' : 'none' }}
         >
            <div className="ic__header">
               <div className="ic__header--title">Image Cropper</div>
               <span className="ic__header--cancel-btn" onClick={closeCropper}>
                  ×
               </span>
            </div>
            <div className="ic__body">
               <div className="ic__body--canvas">
                  <img
                     className="ic__body--canvas--img"
                     ref={ic}
                     src={img}
                     alt="profile"
                  />
               </div>
            </div>
            <div className="ic__footer" onClick={cropImage}>
               {cropText}
            </div>
         </div>
      </>
   );
};

export default ImageCrop;
