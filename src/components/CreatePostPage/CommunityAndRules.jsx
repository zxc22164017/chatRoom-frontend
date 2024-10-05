import React, { useState } from "react";
import { useGetCommunitiesQuery } from "../../store";
import { Thumbnail } from "../Thumbnails/Thumbnail";
import Dropdown from "../Dropdown";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Button from "../Button";
import { FaInfoCircle } from "react-icons/fa";
import RuleDrawer from "./RuleDrawer";

export function CommunityAndRules({ formData, setFormData }) {
  const { data } = useGetCommunitiesQuery();
  const [selectOption, setSelectOption] = useState(null);
  const handleOption = (option) => {
    setSelectOption(option);
    setFormData({ ...formData, communityId: option.value });
  };
  const [show, setShow] = useState(false);

  let options;
  if (data) {
    options = data.map((item) => {
      return {
        value: item._id,
        label: item.name,
        icon: item?.icon,
        rules: item.rules,
      };
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="border-2 rounded-full w-1/3 px-4  flex items-center ">
        {selectOption ? (
          <Thumbnail className={"h-8 w-8"} image={selectOption?.icon} />
        ) : (
          <HiMagnifyingGlass />
        )}
        <Dropdown
          className="border-none shadow-none"
          options={options}
          optClassname={"w-full"}
          text={"Community"}
          onChange={handleOption}
          value={selectOption}
        />
      </div>
      <Button
        type="button"
        onClick={() => {
          setShow(true);
        }}
        className="h-10 w-18 flex items-center border-none active:ring-0 mr-4 hover:text-blue-400 transition-all duration-100"
      >
        <FaInfoCircle className="h-4 w-4 pr-1" />
        <p className="text-xs">rules</p>
      </Button>
      {show && <RuleDrawer setShow={setShow} selectOption={selectOption} />}
    </div>
  );
}
