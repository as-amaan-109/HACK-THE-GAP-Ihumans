"use client";
import { Avatar, AvatarGroup } from "@heroui/react";
import React from "react";

const Contributers = ({ contributers }) => {
  return (
    <>
      <AvatarGroup isBordered max={3}>
        {contributers?.map((contributer,index) => (
          <Avatar
            kay={index}
            showFallback
            src={contributer?.photoURL}
            alt={contributer?.username}
          />
        ))}
      </AvatarGroup>
    </>
  );
};

export default Contributers;
