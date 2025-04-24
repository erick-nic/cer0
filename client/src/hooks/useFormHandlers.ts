import { useState } from "react";

type FormState<T> = T;

export const useFormHandlers = <T extends Record<string, any>>(initialState: T) => {
  const [data, setData] = useState<FormState<T>>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttributesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [name]: value,
      },
    }));
  };

  const handleImagesChange = (index: number, value: string) => {
    const updatedImages = [...data.images];
    updatedImages[index] = value;
    setData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const addImageField = () => {
    setData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  return {
    data,
    setData,
    handleChange,
    handleAttributesChange,
    handleImagesChange,
    addImageField,
  };
};