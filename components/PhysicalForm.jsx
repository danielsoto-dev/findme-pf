import React from "react";
import { Field, useFormikContext } from "formik";

const skinColors = ["#fbd8ba", "#e9b48c", "#a76743", "#7c4522", "#452a17"];
// Brown, Amber, Hazel, Green, Blue, Gray;

const eyeColors = [
  "#210500",
  "#9c6d38",
  "#73582d",
  "#8d987f",
  "#659bbd",
  "#9d9e9c",
];
const hairTypes = ["Straight", "Wavy", "Curly", "Coily"];
const hairColors = ["#19140f", "#8e4a24", "#d0b48b", "#df7126", "#f0efed"];
// const hairTypes = ["Lacio", "Ondulado", "Rizado", "Crespo"];
export const PhysicalForm = () => {
  const { values } = useFormikContext();
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl text-center py-4">PsysicalForm</h1>
      <div className="mx-auto max-w-md flex  justify-center flex-col gap-4">
        <SkinColorGroup />
        <EyeColorGroup />
        <HairTypeGroup />
        <HairColorGroup />
        <label className="text-lg font-bold text-center" htmlFor="height">
          Height in cm
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
        Select the closest color to their skin tone
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
        Select the closest color to their eyes
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
        Select the closest hair type
      </div>
      <div
        className="flex gap-6 justify-center"
        role="group"
        by="my-radio-group"
      >
        {hairTypes.map((type, idx) => {
          console.log(type, idx);
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
        Select the closest color to their hair
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
