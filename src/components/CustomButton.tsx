import React from "react";
import _ from "lodash";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

const CustomButton: React.FC<
  ButtonProps & {
    loading?: boolean;
  }
> = (props) => {
  return (
    <Button
      disabled={props.loading ? true : props.disabled}
      {..._.omit(props, ["loading"])}
    >
      {props.loading && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      )}
      {props.children}
    </Button>
  );
};

export default CustomButton;
