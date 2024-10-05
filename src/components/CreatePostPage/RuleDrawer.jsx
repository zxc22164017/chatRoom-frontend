import React, { useState } from "react";
import Drawer from "../drawer";
import ExpandablePanel from "../ExpandablePanel";

function RuleDrawer({ setShow, selectOption }) {
  let renderRules;

  if (selectOption?.rules) {
    const { rules } = selectOption;
    renderRules = rules.map((rule) => {
      return (
        <li key={rule._id}>
          <ExpandablePanel outerClassName={"w-80"} header={rule.title}>
            {rule.content}
          </ExpandablePanel>
        </li>
      );
    });
  }

  return (
    <Drawer setShow={setShow} className="items-start">
      <h1 className="text-xl mb-4 font-semibold ">
        {selectOption?.label} rules
      </h1>
      <ol className="list-decimal">{renderRules}</ol>
    </Drawer>
  );
}

export default RuleDrawer;
