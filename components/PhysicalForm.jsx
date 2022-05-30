import React from "react";
import { Field, useFormikContext } from "formik";
import { FormikSelect } from "./FormikSelect";
import {
  skinColors,
  hairTypes,
  eyeColors,
  hairColors,
} from "../utils/dictOfPhysical";
export const PhysicalForm = () => {
  // const { values } = useFormikContext();
  return (
    <div className="mx-auto max-w-md">
      <div className="mx-auto max-w-md flex  justify-center flex-col gap-4">
        <SkinColorGroup />
        <EyeColorGroup />
        <HairTypeGroup />
        <HairColorGroup />
        <label className="text-lg font-bold text-center" htmlFor="height">
          Altura en cm
        </label>
        <Field
          className=" block py-2.5 mx-20 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 "
          name="height"
          type="number"
        />
      </div>
    </div>
  );
};
const SkinColorGroup = () => {
  const sizeOfSkinColors = 50;
  return (
    <>
      <div id="my-radio-group" className="text-lg text-center font-bold">
        Seleccione el color de piel más cercano
      </div>
      <div
        className="flex gap-6 justify-center"
        role="group"
        by="my-radio-group"
      >
        {skinColors.map((color, idx) => {
          return (
            <label key={color} className="flex justify-center flex-col gap-4">
              <div
                className={`border border-black rounded-full w-10 h-10`}
                style={{
                  backgroundColor: color,
                  width: sizeOfSkinColors,
                  height: sizeOfSkinColors,
                }}
              />
              <Field type="radio" name="skinColor" value={`${idx}`} />
            </label>
          );
        })}
      </div>
    </>
  );
};
const EyeColorGroup = () => {
  const sizeOfEyeColors = 50;
  return (
    <>
      <div id="my-radio-group" className="text-lg text-center font-bold">
        Seleccione el color de ojos más cercano
      </div>
      <div
        className="flex gap-6 justify-center"
        role="group"
        by="my-radio-group"
      >
        {eyeColors.map((color, idx) => {
          return (
            <label key={color} className="flex justify-center flex-col gap-4">
              <div
                className={`border border-black rounded-full w-10 h-10`}
                style={{
                  backgroundColor: color,
                  width: sizeOfEyeColors,
                  height: sizeOfEyeColors,
                }}
              />
              <Field type="radio" name="eyeColor" value={`${idx}`} />
            </label>
          );
        })}
      </div>
    </>
  );
};
const HairTypeGroup = () => {
  return (
    <>
      <div id="my-radio-group" className="text-lg text-center font-bold">
        Seleccione el tipo de cabello más cercano
      </div>
      <div
        className="flex gap-6 justify-center"
        role="group"
        by="my-radio-group"
      >
        {hairTypes.map((type, idx) => {
          return (
            <label key={type} className="flex justify-center flex-col gap-4">
              <p className="font-bold">{type}</p>
              <Field type="radio" name="hairType" value={`${idx}`} />
            </label>
          );
        })}
      </div>
    </>
  );
};

const HairColorGroup = () => {
  const sizeOfHairolors = 50;
  return (
    <>
      <div id="my-radio-group" className="text-lg text-center font-bold">
        Seleccione el color de cabello más cercano
      </div>
      <div
        className="flex gap-6 justify-center"
        role="group"
        by="my-radio-group"
      >
        {hairColors.map((color, idx) => {
          return (
            <label key={color} className="flex justify-center flex-col gap-4">
              <div
                className={`border border-black rounded-full w-10 h-10`}
                style={{
                  backgroundColor: color,
                  width: sizeOfHairolors,
                  height: sizeOfHairolors,
                }}
              />
              <Field type="radio" name="hairColor" value={`${idx}`} />
            </label>
          );
        })}
      </div>
    </>
  );
};
